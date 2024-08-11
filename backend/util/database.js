const Sequelize = require('sequelize');

const sequelize = new Sequelize('project','root','root',{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;