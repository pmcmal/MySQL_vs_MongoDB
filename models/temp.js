const mongoose = require('../index_mongodb');
const TempSchema = new mongoose.Schema({
    temp: String,
});

const Temp = mongoose.model('temp', TempSchema);
module.exports = Temp;
