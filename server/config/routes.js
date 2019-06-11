const mongoose = require('mongoose'),
      Quote = mongoose.model('Quote')
module.exports = function(app){
    app.get('/', function (req, res) {
       Quote.find({}, function (err, data){
        res.render("index")
       })
    })
    app.post('/quotes', function(req, res){
        console.log("POST DATA", req.body);
        var quote = new Quote({name: req.body.name, quote: req.body.quote})
        quote.save(function(err){
            if(err){
                console.log("something went wrong", err);
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
} 


