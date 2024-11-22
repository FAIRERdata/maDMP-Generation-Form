# GCWG-RDA maDMP Generation Form


maDMP-Generation-Tool is a tool to generate maDMPs for your research data.
It is based on the <a href="https://fairerdata.github.io/maDMP-Standard/">maDMP-Standard</a>. This tool converts [GCWG-RDA-maDMP-schema.json](https://github.com/FAIRERdata/maDMP-Standard/blob/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema/GCWG-RDA-maDMP-schema.json) to a web form using the [react-jsonschema-form ](https://rjsf-team.github.io/react-jsonschema-form/docs/) library.
<p>
    With this tool, you are able to:
    <ul>
    <li>create a new maDMP</li>
    <li>validate your maDMP using the validation button at the bottom</li>
    <li>download your maDMP as a JSON file</li>
    <li>upload a JSON file to edit an existing maDMP</li>
    </ul>
</p>

# update form

To update the form, you either have to update the JSON schema [here](https://github.com/FAIRERdata/maDMP-Standard/blob/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema/GCWG-RDA-maDMP-schema.json), or change the fetch link in src/App.tsx

To update the 
