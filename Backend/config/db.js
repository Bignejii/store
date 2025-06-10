require('dotenv').config();
const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host : process.env.DB_HOST ,
    dialect : "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// sequelize.sync({ alter: true })
//   .then(() => console.log('All models were synchronized successfully.'))
//   .catch((err) => console.error('Error synchronizing models:', err));

module.exports = sequelize;