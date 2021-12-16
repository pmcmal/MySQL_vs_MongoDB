const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
mongoose.connect('mongodb://localhost:27017/mongo', dbConnectionOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed'));
db.once('open', _ => {
    //  console.log('Database connected:', db.name)
});

module.exports = mongoose;