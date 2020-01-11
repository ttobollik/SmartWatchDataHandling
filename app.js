const express = require('express');
const product = require('./routes/product.route'); //Imports route for products
const seizures = require('./routes/seizures.route'); //Imports route for products
const healthData = require('./routes/healthData.route'); //Imports route for products

//initializing express app
const app = express();

//json() as middleware. Has to be added before use
app.use(express.json());
app.use('/products', product);
app.use('/seizures', seizures);
app.use('/healthData', healthData);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
