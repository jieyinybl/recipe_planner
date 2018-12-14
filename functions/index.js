'use strict';


const request = require('request');
const functions = require('firebase-functions');


console.log('set me');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    console.log('Inside Main function.....yessssssss');
    console.log('Request Headers: ' + JSON.stringify(request.headers));
    console.log('Request Body: ' + JSON.stringify(request.body));

    let action = request.body.queryResult.action;
    //const agent = new WebhookClient({ request, response });
    var chat = "here is a sample response: hello world";
    console.log('Inside Main function2');
    console.log(action);
    response.setHeader('Content-Type', 'applicaiton/json');

    if (action != 'input.getRecipe') {
        console.log('Inside input function');
        response.send(buildChatResponse("I'm sorry, I don't know this"));
        return;
    }

    const parameters = request.body.queryResult.parameters;

    const ingredient = parameters['ingredient'];
    const diet_type = parameters['diet_type'];
    const health_label = parameters['health_label'];
    console.log(ingredient);
    console.log(diet_type);
    console.log(health_label);

    searchRecipe(ingredient, diet_type, health_label, response);

});

function searchRecipe(ingredient, diet_type, health_label, CloudFnResponse) {

    console.log('In Function Search Recipe');

    console.log("ingredient: " + ingredient);
    console.log("diet_type: " + diet_type);
    console.log("health_label: " + health_label);

    var pathString = "/search?q=" + ingredient + "&app_id={app_id}&app_key={app_key}&from=0&to=3&diet=" + diet_type + "&health=" + health_label;

    console.log('path string:' + pathString);

    if (ingredient.length === 0) {
        return CloudFnResponse.send(buildChatResponse('What kind of meat do you want to eat? Beef, pork, chicken, lamb, or dear?'))
    }

    if (diet_type.length === 0) {
        return CloudFnResponse.send(buildChatResponse('What kind of diet do you prefer? Balanced, high-fiber, high-protein, low-carb, low-fat, or low-sodium?'))
    }

    if (health_label.length === 0) {
        return CloudFnResponse.send(buildChatResponse('What is your health label? Like alcohol-free, gluten-free, sugar-conscious, vegan, vegetarian etc?'))
    }

    request('https://api.edamam.com' + pathString, (error, response, body) => {
        if (error) {
            // TODO error handling
        }
        console.log('body', body, typeof body);
        const jsonData = typeof body === 'string' ? JSON.parse(body) : body;
        console.log('jsonData', jsonData);
        const recipeNames = jsonData.hits.map((searchResult) => {
            console.log('searchResult:', searchResult);
            console.log('label', searchResult.recipe.label);
            return searchResult.recipe.label;
        });
        const recipeUrls = jsonData.hits.map((searchResult) => {
            console.log('label', searchResult.recipe.url);
            return searchResult.recipe.url;
        });

        const recipeNames2 = recipeNames.join(', ');
        const recipeUrls2 = recipeUrls.join(', ');

        const chat = 'The recipe found is: ' + recipeNames2 + ". Which one do you like to have a look? " + recipeUrls2;
        console.log('chat', chat);

        CloudFnResponse.send(buildChatResponse(chat));

    });


}


function buildChatResponse(chat) {
    return JSON.stringify({"fulfillmentText": chat});
}