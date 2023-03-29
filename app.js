const express = require('express') ;
const connection = require('./connection/connection'); 
const {products} = require("./connection/products");
const {productSchema} = require("./connection/productmodel");
const {orderSchema} = require("./connection/orderSchema");
const {stores} = require("./connection/stores");
const {storeSchema} = require("./connection/storeSchema");
const userSchema = require("./connection/userSchema");
connection () ;
const mongoose = require("mongoose");
const app = express() ;
const Port = 5000 || process.env.PORT
app.use(express.json());
const cors = require('cors');
app.use(cors());
//---------------defining the productsModel that has the data of types of products that a user can give for washing------------------------

let productModel = mongoose.model("products",productSchema);
let orderModel = mongoose.model("orders",orderSchema);
let storeModel = mongoose.model("stores",storeSchema);
let userModel = mongoose.model("users",userSchema);

const add = async () => {
	await productModel.deleteMany({});
	await productModel.insertMany(products);
    await storeModel.deleteMany({});
	await storeModel.insertMany(stores);
	console.log("added");
};

add();

//------------defining the end-points for use-----------------------------------------
app.get('/',(req,res)=>{
    res.send("Working good")
})
//-----------for getting all the types of products------------------------------------

app.get("/products",async (req,res)=>{
    const list = await productModel.find();
    res.send(list);
});

//------------------------------------------------------------------------------------

app.get("/users", async (req,res)=>{
    const users = await userModel.find();
    res.status(200).send(users);
})

//---------------this endpoint will create a new order of the selected items out of the productsModel and add it to the orderModel------------
app.post("/order",async (req,res)=>{
    const order = await orderModel.create(req.body);
    res.send(order);
});

//------------------this fetches the orders that have been placed/created-----------
app.get("/order",async (req,res)=>{
    const list = await orderModel.find();
    res.send(list);
});
//----------------------------------------------

app.get("/store",async (req,res)=>{
    const list = await storeModel.find();
    res.send(list);
});


//---------------------------------------------------------------
app.listen(Port,()=> console.log(`app is running at port ${Port}`)) ;