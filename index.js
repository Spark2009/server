let express =require('express');
let app = express();
let path=require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")
<<<<<<< HEAD
app.get ('/:id',(req, res)=>{
    res.render('index');
});


=======
app.get ('/',(req, res)=>{
    res.send('pratham vig server')
});

>>>>>>> d11e5d9dad87fea74651d73faebb2c0161fd3070
app.listen(3000,(err)=>{
    console.log(err);
})