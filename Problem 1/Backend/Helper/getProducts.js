// const axios = require ("axios")

// const token = process.env.BEARER_TOKEN;
// console.log(token);
// const fetchProductsFromCompany = async (company, category, top, minPrice, maxPrice) => {
//     const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching products from ${company}: ${error.message}`);
//         return [];
//     }
// };
// module.exports = { fetchProductsFromCompany };