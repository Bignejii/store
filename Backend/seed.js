const { faker } = require('@faker-js/faker');
const { Review, Product, User } = require('./Models/index'); // Adjust the path if necessary

const seedReviews = async () => {
  try {
    // Fetch all products and users from the database
    const products = await Product.findAll();
    const users = await User.findAll();

    if (products.length === 0 || users.length === 0) {
      console.log('No products or users found. Please seed them first.');
      return;
    }

    // Generate reviews
    for (let i = 0; i < 50; i++) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      await Review.create({
        userId: randomUser.id,
        productId: randomProduct.id,
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
      });
    }

    console.log('Seeded 50 reviews successfully!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
};

seedReviews();