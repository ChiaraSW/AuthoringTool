//var connection = require('/root/connection');
//var hash = require('/root/hash');

var connection = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\connection_v2');
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
			con.query('SELECT t.code,t.latitude,t.longitude,t.info,g.found from (Gt g,Treasure t,User u) where u.email=? AND u.game1=g.game1 AND t.heritage=? AND t.code=g.treasure',[email,code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};*/

	//game1: ottieni i tesori trovati dall'utente(saranno i marker verdi nella mappa)
	this.getTreasureElements = function(name,res){
		connection.acquire(function(err,con){
			con.query('SELECT code,latitude,longitude,info from Treasure WHERE heritage=?',name, function(err,result){
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
	this.getMyCards = function(game,res){
		connection.acquire(function(err,con){
			con.query('SELECT  * from Card where code IN (select card from G1c where game1=?) ',game, function(err,result){
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
	
	this.getAllStructureTypes= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT * from Structuretype', function(err,result){
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
	
	this.getAllMedals= function(res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category as category, c.name as cName, m.num, m.image as image, i.path, i.filename FROM (Medal m, Image i, Category c) WHERE m.image=i.code AND m.category=c.code', function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
		
	this.getMedal= function(medal_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT m.code, m.name, m.category, c.name as cName, m.num, m.image, i.path, i.filename FROM (Medal m, Image i, Category c) WHERE m.image=i.code AND m.category=c.code AND m.code=?', [medal_code], function(err,result){
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
	
	this.getAllCards = function(res){
		connection.acquire(function(err,con){
			con.query('SELECT c.code, c.name, c.image as image, i.path, i.filename, c.description, c.cardvalue, c.destructionvalue, c.cost, r.name as rName FROM (Card c, Image i, Rarity r) WHERE c.image=i.code AND c.rarity=r.code', function(err,result){
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
	
	this.addCulturalOrganization = function(corg_code, corg_user, corg_name, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Organization (code, user, admin, name) value (?,?,null,?)', [corg_code, corg_user, corg_name], function(err,result){
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
			con.query('SELECT h.code, h.name, h.description, i.path, i.filename, h.g1, h.g2, h.g3, h.g4, c.latitude, c.longitude, p.name as province, r.name as region, hp.name as historicalperiod, s.name as structuretype, u.email FROM (Heritage h, Operator o, User u, Image i, Coordinates c, Province p, Region r, Historicalperiod hp, Structuretype s) WHERE h.image=i.code AND h.coordinates=c.code AND h.province=p.code AND p.region=r.code AND h.historicalperiod=hp.code AND h.structuretype=s.code AND h.operator=o.code AND o.user=u.code AND u.email = ?', [operator_email], function(err,result){
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
		
	this.getCHPaths = function(ch_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT p.code, p.title, h.name as heritage FROM (Path p, Heritage h) WHERE p.heritage=h.code AND h.code=? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getPath = function(path_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT p.code, p.title, q.code as questionCode, q.question, q.hintonsite, q.hintbypaying, q.answer, h.code as heritage FROM (Path p, Question q, Heritage h) WHERE p.question=q.code AND p.heritage=h.code AND p.code = ? ', [path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.addPath = function(path_code, path_title, path_question, path_enabled, path_heritage, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Path (code, title, question, enabled, heritage) value (?,?,?,?,?)', [path_code, path_title, path_question, path_enabled, path_heritage], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.updPath = function(path_title, path_question, path_enabled, path_heritage, path_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Path set title=?, question=?, enabled=?, heritage=? WHERE code=?', [path_title, path_question, path_enabled, path_heritage, path_code], function(err,result){
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

	this.getCHStages = function(ch_code, res){ 
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.coordinates as cooCode, c.latitude, c.longitude, p.code as pathCode, p.heritage as heritage FROM (Stage s, Coordinates c, Path p) WHERE s.path=p.code AND s.coordinates=c.code AND p.heritage=? ', [ch_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getPathStages = function(path_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.curiosity, q.code as questionCode, q.question, q.hintonsite, q.hintbypaying, q.answer, c.code as cooCode, c.latitude, c.longitude, p.code as pathCode FROM (Stage s, Question q, Coordinates c, Path p) WHERE s.path=p.code AND s.question=q.code AND s.coordinates=c.code AND p.code=? ', [path_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.getStage = function(stage_code, res){
		connection.acquire(function(err,con){
			con.query('SELECT s.code, s.title, s.curiosity, q.code as questionCode, q.question, q.hintonsite, q.hintbypaying, q.answer, c.code as cooCode, c.latitude, c.longitude, s.path as pathCode FROM (Stage s, Question q, Coordinates c) WHERE s.coordinates=c.code AND s.question=q.code AND s.code = ? ', [stage_code], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};
	
	this.addStage = function(stage_code, stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, res){
		connection.acquire(function(err,con){
			con.query('INSERT into Stage (code, title, curiosity, question, coordinates, path) value (?,?,?,?,?,?)', [stage_code, stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path], function(err,result){
				con.release();
				res.send(result);
			});
		});
	};

	this.updStage = function(stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_code, res){
		connection.acquire(function(err,con){
			con.query('UPDATE Stage set title=?, curiosity=?, question=?, coordinates=?, path=? WHERE code=?', [stage_title, stage_curiosity, stage_question, stage_coordinates, stage_path, stage_code], function(err,result){
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
			con.query('SELECT h.name as chName, h.code as chCode, r.review, r.likes, r.dislikes, p.id as player, p.username as username FROM (Review r, Heritage h, Player p)  WHERE r.heritage=h.code AND r.player=p.id AND r.heritage = ?', [ch_code], function(err,result){
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