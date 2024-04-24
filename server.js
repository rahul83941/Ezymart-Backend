const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get('/check', (req, res) => {
    res.send('API is up and running!');
});


app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading products data');
            return;
        }
        const products = JSON.parse(data);
        res.json(products);
    });
});


app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading products data');
            return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
