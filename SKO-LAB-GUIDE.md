# Connector Development Lab

This lab shows how to add the ability to Base64 encode text on top of an existing connector.

This lab requires an environment to be prepared with some expectations:

- Personal connector development environment built from https://davinci.pingidentity.cloud/
- Connector template from https://github.com/pingidentity-sk/template-simple-connector

Steps for the lab include:

- [Manifest.js](#manifest) - Add a capability definition.
- [Index.js](#index) - Add code to be called per definition on manifest.
- [Test new capability](#test-capability)
  - Restart API and wait for health
  - Upload Manifest to configuration
  - Update Flow to use the new capability

## Manifest

Open `myconnector/manifests/manifest.js` in your browser vscode.

> Some lines on manifest are very long, you can turn off word-wrap with option+z on mac (or via hamburger menu>view>word-wrap )

Make the following changes on `myconnector/manifests/manifest.js`

Copy this code block (all the way to left margin to maintain indentation)

```js
    /*
     Here we define the 'textToEncode' property, which is later declared as something that is
    assigned a value in the flow
     */
    textToEncode: {
      displayName: 'Text to Base64 Encode',
      info: 'Text to Base64 Encode',
      preferredControlType: 'textField',
      enableParameters: true,
    },
```

On manifest.js enter a new line after 184. On the newline, backspace to left margin and paste the code block.

Results should look like:

```js
      /*
       This field is displayed next to the input to describe what the value should be
       */
      info: 'The body of the POST call',
    },
    /*
     Here we define the 'textToEncode' property, which is later declared as something that is
    assigned a value in the flow
     */
    textToEncode: {
      displayName: 'Text to Base64 Encode',
      info: 'Text to Base64 Encode',
      preferredControlType: 'textField',
      enableParameters: true,
    },
  },
  /*
   the 'capabilities' object enumerates the capabilities that the orchestration
   engine can call and that the UI needs to render configuration panels for
   */
```

Next, copy this code block:

```js
    base64Encode: {
      type: 'action',
      title: 'Base64 Encode string',
      subTitle: 'Base64 Encode string',
      respondToUser: true,
      apiEnabled: true,
      inputs: [],
      flowConfigView: {
        items: [
          {
            propertyName: 'textToEncode',
          },
        ],
      },
      payloadInputSchema: {
        default: {
          type: 'object',
          properties: {
            properties: {
              type: 'object',
              properties: {
                textToEncode: {
                  type: 'string',
                  description: 'Text to Base64 Encode',
                },
              },
            },
          },
        },
      },
    },
```

On manifest.js enter a new line after 318. On the newline (319) backspace to left margin and paste the code block.

Results should look like:

```js
            statusCode: {
              type: 'number',
            },
          },
        },
      },
    },
    base64Encode: {
      type: 'action',
      title: 'Base64 Encode string',
      subTitle: 'Base64 Encode string',
      respondToUser: true,
      apiEnabled: true,
      inputs: [],
      flowConfigView: {
        items: [
          {
            propertyName: 'textToEncode',
          },
        ],
      },
      payloadInputSchema: {
        default: {
          type: 'object',
          properties: {
            properties: {
              type: 'object',
              properties: {
                textToEncode: {
                  type: 'string',
                  description: 'Text to Base64 Encode',
                },
              },
            },
          },
        },
      },
    },
  },
  /*
    the 'accountConfigView' object stores an 'items' array of the properties
    (as defined earlier) to display at the connection level.
    In other words, these are the fields that are share by every flow
    using the connection in the company.
   */
```

## Index

Make the following changes to `myconnector/index.js`

Copy this code block:

```js
const handle_capability_base64Encode = async ({ properties }) => {
  logger.info('overriding handle_capability_base64Encode');
  try {
    console.log(properties);
    const { textToEncode } = properties;
    const response = Buffer.from(textToEncode).toString('base64');
    console.log(`encoded response is: ${response}`);
    return {
      output: {
        rawResponse: response,
      },
      eventName: 'continue',
    };
  } catch (err) {
    return {
      output: {
        rawResponse: {},
      },
      eventName: 'continue',
    };
  }
};
```

On index.js enter a new line after 94. On the newline (95) backspace to left margin and paste the code block.

The result should be like:

```js
    throw compileErr('postHTTP', err);
  }
};

const handle_capability_base64Encode = async ({ properties }) => {
  logger.info('overriding handle_capability_base64Encode');
  try {
    console.log(properties);
    const { textToEncode } = properties;
    const response = Buffer.from(textToEncode).toString('base64');
    console.log(`encoded response is: ${response}`);
    return {
      output: {
        rawResponse: response,
      },
      eventName: 'continue',
    };
  } catch (err) {
    return {
      output: {
        rawResponse: {},
      },
      eventName: 'continue',
    };
  }
};

sdk.methods.handle_capability_postHTTP = handle_capability_postHTTP;
```

Enter this line on a newline below 118:

```js
sdk.methods.handle_capability_base64Encode = handle_capability_base64Encode;
```

And this line after 124

```js
  handle_capability_base64Encode,
```

The bottom of index.js should look like:

```js
sdk.methods.handle_capability_postHTTP = handle_capability_postHTTP;
sdk.methods.handle_capability_base64Encode = handle_capability_base64Encode;

initialize();

module.exports = {
  handle_capability_postHTTP,
  handle_capability_base64Encode,
};
```

## Test Capability

Now that all the code is prepared, let's test it.

Upload the manifest to MongoDB so it can be read and available in your admin portal.

run `sh ~/env-prep.sh`

After it completes, a yellow flower-box will be shown with commands and an instruction similar to `update-manifest`

Run the mentioned command.

Next, the API component must be restarted. From your dashboard through https://davinci.pingidentity.cloud/ find your corresponding project.

Look for and click the restart button.
It looks a bit like: ↩️
If you hover above it you will see 'Restart API <project-name>'

> Click refresh as desired to update the countdown.

Once the countdown completes, it is time to update the flow in Admin Portal.

Navigate to your flow in Admin Portal

If you're lucky, click the example connector node (first node). Then the back arrow next to 'Action' which looks like `<`. You should see your new 'Base64 Encode String' capability here. Select the capability and enter some text in the textbox that appears.

Save, Deploy, Try Flow!

If you're _unlucky_ you may need to create a new connection in the 'Connections' item in menu to get the capability. After this, come back to your flow, right-click the node and select 'Changed Linked Connection...' and choose the new connection.
