import express from 'express';
import ProductManager from "./producManager.js";

const PORT = 8080
const app = express();

/*const ProductManager = require("./ProducManager");*/
const data = new ProductManager("products");

const serverOn = app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));

serverOn.on('error', error => console.log(`Error: ${error}`))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=> res.send('Server Online'))

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await data.getProducts();
    const slicedProducts = limit ? products.slice(0, limit) : products;
    res.status(200).send(slicedProducts);
  } catch (err) {
    console.log(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const filteredId = parseInt(req.params.pid);
    const dataFiltered = await data.getProductById(filteredId);

    res.status(200).send(dataFiltered);
  } catch (err) {
    console.log(err);
  }
});
