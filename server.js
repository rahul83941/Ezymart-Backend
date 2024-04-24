const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 10000;
const dotenv=require('dotenv');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const DB="mongodb+srv://Ezymart:Ezymart%40123@cluster0.cle8yxm.mongodb.net/";
mongoose.connect(DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));




const productSchema = new mongoose.Schema({
  id: String, 
  image: String,
  images: [String],
  name: String,
  price: Number,
  sizes: [Number],
  description: String,
});


const Products = mongoose.model('Product', productSchema,"Products");


app.get('/products', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:id', async (req, res) => {
    try {
      const product = await Products.findOne({ id: req.params.id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});  
