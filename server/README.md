The populardishes endpoint will allow users to get the images and reviews associated with the top dishes for specific restaurant. 

## GET

GET /restaurants/:id

| Status       | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Response

| Parameter       |           | Cool  |
| ------------- |:-------------:| -----:|
| id=[integer]     | right-aligned | $1600 |

success: code 200, content {restaurant: {}}
error: code 400, content {error: '}

sample call:
axios.get(/restaurant/:id) 
    .then(response => {
        
    }