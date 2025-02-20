const express = require("express");
const tasksRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config()
const notFound = require('./middleware/not-found')

const app = express();

//middleware
app.use(express.static('./public'));
app.use(express.json()); // - makes data available in the req.body

//ROUTES

//tasks
app.use("/api/v1/tasks", tasksRoutes);

//404 - response
app.use(notFound)



const start = async () => {
  try {
    const connect = await connectDB(process.env.MONGODB_URI);

    console.log("DB is CONNECTED");
    
    
    //then run the server
    app.listen(5000, () => {
      console.log("Server is Listing at 5000");
    });
  } catch (error) {
    console.log("CONNECTION FAILED: ", error);
  }
};

start();
