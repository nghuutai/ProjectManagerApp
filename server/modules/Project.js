const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
// const Member = require('./Member');

var Member = new Schema({
    _id: String,
    name: String,
    phone: String,
    birthday: Date
})

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    members: [Member]
})

module.exports = mongoose.model('Project', ProjectSchema);