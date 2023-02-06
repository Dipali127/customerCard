const express=require('express');
const app=express();
app.use(express.json())

const route=require('./route/routes')

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://DipaliBohara:80761668@cluster0.4wyyohq.mongodb.net/dipaliCustomer-card"
, {
   useNewUrlParser: true 
}
).then( () => {console.log("MongoDb is connected")})
.catch( err => console.log(err))

app.use('/',route);


app.listen(process.env.PORT||3000,()=>{
    console.log("Express app listening on Port"+(process.env.PORT||3000));
})