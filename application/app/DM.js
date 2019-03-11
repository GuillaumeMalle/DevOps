var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var lignes = require('./lignes');
var dicos = require('./dico');

var serv = express();
serv.listen(8080);
serv.set('view engine', 'ejs');
serv.use(bodyParser.urlencoded({extended: false}));
serv.use(express.static('css'));

var donnees = fs.readFileSync('fichiers_dm_pw6/metro_graphe.edges', 'utf8');
var tab = donnees.split("\n");

var labels = lignes.labels;
var ledico = dicos.ledico;

var pred = [];

function InitGraph() {
var graph = [];
for (var i = 0; i < 383; i++) {
  graph[i] = [];
}
for (var i = 0; i < tab.length-1; i++) {
  var temp = tab[i].split(" ");
  graph[temp[0]][temp[1]] = temp[2];
}
return graph;
}

var graph = InitGraph();

function InitDist(depart) {
var dist = [];
for (var i = 0; i < tab.length; i++) {
  dist[i] = 20000;
}
dist[depart] = 0;
return dist;
}

function findMini(noeud, dist) {
var min = 20000;
var sommet = -1;
for (var i = 0; i < noeud.length; i++) {
  if (dist[noeud[i]] != 20000) {
  }
  if (dist[noeud[i]] < min) {
    min = dist[noeud[i]];
    sommet = noeud[i];
  }
}
return sommet;
}

function Poids(s1, s2){
if (graph[s1][s2] == undefined){
  return 20000;
} else {
  return graph[s1][s2];
}
}

function majDist(s1, s2, dist) {
if (dist[s2] > dist[s1] + Poids(s1,s2)) {
  dist[s2] = parseInt(dist[s1]) + parseInt(Poids(s1,s2));
  pred[s2] = s1;
}
}

function getIdsbyName(name){
var ids = [];
for (var i = 0; i < labels.length; i++) {
  if(labels[i][0]== name) {
    ids.push(i);
  }
}
return ids;
}

function Dijkstra(depart){
var noeud = [];
for (var i = 0; i < 383; i++) {
  noeud[i] = i;
}
var dist = InitDist(depart);
while (noeud.length > 0) {
  var s1 = findMini(noeud, dist);
  noeud.splice(noeud.indexOf(s1), 1);
  for (var i = 0; i < graph.length; i++) {
    if(graph[s1][i] != undefined){
      majDist(s1, i, dist);
    }
  }
}
}

function getPath(debut, arrivee){
var chemin = [];
chemin.push(labels[arrivee]);
while(arrivee != debut){
  arrivee = pred[arrivee];
  chemin.push(labels[arrivee]);
}
return chemin;
}

function getTravelTime(chemin){
var temps = 0;
for (var i = 0; i < chemin.length; i++) {
  if (i == 0){
    temps += 20;
  }else if (chemin[i][1] != chemin[i-1][1]) {
    temps += 110;
  }else{
    temps += 92;
  }
}
return temps;
}

function insert(dico, word) {
dico.push(word);
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

// serv.get('',function(req,res){
// var chemin = [];
// var d = new Date();
// res.render('pageaccueil.ejs', {v_nom : 'Service de chemin de Metro', heure : d.getHours(), minutes : d.getMinutes()});
// });

// serv.get('/dictionnary/search', function(req, res) {
// res.json(prefixSearch(ledico, req.query.query, 5));
// });

// serv.post('',function(req, res){
// var debut = getIdsbyName(req.body.depart);
// var arrivee = getIdsbyName(req.body.arrivee);
// var d = new Date();
// if(debut.length == 0 || arrivee.length == 0){
//   res.render('pageerror.ejs', {v_nom : 'Service de chemin de Metro', heure : d.getHours(), minutes : d.getMinutes()});
// } else {
//   var cheminMin = [];
//   var tailleCheminMin = 20000;
//   for (var i = 0; i < debut.length; i++) {
//     for (var j = 0; j < arrivee.length; j++) {
//       Dijkstra(debut[i]);
//       var chemin = getPath(debut[i], arrivee[j]);
//       if(chemin.length < tailleCheminMin){
//         cheminMin = chemin;
//         tailleCheminMin = chemin.length;
//       }
//     }
//   }
//   var temps = getTravelTime(cheminMin);
//   var hdep = req.body.hours;
//   var mdep = req.body.minutes;
//   var sec  = temps%60;
//   temps = parseInt(temps/60);
//   if(sec > 30){
//     temps +=1;
//   }
//   var harr = parseInt(hdep);
//   var marr = parseInt(mdep) + temps;
//   if(marr >= 60){
//     harr += 1;
//     marr -= 60;
//   }
//   cheminMin.reverse();
//   res.render('mapage.ejs', {v_nom : 'Service de chemin de Metro',
//               station : cheminMin, time : temps, heure_arrivee : harr, min_arrivee : marr,
//               heure : d.getHours(), minutes : d.getMinutes()});
// }
// });
