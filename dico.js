var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var lignes = require('./lignes');

var wordList = require('word-list-json');

var serv = express();

//serv.listen(8070);
serv.use(bodyParser.json());
serv.set('view engine', 'ejs');
serv.use(express.static('css'));

var liste_s = fs.readFileSync('fichiers_dm_pw6/metro_graphe.labels', 'utf8');
var liste = liste_s.split("\n");
for (var i = 0; i < liste.length; i++) {
  liste[i] = liste[i].substring(liste[i].indexOf(" ")+1);
}

function insert(dico, word) {
  dico.push(word);
}

function newDico(array) {
  var dico = [];
  for (var i = 0; i < array.length; i++) {
    insert(dico, array[i]);
  }
  return dico;
}

var ledico = newDico(liste);
exports.ledico = ledico;

function search(dico, word) {
  for (var i = 0; i < dico.length; i++) {
    if (dico[i] == word){
      return true;
    }
  }
  return false;
}

function list(dico) {
  return dico;
}

function prefixSearch(dico, query, maxResults) {
  var count = 0;
  var results = [];
  if((query.length > 0)){
    for (var i = 0; i < dico.length; i++) {
      if (dico[i].indexOf(query) == 0) {
        insert(results, dico[i]);
        count++;
      }
      if(parseInt(count) > parseInt(maxResults)-1){
        break;
      }
    }
  }
  return results;
}


/*serv.post('/dictionnary', function(req, res) {
  insert(ledico, req.body.word);
});

serv.get('/dictionnary', function(req, res) {
  res.json(list(ledico));
});

serv.get('/dictionnary/search', function(req, res) {
  res.json(prefixSearch(ledico, req.query.query, 5));
});

serv.get('', function(req, res) {
  res.render('page.ejs');
});*/
