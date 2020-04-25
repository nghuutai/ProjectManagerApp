const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('Member', MemberSchema);