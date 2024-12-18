# maDMP-Generation-Form

maDMP-Generation-Form is a web application designed to help you generate machine-actionable Data Management Plans (maDMPs) for your research data. This tool is based on the [maDMP-Standard](https://fairerdata.github.io/maDMP-Standard/).

## Features

- Choose your desired maDMP version
- Create a new maDMP
- Validate your maDMP using the validation button
- Save your maDMP by downloading it as a JSON file
- Print the form to save it in a human-readable format
- Upload a JSON file to edit an existing maDMP

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FAIRERdata/maDMP-Generation-Tool.git
   cd maDMP-Generation-Tool
   ```
2. install the dependencies

    ```bash
    npm install
    ```
3. start the development server

    ```bash
    npm run dev
    ```

### Building for Production
To build the application for production, run:

    ```bash
    npm run build
    ```

### Previewing the Production Build
To preview the production build, run:

    ```bash
    npm run preview
    ```

### Deploying to GitHub Pages
To deploy the application to GitHub Pages, run:

    ```bash
    npm run deploy
    ```

## Usage
### Creating a New DMP
- Choose your desired maDMP version from the dropdown menu.
- Fill out the form with the required information.
- Validate your maDMP using the validation button at the bottom.
- Save your maDMP by downloading it as a JSON file.
- Print the form to save it in a human-readable format.
### Editing an Existing DMP
- Upload a JSON file to edit an existing maDMP using the choose file button.
- Make the necessary changes to the form.
- Validate your maDMP using the validation button at the bottom.
- Save your maDMP by downloading it as a JSON file.


## Update Form Schemas
This tool automatically fetches the schema metadata from [this github folder](https://github.com/FAIRERdata/maDMP-Standard/blob/Master/examples/JSON/PublishedSchemas). To add or delete schemas choices in the webform, you need to add or delete corresponding information in the metadata

To create your own version of GCWG-RDA-maDMP schema, following the instructions in this [README file](https://github.com/FAIRERdata/maDMP-Standard/tree/Master/examples/JSON/GCWG-RDA-maDMP%20JSON-schema)


## Update Form Intro Part
The part above the form is the intro part. It is fetched and generated dynamically. To modify the intro part, you should modify the [intro.html](https://github.com/FAIRERdata/maDMP-Generation-Form/blob/master/public/intro.html) file.


## Author Statement
To view the author statement, click on the "Author Statement" link in the application. This will open a modal with detailed information about the authors.



