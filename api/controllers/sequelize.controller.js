const Sequelize = require('../models');
const testConnection = (req, res) => {
    const connection = Sequelize.getInstance();
    console.log("Models", connection.models);
    connection.authenticate().then((response)=> {
        res.status(200).json({response, message:'OK'});
    }).catch((error)=>{
        res.status(500).json(error);
    });
}

module.exports = {
    testConnection,
}