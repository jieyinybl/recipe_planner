# Actions on Google: Simple Recipe Planner using Node.js and Cloud Funtions for Firebase

This is a simple project to build a AI chatbot recipe planner with Dialogflow and Node.js. The chatbot understands simple sentenses about recipe planning and extracts entities like ingredient, diet_type and health_label.

### Set up Instructions
The project uses the [**Edamam**](https://developer.edamam.com/edamam-docs-recipe-api) recipe search api. In order to make an API call you need to acquire app_id and app_key and replace them in the index.js.

``` var pathString = "/search?q=" + ingredient + "&app_id={app_id}&app_key={app_key}&from=0&to=3&diet=" + diet_type + "&health=" + health_label; ```

### Deploy on Firebase

TODO

### References
* The inspiration of this project comes from: https://github.com/actions-on-google/dialogflow-silly-name-maker-webhook-nodejs
* Public APIs: https://github.com/toddmotto/public-apis
* How to build a chatbot with dialog flow: https://medium.com/swlh/how-to-build-a-chatbot-with-dialog-flow-chapter-4-external-api-for-fulfilment-3ab934fd7a00
