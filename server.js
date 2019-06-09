var express = require("express");
var session = require('express-session');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'get it right get it tight',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
const flash = require('express-flash');
app.use(flash());
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dojo_quotes');
var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    quote: {type: String, required: true, minlength: 10}
}, {timestamps: true });
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');
mongoose.Promise = global.Promise;


app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index")
})

app.post('/quotes', function(req, res){
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote})
    quote.save(function(err){
        if(err){
            console.log("something went wrong", err);
            // for(var key in err.errors){
                // req.flash('input', err.errors[key].message)
            // }
            // res.redirect('/')
        } else {
            console.log("successfully added")
        }
        res.redirect('/quotes')
    })
})

app.get('/quotes', function(req, res){
    Quote.find({}).sort({createdAt: -1}).exec(function(err, quotes){
        Quote.find().sort({createdAt: -1});
        console.log(quotes);
        res.render('quotes', {data: quotes})
    })
})




app.listen(8000, function() {
    console.log("listening on port 8000");
})