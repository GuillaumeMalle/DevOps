var fs = require('fs');

var ligne1_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne1.stations', 'utf8');
var ligne1 = ligne1_s.split("\n");

var ligne2_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne2.stations', 'utf8');
var ligne2 = ligne2_s.split("\n");

var ligne3_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne3.stations', 'utf8');
var ligne3 = ligne3_s.split("\n");

var ligne3b_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne3b.stations', 'utf8');
var ligne3b = ligne3b_s.split("\n");

var ligne4_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne4.stations', 'utf8');
var ligne4 = ligne4_s.split("\n");

var ligne5_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne5.stations', 'utf8');
var ligne5 = ligne5_s.split("\n");

var ligne6_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne6.stations', 'utf8');
var ligne6 = ligne6_s.split("\n");

var ligne7_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne7.stations', 'utf8');
var ligne7 = ligne7_s.split("\n");

var ligne7b_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne7b.stations', 'utf8');
var ligne7b = ligne7b_s.split("\n");

var ligne8_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne8.stations', 'utf8');
var ligne8 = ligne8_s.split("\n");

var ligne9_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne9.stations', 'utf8');
var ligne9 = ligne9_s.split("\n");

var ligne10_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne10.stations', 'utf8');
var ligne10 = ligne10_s.split("\n");

var ligne11_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne11.stations', 'utf8');
var ligne11 = ligne11_s.split("\n");

var ligne12_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne12.stations', 'utf8');
var ligne12 = ligne12_s.split("\n");

var ligne13_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne13.stations', 'utf8');
var ligne13 = ligne13_s.split("\n");

var ligne14_s = fs.readFileSync('fichiers_dm_pw6/metro_ligne14.stations', 'utf8');
var ligne14 = ligne14_s.split("\n");


var labels_s = fs.readFileSync('fichiers_dm_pw6/metro_graphe.labels', 'utf8');
var temp = labels_s.split("\n");
var labels = [];

for (var i = 0; i < temp.length; i++) {
  var pos = temp[i].indexOf(" ");
  labels[i] = [];
  labels[i][0] = temp[i].substring(pos+1);
}

for (var i = 0; i < ligne1.length-1; i++) {
  labels[ligne1[i]][1] = 1;
}
for (var i = 0; i < ligne2.length-1; i++) {
  labels[ligne2[i]][1] = 2;
}
for (var i = 0; i < ligne3.length-1; i++) {
  labels[ligne3[i]][1] = 3;
}
for (var i = 0; i < ligne3b.length-1; i++) {
  labels[ligne3b[i]][1] = 33;
}
for (var i = 0; i < ligne4.length-1; i++) {
  labels[ligne4[i]][1] = 4;
}
for (var i = 0; i < ligne5.length-1; i++) {
  labels[ligne5[i]][1] = 5;
}
for (var i = 0; i < ligne6.length-1; i++) {
  labels[ligne6[i]][1] = 6;
}
for (var i = 0; i < ligne7.length-1; i++) {
  labels[ligne7[i]][1] = 7;
}
for (var i = 0; i < ligne7b.length-1; i++) {
  labels[ligne7b[i]][1] = 77;
}
for (var i = 0; i < ligne8.length-1; i++) {
  labels[ligne8[i]][1] = 8;
}
for (var i = 0; i < ligne9.length-1; i++) {
  labels[ligne9[i]][1] = 9;
}
for (var i = 0; i < ligne10.length-1; i++) {
  labels[ligne10[i]][1] = 10;
}
for (var i = 0; i < ligne11.length-1; i++) {
  labels[ligne11[i]][1] = 11;
}
for (var i = 0; i < ligne12.length-1; i++) {
  labels[ligne12[i]][1] = 12;
}
for (var i = 0; i < ligne13.length-1; i++) {
  labels[ligne13[i]][1] = 13;
}
for (var i = 0; i < ligne14.length-1; i++) {
  labels[ligne14[i]][1] = 14;
}

exports.labels = labels;
