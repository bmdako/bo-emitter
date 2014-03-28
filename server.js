var express = require('express.io')
  , app = express();

app.http().io();
app.use(express.bodyParser());

app.use('/', express.static('./client'));

app.io.route('main', function(req) {
  req.io.broadcast('breaking', req.body);
  req.io.respond({status:'OK'});
});


app.post('/', function(req, res) {
  req.io.route('main');
});

app.listen(8000);

