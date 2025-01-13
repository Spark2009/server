let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/create',(req, res)=>{
    const { name, email, age } = req.body;
    console.log('Form submitted:', { name, email, age });

    // Create profiles directory if it doesn't exist
    const profilesDir = path.join(__dirname, 'profiles');
    if (!fs.existsSync(profilesDir)){
        fs.mkdirSync(profilesDir);
    }

    // Create unique filename using email
    const filename = path.join(profilesDir, `${email.replace('@','_at_')}.json`);

    // Save user data to file
    const userData = {
        name,
        email, 
        age,
        createdAt: new Date()
    };

    fs.writeFileSync(filename, JSON.stringify(userData, null, 2));

    // Redirect to profile page with email parameter
    res.redirect(`/user/${email}`);
});

// Route to check if user exists and get their info
app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    const profilesDir = path.join(__dirname, 'profiles');
    const filename = path.join(profilesDir, `${email.replace('@','_at_')}.json`);

    if (fs.existsSync(filename)) {
        const userData = JSON.parse(fs.readFileSync(filename));
        res.render('user', { user: userData });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Route to get update form
app.get('/user/:email/update', (req, res) => {
    const email = req.params.email;
    const profilesDir = path.join(__dirname, 'profiles');
    const filename = path.join(profilesDir, `${email.replace('@','_at_')}.json`);

    if (fs.existsSync(filename)) {
        const userData = JSON.parse(fs.readFileSync(filename));
        res.render('update', { user: userData });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Route to update user information
app.post('/user/:email/update', (req, res) => {
    const email = req.params.email;
    const { name, age } = req.body;
    
    const profilesDir = path.join(__dirname, 'profiles');
    const filename = path.join(profilesDir, `${email.replace('@','_at_')}.json`);

    if (!fs.existsSync(filename)) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Validate updates
    if (!name || name.trim().length === 0) {
        return res.redirect(`/user/${email}/update?error=Invalid name provided`);
    }

    if (!age || isNaN(age) || age < 1 || age > 120) {
        return res.redirect(`/user/${email}/update?error=Invalid age provided`);
    }

    const userData = JSON.parse(fs.readFileSync(filename));
    const updatedData = {
        ...userData,
        name: name,
        age: age,
        email: userData.email,
        updatedAt: new Date()
    };

    fs.writeFileSync(filename, JSON.stringify(updatedData, null, 2));
    res.redirect(`/user/${email}`);
});

app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 3000');
    }
});