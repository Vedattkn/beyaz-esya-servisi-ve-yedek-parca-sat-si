const express = require("express");
const app = express();
const path = require("path");

// public klasörünü aktif eder
app.use(express.static(path.join(__dirname, "public")));

// ana sayfa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// server başlat
app.listen(3000, () => {
    console.log("Server çalışıyor: http://localhost:3000");
});
