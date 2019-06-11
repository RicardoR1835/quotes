require('../models/quote.js');
const mongoose = require('mongoose');
var Quote = mongoose.model("Quote");
module.exports = {
    index: function(req, res) {
    	res.render('index');
    },
    create: function(req, res) {
        console.log("POST DATA", req.body);
        var quote = new Quote({name: req.body.name, quote: req.body.quote});
        quote.save(function(err){
            if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully added")
            }
            res.redirect('/quotes');
        })
    },
    show: function(req, res) {
    	Quote.find({}).sort({createdAt: -1}).exec(function(err, quotes){
            Quote.find().sort({createdAt: -1});
            console.log(quotes);
            res.render('quotes', {data: quotes});
    })
}
}