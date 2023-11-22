const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")
require("./db/conn");
const Register = require("./models/registers");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../Templates/views");
const partials_path = path.join(__dirname, "../Templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));
app.set("view engine", "hbs"); // Corrected property name
app.set("views" , template_path)
hbs.registerPartials(partials_path)


app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register")
})

//-------------Create a new user in our Data Base------------------

app.post("/register", async(req,res)=>{

    try {

        const password = req.body.password;
        const name = req.body.name;
        const employeeRegistration = new Register({
            name : req.body.name,
            password: req.body.password,
            email: req.body.email,
            address : req.body.address
        })
       const registered = await employeeRegistration.save();
       res.status(201).render("index");



    } catch (error) {
        res.status(400).send(error)
        
    }
    
})
app.get("/login",(req,res)=>{
    res.render("login")
})
//-------------Login Check -----------------
app.post("/login",async(req,res)=>{
    try {

        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;
        // console.log(`${name} and password is ${password} and email is ${email}`);
        const userEmail = await Register.findOne({email:email});
        if(userEmail.password=== password){
            res.status(201).render("index")
        }
        else{
            res.send("Invalid Login Details");
        }
    } catch (error) {
        res.status(400).send("invalid Login-Details")
        
    }
})
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
