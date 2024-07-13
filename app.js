const express = require("express");
const app = express();
const port = 3000;
// connect with database
const mongoose = require("mongoose");
// template engine
app.set('view engine', 'ejs');
// عشان استخدم اكواد css , JS => static files
app.use(express.static('public'));
// post method => send data to database
app.use(express.urlencoded({extended: true}))
// عشان اظبط الوقت
var moment = require("moment");
// update data
var methodOverride = require("method-override");
app.use(methodOverride('_method'));



// Get Requests 
app.get("/", (req, res) => {
    // Get data from database
    customer.find()
    .then((result)=>{
      // عشان اعرض تصميم => render
      // لازم يكون عندنا template engine => ejs
      res.render("index", {arr: result, moment: moment})
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/user/add.html", (req, res) => {
    res.render("user/add");
})

app.get("/edit/:id", (req, res) => {
    customer.findById(req.params.id).then((result) => {
      res.render("user/edit", {obj: result});
    }).catch((err) => {
      console.log(err);
    })
})

app.get("/user/search.html", (req, res) => {
    res.render("user/search");
})

app.get("/user/:id", (req, res) => {  
  customer.findById(req.params.id)
  .then((result) => {
    res.render("user/view", {obj: result, moment: moment});
    })
    .catch((err) => {
      console.log(err);
    })
})

// export customer
const customer = require("./models/customerSchema")
// Post Request
app.post("/user/add.html", (req, res) => {
  customer.create(req.body).then(() => {
    // يروح للصفحة بتاعتي الاساسية
    res.redirect("/")
  }).catch((err) => {
    console.log(err);
  })
})

app.post("/search", (req, res) => {
    customer.find({firstName: req.body.searchText}).then((result) => {
      res.render("user/search", {obj: result});
    }).catch((err) => {
      console.log(err);
    })
})




// Put Request 
app.put("/edit/:id", (req, res) => {
    customer.updateOne({_id: req.params.id}, req.body).then((result) => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
    })
})


// Delete Request
app.delete("/delete/:id", (req, res) => {
    customer.deleteOne({_id: req.params.id}).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
    })
})


// connect with database 
mongoose.connect("mongodb+srv://elshamy-elDEv:system_management@cluster0.0d5gjjs.mongodb.net/").then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(err);
})

// auto refresh 

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});