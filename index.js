let express =require('express');
let app = express();
let path=require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")
app.get ('/:id',(req, res)=>{
    res.render('index');
});




app.listen(3000,(err)=>{
    console.log(err);
})