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

## Get restaurant

### Request Method and URL 

    GET /restaurants/:rest_id

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
rest_id | integer | required: unique identifier for the restaurant

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | JSON object | properties: id, name

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | integer | required
name | string | required: restaurant name

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Restaurant does not exist'}`

### Sample Call

`axios.get('restaurants/1')`

## Create new restaurant

### Request Method and URL 

    POST /restaurants

### URL Parameters 

Request body `data` has 2 properties 

Parameter | Type | Description
------------ | ------------- | -------------
data | JSON object | required: id, name

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
201 | CREATED | object (the location header points to the URI of the new resource) | `'Successfully posted new restaurant'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | UNAUTHORIZED | `{error: 'You are unauthorized to make this request'}`
500 | INTERNAL SERVER ERROR | `{error: 'Something went wrong'}`

### Sample Call

 `axios.post('/restaurants)`


## Update restaurant

### Request Method and URL 

    PATCH /restaurants/:rest_id

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of restaurant that is being updated

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
body | object | only name can be modified

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | object | `'Successfully updated restaurant'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | UNAUTHORIZED | `{error: 'You are unauthorized to make this request'}`
404 | NOT FOUND | `{error: 'Restaurant does not exist'}`


### Sample Call

`axios.update('/restaurants/1')`

## Delete restaurant 

### Request Method and URL 

    DELETE /restaurants/:rest_id

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of restaurant being deleted

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
204 | NO CONTENT | {} | `'Successfully deleted restaurant'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | UNAUTHORIZED | `{error: 'You are unauthorized to make this request'}`
404 | NOT FOUND | `{error: 'Restaurant not found'}`

### Sample Call

`axios.delete('/restaurants/1')`

## Get popular menu items

### Request Method and URL 

    GET /restaurants/:rest_id/items

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | JSON object | items array will consist of dish object that has id, name, price, description, reviews, photos

### Data Parameters 

Each dish 
Parameter | Type | Description
------------ | ------------- | -------------
id | integer | required
name | string | required: menu item name
price | integer | current price of the item
description | string | describes the menu item
reviews | array | list of all reviews where the menu item is mentioned in 
photos | array | all the photos that depict the menu item

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Restaurant does not exist'}`

### Sample Call

`axios.get('restaurants/1/popularItems')`

## Create new popular item

### Request Method and URL 

    POST /restaurants/:rest_id/items

### URL Parameters 

Request body `data` has 5 properties 

Parameter | Type | Description
------------ | ------------- | -------------
data | JSON object | properties: id, name, price, description, reviews, photos

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | integer | required
name | string | required: name of the popular item that matches the one on the menu
[price] | [integer] |the current price of the popular item
[description] |  [string]  | describes the item
[reviews] | [array] | gives the reviews that the item has been mentioned in 
[photos] | [array] | lists the photos of the menu item

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | object | `'Successfully posted new popular item'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | UNAUTHORIZED | `{error: 'You are unauthorized to make this request'}`
404 | NOT FOUND | `{error: 'Restaurant does not exist'}`

### Sample Call

 `axios.post('/restaurants/1/popularItems)`


## Update popular item

### Request Method and URL 

    PATCH /restaurants/:rest_id/items/:item_id/

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the item being updated

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
body | object | only name, price, description can be modified

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | object | `'Successfully updated item'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Item does not exist'}`

### Sample Call

`axios.update(/restaurants/1/popularItems/1)`

## Delete popular dish

### Request Method and URL 

    DELETE /restaurants/:rest_id/popularitems/:item_id

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the item being deleted

### Success Response

Status Code | Description | Content
------------- | ------------- | -------------
200 | OK | `Item successfully deleted`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Item does not exist'}`

### Sample Call

`axios.delete('/restaurants/1/popularItems/1')`

## Get Photos for popular item

### Request Method and URL 

    GET /restaurants/:rest_id/popularitems/:item_id/photos

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | JSON object | items array will consist of photo object that has id, url, caption, created date, user

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | integer | required
url | string | required: url to the S3 bucket that hosts the image
caption | string | caption inputted by the user that posted the image
createdDate | date | the date the image was uploaded
user | object | user that uplaoded the photo

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Image does not exist'}`

### Sample Call

`axios.get('restaurants/1/popularItems/1/photos')`

## Upload new photo

### Request Method and URL 

    POST /restaurants/:rest_id/items

### URL Parameters 

Request body `data` has 5 properties 

Parameter | Type | Description
------------ | ------------- | -------------
data | JSON object | properties: id, name, price, description, reviews, photos

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | integer | required
name | string | required: name of the popular item that matches the one on the menu
[price] | [integer] |the current price of the popular item
[description] |  [string]  | describes the item
[reviews] | [array] | gives the reviews that the item has been mentioned in 
[photos] | [array] | lists the photos of the menu item

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | object | `'Successfully posted new popular item'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
401 | UNAUTHORIZED | `{error: 'You are unauthorized to make this request'}`
404 | NOT FOUND | `{error: 'Restaurant does not exist'}`

### Sample Call

 `axios.post('/restaurants/1/popularItems)`


## Update popular item

### Request Method and URL 

    PATCH /restaurants/:rest_id/items/:item_id/

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the item being updated

### Data Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
body | object | only name, price, description can be modified

### Success Response

Status Code | Description | Type | Content
------------- | ------------- | ------------- | -------------
200 | OK | object | `'Successfully updated item'`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Item does not exist'}`

### Sample Call

`axios.update(/restaurants/1/items/1)`

## Delete popular dish

### Request Method and URL 

    DELETE /restaurants/:rest_id/items/:item_id

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
id | number | id of the item being deleted

### Success Response

Status Code | Description | Content
------------- | ------------- | -------------
200 | OK | `Item successfully deleted`

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------
404 | NOT FOUND | `{error: 'Item does not exist'}`

### Sample Call

`axios.delete('/restaurants/1/items/1')`

## Get all the Photos for the popular dish

### Request Method and URL 

    GET /restaurants/:rest_id/items/:item_id/photos?embed=photos.url

### URL Parameters 

Parameter | Type | Description
------------ | ------------- | -------------
item_id | number | id of the item 
rest_id | number | id of the restaurant

### Success Response

Status Code | Description | Content
------------- | ------------- | -------------

### Error Response

Status Code | Description | Content
------------- | ------------- | -------------

### Sample Call

`axios.get('/photos/?fields=1, 1')`


# Rate Limiting

Header | Value 
---------- | ----------
X-RateLimit-Limit | max number of requests permitted to make per hour
X-RateLimit-Remaining | the number of requests remaining in the current rate limit window
X-RateLimit-Reset | remaining secongs before the rate limit resets 
