import React, { useState, useEffect } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './App.css';
import { jsPDF } from 'jspdf';

function App() {
  const [schemaList, setSchemaList] = useState<{ name_n_version: string; schema: string; uischema: string; toc: string  }[]>([]);
  const [selectedSchema, setSelectedSchema] = useState<{ name_n_version: string; schema: string; uischema: string; toc: string } | null>(null);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const folder_path = 'https://raw.githubusercontent.com/FAIRERdata/maDMP-Standard/Master/examples/JSON/PublishedSchemas/';
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

// Updated ToC generation function
const generateToC = (schema: any, formData: any, parentKey: string = 'root'): JSX.Element[] => {
  if (!schema || typeof schema !== 'object' || !schema.properties) return [];

  return Object.keys(schema.properties).map((key) => {
    const fullPath = parentKey ? `${parentKey}_${key}` : key;
    const property = schema.properties[key];
    const data = formData ? formData[key] : undefined;

    return (
      <li key={fullPath}>
        <a href={`#${fullPath}`} className="toc-link" onClick={(e) => {
          e.preventDefault();
          const nestedList = e.currentTarget.nextElementSibling;
          if (nestedList) {
            nestedList.classList.toggle('show');
          }
          // Delay the default behavior to allow the toggle to complete
          setTimeout(() => {
            window.location.hash = fullPath;
          }, 100);
        }}>
          {key}
        </a>
        {/* If it's an object, recurse */}
        {property.type === 'object' && property.properties && (
          <ul className="nested-toc">
            {generateToC(property, data, fullPath)}
          </ul>
        )}
        {/* If it's an array, list its items */}
        {property.type === 'array' && Array.isArray(data) && (
          <ul className="nested-toc">
            {data.map((item: any, index: number) => (
              <li key={`${fullPath}_${index}`}>
                <a href={`#${fullPath}_${index}`} className="toc-link" onClick={(e) => {
                  e.preventDefault();
                  const nestedList = e.currentTarget.nextElementSibling;
                  if (nestedList) {
                    nestedList.classList.toggle('show');
                  }
                  // Delay the default behavior to allow the toggle to complete
                  setTimeout(() => {
                    window.location.hash = `${fullPath}_${index}`;
                  }, 100);
                }}>
                  {`${key} [${index + 1}]`}
                </a>
                {property.items.type === 'object' && property.items.properties && (
                  <ul className="nested-toc">
                    {generateToC(property.items, item, `${fullPath}_${index}`)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  });
};

// Handle form data change
const handleChange = ({ formData }: IChangeEvent<FormData>) => {
  setFormData(formData as object);
};


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

  return (
    <div>
      <div className="form-container">
        <div className="dropdown">
          <label htmlFor="schema-select">Choose a schema: </label>
          <select
            id="schema-select"
            value={selectedSchema?.name_n_version || ''}
            onChange={(e) => {
              const selected = schemaList.find((s) => s.name_n_version === e.target.value);
              if (selected) setSelectedSchema(selected);
            }}
          >
            <option value="" disabled>
              Select a schema
            </option>
            {schemaList.map((s) => (
              <option key={s.name_n_version} value={s.name_n_version}>
                {s.name_n_version}
              </option>
            ))}
          </select>
        </div>

        {/* Display error message */}
        {error && <div className="error-message">Error: {error}</div>}

        {/* Display form if no error */}
        {selectedSchema && !error && (
          <div>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              formData={formData as any}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <button type="button" className="btn btn-info bottom-button" onClick={downloadJSON}>
            Download JSON
          </button>
          <input type="file" accept=".json" onChange={uploadJSON} />
          </div>
      </div>

      {/* Display Table of Contents */}
      {selectedSchema && !error && (
          <div>
            <div className="toc">
              <h2>Table of Contents</h2>
              <ul>{generateToC(schema, formData)}</ul>
            </div>
          </div>
        )}

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
          <a className="source_code" href="#title">Go to top</a>
          <a className="source_code" href="#footer_source_code">Go to bottom</a>

          <a className="source_code" href="https://github.com/FAIRERdata/maDMP-Generation-Tool">Source code</a>
        </div>  
        
    </div>
  );
}



export default App;
