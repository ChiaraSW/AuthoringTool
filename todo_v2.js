//var connection = require('/root/connection_v2');
//var hash = require('/root/hash');


//var connection = require('/root/connection');
//var hash = require('/root/hash');

var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection_v2');
var hash = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\hash');

function Todo(){

    this.testFunction = function(res){
        connection.acquire(function(err,con){
            con.query('INSERT INTO PlayerMedal VALUES ("player1",1)',function(err,result){
                con.query('INSERT INTO PlayerMedal VALUES ("player1",2)',function(err,result){
                    con.release();
                });
            });
        });
        res.send({name:"John",surname:"Doe",age:46});
    };

    this.search = function(query, res){
        connection.acquire(function(err,con){
	    var queryResult = {};
            con.query('SELECT * FROM Heritage WHERE name LIKE ?', [query + "%"], function(err,result){
		queryResult.heritage = result;
                con.query('SELECT * FROM Stage WHERE title LIKE ?', [query + "%"], function(err,result){
                    queryResult.stage = result;
		    con.release();
		    res.send(queryResult);
                });
            });
        });
    };

    this.getRankingByCards = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT player, count(card) as cards FROM PlayerCard GROUP BY player ORDER BY count(card) DESC',function(err,result){
                    con.release();
		    res.send(result);
            });
        });
    };

    this.getRankingByPaths = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT player, count(path) as paths FROM PlayerPath GROUP BY player ORDER BY count(path) DESC',function(err,result){
                    con.release();
		    res.send(result);
            });
        });
    };

    this.getRankingByMedals = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT player, count(medal) as medals FROM PlayerMedal GROUP BY player ORDER BY count(medal) DESC',function(err,result){
                    con.release();
		    res.send(result);
            });
        });
    };

    this.canAdvanceInRankingWithNextTreasure = function(email, res){
        connection.acquire(function(err,con){
            con.query('SELECT player, count(card) as cards FROM PlayerCard GROUP BY player ORDER BY count(card)',function(err,result){
                    con.release();
		    var canAdvance = false;
		    for (i = 0; i < result.length; i++) {
			if (i != result.length - 1 && result[i].player == email && result[i+1].cards - result[i].cards < 5)
			    canAdvance = true;
		    }
		    res.send({"answer" : canAdvance});
            });
        });
    };

    this.canAdvanceInRankingWithNextHeritage = function(email, res){
        connection.acquire(function(err,con){
            con.query('SELECT player, count(heritage) as heritages FROM PlayerHeritage GROUP BY player ORDER BY count(heritage)',function(err,result){
                    con.release();
		    var canAdvance = false;
		    for (i = 0; i < result.length; i++) {
			if (i != result.length - 1 && result[i].player == email && result[i+1].heritages - result[i].heritages == 1)
			    canAdvance = true;
		    }
		    res.send({"answer" : canAdvance});
            });
        });
    };

    this.getAllHeritages = function(email, res){
        connection.acquire(function(err,con){
            con.query('SELECT h.code, h.name, h.description, c.latitude, c.longitude, p.name as province, r.name as region, st.name as structuretype, hp.name as historicalperiod, EXISTS (SELECT * FROM PlayerHeritage as ph2 INNER JOIN Heritage as h2 ON ph2.heritage = h2.code WHERE ph2.player = ? AND h2.code = h.code) as visited FROM Heritage as h INNER JOIN Coordinates as c ON h.coordinates = c.code INNER JOIN Province as p ON h.province = p.code INNER JOIN Region as r ON p.region = r.code INNER JOIN Structuretype as st ON h.structuretype = st.code INNER JOIN Historicalperiod as hp ON h.historicalperiod = hp.code', email, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getAllTreasures = function(email, res){
        connection.acquire(function(err,con){
            con.query('SELECT t.code, t.title, t.description, c.latitude, c.longitude, h.code as heritage, EXISTS (SELECT * FROM PlayerTreasure as pt2 INNER JOIN Treasure as t2 ON pt2.treasure = t2.code WHERE pt2.player = ? AND t2.code = t.code) as found FROM Treasure as t INNER JOIN Coordinates as c ON t.coordinates = c.code INNER JOIN Heritage as h ON t.heritage = h.code', email, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1 (per lente)
    this.getHeritagesGame1 = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT * from Heritage INNER JOIN Coordinates ON Heritage.coordinates = Coordinates.code WHERE g1="true"', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //tutti i game (per recuperare latitudine e longitudine dei diversi heritage)
    this.getCoordinatesHeritage = function(name,res){
        connection.acquire(function(err,con){
            con.query('SELECT Coordinates.latitude,Coordinates.longitude from Heritage INNER JOIN Coordinates ON Heritage.coordinates = Coordinates.code where Heritage.name = ?',name, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game2 (insieme degli heritage visitati nel game2)
    this.getVisitedHeritagesCodes = function(email,res){
        connection.acquire(function(err,con){
            con.query('SELECT h.code FROM Heritage as h INNER JOIN PlayerHeritage as ph ON h.code = ph.heritage WHERE ph.player = ?', email, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game2 (insieme degli heritage appartenenti al game 2)
    this.getHeritagesCount = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT count(name) as conto from Heritage where g2 = true', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getHeritagesGame2 = function(email,res){
        connection.acquire(function(err,con){
            con.query('SELECT h.code, h.name, h.description, c.latitude, c.longitude, p.name as province, r.name as region, st.name as structuretype, hp.name as historicalperiod, 1 as visited FROM Heritage as h INNER JOIN Coordinates as c ON h.coordinates = c.code INNER JOIN Province as p ON h.province = p.code INNER JOIN Region as r ON p.region = r.code INNER JOIN PlayerHeritage as ph ON h.code = ph.heritage INNER JOIN Structuretype as st ON h.structuretype = st.code INNER JOIN Historicalperiod as hp ON h.historicalperiod = hp.code WHERE h.g2 = "true" AND ph.player = ? UNION SELECT h.code,h.name,h.description,c.latitude,c.longitude,p.name,r.name,st.name, hp.name,0 FROM Heritage as h INNER JOIN Province as p ON h.province = p.code INNER JOIN Region as r ON p.region = r.code INNER JOIN Coordinates as c ON h.coordinates = c.code INNER JOIN Structuretype as st ON h.structuretype = st.code INNER JOIN Historicalperiod as hp ON h.historicalperiod = hp.code WHERE h.g2 = "true" AND h.code NOT IN (SELECT heritage FROM PlayerHeritage WHERE player = ?)',[email,email], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.addVisitedHeritage = function(email,code,res){
        connection.acquire(function(err,con){
            con.query('INSERT INTO PlayerHeritage (player,heritage) VALUE (?,?)',[email,code], function(err,result){
                con.query('SELECT h.historicalperiod,h.structuretype,p.region FROM PlayerHeritage as ph INNER JOIN Heritage as h ON ph.heritage = h.code INNER JOIN Province as p ON h.province = p.code WHERE ph.player = ?', email, function(err,result) {
                    var dictionary = {};
                    dictionary.historicalperiod = {};
                    dictionary.structuretype = {};
                    dictionary.region = {};
                    for (var i = 0; i < result.length; i++) {
                        var tempHistoricalPeriod = result[i].historicalperiod;
                        if (dictionary.historicalperiod[tempHistoricalPeriod] == null)
                            dictionary.historicalperiod[tempHistoricalPeriod] = 0;
                        dictionary.historicalperiod[tempHistoricalPeriod]++;
                        var tempStructureType = result[i].structuretype;
                        if (dictionary.structuretype[tempStructureType] == null)
                            dictionary.structuretype[tempStructureType] = 0;
                        dictionary.structuretype[tempStructureType]++;
                        var tempRegion = result[i].region;
                        if (dictionary.region[tempRegion] == null)
                            dictionary.region[tempRegion] = 0;
                        dictionary.region[tempRegion]++;
                    }

                    var unlocked = [0,0,0];
                    
                    con.query('SELECT rm.medal,rm.region,rm.num,1 as unlocked FROM RegionMedal as rm left join PlayerMedal as pm ON rm.medal = pm.medal WHERE pm.player = ? UNION SELECT rm.medal,rm.region,rm.num,0 FROM RegionMedal as rm WHERE rm.medal NOT IN (SELECT medal FROM PlayerMedal WHERE player = ?)', [email, email], function (err, result) {
                        for (var i = 0; i < result.length; i++) {
                            var medal = result[i];
                            if (dictionary.region[medal.region] != null && dictionary.region[medal.region] >= medal.num && medal.unlocked != 1) {
                                unlockMedal(email, medal.medal);
                                unlocked[0] = medal.medal;
                            }
                        }
                        
                        con.query('SELECT sm.medal,sm.structuretype,sm.num,1 as unlocked FROM StructuretypeMedal as sm left join PlayerMedal as pm ON sm.medal = pm.medal WHERE pm.player = ? UNION SELECT sm.medal,sm.structuretype,sm.num,0 FROM StructuretypeMedal as sm WHERE sm.medal NOT IN (SELECT medal FROM PlayerMedal WHERE player = ?)', [email, email], function (err, result) {
                            for (var i = 0; i < result.length; i++) {
                                var medal = result[i];
                                if (dictionary.structuretype[medal.structuretype] != null && dictionary.structuretype[medal.structuretype] >= medal.num && medal.unlocked != 1) {
                                    unlockMedal(email, medal.medal);
                                    unlocked[1] = medal.medal;
                                }
                            }

                            con.query('SELECT hm.medal,hm.historicalperiod,hm.num,1 as unlocked FROM HistoricalperiodMedal as hm left join PlayerMedal as pm ON hm.medal = pm.medal WHERE pm.player = ? UNION SELECT hm.medal,hm.historicalperiod,hm.num,0 FROM HistoricalperiodMedal as hm WHERE hm.medal NOT IN (SELECT medal FROM PlayerMedal WHERE player = ?)', [email, email], function (err, result) {
                                for (var i = 0; i < result.length; i++) {
                                    var medal = result[i];
                                    if (dictionary.historicalperiod[medal.historicalperiod] != null && dictionary.historicalperiod[medal.historicalperiod] >= medal.num && medal.unlocked != 1) {
                                        unlockMedal(email, medal.medal);
                                        unlocked[2] = medal.medal;
                                    }
                                }
                                
                                con.query('SELECT * FROM Medal WHERE code = ? OR code = ? OR code = ?', [unlocked[0], unlocked[1], unlocked[2]], function (err, result) {
                                    con.release();
                                    // SHOULD SEND ALSO IMAGE?
                                    res.send(result);
                                });

                            });

                        });

                    });
                    // Release connection in last query
                    // res.send(dictionary);
                });
            });
        });
    };

    function unlockMedal(email, medal) {
        connection.acquire(function (err, con) {
            con.query('INSERT INTO PlayerMedal VALUE (?,?)', [email, medal], function (err, result) {
                if (err) { throw err; }
                con.release();
            });
        });
    }

    this.getHeritageInfo = function(code, email, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT h.name, h.description, c.latitude, c.longitude, st.name as structuretype, p.name as province, r.name as region, hp.name as historicalperiod, EXISTS (SELECT * FROM PlayerHeritage as ph WHERE ph.player = ? AND ph.heritage = h.code) as visited FROM Heritage as h INNER JOIN Coordinates as c ON h.coordinates = c.code INNER JOIN Structuretype as st ON h.structuretype = st.code INNER JOIN Province as p ON h.province = p.code INNER JOIN Region as r ON p.region = r.code INNER JOIN Historicalperiod as hp ON h.historicalperiod = hp.code WHERE h.code = ?', [email, code], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getPlayerMedals = function (email, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM Medal as m INNER JOIN Image as i ON m.image = i.code INNER JOIN PlayerMedal as pm ON m.code = pm.medal WHERE pm.player = ?', email, function (err, result) {
                con.release();
                for (var i = 0; i < result.length; i++) {
                    // result[i].bitmap = base64_encode(result[i].path + result[i].filename);
                    // result[i].bitmap = result[i].path + result[i].filename;
                }
                res.send(result);
            });
        });
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    //game1:ottieni tutti gli elementi del tesoro passato come parametro
    this.getInfoTreasure = function(code, email, res){
        connection.acquire(function(err,con){
            con.query('SELECT t.title, t.description, c.latitude, c.longitude, EXISTS (SELECT * FROM PlayerTreasure as pt WHERE pt.player = ? AND pt.treasure = t.code) as found FROM Treasure as t INNER JOIN Coordinates as c ON t.coordinates = c.code WHERE t.code = ?', [email, code],function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1
    this.getTreasureElements = function(name,email,res){
        connection.acquire(function(err,con){
            con.query('SELECT t.code,t.description,c.latitude,c.longitude,1 as found FROM Treasure as t INNER JOIN Coordinates as c ON t.coordinates = c.code INNER JOIN Heritage as h ON t.heritage = h.code INNER JOIN PlayerTreasure as pt ON t.code = pt.treasure WHERE h.name = ? AND pt.player = ? UNION SELECT t.code,t.description,c.latitude,c.longitude,0 FROM Treasure as t INNER JOIN Coordinates as c ON t.coordinates = c.code INNER JOIN Heritage as h ON t.heritage = h.code WHERE h.name = ? AND t.code NOT IN (SELECT treasure FROM PlayerTreasure)',[name,email,name], function(err,result){
                var data1 = result;
		con.query('SELECT h.code, h.name, h.description, c.latitude, c.longitude FROM Heritage as h INNER JOIN Coordinates as c ON h.coordinates = c.code WHERE h.name = ?', name, function(err,result){
		    con.release();
		    data1.push(result[0]);
                    res.send(data1);
		});
            });
        });
    };

    //game1: controlla se il tesoro appartiene a GT (quindi se è stato trovato dall'utente)
    this.checkTreasureFound = function(email,code_treas,res){
        connection.acquire(function(err,con){
            con.query('SELECT EXISTS(SELECT * from PlayerTreasure where player=? AND treasure=?)',[email,code_treas], function(err,result){
                con.release();
                console.log(result);
                res.send(result);
            });
        });
    };

    //game1: aggiungi il tesoro trovato dall'utente
    this.addTreasToPlayer = function(email,code_treas,res){
        connection.acquire(function(err,con){
            con.query('INSERT into PlayerTreasure (player,treasure) value(?,?)', [email, code_treas], function (err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    //*********GESTIONE CARTE*********//

    //game1:ottieni il totale delle carte
    this.getCardCount = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT count(code) as conto from Card', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1:ottieni i codici delle carte
    this.getCardCode = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT code from Card', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1:ottieni tutte le carte
    this.getMyCards = function(email,res){
        connection.acquire(function(err,con){
            con.query('SELECT Card.code, Card.cost, Card.name, Card.description FROM Card INNER JOIN PlayerCard ON Card.code = PlayerCard.card Where PlayerCard.player = ?',email, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1:ottieni le info della carta, posseduta dallo user(paramentro), relativa al tesoro (parametro)
    this.getTreasureCardInfo = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT * from Card where code = ?', code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getFiveTreasureCardsInfo = function(code1,code2,code3,code4,code5,res){
        connection.acquire(function(err,con){
            con.query('SELECT * from Card where code = ? OR code = ? OR code = ? OR code = ? OR code = ?', [code1,code2,code3,code4,code5], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1:inserisce la carta trovata dall'utente nella collezione
    this.addCardToUserCollection= function(email,card_code,res){
        connection.acquire(function(err,con){
            con.query('INSERT into PlayerCard (player,card) value (?,?)', [email, card_code], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.addFiveCardsToUserCollection= function(email,card1,card2,card3,card4,card5,res){
        connection.acquire(function(err,con){
            con.query('REPLACE INTO PlayerCard (player,card) VALUES (?,?), (?,?), (?,?), (?,?), (?,?)', [email,card1,email,card2,email,card3,email,card4,email,card5], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //*********FINE GESTIONE CARTE*********//


    //per tutti i game (medaglie)
    this.getMedals= function(type,res){
        connection.acquire(function(err,con){
            con.query('SELECT name from Medal where type = ?',type, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getAllPaths = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT * FROM Path', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getMyPathsTitles = function(email,res){
        connection.acquire(function(err,con){
            con.query('SELECT p.title, EXISTS (SELECT * FROM PlayerPath as pp2 WHERE pp2.player = ? AND pp2.path = p.code) as completed FROM Path as p WHERE EXISTS (SELECT * FROM Stage as s INNER JOIN PlayerStage as ps ON ps.stage = s.code WHERE ps.player = ? AND s.path = p.code)', [email, email], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 (puzzle attivati)
    this.getActivePaths = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT title FROM Path Where enabled = "true"', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 (puzzle disattivati)
    this.getUpcomingPaths = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT title FROM Path WHERE enabled = "false"', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getPathStagesByTitle = function(title, email, res) {
        connection.acquire(function(err,con){
            con.query('SELECT p.code as pathcode, p.title as pathtitle, p.heritage, s.code as stagecode, s.title as stagetitle, s.curiosity, s.isfinal, q.code as questioncode, q.question, q.hintonsite, q.hintbypaying, q.answer, EXISTS (SELECT * FROM PlayerPath as pp2 INNER JOIN Path as p2 ON p2.code = pp2.path WHERE pp2.player = ? AND p2.title = ?) as completed FROM Stage as s INNER JOIN Path as p ON s.path = p.code INNER JOIN Question as q ON s.question = q.code WHERE p.title = ?', [email, title, title], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getPathByTitle = function(title, res) {
        connection.acquire(function(err,con){
            con.query('SELECT * FROM Path WHERE title = ?', title, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    this.getStageByTitle = function(title, res) {
	connection.acquire(function(err,con){
	    con.query('SELECT * FROM Stage INNER JOIN Question ON Stage.question = Question.code WHERE title = ?', title, function(err, result){
		con.release();
		res.send(result);
	    });
	});
    };

    this.getActiveStages = function(email, res) {
	connection.acquire(function(err,con){
	    con.query('SELECT s.code as stagecode,s.title,c.latitude,c.longitude,p.code as pathcode,p.title as pathtitle, EXISTS (SELECT * FROM PlayerStage as ps WHERE ps.stage = s.code AND ps.player = ?) as completed FROM Stage as s INNER JOIN Coordinates as c ON s.coordinates = c.code INNER JOIN Path as p ON s.path = p.code WHERE p.enabled = "true"', email, function(err, result){
		con.release();
		res.send(result);
	    });
	});
    };

    this.getStageByCode = function(code, email, res) {
	connection.acquire(function(err,con){
	    con.query('SELECT s.code as stagecode,s.title,s.curiosity,s.isfinal,q.code as questioncode,q.question,q.hintonsite,q.hintbypaying,q.answer,c.latitude,c.longitude, EXISTS (SELECT * FROM PlayerStage as ps WHERE ps.stage = s.code AND ps.player = ?) as completed FROM Stage as s INNER JOIN Question as q ON s.question = q.code INNER JOIN Coordinates as c ON s.coordinates = c.code WHERE s.code = ?', [email, code], function(err, result){
		con.release();
		res.send(result);
	    });
	});
    };

    this.submitStageAnswer = function(code, email, answer, res) {
	connection.acquire(function(err,con){
	    con.query('INSERT INTO PlayerStage VALUE (?, (SELECT s.code FROM Question as q INNER JOIN Stage as s ON s.question = q.code WHERE s.code = ? AND q.answer = ?))', [email, code, answer], function(err, result){
		if (err) {result = {}; var stageCompleted = false;}
		else
		    var stageCompleted = true;
		// if stage completed, see if can complete path
		if (stageCompleted) {
		    con.query('INSERT INTO PlayerPath VALUE (?, (SELECT p.code FROM Path as p INNER JOIN Stage as s ON s.path = p.code WHERE s.code = ? AND s.isfinal = "true"))', [email, code], function(err, result){
		        if (err) {result = {}; var pathCompleted = false;}
			else
			    var pathCompleted = true;
		        con.release();
			result.stagecompleted = true;
			result.pathcompleted = pathCompleted;
			res.send(result);
		    });
		}
		else
		    res.send(result);
	    });
	});
    };

    this.checkStageCompleted = function(code, email, res) {
	connection.acquire(function(err,con){
	    con.query('SELECT * FROM PlayerStage WHERE player = ? AND stage = ?', [email, code], function(err,result){
		con.release();
	        res.send(result);
	    });
	});
    };

    //game3 (descrizione puzzle)
    this.getPuzzleDescription = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT description from Puzzle where name = ?',code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 
    this.getPuzzleAnswer = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT answer from Puzzle where name = ?',code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 
    this.getPuzzleHint = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT hint from Puzzle where name = ?',code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 
    this.getPuzzleCode = function(name,res){
        connection.acquire(function(err,con){
            con.query('SELECT code from Puzzle where name = ?',name, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game1 (achievement)
    this.getAchievementGame1 = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT achievement from Ag1', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game2 (achievement)
    this.getAchievementGame2 = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT achievement from Ag2', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game3 (achievement)
    this.getAchievementGame3 = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT achievement from Ag3', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //game4 (achievement)
    this.getAchievementGame4 = function(res){
        connection.acquire(function(err,con){
            con.query('SELECT achievement from Ag4', function(err,result){
                con.release();
                res.send(result);
            });
        });
    };


    //per tutti i games(achievement description)
    this.getAchievementName = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT name from Achievement where code = ?', code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //tutti i game: restituisce tutti gli elementi dell'achievement passato come paramentro
    this.getAchievementElements = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT name,description from Achievement where code = ?', code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //per tutti i games(achievement description)
    /*this.getAchievementDescr = function(code,res){
        connection.acquire(function(err,con){
            con.query('SELECT description from Achievement where code = ?', code, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };*/

    //Insert player 
    this.createPlayer = function(email,res){
        connection.acquire(function(err,con){
            con.query('INSERT into Player (email,title,coins) values (?,null,0)', email, function(err,result){
                console.log(result);
            });
        });
    };

    this.checkPlayer = function(email,res){
        connection.acquire(function(err,con){
            con.query('SELECT EXISTS (SELECT * from Player where email=?)', email, function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //Insert title
    this.setTitle = function(title,email,res){
        connection.acquire(function(err,con){
            con.query('UPDATE User set title=? where email=?', [title,email], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };

    //Insert coins
    this.setCoins = function(coins,email,res){
        connection.acquire(function(err,con){
            con.query('UPDATE User set coins=? where email=?', [coins,email], function(err,result){
                con.release();
                res.send(result);
            });
        });
    };



	

    //Inizio Authoring Tool--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	this.addImage = function(img_code, img_path, img_filename, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Image (code, path, filename) value (?,?,?)', [img_code, img_path, img_filename], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updImage = function(img_path, img_filename, img_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Image set path=?, filename=? WHERE code=?', [img_path, img_filename, img_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};	
	
	this.delImage = function(img_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Image WHERE code=?', [img_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCategories= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Category', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllRarities= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Rarity', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllRoles= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Role', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllProvinces= function(reg_name, res){
		connection.acquire(function(err,con){
			con.query('SELECT p.code, p.name, c.latitude, c.longitude, p.zoom, r.code as region, r.name as rName from (Region r, Province p, Coordinates c) WHERE p.region=r.code AND p.coordinates=c.code AND r.name = ?', [reg_name], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllRegions= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Region', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllHistoricalPeriods= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Historicalperiod', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addHistoricalPeriod = function(hp_code, hp_name, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Historicalperiod (code, name) value (?,?)', [hp_code, hp_name], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllStructureTypes= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Structuretype', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addStructureType = function(st_code, st_name, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Structuretype (code, name) value (?,?)', [st_code, st_name], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllOrganizations= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Organization', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllShapes= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Shape', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCoordinates = function(coo_code, coo_latitude, coo_longitude, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Coordinates (code, latitude, longitude) value (?,?,?)', [coo_code, coo_latitude, coo_longitude], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updCoordinates = function(coo_latitude, coo_longitude, coo_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Coordinates set latitude=?, longitude=? WHERE code=?', [coo_latitude, coo_longitude, coo_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};	
	
	this.delCoordinates = function(coo_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Coordinates WHERE code=?', [coo_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllMedals= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as cCode, c.name as cName, m.num, m.image as image, i.path, i.filename FROM (Medal m, Image i, Category c) WHERE m.image=i.code AND m.category=c.code', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
		
	this.getMedal= function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as cCode, c.name as cName, m.num, m.image, i.path, i.filename FROM (Medal m, Image i, Category c) WHERE m.image=i.code AND m.category=c.code AND m.code=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addMedal = function(medal_code, medal_name, medal_category, medal_num, medal_image, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Medal (code, name, category, num, image) value (?,?,?,?,?)', [medal_code, medal_name, medal_category, medal_num, medal_image], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updMedal = function(medal_name, medal_category, medal_num, medal_image, medal_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Medal set name=?, category=?, num=?, image=? WHERE code=?', [medal_name, medal_category, medal_num, medal_image, medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};		
	
	this.delMedal = function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Medal WHERE code=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllRegionMedal= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as cCode, c.name as cName FROM (Medal m, Category c) WHERE m.category=c.code AND c.code=1', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getRegionMedalByMedalCode= function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT rm.medal as medalCode, rm.region as regionCode, r.name as region FROM (RegionMedal rm, Region r) WHERE r.code=rm.region AND rm.medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getRegionMedalByRegionCode= function(medal_region, res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM RegionMedal WHERE region=?', [medal_region], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addRegionMedal = function(medal_code, medal_region, res){
		connection.acquire(function(err,con){
			con.query('INSERT into RegionMedal (medal, region) value (?,?)', [medal_code, medal_region], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updRegionMedal = function(medal_region, medal_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE RegionMedal set region=? WHERE medal=?', [medal_region, medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delRegionMedal = function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from RegionMedal WHERE medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllHPMedal= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as cCode, c.name as cName FROM (Medal m, Category c) WHERE m.category=c.code AND c.code=2', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getHPMedalByMedalCode= function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT hpm.medal as medalCode, hpm.historicalperiod as hpCode, h.name as hp FROM (HistoricalperiodMedal hpm, Historicalperiod h) WHERE hpm.historicalperiod=h.code AND hpm.medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getHPMedalByHPCode= function(medal_hp, res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM HistoricalperiodMedal WHERE historicalperiod=?', [medal_hp], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addHPMedal = function(medal_code, medal_hp, res){
		connection.acquire(function(err,con){
			con.query('INSERT into HistoricalperiodMedal (medal, historicalperiod) value (?,?)', [medal_code, medal_hp], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updHPMedal = function(medal_hp, medal_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE HistoricalperiodMedal set historicalperiod=? WHERE medal=?', [medal_hp, medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delHPMedal = function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from HistoricalperiodMedal WHERE medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllToSMedal= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as cCode, c.name as cName FROM (Medal m, Category c) WHERE m.category=c.code AND c.code=3', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getToSMedalByMedalCode= function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT stm.medal as medalCode, stm.structuretype as stCode, s.name as structuretype FROM (StructuretypeMedal stm, Structuretype s) WHERE stm.structuretype=s.code AND stm.medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getToSMedalByToSCode= function(medal_tos, res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM StructuretypeMedal WHERE structuretype=?', [medal_tos], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addToSMedal = function(medal_code, medal_tos, res){
		connection.acquire(function(err,con){
			con.query('INSERT into StructuretypeMedal (medal, structuretype) value (?,?)', [medal_code, medal_tos], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updToSMedal = function(medal_tos, medal_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE StructuretypeMedal set structuretype=? WHERE medal=?', [medal_tos, medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delToSMedal = function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from StructuretypeMedal WHERE medal=?', [medal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCards = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT c.code, c.name, c.image as image, i.path, i.filename, c.description, c.cardvalue, c.destructionvalue, c.cost, r.code as rCode, r.name as rName FROM (Card c, Image i, Rarity r) WHERE c.image=i.code AND c.rarity=r.code', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getCard= function(card_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT c.code, c.name, c.image as image, i.path, i.filename, c.description, c.cardvalue, c.destructionvalue, c.cost, r.name as rName FROM (Card c, Image i, Rarity r) WHERE c.image=i.code AND c.rarity=r.code AND c.code=?', [card_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCard = function(card_code, card_name, card_image, card_description, card_cardvalue, card_destructionvalue, card_cost, card_rarity, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Card (code, name, image, description, cardvalue, destructionvalue, cost, rarity) value (?,?,?,?,?,?,?,?)', [card_code, card_name, card_image, card_description, card_cardvalue, card_destructionvalue, card_cost, card_rarity], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updCard = function(card_name, card_image, card_description, card_cardvalue, card_destructionvalue, card_cost, card_rarity, card_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Card set name=?, image=?, description=?, cardvalue=?, destructionvalue=?, cost=?, rarity=? WHERE code=?', [card_name, card_image, card_description, card_cardvalue, card_destructionvalue, card_cost, card_rarity, card_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};	

	this.delCard = function(card_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Card WHERE code=?', [card_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getMissionTypes = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM Missiontype', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllMissions = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.title, m.num, mt.code as mtCode, mt.name as mtName, g.code as glCode FROM (Mission m, Missiontype mt, Granularitylevel g) WHERE m.granularitylevel=g.code && m.missiontype=mt.code', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.title, m.num, mt.code as mtCode, mt.name as mtName, gl.code as glCode, gl.name as glName from (Mission m, Missiontype mt, Granularitylevel gl) WHERE m.missiontype=mt.code AND m.granularitylevel=gl.code AND m.code = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addMission = function(mission_code, mission_title, mission_num, mission_missiontype, mission_granularity, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Mission (code, title, num, missiontype, granularitylevel) value (?,?,?,?,?)', [mission_code, mission_title, mission_num, mission_missiontype, mission_granularity], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updMission = function(mission_title, mission_num, mission_missiontype, mission_granularity, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Mission set title=?, num=?, missiontype=?, granularitylevel=? WHERE code=?', [mission_title, mission_num, mission_missiontype, mission_granularity, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.delMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Mission WHERE code=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getRegionalMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT rm.mission, r.code as regionCode, r.name as regionName from (RegionalMission rm, Region r) WHERE rm.region=r.code AND rm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addRegionalMission = function(mission_code, region_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into RegionalMission (mission, region) value (?,?)', [mission_code, region_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updRegionalMission = function(region_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE RegionalMission set region=? WHERE mission=?', [region_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delRegionalMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from RegionalMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getProvincialMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT pm.mission, p.code as provinceCode, p.name as provinceName, r.code as regionCode, r.name as regionName from (ProvincialMission pm, Province p, Region r) WHERE pm.province=p.code AND p.region=r.code AND pm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addProvincialMission = function(mission_code, province_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into ProvincialMission (mission, province) value (?,?)', [mission_code, province_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updProvincialMission = function(province_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE ProvincialMission set province=? WHERE mission=?', [province_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delProvincialMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from ProvincialMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getHeritageMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT hm.mission, h.code as chCode, h.name as chName, p.code as provinceCode, p.name as provinceName, r.code as regionCode, r.name as regionName from (HeritageMission hm, Heritage h, Province p, Region r) WHERE hm.heritage=h.code AND h.province=p.code AND p.region=r.code AND hm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addHeritageMission = function(mission_code, ch_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into HeritageMission (mission, heritage) value (?,?)', [mission_code, ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updHeritageMission = function(ch_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE HeritageMission set heritage=? WHERE mission=?', [ch_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delHeritageMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from HeritageMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getRarityMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT rm.mission, r.code as rarityCode, r.name as rarityName  from (RarityMission rm, Rarity r) WHERE rm.rarity=r.code AND rm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addRarityMission = function(mission_code, rarity_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into RarityMission (mission, rarity) value (?,?)', [mission_code, rarity_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updRarityMission = function(rarity_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE RarityMission set rarity=? WHERE mission=?', [rarity_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delRarityMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from RarityMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getCategoryMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT cm.mission, c.code as categoryCode, c.name as categoryName from (CategoryMission cm, Category c) WHERE cm.category=c.code AND cm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCategoryMission = function(mission_code, category_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into CategoryMission (mission, category) value (?,?)', [mission_code, category_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updCategoryMission = function(category_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE CategoryMission set category=? WHERE mission=?', [category_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delCategoryMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from CategoryMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getRegionMedalMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT rmm.mission, rm.medal as regionMedal, m.code as medalCode, m.name as medalName from (RegionMedalMission rmm, RegionMedal rm, Medal m) WHERE rmm.regionmedal=rm.medal AND rm.medal=m.code AND rmm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addRegionMedalMission = function(mission_code, regionmedal_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into RegionMedalMission (mission, regionmedal) value (?,?)', [mission_code, regionmedal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updRegionMedalMission = function(regionmedal_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE RegionMedalMission set regionmedal=? WHERE mission=?', [regionmedal_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delRegionMedalMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from RegionMedalMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	
	 this.getHPMedalMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT hpmm.mission, hpm.medal as hpMedal, m.code as medalCode, m.name as medalName from (HPMedalMission hpmm, HistoricalperiodMedal hpm, Medal m) WHERE hpmm.hpmedal=hpm.medal AND hpm.medal=m.code AND hpmm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addHPMedalMission = function(mission_code, hpmedal_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into HPMedalMission (mission, hpmedal) value (?,?)', [mission_code, hpmedal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updHPMedalMission = function(hpmedal_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE HPMedalMission set hpmedal=? WHERE mission=?', [hpmedal_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delHPMedalMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from HPMedalMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getToSMedalMission = function(mission_code,res){
		connection.acquire(function(err,con){
			con.query('SELECT tosmm.mission, stm.medal as tosMedal, m.code as medalCode, m.name as medalName from (ToSMedalMission tosmm, StructuretypeMedal stm, Medal m) WHERE tosmm.tosmedal=stm.medal AND stm.medal=m.code AND tosmm.mission = ?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addToSMedalMission = function(mission_code, tosmedal_code, res){
		connection.acquire(function(err,con){
			con.query('INSERT into ToSMedalMission (mission, tosmedal) value (?,?)', [mission_code, tosmedal_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updToSMedalMission = function(tosmedal_code, mission_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE ToSMedalMission set tosmedal=? WHERE mission=?', [tosmedal_code, mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delToSMedalMission = function(mission_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from ToSMedalMission WHERE mission=?', [mission_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	
	
	
	
	
	
	
	
	//manca il collegamento per il count delle missioni!!!
	this.getTop10 = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT p.email, p.coins, (SELECT Count(*) FROM Playerheritage WHERE player=p.email) as chs, (SELECT Count(*) FROM Playertreasure WHERE player=p.email) as packets, (SELECT Count(*) FROM Playerpath WHERE player=p.email) as paths, (SELECT Count(*) FROM Review WHERE player=p.email) as reviews, (SELECT Count(*) FROM Playermedal WHERE player=p.email) as medals FROM (Player p) ORDER BY p.coins DESC', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	
	
	
	//statistiche	
	
	this.getAllCHsCountRegions = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT r.name as name, IFNULL(COUNT(h.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province GROUP BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCHsCountProvinces = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT p.name as name, IFNULL(COUNT(h.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province GROUP BY p.name ORDER BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCardsPacketsCountRegions = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT r.name as name, IFNULL(COUNT(t.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Treasure as t ON h.code=t.heritage GROUP BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCardsPacketsCountProvinces = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT p.name as name, IFNULL(COUNT(t.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Treasure as t ON h.code=t.heritage GROUP BY p.name ORDER BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCardsPacketsCountCHs = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT h.name as name, IFNULL(COUNT(t.code), 0) as y, p.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Treasure as t ON h.code=t.heritage GROUP BY h.name ORDER BY p.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllPathsCountRegions = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT r.name as name, IFNULL(COUNT(path.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Path as path ON h.code=path.heritage GROUP BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllPathsCountProvinces = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT p.name as name, IFNULL(COUNT(path.code), 0) as y, r.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Path as path ON h.code=path.heritage GROUP BY p.name ORDER BY r.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllPathsCountCHs = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT h.name as name, IFNULL(COUNT(pa.code), 0) as y, p.name as drilldown FROM Region as r LEFT JOIN Province as p ON r.code=p.region LEFT JOIN Heritage as h ON p.code=h.province LEFT JOIN Path as pa ON h.code=pa.heritage GROUP BY h.name ORDER BY p.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllMedalsCount= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT c.name as name, IFNULL(COUNT(m.code), 0) as y FROM Category as c LEFT JOIN Medal as m ON c.code=m.category GROUP BY c.name', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	this.getUser = function(user_email,res){
		connection.acquire(function(err,con){
			con.query('SELECT * from User WHERE email = ?', [user_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addUser = function(user_code, user_email, user_password, user_role, res){
		connection.acquire(function(err,con){
			con.query('INSERT into User (code, email, password, enabled, role) value (?,?,?,null,?)', [user_code, user_email, user_password, user_role], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addAdmin = function(admin_code, admin_user, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Admin (code, user) value (?,?)', [admin_code, admin_user], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllCulturalOrganizations = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Organization', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getAllNotEnabledCulturalOrganizations = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT Count(code) as count from User WHERE role=2 AND enabled is NULL', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCulturalOrganization = function(corg_code, corg_user, corg_name, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Organization (code, user, admin, name) value (?,?,null,?)', [corg_code, corg_user, corg_name], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getAllNotEnabledCulturalOperators = function(corg_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT Count(opU.code) as count FROM (User orgU, Organization org, Operator op, User opU) WHERE orgU.email=? AND orgU.code=org.user AND org.code=op.organization AND op.user=opU.code AND opU.enabled is NULL', [corg_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addCulturalOperator = function(cop_code, cop_user, cop_organization, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Operator (code, user, organization) value (?,?,?)', [cop_code, cop_user, cop_organization], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getOperatorCHs = function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, h.g1, h.g2, h.g3, h.g4, c.latitude, c.longitude, p.name as province, r.name as region, hp.name as historicalperiod, s.name as structuretype, u.email, (SELECT Count(*) FROM (PlayerHeritage ph) WHERE ph.heritage=h.code) as views FROM (Heritage h, Operator o, User u, Image i, Coordinates c, Province p, Region r, Historicalperiod hp, Structuretype s) WHERE h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND p.region=r.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getCH= function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.code as image, i.path, i.filename, h.g1, h.g2, h.g3, h.g4, h.coordinates as coordinates, c.latitude, c.longitude, p.code as province, p.name as provName, p.zoom, r.name as region, p.zoom, hp.name as historicalperiod, s.name as structuretype FROM (Heritage h, Image i, Coordinates c, Province p, Region r, Historicalperiod hp, Structuretype s) WHERE h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND p.region=r.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.code=?', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getProvinceCHs= function(prov_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, p.code as province, p.name as provName FROM (Heritage h, Province p) WHERE h.province=p.code AND h.province=?', [prov_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addCH = function(ch_code, ch_name, ch_description, ch_image, ch_g1, ch_g2, ch_g3, ch_g4, ch_coordinates, ch_province, ch_historicalperiod, ch_structuretype, ch_operator, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Heritage (code, name, description, image, g1, g2, g3, g4, coordinates, province, historicalperiod, structuretype, operator) value (?,?,?,?,?,?,?,?,?,?,?,?,?)', [ch_code, ch_name, ch_description, ch_image, ch_g1, ch_g2, ch_g3, ch_g4, ch_coordinates, ch_province, ch_historicalperiod, ch_structuretype, ch_operator], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updCH = function(ch_name, ch_description, ch_image, ch_g1, ch_g2, ch_g3, ch_g4, ch_coordinates, ch_province, ch_historicalperiod, ch_structuretype, ch_operator, ch_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Heritage set name=?, description=?, image=?, g1=?, g2=?, g3=?, g4=?, coordinates=?, province=?, historicalperiod=?, structuretype=?, operator=? WHERE code=?', [ch_name, ch_description, ch_image, ch_g1, ch_g2, ch_g3, ch_g4, ch_coordinates, ch_province, ch_historicalperiod, ch_structuretype, ch_operator, ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.delCH = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Heritage WHERE code=?', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getGame1CHs = function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, c.latitude, c.longitude, p.name as province, hp.name as historicalperiod, s.name as structuretype FROM (Heritage h, Image i, Coordinates c, Province p, Historicalperiod hp, Structuretype s, Operator o, User u) WHERE h.g1="true" AND h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getCHSiteInformation = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.description, i.code as imageCode, i.path, i.filename, h.name as heritage FROM (Siteinformation s, Image i, Heritage h) WHERE s.heritage=h.code AND s.image=i.code AND s.heritage = ? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCHSiteInformation = function(chsi_code, chsi_title, chsi_description, chsi_image, chsi_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Siteinformation (code, title, description, image, heritage) value (?,?,?,?,?)', [chsi_code, chsi_title, chsi_description, chsi_image, chsi_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updCHSiteInformation = function(chsi_title, chsi_description, chsi_image, chsi_heritage, chsi_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Siteinformation set title=?, description=?, image=?, heritage=? WHERE code=?', [chsi_title, chsi_description, chsi_image, chsi_heritage, chsi_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getCHTreasureChests = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT t.code, t.title, t.description, c.code as cooCode, c.latitude, c.longitude, h.code as heritageCode, h.name  FROM (Treasure t, Coordinates c, Heritage h) WHERE t.heritage=h.code AND t.coordinates=c.code AND h.code=? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getTreasureChest = function(chest_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT tc.code, tc.title, tc.description, c.code as cooCode, c.latitude, c.longitude FROM (Treasure tc, Coordinates c) WHERE tc.coordinates=c.code AND tc.code = ? ', [chest_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addTreasureChest = function(chest_code, chest_title, chest_description, chest_coordinates, chest_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Treasure (code, title, description, coordinates, heritage) value (?,?,?,?,?)', [chest_code, chest_title, chest_description, chest_coordinates, chest_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
		
	this.updTreasureChest = function(chest_title, chest_description, chest_coordinates, chest_heritage, chest_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Treasure set title=?, description=?, coordinates=?, heritage=? WHERE code=?', [chest_title, chest_description, chest_coordinates, chest_heritage, chest_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delTreasureChest = function(chest_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Treasure WHERE code=?', [chest_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getGame2CHs = function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, c.latitude, c.longitude, p.name as province, hp.name as historicalperiod, s.name as structuretype FROM (Heritage h, Image i, Coordinates c, Province p, Historicalperiod hp, Structuretype s, Operator o, User u) WHERE h.g2="true" AND h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getCHValidityAreas = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT v.code, v.heritage as hCode, h.name as heritage, s.code as shapeCode, s.type as shape FROM (Validityarea v, Heritage h, Shape s) WHERE v.heritage=h.code AND v.shape=s.code AND h.code=? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addValidityArea = function(va_code, va_heritage, va_shape, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Validityarea (code, heritage, shape) value (?,?,?)', [va_code, va_heritage, va_shape], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updValidityArea = function(va_heritage, va_shape, va_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Validityarea set heritage=?, shape=? WHERE code=?', [va_heritage, va_shape, va_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delValidityArea = function(va_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Validityarea WHERE code=?', [va_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addPolygon = function(polygon_code, polygon_va, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Polygon (code, validityarea) value (?,?)', [polygon_code, polygon_va], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updPolygon = function(polygon_va, polygon_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Polygon set validityarea=? WHERE code=?', [polygon_va, polygon_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delPolygon = function(polygon_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Polygon WHERE code=?', [polygon_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getPolygonVertices = function(va_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT p.code as polygonCode, p.validityarea as vaCode, v.code as vertexCode, c.code as cooCode, c.latitude, c.longitude, v.numvertex FROM (Polygon p, Vertex v, Coordinates c) WHERE v.polygon=p.code AND v.coordinates=c.code AND p.validityarea=? ORDER BY numvertex', [va_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addVertex = function(vertex_code, vertex_polygon, vertex_coo, vertex_num, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Vertex (code, polygon, coordinates, numvertex) value (?,?,?,?)', [vertex_code, vertex_polygon, vertex_coo, vertex_num], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updVertex = function(vertex_polygon, vertex_coo, vertex_num, vertex_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Vertex set polygon=?, coordinates=?, nemvertex=? WHERE code=?', [vertex_polygon, vertex_coo, vertex_num, vertex_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delVertex = function(vertex_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Vertex WHERE code=?', [vertex_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getCircle = function(va_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT c.code as circleCode, c.validityarea as vaCode, c.center as centerCode, coo.latitude, coo.longitude, c.radius FROM (Circle c, Coordinates coo) WHERE c.center=coo.code AND c.validityarea=?', [va_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCircle = function(circle_code, circle_va, circle_center, circle_radius, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Circle (code, validityarea, center, radius) value (?,?,?,?)', [circle_code, circle_va, circle_center, circle_radius], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updCircle = function(circle_va, circle_center, circle_radius, circle_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Circle set validityarea=?, center=?, radius=? WHERE code=?', [circle_va, circle_center, circle_radius, circle_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delCircle = function(circle_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Circle WHERE code=?', [circle_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getGame3CHs = function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, c.latitude, c.longitude, p.name as province, hp.name as historicalperiod, s.name as structuretype FROM (Heritage h, Image i, Coordinates c, Province p, Historicalperiod hp, Structuretype s, Operator o, User u) WHERE h.g3="true" AND h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getGame3CHsWithPaths= function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT distinct h.code, h.name FROM (Path p, Heritage h, Operator o, User u) WHERE p.heritage=h.code AND h.g3="true" AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addQuestion = function(question_code, question_question, question_hintonsite, question_hintbypaying, question_answer, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Question (code, question, hintonsite, hintbypaying, answer) value (?,?,?,?,?)', [question_code, question_question, question_hintonsite, question_hintbypaying, question_answer], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updQuestion = function(question_question, question_hintonsite, question_hintbypaying, question_answer, question_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Question set question=?, hintonsite=?, hintbypaying=?, answer=? WHERE code=?', [question_question, question_hintonsite, question_hintbypaying, question_answer, question_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delQuestion = function(question_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Question WHERE code=?', [question_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
		
	this.getCHPaths = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT p.code, p.title, h.name as heritage, p.enabled FROM (Path p, Heritage h) WHERE p.heritage=h.code AND h.code=? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getPath = function(path_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM Path WHERE code = ? ', [path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addPath = function(path_code, path_title, path_enabled, path_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Path (code, title, enabled, heritage) value (?,?,?,?)', [path_code, path_title, path_enabled, path_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updPath = function(path_title, path_enabled, path_heritage, path_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Path set title=?, enabled=?, heritage=? WHERE code=?', [path_title, path_enabled, path_heritage, path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.delPath = function(path_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Path WHERE code=?', [path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.enablePath = function(path_enabled, path_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Path set enabled=? WHERE code=?', [path_enabled, path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getCHStages = function(ch_code, res){ 
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.coordinates as cooCode, c.latitude, c.longitude, p.code as pathCode, p.heritage as heritage FROM (Stage s, Coordinates c, Path p) WHERE s.path=p.code AND s.coordinates=c.code AND p.heritage=? ORDER BY path', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getPathStages = function(path_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.curiosity, q.code as questionCode, q.question, q.hintonsite, q.hintbypaying, q.answer, c.code as cooCode, c.latitude, c.longitude, p.code as pathCode, s.isfinal FROM (Stage s, Question q, Coordinates c, Path p) WHERE s.path=p.code AND s.question=q.code AND s.coordinates=c.code AND p.code=? ', [path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getStage = function(stage_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.curiosity, q.code as questionCode, q.question, q.hintonsite, q.hintbypaying, q.answer, c.code as cooCode, c.latitude, c.longitude, s.path as pathCode, s.isFinal FROM (Stage s, Question q, Coordinates c) WHERE s.coordinates=c.code AND s.question=q.code AND s.code = ? ', [stage_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addStage = function(stage_code, stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_isfinal, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Stage (code, title, curiosity, question, coordinates, path, isfinal) value (?,?,?,?,?,?,?)', [stage_code, stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_isfinal], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updFinalStage = function(stage_isfinal, stage_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Stage set isfinal=? WHERE code=?', [stage_isfinal, stage_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updStage = function(stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_isfinal, stage_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Stage set title=?, curiosity=?, question=?, coordinates=?, path=?, isfinal=? WHERE code=?', [stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_isfinal, stage_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delStage = function(stage_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Stage WHERE code=?', [stage_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	
	
	
	
	this.getGame4CHs = function(operator_email, res){
		connection.acquire(function(err,con){
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, c.latitude, c.longitude, p.name as province, hp.name as historicalperiod, s.name as structuretype FROM (Heritage h, Image i, Coordinates c, Province p, Historicalperiod hp, Structuretype s, Operator o, User u) WHERE h.g4="true" AND h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	/*this.getCHInfopoints = function(ch_code, res){			
		connection.acquire(function(err,con){
			con.query('SELECT h.name, i.code, i.description, i.path, i.latitude, i.longitude, i.views, i.heritage FROM (Heritage h, Infopoint i)  WHERE h.code = ? AND h.code = i.heritage ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getInfopoint = function(ip_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT * FROM Infopoint WHERE code = ? ', [ip_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addInfopoint = function(ip_code, ip_description, ip_path, ip_latitude, ip_longitude, ip_views, ip_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Infopoint (code, description, path, latitude, longitude, views, heritage) value (?,?,?,?,?,?,?)', [ip_code, ip_description, ip_path, ip_latitude, ip_longitude, ip_views, ip_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updInfopoint = function(ip_description, ip_path, ip_latitude, ip_longitude, ip_views, ip_heritage, ip_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Infopoint set description=?, path=?, latitude=?, longitude=?, views=?, heritage=? WHERE code=?', [ip_description, ip_path, ip_latitude, ip_longitude, ip_views, ip_heritage, ip_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delInfopoint = function(ip_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Infopoint WHERE code=?', [ip_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/
	
	this.getCHEnciclopedicPage = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT ep.code, ep.title, ep.description, ep.curiosity, i.code as imageCode, i.path, i.filename, h.name as heritage FROM (Enciclopedicpage ep, Image i, Heritage h) WHERE ep.heritage=h.code AND ep.image=i.code AND ep.heritage = ? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addCHEnciclopedicPage = function(chep_code, chep_title, chep_description, chep_curiosity, chep_image, chep_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Enciclopedicpage (code, title, description, curiosity, image, heritage) value (?,?,?,?,?,?)', [chep_code, chep_title, chep_description, chep_curiosity, chep_image, chep_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updCHEnciclopedicPage = function(chep_title, chep_description, chep_curiosity, chep_image, chep_heritage, chep_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Enciclopedicpage set title=?, description=?, curiosity=?, image=?, heritage=? WHERE code=?', [chep_title, chep_description, chep_curiosity, chep_image, chep_heritage, chep_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getCHReviewsList = function(ch_code, res){			
		connection.acquire(function(err,con){
			con.query('SELECT h.name as chName, h.code as chCode, r.review, r.likes, r.dislikes, p.email as email FROM (Review r, Heritage h, Player p)  WHERE r.heritage=h.code AND r.player=p.email AND r.heritage = ?', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.delReview = function(player_id, ch_code, res){
		connection.acquire(function(err,con){
			con.query('DELETE from Review WHERE player=? AND heritage=?', [player_id, ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	

	
	
	

//Fine Authoring Tool --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------








	
    this.create = function (todo,res){
        connection.acquire(function(err,con){
            con.query('INSERT into Tab1 set ?',todo,function(err,result){
                con.release();
                if(err){
                    res.send({status: 1, message: 'TODO creation failed'});
                } else {
                    res.send({status: 0, message: 'TODO created successfully'});
                }
            });
        });
    };
	
    this.update = function (todo,res){
        connection.acquire(function(err,con){
            con.query('UPDATE into Tab1 set ? WHERE id = ?',[todo,todo.id],function(err,result){
                con.release();
                if(err){
                    res.send({status: 1, message: 'TODO update failed'});
                } else {
                    res.send({statu: 0, message: 'TODO updated successfully'});
                }
            });
        });
    };
	
    this.del = function (id,res){
        connection.acquire(function(err,con){
            con.query('DELETE from Tab1 WHERE id = ?',[id],function(err,result){
                con.release();
                if(err){
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    res.send({statu: 0, message: 'Deleted successfully'});
                }
            });
        });
    };
	
}

module.exports = new Todo();