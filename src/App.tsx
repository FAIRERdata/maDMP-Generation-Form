import React, { useState } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

// Import custom schemas and UI schema
import mySchema from './GCWG-RDA-maDMP-schema.json';
import myUiSchema from './ui_schema.json';

// Define types if you know the structure of formData, otherwise keep it as `any`
//interface FormData {
  // Define the shape of your formData here
  // For example:
  // field1?: string;
  // field2?: number;
//}

function App() {
  const [formData, setFormData] = useState<FormData | {}>({});

  // Handle form data change
  const handleChange = ({ formData }: IChangeEvent<FormData>) => {
    setFormData(formData as any);
  };

  // Download the formData as JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "formData.json";
    link.click();
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

  return (
    <div>
      <Form<FormData>
        schema={mySchema as unknown as RJSFSchema}
        uiSchema={myUiSchema as UiSchema}
        validator={validator}
        formData={formData as any}
        onChange={handleChange}
      />
      <button 
        type="button" 
        className="btn btn-info " 
        style={{ marginTop: '10px' }}
        onClick={downloadJSON}>Download JSON
      </button>

      <input
        type="file"
        accept=".json"
        onChange={uploadJSON}
        style={{ marginTop: '10px' }}
      />
    </div>
  );
}

export default App;
