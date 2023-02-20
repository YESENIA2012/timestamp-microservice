var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date?", (req, res) => {
  const dateEntered = req.params.date;
  req.time = new Date(dateEntered).toUTCString();

  if (req.time == "Invalid Date" && dateEntered !== undefined) {
    return res.json({ error: "Invalid Date" });
  }

  if (dateEntered === undefined) {
    req.millisecondsCurrent = new Date().getTime();
    req.timeCurrent = new Date().toUTCString();
    return res.json({ unix: req.millisecondsCurrent, utc: req.timeCurrent });
  }

  if (dateEntered !== undefined && dateEntered) {
    req.milliseconds = new Date(dateEntered).getTime();
    return res.json({ unix: req.milliseconds, utc: req.time });
  }
});

app.listen(3000);
console.log("app app is listening on port 3000");
