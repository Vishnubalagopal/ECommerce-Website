//connection between server and mongo db

//1.import mongoose

const mongoose = require('mongoose')

//2.define connection string and connect db with node

mongoose.connect('mongodb://localhost:27017/shoe',()=>{
    console.log('Mongodb connected succcessfully');
})

//3. create model

const Member = mongoose.model('Member',{
    email:String,
    pswd:String,
    username:String

})

//model for products

const Footware = mongoose.model('Footware',{
    id: Number,
    image: String,
    title: String,
    type: String,
    price: Number,
    description: String,
    ColourShown: String,
    Style: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String

})

const Wishlist = mongoose.model('Wishlist',{
    id:Number,
    title:String,
    price:Number,
    description:String,
    image:String,
    type: String,

      }
)

//4. export model

module.exports ={
    Member,
    Footware,
    Wishlist
}