const mongoose = require('mongoose');
 
const url = '';

const p2Url = "mongodb+srv://iamst316:iamst316@cluster0.eioq0mv.mongodb.net/?retryWrites=true&w=majority";//this is my personal testing url for mongo atlas, feel free to change the url param to the "url" if not already.


const connection= async()=>{
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(p2Url)
    console.log("mongodb is connected successfully ");
  }
  catch (e) {
    console.log(e);
  }
}

module.exports = connection ;