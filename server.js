var express = require("express");
var chrono = require("chrono-node");
var dateformat = require("dateformat");

var app = express();
var port = process.argv[2] || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/:date", function (req, res) {
  var unixTimestamp = Number(req.params.date);
      
  var date = !isNaN(unixTimestamp) ? new Date(unixTimestamp * 1000) : chrono.parseDate(req.params.date);
  
  var result = {
    unix: date ? date.getTime() / 1000 : null,
    natural: date ? dateformat(date, "mmmm d, yyyy") : null
  };
  
  res.json(result);
});

app.listen(port);