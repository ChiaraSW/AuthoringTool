//var connection = require('/root/connection');
//var hash = require('/root/hash');

var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection');
var hash = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\hash');

function Todo(){

	//game1 (per lente)
	this.getHeritagesGame1 = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT distinct heritage from G1h', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//tutti i game (per recuperare latitudine e longitudine dei diversi heritage)
	this.getCoordinatesHeritage = function(name,res){
		connection.acquire(function(err,con){
			con.query('SELECT latitude,longitude from Heritage where name = ?',name, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game2 (insieme degli heritage visitati nel game2)
	this.getVisitedHeritagesCount = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT count(g.heritage) as visitConto from (G2h g,User u) where u.email= ? AND g.game2 = u.game2',email, function(err,result){
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

	//game1 (per game2)
	this.getHeritagesGame2 = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT name,latitude,longitude,period,region,typology from Heritage where g2 = true', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//game1 (per game2)
	/*this.getVisitedHeritagesGame2 = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT heritage from G2h where game2 = ?',code, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	this.getVisitedHeritagesGame2 = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT h.latitude,h.longitude from (G2h g,User u,Heritage h) where u.email=? AND u.game2=g.game2 AND h.name=g.heritage',email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//game1:ottieni tutti gli elementi del tesoro relativo all'heritage passato come parametro
	/*this.getTreasureElements = function(name,res){
		connection.acquire(function(err,con){
			con.query('SELECT code,latitude,longitude,info from Treasure where heritage = ?', name,function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	//game1:ottieni tutti gli elementi del tesoro passato come parametro
	this.getInfoTreasure = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT info,latitude,longitude from Treasure where code = ?', code,function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game1: ottieni i tesori trovati(saranno i marker verdi nella mappa)
	/*this.getFoundTreasures = function(name,res){
		connection.acquire(function(err,con){
			con.query('SELECT found from Mt where treasure = ?',name, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	//game1: ottieni i tesori trovati dall'utente(saranno i marker verdi nella mappa)
	/*this.getTreasureElements = function(email,code,res){
		connection.acquire(function(err,con){
			con.query('select t.code,t.latitude,t.longitude,t.info,g.found from (Gt g,Treasure t,User u) where u.email=? AND u.game1=g.game1 AND t.heritage=? AND t.code=g.treasure',[email,code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	//game1: ottieni i tesori trovati dall'utente(saranno i marker verdi nella mappa)
	this.getTreasureElements = function(name,res){
		connection.acquire(function(err,con){
			con.query('select code,latitude,longitude,info from Treasure WHERE heritage=?',name, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game1: controlla se il tesoro appartiene a GT (quindi se è stato trovato dall'utente)
	this.checkTreasureFound = function(code_treas,code_game,res){
		connection.acquire(function(err,con){
			con.query('SELECT EXISTS(SELECT * from Gt where treasure=? AND game1=?)',[code_treas,code_game], function(err,result){
				con.release();
				console.log(result);
				res.send(result);
			});
		});
	};

	//game1: aggiungi il tesoro a Gt (tesoro trovato dall'utente)
	this.addTreasToGame1 = function(treas_code,game,res){
		connection.acquire(function(err,con){
			con.query('INSERT into Gt (treasure,game1) value(?,?)',[treas_code,game], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};





	//game1: ottieni i tesori trovati dall'utente(saranno i marker verdi nella mappa)
	this.updateFoundTreas = function(code,game,res){
		connection.acquire(function(err,con){
			con.query('UPDATE Gt SET found=1 WHERE treasure =? AND found = 0 AND game1=(SELECT game1 from User where email=?)',[code,game], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game1: dato uno user,restituisce il codice del game1
	/*this.getUserGame = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT game1 from User where email=?',email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/



	//game1: ottieni i tesori trovati dall'utente(saranno i marker verdi nella mappa)
	this.getFoundTreasures = function(code,lat,lon,email,res){
		connection.acquire(function(err,con){
			con.query('SELECT g.found from (Gt g,Treasure t,User u) where g.treasure=? AND t.latitude=? AND t.longitude=? AND u.email=? AND u.game1 = g.game1',[code,lat,lon,email], function(err,result){
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
	this.getAllCards = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Card', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game1:ottieni tutte le carte
	this.getMyCards = function(game,res){
		connection.acquire(function(err,con){
			con.query('select * from Card where code IN (select card from G1c where game1=?) ',game, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	
	/*
	//game1:ottieni le info della carta relativa al tesoro passato come parametro
	this.getTreasureCardInfo = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT name,cost,description from Card where code = any (SELECT card from Tc where treasure = ?)',code, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	//game1:ottieni le info della carta, posseduta dallo user(paramentro), relativa al tesoro (parametro)
	/*this.getTreasureCardInfo = function(email,code,res){
		connection.acquire(function(err,con){
			con.query('SELECT c.name,c.cost,c.description from (Tc t, G1c g,User u, Card c) where u.email=? AND t.treasure=? AND g.card=t.card AND c.code=t.card AND g.game1=u.game1', [email, code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/


	//game1:ottieni le info della carta, posseduta dallo user(paramentro), relativa al tesoro (parametro)
	this.getTreasureCardInfo = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT code,name,cost,description from Card where code = ?', code, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//game1:inserisce la carta generata randomicamente nella relazione TC
	this.addCardToTreasure= function(treas_code,card_code,res){
		connection.acquire(function(err,con){
			con.query('INSERT into Tc (treasure,card) value (?,?)', [treas_code, card_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//game1:inserisce la carta trovata dall'utente nella collezione
	this.addCardToUserCollection= function(game,card_code,res){
		connection.acquire(function(err,con){
			con.query('INSERT into G1c (game1,card) value (?,?)', [game, card_code], function(err,result){
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

	//game3 
	this.getPuzzle = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT code from Puzzle', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	//game3 
	this.getPuzzleFromHeritage = function(name,res){
		connection.acquire(function(err,con){
			con.query('SELECT code from Puzzle where heritage = ?',name, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game3 (livelli)
	this.getPuzzleLevel = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT level from Puzzle where code = ?',code, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game3 (puzzle attivati)
	this.getEnabledPuzzle = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT name from Puzzle where enabled = 1', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//game3 (puzzle disattivati)
	this.getSoonPuzzle = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT name from Puzzle where enabled = 0', function(err,result){
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

	//game3 
	this.getMyPuzzles = function(code,res){
		connection.acquire(function(err,con){
			con.query('SELECT name from Puzzle where code in (SELECT puzzle from G3p where game3 = ?)',code, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.acquirePuzzle = function(game,puzzle,res){
		connection.acquire(function(err,con){
			con.query('INSERT into G3p (game3,puzzle) values (?,?)', [game, puzzle], function(err,result){
				console.log(result);
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


	//per tutti i games(achievement description)
	this.getUserFromSession = function(session,res){
		connection.acquire(function(err,con){
			con.query('SELECT email from User where session = ?', session, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	//per tutti i games(achievement description)
	this.getGame1FromSession = function(session,res){
		connection.acquire(function(err,con){
			con.query('SELECT game1 from User where session = ?', session, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.getGame3FromUser = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT game3 from User where email = ?', email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//Insert user 
	this.createUser = function(email,password,res){
		connection.acquire(function(err,con){
			var game1 = 'game1'+email;
			var game2 = 'game2'+email;
			var game3 = 'game3'+email;
			var game4 = 'game4'+email;
			console.log(game1);
			con.query('SET foreign_key_checks = 0', function(err,result){
				console.log(result);
			});
			con.query('INSERT into User (email,password,game1,game2,game3,game4) values (?,?,?,?,?,?)', [email,password,game1,game2,game3,game4], function(err,result){
				console.log(result);
			});
			con.query('INSERT into Game1 (code, user) values(?,?)', [game1,email], function(err,result){
				console.log(result);
			});
			con.query('INSERT into Game2 (code, user) values(?,?)', [game2,email], function(err,result){
				console.log(result);
			});
			con.query('INSERT into Game3 (code, user) values(?,?)', [game3,email], function(err,result){
				console.log(result);
			});
			con.query('INSERT into Game4 (code, user) values(?,?)', [game4,email], function(err,result){
				console.log(result);
			});

			con.query('SET foreign_key_checks = 1', function(err,result){
				console.log(result);
				con.release();
				res.send(result);
			});
		});
	};


	this.checkUser = function(email,password,res){
		connection.acquire(function(err,con){
			con.query('SELECT EXISTS (SELECT * from User where email=? and password=?)', [email, password], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};



	//Insert token  
	this.createSession = function(email,password,res){
		var token = hash.createToken(email,password);
		connection.acquire(function(err,con){
			con.query('UPDATE User set session=? where email=?', [token, email], function(err,result){
				con.release();
				res.send(token);
			});
		});
	};	

	this.getSession = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT session from User where email = ?', email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};


	//Delete token  
	this.deleteSession = function(email,res){
		connection.acquire(function(err,con){
			con.query('UPDATE User set session=NULL where email=?', email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};	

	//Insert password
	this.setPassword = function(password,email,res){
		connection.acquire(function(err,con){
			con.query('UPDATE User set password=? where email=?', [password,email], function(err,result){
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



	

	//Inizio Authoring Tool--------

	this.getProva = function(email,res){
		connection.acquire(function(err,con){
			con.query('SELECT session from User where email = ?', email, function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	//Fine Authoring Tool --------







	
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