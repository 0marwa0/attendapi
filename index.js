const experss = require("express");
const app = experss();
const mongoose = require("mongoose");
const cors = require("cors");
const Store = require("./modules/store");
const methodOverride = require("method-override");
var bodyParser = require("body-parser");
//Middleware
const methodOverride = require("method-override");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride(`_method`));
app.listen(process.env.PORT || 7000, () => {
  console.log("working on 7000 port");
});
const connectDB = async()=>{
try {
  await mongoose.connect("mongodb+srv://marwa:marwa@cluster0.9vo0e.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
} catch (error) {
  console.log("error when connect to the datebase ",error)
}}
connectDB()
app.post("/addattend", (req, res) => {
    

  try {const record = new Store({
      date:new Date(),
      courseName:req.body.courseName,
      group:req.body.group,
      stage:req.body.stage,
     attendData: req.body.attendData,
     admin:req.body.admin
    });
    Store.create(record)
      .then((result) => {
        res.status(201).json({
          message: "done with adding",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });


}catch {
  console.lgo("somthing worng happend")

  }

  });

app.use("/public", experss.static("public"));
   
   
//"start": "NODE_ENV=development ./node_modules/.bin/netlify-lambda serve src",

// GET REQUEST
app.get("/getSesstion", (req, res) => {console.log(req.params.id)
  try {Store.findById(req.params.id)
.then((data) => {
res.send(data);
  }) .catch((err) => {
    res.status(500).json({
      error: err,
    });
  });

    
  } catch {
    console.lgo("somthing worng happend")
  
    }
});

app.put("/updateSesstion/:id", (req, res) => {
  try {
    
 Store.findByIdAndUpdate(req.params.id, {
    $set: { attendData: req.body.email },
  }).then(() => {
    Store.findOne({ _id: req.params.id }).then((data) => {
      res.send(data);
    });
  }).catch((err) => {
    res.status(500).json({
      error: err,
    });
  })

} catch {
  console.lgo("somthing worng happend")

  }

});
