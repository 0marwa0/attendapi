const experss = require("express");
const app = experss();
const mongoose = require("mongoose");
const cors = require("cors");
const Store = require("./modules/store");

const methodOverride = require("method-override");
var bodyParser = require("body-parser");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride(`_method`));
app.listen(process.env.PORT || 7000, () => {
  console.log("working on 7000 port");
});
let gfs;

mongoose.connect("mongodb://localhost/DataStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.post("/addattend", (req, res) => {
    const record = new Store({
      date:new Date(),
      courseName:req.body.courseName,
      group:req.body.group,
      stage:req.body.stage,
     attendData: [req.body.email],
     admin:req.body.admin
    });

  try {
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

// GET REQUEST
app.get("/getSesstion/:id", (req, res) => {console.log(req.params.id)
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
