import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from "morgan";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//connect to mongoDB
const dbURI = "mongodb://127.0.0.1:27017/aBlogDB?retryWrites=true&connectTimeoutMS=10000";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    console.log("connected to db");

    app.listen(3000);

}).catch((err) => {
    console.log(err);    
}); 

//register view engine
app.set("view engine", "ejs");
// app.set("views", "my-views");

//middleware & static files
//Will run on every request because it's at the top -->
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.redirect("/blogs");
  //res.send("<p>home</p>");
  //res.sendFile("./views/index.html", { root: __dirname });
//   const blogs = [
//     {title:"Lomo literally next level vegan mustache", snippet:"Pork belly drinking vinegar sustainable cornhole shaman, vinyl quinoa scenester bushwick forage."},
//     {title:"Next level vinyl leggings", snippet:"Bitters meh ugh, tilde wolf tumeric sartorial before they sold out blackbird spyplane master"},
//     {title:"Actually mustache messenger bag ethical lumbersexual", snippet:"Pok pok helvetica butcher, polaroid brunch green juice 8-bit hammock ennui DIY JOMO chambray bicycle rights fixie organic. Skateboard shabby chic vape pickled chambray pour-over."},
//   ]
//   res.render("index", { 
//     title: "Home",
//     blogs
//    });
});

app.get("/about", (req, res) => {
  //res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// app.get("/about-us", (req, res) => {
//     //res.send("<p>about</p>");
//   res.redirect("/about.html");    
// });

// app.get("/add-blog", (req, res) => {
//     const blog2 = new Blog({
//         title: "New Blog",
//         snippet: "About my new blog",
//         body: "more text about my new blog"
//     });
//     blog2.save()
//     .then((result) => {
//         res.send(result);
//     }).catch((err) => { 
//         console.log(err);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//     Blog.findById("6510acd3fcb2434baa0d5435")
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         console.log(err);
//     });
// })

app.use("/blogs", blogRoutes);

//if no url matches the req url
app.use((req, res) => {
  //res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", {title: "404"} );
});

