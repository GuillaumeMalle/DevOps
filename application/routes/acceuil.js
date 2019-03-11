var dm = require('../app/DM');

module.exports = (app, jsonParser) => {
    app.get('',function(req,res){
        var chemin = [];
        var d = new Date();
        res.render('pageaccueil.ejs', {v_nom : 'Service de chemin de Metro', heure : d.getHours(), minutes : d.getMinutes()});
        });

    app.post('',function(req, res){
        var debut = dm.getIdsbyName(req.body.depart);
        var arrivee = dm.getIdsbyName(req.body.arrivee);
        var d = new Date();
        if(debut.length == 0 || arrivee.length == 0){
            res.render('pageerror.ejs', {v_nom : 'Service de chemin de Metro', heure : d.getHours(), minutes : d.getMinutes()});
        } else {
            var cheminMin = [];
            var tailleCheminMin = 20000;
            for (var i = 0; i < debut.length; i++) {
            for (var j = 0; j < arrivee.length; j++) {
                dm.Dijkstra(debut[i]);
                var chemin = getPath(debut[i], arrivee[j]);
                if(chemin.length < tailleCheminMin){
                cheminMin = chemin;
                tailleCheminMin = chemin.length;
                }
            }
            }
            var temps = dm.getTravelTime(cheminMin);
            var hdep = req.body.hours;
            var mdep = req.body.minutes;
            var sec  = temps%60;
            temps = parseInt(temps/60);
            if(sec > 30){
            temps +=1;
            }
            var harr = parseInt(hdep);
            var marr = parseInt(mdep) + temps;
            if(marr >= 60){
            harr += 1;
            marr -= 60;
            }
            cheminMin.reverse();
            res.render('mapage.ejs', {v_nom : 'Service de chemin de Metro',
                        station : cheminMin, time : temps, heure_arrivee : harr, min_arrivee : marr,
                        heure : d.getHours(), minutes : d.getMinutes()});
        }
    });
}



