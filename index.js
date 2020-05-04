const express = require ('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app= express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH ;

let client = new MongoClient(uri, { useNewUrlParser: true });


app.get('/',(req,res)=>{
    res.send('thank you');
})
//app.listen(4000,()=>console.log("listening to port 4000"))

//* * for hot onion project

app.post('/addFood',(req,res)=>{
    const food= req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("foods");
        collection.insert(food,(err, result)=>{
        console.log('Successfully Inserted', result);
        if(err){
            console.log(err);
        }
        else{
            res.send(result.ops[0]);
        }
    });
        client.close();
      });     
});


app.get('/foods', (req,res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("foods");
        collection.find().toArray((err, documents)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(documents);
        }
    });
        client.close();
      });   
});


app.get('/food/:key',(req,res)=>{
    const key=req.params.key;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("foods");
        collection.find({key}).toArray((err, documents)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(documents[0]);
        }
    });
        client.close();
      });
})

 //end




const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log("listening to port 4000"));