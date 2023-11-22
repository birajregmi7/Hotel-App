const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },

})
userSchema.plugin(passportLocalMongoose) //esle automatically username ra password schema build gardinca
module.exports = mongoose.model('User',userSchema);