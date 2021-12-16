const TempDoc = require("../models/temp");
const mongoose = require('mongoose');

module.exports = class MongoRepository {

    constructor() {
    }

    async insert() {
        return TempDoc.create({ "temp": `Temp ${Date.now()}` });        
    }

    async deleteById(id) {
        return TempDoc.deleteOne({"_id": mongoose.Types.ObjectId(id)});
    }

    async getTemps() {
        return TempDoc.find();
    }


}