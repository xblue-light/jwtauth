const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        maxlength: 40
    },
    country: {
        type: String,
        required: true,
        maxlength: 15
    },
    city: {
        type: String,
        required: true,
        maxlength: 20
    },
    state: {
        type: String,
        required: true,
        maxlength: 10
    },
    phone: {
        type: String,
        required: true,
        maxlength: 20
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    }
},
{timestamps: true}
);

listSchema.index({ user: 1, name: 1 }, { unique: true })
const List = mongoose.model('list', listSchema);
module.exports = List;