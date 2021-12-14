# Connector Example

## Overview:
This example connector is here to help get you started with the development on the orchestration platform and understand the architecture.

## Requirements
  Here are the things that we ask in order to contribute a connector to the platform:
    - your code starts in index.js
    - declare each capability your connector provides by registering 
    `sdk.methods.handle_capability_<CAPABILITY_NAME_HERE>`
    For example, `sdk.methods.handle_capability_validateIPAddress` for a method that would verify an IP address is allowed.
    - provide unit tests validating that your code is robust
    - provide a set of 3 logo files
    - an example flow demonstrating your connector
    - in case your connector leverages a third-party service, there will need to be a test account provided such that integration tests can be run to demonstrate end-to-end viability of your code

### Logo files specification
  Your connector needs to provide 3 images in the Portable Network Graphics format (PNG) in 3 specific sizes:
    . 128x128px 
    . 512x512px
    . 1024x1024px

They respectively need to be named:
    . logo_128.png
    . logo_512.png
    . logo_1024.png

# Debugging your connector
  As you write the code for your connector, you will want to be able to debug and test it. Use VSCode built-in debugger to run and debug yor code.