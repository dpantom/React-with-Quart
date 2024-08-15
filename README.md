# Starter Template for using a React app with a Python Quart Server
The purpose of this repository is to be used as a reference when creating React applications to connect to a python server.

## Code Stack
  #### Front End
  - React
  - TypeScript

  #### Back End
  - Python

## Project Setup Guide
Assuming you have already cloned the repository

### Python Quart Setup
  * Open a terminal and navigate to the repository's parent directory

  * #### Creating a virtual environment
    * Run command `python -m venv VENV_NAME`
  * #### Activating virtual environment
    * On MacOS: `source VENV_NAME/bin/activate`
    * On Windows `VENV_NAME\Scripts\activate`
  * #### Installing Required Packages
    * In the same terminal as the previous step, navigate to `React-with-Quart/QuartBackend` directory
    * Run `pip install -r minreq.txt`
      - This will install all packages in the minreq.txt file (These are the necessary packages for this template)
      - To view the packages you have installed in your venv, run command `pip list`

  * #### How to run the Quart Server
    * To run the local server use command `python -m src.app`
    * In your terminal, a message will give you the url and port that your server is running on.

### React Project Setup
assuming you have node.js installed on your machine

  * #### Installing Required packages
    * Open a new terminal (keep your python terminal open)
    * Navigate to `React-with-Quart/ReactFrontEnd` directory
    * Run command `npm install` 
      - This installs all required node packages
    
  * #### Running React App
    * In the same terminal, run `npm run dev`
      - This will run a locally hosted version of the React app.
      - There will be a message in the terminal specifying what port this app is being hosted on


