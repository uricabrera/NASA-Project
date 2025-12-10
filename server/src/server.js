const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const {loadPlanetData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb://127.0.0.1:27017/nasa-project"

const server = http.createServer(app);

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
})

mongoose.connection.on("error",(err) => {
    console.error(err);
})

async function startServer(){
    await mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    await loadPlanetData();
    server.listen(PORT,() => {
        console.log(`Listening on ${PORT}`);
    });
}

startServer();






