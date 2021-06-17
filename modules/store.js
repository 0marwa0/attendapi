const mongoose =require("mongoose")
const Schema =mongoose.Schema;
const Store=new Schema({
date:{type:Date},
group:{type:String},
stage:{type:String},
courseName:{type:String}
,attendData:{type:Array}
,admin:{type:String}
})

module.exports = mongoose.model("Store",Store);