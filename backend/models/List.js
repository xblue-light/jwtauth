const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: String,
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