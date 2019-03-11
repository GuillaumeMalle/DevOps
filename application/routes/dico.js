

module.exports = (app, jsonParser) => {
    app.get('/dictionnary/search', function(req, res) {
    res.json(prefixSearch(ledico, req.query.query, 5));
    });
}