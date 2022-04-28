const connectorOpenweather = {
  "name": "Openweather",
  "description": "Retrieves the current weather from Openweather",
  "connectorId": "connectorOpenweather",
  "serviceName": "connector-openweather",
  "connectorType": "example",
  "connectorCategories": [
    {
      "name": "Example",
      "value": "example"
    }
  ],
  "connectorDetails": "A longer, more detailed description of what your connector does.",
  "detailImage": null,
  "metadata": {
    "colors": {
      "canvas": "#6AC15C",
      "dark": "#171D21"
    },
    "logos": {
      "canvas": {
        "imageFileName": "openweather.svg"
      }
    }
  },
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
  "properties": {
    "appid": {
      "displayName": "Application ID",
      "info": "Openweather Application ID ",
      "preferredControlType": "textField",
      "required": true
    },
    "lat": {
      "displayName": "Lattitude",
      "info": "Latitude of the location",
      "preferredControlType": "textField",
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
  "capabilities": {
    "getWeather": {
      "type": "action",
      "title": "Get Weather",
      "subTitle": "Returns the current weather from a location",
      "respondToUser": true,
      "apiEnabled": true,
      "inputs": [],
      "userViews": [],
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
      "payloadInputSchema": {
        "default": {
          "type": "object",
          "properties": {
            "properties": {
              "type": "object",
              "properties": {
                "lat": {
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
              "required": [
                "lat",
                "lon",
                "units"
              ]
            }
          }
        }
      },
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
  "accountConfigView": {
    "items": [
      {
        "propertyName": "appid"
      }
    ]
  }
}; module.exports = connectorOpenweather;