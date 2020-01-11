const express = require('express');
const product = require('./routes/product.route'); //Imports route for products
const seizure = require('./routes/seizure.route'); //Imports route for products

//initializing express app
const app = express();

//json() as middleware. Has to be added before use
app.use(express.json());
app.use('/products', product);
app.use('/seizure', seizure);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
