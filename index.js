let express =require('express');
let app = express();
let path=require('path')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")

app.get('/',(req,res)=>{
    res.render('index');

})

app.post('/create',(req, res)=>{
    const name = req.body.name;
    console.log('Name submitted:', name);
    res.render('create', { name: name });
});



app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 3000');
    }
});