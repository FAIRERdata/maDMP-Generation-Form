import React, { useState, useEffect } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

// Import the CSS file
import './App.css';


function App() {
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    // Replace with your GitHub raw content URLs if schemas are not in the public folder
    //const schemaUrl = import.meta.env.VITE_PUBLIC_URL + '/data/GCWG-RDA-maDMP-schema.json';
    //const uiSchemaUrl = import.meta.env.VITE_PUBLIC_URL + '/data/ui_schema.json';
    const schemaUrl = 'https://raw.githubusercontent.com/FAIRERdata/maDMP-Standard/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema/GCWG-RDA-maDMP-schema.json';
    const uiSchemaUrl = 'https://raw.githubusercontent.com/FAIRERdata/maDMP-Standard/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema/ui_schema.json';

    Promise.all([
      fetch(schemaUrl).then((res) => res.json()),
      fetch(uiSchemaUrl).then((res) => res.json())
    ])
      .then(([schemaData, uiSchemaData]) => {
        uiSchemaData["ui:submitButtonOptions"] = {
          submitText: 'Validate'
        };
        setSchema(schemaData);
        setUiSchema(uiSchemaData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load schema.');
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return <div>Loading form...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData as any}
        onChange={handleChange}
      />

      <button
        type="button"
        className="btn btn-info"
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
