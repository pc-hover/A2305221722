const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const token = process.env.BEARER_TOKEN
console.log(token)


const fetchProductsFromCompany = async (company, category, top, minPrice, maxPrice) => {
    const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products from ${company}: ${error.message}`);
        return [];
    }
};

const aggregateProducts = async (category, top, minPrice, maxPrice) => {
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    let allProducts = [];

    for (const company of companies) {
        const products = await fetchProductsFromCompany(company, category, top, minPrice, maxPrice);
        products.forEach(product => product.company = company); // Add company info
        allProducts = allProducts.concat(products);
    }

    return allProducts;
};

app.get('/categories/:category/products', async (req, res) => {
    const { category } = req.params;
    // console.log(req.params)
    const { top = 10, minPrice = 0, maxPrice = Infinity, sortBy = 'price', order = 'asc', page = 1 } = req.query;

    if (top > 10) {
        const skip = (page - 1) * top;
        const limit = parseInt(top);
        const items = await aggregateProducts(category, top, minPrice, maxPrice);
        const sortedProducts = items.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });
        console.log(sortedProducts)
        const paginatedProducts = sortedProducts.slice(skip, skip + limit).map(item => ({
            ...item,
            id: uuidv4()
        }));

        res.json(paginatedProducts);
    } else {

        const products = await aggregateProducts(category, top, minPrice, maxPrice);
        const sortedProducts = products.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });

        const topProducts = sortedProducts.slice(0, top).map(product => ({
            ...product,
            id: uuidv4()
        }));

        res.json(topProducts);
    }
});


app.get('/categories/:category/products/:productId', async (req, res) => {
    const { category, productId } = req.params;
    const allProducts = await aggregateProducts(category, 1000, 0, Infinity); // Get a large number of products to find the specific one

    const item = allProducts.find(p => p.id === productId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
