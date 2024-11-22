import React, { useState, useEffect } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './App.css';

function App() {
  const [schemaList, setSchemaList] = useState<{ name: string; schema: string; uischema: string }[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<{ name: string; schema: string; uischema: string } | null>(null);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const folder_path = 'https://raw.githubusercontent.com/FAIRERdata/maDMP-Standard/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema/';
  const schemasUrl = folder_path + 'schema_metadata.json';

  useEffect(() => {
    fetch(schemasUrl)
      .then((res) => res.json())
      .then((data) => {
        setSchemaList(data);
        setSelectedSchema(data[0]);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load schema metadata.');
      });
  }, []);

  useEffect(() => {
    if (!selectedSchema) return;

    setLoading(true);
    setError(null);

    const schemaUrl = folder_path + selectedSchema.schema;
    const uiSchemaUrl = folder_path + selectedSchema.uischema;

    Promise.all([fetch(schemaUrl).then((res) => res.json()), fetch(uiSchemaUrl).then((res) => res.json())])
      .then(([schemaData, uiSchemaData]) => {
        uiSchemaData['ui:submitButtonOptions'] = { submitText: 'Validate' };
        setSchema(schemaData);
        setUiSchema(uiSchemaData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load schema.');
        setLoading(false);
      });
  }, [selectedSchema]);

  // Handle JSON upload
  const uploadJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFormData(json);
        } catch (error) {
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Download the formData as JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.json';
    link.click();
  };

  // Handle form data change
  const handleChange = ({ formData }: IChangeEvent<FormData>) => {
    setFormData(formData as object);
  };

  if (!schemaList.length && !error) return <div>Loading schema list...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="form-container">
      <div className="dropdown">
        <label htmlFor="schema-select">Choose a schema: </label>
        <select
          id="schema-select"
          value={selectedSchema?.name || ''}
          onChange={(e) => {
            const selected = schemaList.find((s) => s.name === e.target.value);
            if (selected) setSelectedSchema(selected);
          }}
        >
          <option value="" disabled>
            Select a schema
          </option>
          {schemaList.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSchema && (
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          formData={formData as any}
          onChange={handleChange}
        />
      )}

      <div>
        <button type="button" className="btn btn-info" onClick={downloadJSON}>
          Download JSON
        </button>
        <input type="file" accept=".json" onChange={uploadJSON} />
      </div>

      {/* Floating Side Panel */}
      <div className="side-panel">
        <button 
          type="button" 
          className="btn btn-info " 
          style={{ marginTop: '10px' }}
          onClick={downloadJSON}
          >
            Download JSON
        </button>

        <input
          type="file"
          accept=".json"
          onChange={uploadJSON}
          style={{ marginTop: '10px' }}
        />

        <a id="source_code" className="source_code" href="https://github.com/FAIRERdata/maDMP-Generation-Tool">Source code</a>
      </div>  
    </div>
  );
}



export default App;
