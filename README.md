# UI5 sample app with custom controls and bindings

Many informations about how to write custom controls and how to bind data using SAP's Open UI5 are spread all over the web. This is my private reminder how something actually "works". I just started with UI5 and will keep this up-to-date as I learn something new.

So basically, this will be a sample app showing some tips, tricks and best practices.

## How to run the app

Dependencies are installed and managed via [npm](https://www.npmjs.com/), the [Node.js](https://nodejs.org/) package manager. This project requires stable Node.js versions `>= 0.8.0`. Odd version numbers of Node.js are considered unstable development versions.

Before setting up the project ensure that your npm is up-to-date by running `npm update -g npm`. You may need to use `sudo` (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

### Get all dependencies

Run this command in the root of the project folder
```bash
node install
```

### Running the dev server

The dev server is initialized using Grunt, a widely used task runner for building stuff.

In order to get started, you'll want to install Grunt's command line interface (CLI) globally. You may need to use `sudo` (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

To run the dev server, call this command in the root of the project folder
```bash
grunt
```

## Screenshot

<img src="https://raw.githubusercontent.com/SunboX/sap-ui5-CustomListItemControl/master/screenshots/app.png" width="300"/>
