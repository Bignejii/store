const { Cart, User } = require('./Models/index');

async function cleanupOrphanedCarts() {
  const users = await User.findAll({ attributes: ['id'] });
  const userIds = users.map(u => u.id);
  const result = await Cart.destroy({
    where: {
      userId: { [require('sequelize').Op.notIn]: userIds }
    }
  });
  console.log(`Deleted ${result} orphaned cart rows.`);
  process.exit();
}

cleanupOrphanedCarts();