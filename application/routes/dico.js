var dico = require('../app/dico');
var ledico = dico.ledico;

module.exports = (app, jsonParser) => {
    app.get('/dictionnary/search', function(req, res) {
        // console.log(req.query.query);
        // console.log(ledico);
        res.json(dico.prefixSearch(ledico, req.query.query, 5));
    });
}