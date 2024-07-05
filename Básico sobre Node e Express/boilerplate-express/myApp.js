require('dotenv').config()
var bodyParser = require('body-parser');
let express = require('express');
let app = express();



console.log("Hello World");


// Define a rota para GET requests no caminho root
app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath);
});
app.use('/public', express.static(__dirname + "/public"));
app.use('/', function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ message: 'HELLO JSON' });
  } else {
    res.json({ message: 'Hello json' });
  }
});
app.get('/now', function (req, res, next) {
  req.time = new Date().toString();
  next();
}, function (req, res) {
  res.json({ time: req.time });
});
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.use("/name", bodyParser.urlencoded({ extended: false }), function (req, res, next) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  res.json({
    name: `${firstName} ${lastName}`
  });
  next();
});
































module.exports = app;
