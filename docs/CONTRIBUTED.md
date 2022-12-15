### Examples of completed connector documentation:

* https://docs.pingidentity.com/bundle/davinci-pingone-risk-connector/page/enk1642800997036.html
* https://docs.pingidentity.com/bundle/davinci-pingone-connector/page/hlh1642792860912.html


# Template Simple Connector

Author: [Your name, organization]


The PRODUCTNAME connector lets you ... in your PingOne DaVinci flow.

[Describe the overall purpose of the connector]


## Setup


### Resources

For information and setup help, see the following documentation:


PRODUCTNAME documentation:

* [Link text](https://example.com/create-application.html)
* [Link text](https://example.com/docs.html)


DaVinci documentation:

* [Adding a connector](https://docs.pingidentity.com/csh?context=davinci_adding_a_connection)
* [Using DaVinci flow templates](https://docs.pingidentity.com/csh?context=davinci_using_davinci_flow_templates)

### Requirements

To use the connector, you'll need:


* A PRODUCTNAME license
* [List other pre-requisites]


### Setting up PRODUCTNAME

1. Create application credentials:
   1. In PRODUCTNAME, go to **Settings > Access**...
   1. Create an application as shown in [Create Application](https://example.com/create-application.html) in the PRODUCTNAME documentation.
   1. Note your **Client ID** and **Client Secret**. You'll use them in the **Setting up the connector** section.
1. Get your population ID:
   1. Go to **Environment > Populations**.
   1. ...

### [Task name]

[Describe a task that needs to be done before adding the connection in DaVinci]


1. Step 1
1. Step 2


### Setting up the connector

In DaVinci, add a **PRODUCTNAME** connector. For help, see [Adding a connection](https://docs.google.com/document/d/1Sc9tD5tn9dl79qOWup0k3eKk5hrNVI8lZPAdm8loeiA/edit#).


#### Connector settings

[List and explain the connector settings that appear when the connection is opened from the **Connections** page. If you did not cover it earlier in the **Setup** section, tell the user how to complete each configuration field or where to get the information they need.

These typically on the **General** tab, but some connectors have a different name or multiple configuration tabs. Don't document **Capabilities**, or **In Flows**.]


## Using the connector in a flow

[Describe how to use the connector after it has been set up.]

You can use the connector in a variety of use cases, such as:


### [Use case]

[Describe how to use the connector in this use case. Does it come with a related flow template? Is there a generic use case flow to follow in the Singular Key core documentation?]


### [Use case]

[Describe how to use the connector in this use case. Does it come with a related flow template? Is there a generic use case flow to follow in the Singular Key core documentation?]


## Troubleshooting

[Optional section]


### Common solutions

[Describe solutions to common problems the user might encounter when setting up or using the connector. If there are any required steps, include them in the **Setup** section.]


### Troubleshooting resources


#### [Resource description]

[Describe other resources, tools, reference information, or links that might be helpful when troubleshooting.]


#### Testing capabilities

You can test each capability individually. For help, see [Testing capabilities](https://docs.google.com/document/d/1Sc9tD5tn9dl79qOWup0k3eKk5hrNVI8lZPAdm8loeiA/edit#).


## Release notes

[Optional section]

[Describe any changes, issues or limitations.]

### December 2022

#### Manage group memberships


The following new capabilities allow you to manage which groups a user belongs to:

*  **Create User Group Membership**
*  **Delete User Group Membership**

Combined with the existing **Read User Group Memberships** capability, this provides you with a more complete membership management experience.


#### Dynamically populated capability fields
When configuring a connector capability, DaVinci now populates properties, such as **Population** and **Agreement**, with information from PingOne.

Your existing configuration still works, and you can always select **Use Population ID** (or the equivalent) to show a manual entry field. This lets you manually enter a value or use a dynamic value from your flow.
