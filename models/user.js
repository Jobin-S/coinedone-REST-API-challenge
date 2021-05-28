const mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlength: 32,
    },
    schedule: {
        type:Array,
        default:[]
    },
    blocked:{
        type:Array,
        default:[]
    },
    limited:{
        type:Array,
        default:[]
    }
})



module.exports = mongoose.model("User", userSchema)