# popular-dishes
repo for the popular dishes component

Note: This component has not yet been refactored to work with Mongo.

Requirements for generating dummy data using this component:

An aws account
A bucket with photos:
    Preferably two folders:
        One with Profile photos,
        One with Food/Not Profile photo type photos

Step 1:
npm i

Step 2:
We need dummy data.
So to set that up.
Go to ./database/index.js and change configuration for mysql connection.

Step 3: 
Load access and secret keys into config.example.json and rename to config.json

Step 4: 
Refactor the ./database/dataGenerator.js function called formatUrlKey to match your amazon bucket url along with bucket names, regions names and folder names.

Step5:
Load Schema to mysql database and use node to run dataGenerator.js.

Step6:
start server: type in terminal  --------> npm start
start transpiler: type in terminal -----> npm run build:react;

Step7: open in browser.

# API

## Get popular dish

### Request Method and URL 

    GET /popularDishes/getItems/

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | -------------
200 | OK | JSON object | dishes

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
400 | BAD REQUEST | `{error: 'Cannot access'}`

### Sample Call

## Create new popular dish

### Request Method and URL 

    POST /popularDishes/getItems/

### URL Parameters 

Request body `data` has 5 properties 

Parameter | Type | Description
------------ | ------------- | -------------
data | object | properties: dish_id, dish_name, price, description, reviews
### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
dish_id | integer | required
dish_name | string | required: name of the popular dish that matches the one on the menu
[price] | [integer] |the current price of the popular dish
[description] |  [string]  | describes the dish 
[reviews] | [object] | gives the reviews that the dish has been mentioned in 

### Success Response

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
400 | BAD REQUEST | `{error: 'Cannot post'}`

### Sample Call



## Update popular dish

### Request Method and URL 

    PATCH /popularDishes/getItems/:id/update

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the dish

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
body | object | only name, price, description, and reviews can be modified

### Success Response

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | BAD REQUEST | `{error: 'Cannot update'}`

### Sample Call


## Delete popular dish

### Request Method and URL 

    DELETE /popularDishes/getItems/:id/delete

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the dish

### Success Response


### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
402 | BAD REQUEST | `{error: 'Cannot delete'}`

### Sample Call
