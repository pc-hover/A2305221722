// const { fetchProductsFromCompany } = require("../Helper/getProducts")

// const aggregateProducts = async (category, top, minPrice, maxPrice) => {
//     const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
//     let allProducts = [];

//     for (const company of companies) {
//         const products = await fetchProductsFromCompany(company, category, top, minPrice, maxPrice);
//         products.forEach(product => product.company = company); // Add company info
//         allProducts = allProducts.concat(products);
//     }

//     return allProducts;
// };

// module.exports = { aggregateProducts };