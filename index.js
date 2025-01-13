let express =require('express');
let app = express();
let path=require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")

app.get('/',(req,res)=>{
    res.send('ok ')
})

app.get ('/:id',(req, res)=>{
    res.render('index',{id:req.params.id});
});



app.listen(3000,(err)=>{
    console.log(err);
})