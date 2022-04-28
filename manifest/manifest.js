const connectorOpenweather = {
  /*
   This is a simple string to name your connector.
   If the service your connector is feature-rich to the extent
   that you might implement multiple connectors to avoid
   crowding a single connector with capabilities that are diverse,
   try naming your connector specifically with what you are planning to do.
   For example, take Amazon, you wouldn't write an all-encompassing Amazon 
   connector. Rather, you might have a set of connectors like:
     - Amazon AWS S3 Connector
     - Amazon AWS SES Connector
     - Amazon IdP
     - Aamzon Selling Partner
     - Amazon Cognito
     - ...
   it is very common for first time implementations to be named too broadly.
   It's harder to revisit once your connector is published and used in flows.
   Think about this now. 
  */
  "name": "Openweather",

  /*
    A simple description to briefly explain what the connector does.
    This is displayed in the admin portal -> connections -> New connection
    which does not offer a lot of real estate, keep it brief and to the point.
  */  
  "description": "Retrieves the current weather from Openweather",

  /*
   The connector id must be gloablly unique.
   It's a good idea to keep this consistent with your connector name
   Note that it is crucial that the connectorId value match the name of
   the const defined at the top of this file
  */
  "connectorId": "connectorOpenweather",

  /*
    This is the ID of the redis service to and from which events will be
    exchanged with the orchestration engine. It is critical that this be
    unique to your connector to avoid messaging issues.
  */  
  "serviceName": "connector-openweather",

  /*
   the connector type is not used at this time
  */  
  "connectorType": "example",

  /*
   A connector can be registered in one or more categories.
   Think of them as advertising tags, the categories will allow
   your connector to be featured along with other connectors sharing
   the same categories.
  */  
  "connectorCategories": [
    {
      "name": "Example",
      "value": "example"
    }
  ],

  /*
    This should be a longer description of your connector and its capabilities
    It is displayed in Connectors -> New connector as a description text field
    and has more real estate to go into more details about the specifics of
    your connector
   */
  "connectorDetails": "A longer, more detailed description of what your connector does.",

  /*
    This provides an image for the connector that is higher resolution than those included in the repo
    It is displayed in Connectors -> New connector browser and will have more real estate for rendering
    This property needs to include the base64-encoded PNG contents of the image as demonstrated below
   */  
  "detailImage": null,

  /*
    Some metada for the connector that will allow to render it nicely on the canvas as
    it gets used in flows, including colors and a logo
   */  
  "metadata": {
    "colors": {
      // 'canvas' is the color of the background of the top part of the connection box as rendered in flow studio
      "canvas": "#6AC15C",
      // 'dark' is the color of the horizontal bar on each side of the logo icon at the top of the connection box
      "dark": "#171D21",
      // 'canvasText' is the color for the font in the connection box
      canvasText: '#171D21'      
    },
    "logos": {
      /*
        the logo file name must match what is being provided in assets
        or use the pingIndentity.svg logo
       */      
      "canvas": {
        "imageFileName": "openweather.svg"
      }
    }
  },

  /*
    This describes sections in the connector UI.
    When users make use of the connector, the connector UI in flow studio will render these sections.
    Each section may be used to expose different properties that would then be leveraged by connector
    capabilities to perform the necessary processing to deliver the capability.
    You may leave sections as is for now.
    It will come in handy especially if you provide advanced capabilities in more sophisitcated connectors.
   */  
  "sections": [
    {
      "name": "General",
      "value": "general",
      "default": true
    }
  ],
  "flowSections": [
    {
      "name": "General",
      "value": "general"
    }
  ],

  /*
    The 'properties' object defines all the properties later needed by your connector to implement 
    capabilities. Any bit of data that is going to either be configured on the connector, the connection
    or in the flow is going to have to be declared here.
   */
  "properties": {

    /*
      Here we define the 'appid' property which is a connection level property and is
      assigned a value on the connection panel
    */    
    "appid": {
      "displayName": "Application ID",
      "info": "Openweather Application ID ",
      "preferredControlType": "textField",
      "required": true
    },

    /*
      Here we define the 'lat', 'lon', and 'units' properties which are capability level properties 
      and are assigned a value under the specific capability panel
    */    

    "lat": {
      "displayName": "Lattitude",
      /*
       The info field is displayed next to the input to describe what the value should be
      */      
      "info": "Latitude of the location",
      /*
        preferredControlType governs the type of field that is rendered on the UI panel
        to assign a value to the property passed in to the connector capability when 
        it is invoked.
        Valid values for preferredControlType are:
          - button
          - codeEditor
          - colorPicker
          - customFormData
          - dateTimePicker
          - dropDown
          - dropDownAsync
          - dropDownMultiSelect
          - dropdown
          - dropdownWithCreate (This allows the dropDown to suggest values but also allow freeform input, make sure to not set the default value)
          - formFieldsList
          - functionArgumentList
          - geofence
          - icon
          - iosSwitch
          - keyValueList
          - label
          - mapping
          - multipleTextFields
          - none
          - radioSelect
          - screenComponentList
          - searchableDropdownTimezone
          - secureTextArea
          - selectNameValueListColumn
          - tableViewAttributes
          - tableViewScopes
          - textArea
          - textField
          - textFieldArrayView
          - timepicker
          - toggleSwitch
          - urlsTableView
          - userConnectorAttributeMapping
          - validationRules
          - variableInputList
       */      
      "preferredControlType": "textField",
      /*
        the enableParameters displays the variable picker tool in the UI field
        This button is represented with two curly braces {} and allows to pick
        global variables, flow variables, or output payload from connectors 
        executing earlier in a flow
       */            
      "enableParameters": true,
      "required": true
    },
    "lon": {
      "displayName": "longitude ",
      "info": "Longitude of the location",
      "preferredControlType": "textField",
      "required": true,
      "enableParameters": true
    },
    "units": {
      "displayName": "Units",
      "info": "Units (Metric, Imperial, Standard)",
      "preferredControlType": "dropDown",
      "required": true,
      "options": [
        {
          "name": "metric",
          "value": "metric"
        },
        {
          "name": "imperial",
          "value": "imperial"
        },
        {
          "name": "standard",
          "value": "standard"
        }
      ],
      "enum": [
        "metric",
        "imperial",
        "standard"
      ],
      "value": "metric"
    }
  },
  /*
   the 'capabilities' object enumerates the capabilities that the orchestration
   engine can call and that the UI needs to render configuration panels for
  */  
  "capabilities": {

    /*
      the 'getWeather' capability is the only capability implemented in this example connector.
      Note that the name must match the handle_capability_< capabilty_name_here > in index.js
     */    
    "getWeather": {
      // Leave the type as action
      "type": "action",
      /* 
       Title is the name of the capability as displayed in the connector UI
      */      
      "title": "Get Weather",
      // Subtext for the title of the capability
      "subTitle": "Returns the current weather from a location",

      /* 
        respondToUser is toggled if the capability needs to interact with the user *within* the capability
        This is different from displaying an HTML form to collect user input using the built-in HTTP connector.
        For example, if a connector had to display a set of images to the user and have them pick 2 that matched
        for the capabilty to successfully complete, you would set responseToUser to true and configure a userView
        to display the images
        */      
      "respondToUser": true,

      /*
       leave this set to true
       */      
      "apiEnabled": true,

      /*
       this is an array to pass global variables in to the capability
       some example values you can pass in as inputs:
        - global.error
        - global.ip
        - global.userInfo
        - global.saml
       */      
      "inputs": ['global.ip'],

      /*
       userViews is an array of UI frames presented to the user within the arc of the 
       life of the capability. This is an advanced topic left for a more advanced template
       */      
      "userViews": [],

      /*
       the 'flowConfigView' object hold an 'items' array of the properties (defined earlier) 
       to display in the UI panel specific to this capability
      */      
      "flowConfigView": {
        "items": [
          {
            "propertyName": "lat"
          },
          {
            "propertyName": "lon"
          },
          {
            "propertyName": "units"
          }
        ]
      },

      /*
       the 'payloadInputSchema' object defines the input schema for this capability
       You will need to edit only the innermost level of this object to describe
       how the platform must marshall data provided as valid input
      */      
      "payloadInputSchema": {
        "default": {
          "type": "object",
          "properties": {
            "properties": {
              "type": "object",
              "properties": {
                /*
                 Add your input properties here, at this level
                */
                
                "lat": {
                  /*
                   Make sure you provide the right native javascript 
                   for runtime validation
                   Valid types are:
                     - array
                     - object
                     - string
                     - boolean
                     - number
                     - bigint
                   */                  
                  "type": "string",
                  "description": "Latitude of the location"
                },
                "lon": {
                  "type": "string",
                  "description": "Longitude of the location"
                },
                "units": {
                  "type": "string",
                  "description": "Units (Metric, Imperial, Standard)"
                }
              },
             /*
               the 'required' array lists the properties that are required in the validation
               of the input data to the capability
               */               
              "required": [
                "lat",
                "lon",
                "units"
              ]
            }
          },
          /* 
           example of a valid input data
           */          
          example: {
            properties: {
              lon: '49.2827',
              lat: '-123.1207',
              units: 'metric'
            }
          }           
        }
      },
      /*
      the output schema for data validation
       */      
      "localOutputSchema": {
        "output": {
          "type": "object",
          "properties": {
            "rawResponse": {
              "type": "object"
            },
            "statusCode": {
              "type": "number"
            },
            "headers": {
              "type": "object"
            }, 
            "lat": {
              "type": "number"
            },
            "lon": {
              "type": "number"
            },
            "current": {
              "type": "object",
              "properties": {
                "dt": {
                  "type": "number"
                },
                "temp": {
                  "type": "number"
                },
                "feelsLike": {
                  "type": "number"
                }          
              }
            }, 
          }
        }
      }
    }
  },
  /*
    the 'accountConfigView' object stores an 'items' array of the properties 
    (as defined earlier) to display at the connection level.
    In other words, these are the fields that are share by every flow
    using the connection in the company.
   */  
  "accountConfigView": {
    "items": [
      {
        "propertyName": "appid"
      }
    ]
  }
}; module.exports = connectorOpenweather;