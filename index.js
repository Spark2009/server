let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine',"ejs")

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { name, email, age } = req.body;

    // Validate inputs
    if (!name || name.trim().length === 0) {
        return res.status(400).send('Invalid name provided');
    }

    if (!email || !email.includes('@')) {
        return res.status(400).send('Invalid email provided');
    }

    if (!age || isNaN(age) || age < 1 || age > 120) {
        return res.status(400).send('Invalid age provided');
    }

    // Create profiles directory if it doesn't exist
    const profilesDir = path.join(__dirname, 'profiles');
    if (!fs.existsSync(profilesDir)){
        fs.mkdirSync(profilesDir);
    }

    // Create unique filename using email
    const filename = path.join(profilesDir, `${email.replace('@','_at_')}.json`);

    // Check if user already exists
    if (fs.existsSync(filename)) {
        return res.status(409).send('Email already registered');
    }

    // Save user data to file
    const userData = {
        name,
        email,
        age,
        createdAt: new Date()
    };

    fs.writeFileSync(filename, JSON.stringify(userData, null, 2));
    res.status(201).send('User registered successfully');
});

app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 3000');
    }
});