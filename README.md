# Connector Example

## Overview:
This example connector is here to help get you started with the development on the DaVinci platform and understand the architecture.

# Getting started with the example connector

A connector is composed of 3 main things:
* the manifest describes the connector and its configuration panels in the GUI
* the index.js is where the code goes to implement *capabilities* the connector provides
* the package.json is the usual nodeJS dependency management affair

## Requirements
  Here are the things that we ask in order to contribute a connector to the platform:
  * Code starts in index.js
  * Declare each capability your connector provides by registering 
    `sdk.methods.handle_capability_<CAPABILITY_NAME_HERE>`
    
  For example, `sdk.methods.handle_capability_validateIPAddress` for a method that would verify an IP address is allowed.
  * Provide unit tests validating that your code is robust
  * Provide a set of 3 logo files
  * An example flow demonstrating your connector
  * In case your connector leverages a third-party service, there will need to be a test account provided such that integration tests can be run to demonstrate end-to-end viability of your code

# Starting the connector
Click on the fourth icon from the top in the left navbar ( Run and Debug )
Once the drawer opens, at the top of the drawer there should be a little green "play" button icon, click it.
You will see the logs of your connector in the terminal

# Running Unit Tests
To run unit tests execute `npm test` which will execute the unit tests defined in \test\index.test.js

# Debugging your connector
  As you write the code for your connector, you will want to be able to debug and test it. Use VSCode built-in debugger to run and debug yor code.
  
# Try it in a flow

### Logo files specification
  Your connector needs to provide 3 images in the Portable Network Graphics format (PNG) in 3 specific sizes:
  * 20x20px 
  * 40x40px
  * 60x60px

They respectively need to be named:
  * `logo.png`
  * `logo@2x.png`
  * `logo@3x.png`
