# manifests folder
This folder must contain at least one file, either:
* `manifest.js` if the connector manifest is provided in javascript format 
* `manifest.json` if the connector manifest is provided in JSON format

Providing a `manifest.js` file offers the distinct advantage of allowing to split the manifest in multiple javascript files. In that case, the `manifest.js` must `require` all the manifest fragments in order to provide a complete manifest with a single require of `manifest.js`.
