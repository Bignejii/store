const { faker } = require('@faker-js/faker');
const { Product } = require('./Models/index'); // Adjust the path if necessary

const seedProducts = async () => {
    const categories = [
        { name: "xim", thumbnail: "https://imgs.search.brave.com/Q1GULeyeUnPPCyOkNDTPo3gG2_tjdedHDjJApzGM8Q0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzUxYSsybzN6Rk1M/LmpwZw" },
        { name: "zen", thumbnail: "https://m.media-amazon.com/images/I/61XXyElQiEL.__AC_SX300_SY300_QL70_FMwebp_.jpg" },
        { name: "reasnow", thumbnail: "https://imgs.search.brave.com/x9qWXgDHs0oOwid-BEdT8hHMFhs_Bg8NZ9xNvySlvzs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF82/NDMzMDEtTUxCNjk0/NzA5NDU0NDlfMDUy/MDIzLU8tcmVhc25v/dy1jcm9zcy1oYWly/LXMxLXBzNC1wczMt/eGJveC1vbmUtc2Vy/aWVzLXN3aXRjaC53/ZWJw" },
        { name: "dma", thumbnail: "https://imgs.search.brave.com/F7GzOjPhFIt1rdBl1zsAQnGii3OF6JA7lF0Nb5YG-2o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTFTMStWakpHUUwu/anBn" },
        { name: "optimizer", thumbnail: "https://imgs.search.brave.com/y9V4g8MfoR3qClDM8268_pbRrrv9jeNIiAeAiDtKwC8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/emxlYWd1ZS5nZy90/aGVwb3J0YWwvd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMDQv/a3huZy1ob3ctdG8t/Z2V0LTQwMC1mcHMt/b24tYnVkZ2V0LXBj/LWxhcHRvcC0xMTQw/eDU3MC5qcGc" }
    ];

    for (const category of categories) {
        for (let i = 0; i < 5; i++) {
            await Product.create({
                title: faker.commerce.productName(),
                category: category.name,
                description: faker.lorem.paragraph(),
                price: parseFloat(faker.commerce.price()),
                downloadUrl: faker.internet.url(),
                thumbnail: category.thumbnail,
                amount: faker.number.int({ min: 1, max: 7})
            });
        }
    }

    console.log('Seeded 50 products successfully!');
};

seedProducts().catch(err => console.error(err));