const exampleConnector = {
  connectorId: "exampleConnector",
  name: "Example Connector",
  serviceName: 'connector-example',
  connectorType: "example",
  description: "Example Connector HTTP Post Call",
  connectorDetails: null,
  detailImage: null,
  connectorCategories: [{ name: 'Example', value: 'example' }],
  metadata: {
    colors: {
      canvas: '#6AC15C',
      dark: '#171D21',
    },
    logos: {
      canvas: {
        imageFileName: 'connectorLogo.svg',
      },
    },
  },
  sections: [{ name: 'General', value: 'general', default: true }],
  flowSections: [{ name: 'General', value: 'general' }],
  properties: {
    url: {
      displayName: 'URL',
      preferredControlType: 'textField',
      info: `The URL of the POST call`,
      required: true
    },
    body: {
      displayName: 'Body',
      preferredControlType: 'textField',
      info: `The body of the POST call`,
      required: true
    }    
  },
  capabilities: {
    postHTTP: {
      type: 'action',
      title: 'Post HTTP',
      subTitle: `This is an example capability`,
      respondToUser: true,
      apiEnabled: true,
      inputs: ['*'],
      userViews: [],
      flowConfigView: {
        items: [
          { propertyName: 'body' }
        ],
      },
      payloadInputSchema: {
        default: {
          type: "object",
          properties: {
            properties: {
              type: "object",
              properties: {
                body: {
                  type: "string",
                  description: "The body of the HTTP request"
                }
              },
              required: [
                "body",
              ]
            }
          },
          example: {
            properties: {
              body: '{"hello": "world"}'
            }
          }
        },
      },
      localOutputSchema: {
        output: {
          type: 'object',
          properties: {
            rawResponse: {
              type: 'object',
            },
            statusCode: {
              type: 'number',
            }
          }
        }
      },
    },
  },
  accountConfigView: {
    items: [
      { propertyName: 'url' }
    ],
  },
};

module.exports = exampleConnector;
