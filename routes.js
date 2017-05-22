//var todo = require('/root/todo');
var todo = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\todo');

module.exports = {
		configure: function(app){
			
			app.get('/getHeritagesGame1/',function(req,res){
				todo.getHeritagesGame1(res);
			});

			app.get('/getCoordinatesHeritage/:name',function(req,res){
				todo.getCoordinatesHeritage(req.params.name,res);
			});

			app.get('/getVisitedHeritagesCount/:email',function(req,res){
				todo.getVisitedHeritagesCount(req.params.email,res);
			});

			app.get('/getHeritagesCount/',function(req,res){
				todo.getHeritagesCount(res);
			});

			app.get('/getVisitedHeritagesGame2/:email',function(req,res){
				todo.getVisitedHeritagesGame2(req.params.email,res);
			});

			


			app.get('/getInfoTreasure/:code',function(req,res){
				todo.getInfoTreasure(req.params.code,res);
			});
			

			app.get('/getHeritagesGame2/',function(req,res){
				todo.getHeritagesGame2(res);
			});

			

			/*app.get('/getFoundTreasures/:code',function(req,res){
				todo.getFoundTreasures(req.params.code,res);
			});*/

			/*app.get('/getTreasureElements/:email/:code',function(req,res){
				todo.getTreasureElements(req.params.email,req.params.code,res);
			});*/

			app.get('/getTreasureElements/:name',function(req,res){
				todo.getTreasureElements(req.params.name,res);
			});

			app.get('/checkTreasureFound/:code_treas/:code_game',function(req,res){
				todo.checkTreasureFound(req.params.code_treas,req.params.code_game,res);
			});

			app.get('/addTreasToGame1/:treas_code/:game',function(req,res){
				todo.addTreasToGame1(req.params.treas_code,req.params.game,res);
			});
			
			

			app.get('/updateFoundTreas/:code/:game',function(req,res){
				todo.updateFoundTreas(req.params.code,req.params.game,res);
			});
			
			/*app.get('/getUserGame/:email',function(req,res){
				todo.getUserGame(req.params.email,res);
			});*/
			

			app.get('/getFoundTreasures/:code/:lat/:lon/:email',function(req,res){
				todo.getFoundTreasures(req.params.code,req.params.lat,req.params.lon,req.params.email,res);
			});
			

				
			//********GESTIONE CARTE*********//
			app.get('/getCardCount/',function(req,res){
				todo.getCardCount(res);
			});

			app.get('/getCardCode/',function(req,res){
				todo.getCardCode(res);
			});

			app.get('/getAllCards/',function(req,res){
				todo.getAllCards(res);
			});

			app.get('/getMyCards/:game',function(req,res){
				todo.getMyCards(req.params.game,res);
			});

			

			/*app.get('/getTreasureCardInfo/:code',function(req,res){
				todo.getTreasureCardInfo(req.params.code,res);
			});*/

			/*app.get('/getTreasureCardInfo/:email/:code',function(req,res){
				todo.getTreasureCardInfo(req.params.email,req.params.code,res);
			});*/

			app.get('/getTreasureCardInfo/:code',function(req,res){
				todo.getTreasureCardInfo(req.params.code,res);
			});


			app.get('/addCardToTreasure/:treas_code/:card_code',function(req,res){
				todo.addCardToTreasure(req.params.treas_code,req.params.card_code,res);
			});

			app.get('/addCardToUserCollection/:game/:card_code',function(req,res){
				todo.addCardToUserCollection(req.params.game,req.params.card_code,res);
			});
			
			
				




	
			

			//********FINE GESTIONE CARTE*********//


			app.get('/getMedals/:type',function(req,res){
				todo.getMedals(req.params.type,res);
			});

			app.get('/getPuzzle/',function(req,res){
				todo.getPuzzle(res);
			});

			app.get('/getPuzzleFromHeritage/:name',function(req,res){
				todo.getPuzzleFromHeritage(req.params.name,res);
			});

			app.get('/getEnabledPuzzle/',function(req,res){
				todo.getEnabledPuzzle(res);
			});

			app.get('/getSoonPuzzle/',function(req,res){
				todo.getSoonPuzzle(res);
			});

			app.get('/getPuzzleDescription/:code',function(req,res){
				todo.getPuzzleDescription(req.params.code,res);
			});

			app.get('/getPuzzleAnswer/:code',function(req,res){
				todo.getPuzzleAnswer(req.params.code,res);
			});

			app.get('/getPuzzleHint/:code',function(req,res){
				todo.getPuzzleHint(req.params.code,res);
			});

			app.get('/getPuzzleCode/:name',function(req,res){
				todo.getPuzzleCode(req.params.name,res);
			});

			app.get('/getMyPuzzles/:code',function(req,res){
				todo.getMyPuzzles(req.params.code,res);
			});

			app.get('/getGame3FromUser/:email',function(req,res){
				todo.getGame3FromUser(req.params.email,res);
			});

			app.get('/acquirePuzzle/:game/:puzzle',function(req,res){
				todo.acquirePuzzle(req.params.game,req.params.puzzle,res);
			});


			app.get('/getAchievementGame1/',function(req,res){
				todo.getAchievementGame1(res);
			});

			app.get('/getAchievementGame2/',function(req,res){
				todo.getAchievementGame2(res);
			});
			app.get('/getAchievementGame3/',function(req,res){
				todo.getAchievementGame3(res);
			});

			app.get('/getAchievementGame4/',function(req,res){
				todo.getAchievementGame4(res);
			});

			app.get('/getAchievementName/:code/',function(req,res){
				todo.getAchievementName(req.params.code,res);
			});

			app.get('/getAchievementElements/:code/',function(req,res){
				todo.getAchievementElements(req.params.code,res);
			});
			
			/*app.get('/getAchievementDescr/:code',function(req,res){
				todo.getAchievementDescr(req.params.code,res);
			});*/

			app.get('/getUserFromSession/:session',function(req,res){
				todo.getUserFromSession(req.params.session,res);
			});
			
			app.get('/getGame1FromSession/:session',function(req,res){
				todo.getGame1FromSession(req.params.session,res);
			});

			

			//Insert email e password per login
			app.get('/createUser/:email/:password',function(req,res){
				todo.createUser(req.params.email,req.params.password,res);
			});

			app.get('/checkUser/:email/:password',function(req,res){
				todo.checkUser(req.params.email,req.params.password,res);
			});

			
			


			app.get('/createSession/:email/:password',function(req,res){
				todo.createSession(req.params.email,req.params.password,res);
			});

			app.get('/getSession/:email',function(req,res){
				todo.getSession(req.params.email,res);
			});

			app.get('/deleteSession/:email',function(req,res){
				todo.deleteSession(req.params.email,res);
			});

			app.get('/setPassword/:password/:email',function(req,res){
				todo.setPassword(req.params.password,req.params.email,res);
			});

			app.get('/setTitle/:title/:email',function(req,res){
				todo.setTitle(req.params.title,req.params.email,res);
			});

			app.get('/setCoins/:coins/:email',function(req,res){
				todo.setCoins(req.params.coins,req.params.email,res);
			});



		//Inizio Authoring Tool------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			
			app.get('/addCulturalOrganization/:co_email/:co_password/:co_role/:co_supervisor', function(req,res){
				todo.addCulturalOrganization(req.params.co_email,req.params.co_password,req.params.co_role,req.params.co_supervisor,res);
			});
			
			app.get('/delCulturalOrganization/:co_email', function(req,res){
				todo.delCulturalOrganization(req.params.co_email,res);
			});
			
			app.get('/getCulturalOrganization/:co_email',function(req,res){
				todo.getCulturalOrganization(req.params.co_email,res);
			});
			
			app.get('/getAllCulturalOrganizations/',function(req,res){
				todo.getAllCulturalOrganizations(res);
			});
			
			app.get('/getCard/:card_code',function(req,res){
				todo.getCard(req.params.card_code,res);
			});

			app.get('/addCard/:card_code/:card_name/:card_path/:card_description/:card_cardvalue/:card_destructionvalue/:card_rarity', function(req,res){
				todo.addCard(req.params.card_code,req.params.card_name,req.params.card_path,req.params.card_description,req.params.card_cardvalue,req.params.card_destructionvalue,req.params.card_rarity,res);
			});

			app.get('/updCard/:card_name/:card_path/:card_description/:card_cardvalue/:card_destructionvalue/:card_rarity/:card_code',function(req,res){
				todo.updCard(req.params.card_name,req.params.card_path,req.params.card_description,req.params.card_cardvalue,req.params.card_destructionvalue,req.params.card_rarity,req.params.card_code,res);
			});

			app.get('/delCard/:card_code', function(req,res){
				todo.delCard(req.params.card_code,res);
			});

			app.get('/getAllMedals/',function(req,res){
				todo.getAllMedals(res);
			});
			
			app.get('/getMedal/:medal_name',function(req,res){
				todo.getMedal(req.params.medal_name,res);
			});

			app.get('/addMedal/:medal_code/:medal_name/:medal_category/:medal_num/:medal_path', function(req,res){
				todo.addMedal(req.params.medal_code,req.params.medal_name,req.params.medal_category,req.params.medal_num,req.params.medal_path,res);
			});
			
			app.get('/updMedal/:medal_name/:medal_category/:medal_num/:medal_path/:medal_code',function(req,res){
				todo.updMedal(req.params.medal_name,req.params.medal_category,req.params.medal_num,req.params.medal_path,req.params.medal_code,res);
			});

			app.get('/delMedal/:medal_code', function(req,res){
				todo.delMedal(req.params.medal_code,res);
			});
			
			app.get('/getOperatorCHs/:operator_email', function(req,res){
				todo.getOperatorCHs(req.params.operator_email,res);
			});
			
			app.get('/getCH/:ch_code',function(req,res){
				todo.getCH(req.params.ch_code,res);
			});
			
			app.get('/addCH/:ch_code/:ch_name/:ch_description/:ch_path/:ch_g1/:ch_g2/:ch_g3/:ch_g4/:ch_latitude/:ch_longitude/:ch_region/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_culturalorganization', function(req,res){
				todo.addCH(req.params.ch_code,req.params.ch_name,req.params.ch_description,req.params.ch_path,req.params.ch_g1,req.params.ch_g2,req.params.ch_g3,req.params.ch_g4,req.params.ch_latitude,req.params.ch_longitude,req.params.ch_region,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_culturalorganization,res);
			});
			
			app.get('/updCH/:ch_name/:ch_description/:ch_path/:ch_g1/:ch_g2/:ch_g3/:ch_g4/:ch_latitude/:ch_longitude/:ch_region/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_culturalorganization/:ch_code', function(req,res){
				todo.updCH(req.params.ch_name,req.params.ch_description,req.params.ch_path,req.params.ch_g1,req.params.ch_g2,req.params.ch_g3,req.params.ch_g4,req.params.ch_latitude,req.params.ch_longitude,req.params.ch_region,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_culturalorganization,req.params.ch_code,res);
			});
			
			app.get('/delCH/:ch_code', function(req,res){
				todo.delCH(req.params.ch_code,res);
			});
			
			app.get('/getGame1CHs/:operator_email', function(req,res){
				todo.getGame1CHs(req.params.operator_email,res);
			});
			
			app.get('/getCHSiteInformation/:chsi_code', function(req,res){
				todo.getCHSiteInformation(req.params.chsi_code,res);
			});
			
			app.get('/addCHSiteInformation/:chsi_code/:chsi_title/:chsi_description/:chsi_path/:chsi_heritage', function(req,res){
				todo.addCHSiteInformation(req.params.chsi_code,req.params.chsi_title,req.params.chsi_description,req.params.chsi_path,req.params.chsi_heritage,res);
			});
			
			app.get('/updCHSiteInformation/:chsi_title/:chsi_description/:chsi_path/:chsi_heritage/:chsi_code', function(req,res){
				todo.updCHSiteInformation(req.params.chsi_title,req.params.chsi_description,req.params.chsi_path,req.params.chsi_heritage,req.params.chsi_code,res);
			});
			
			app.get('/getCHTreasureChests/:ch_code', function(req,res){
				todo.getCHTreasureChests(req.params.ch_code,res);
			});
			
			app.get('/getTreasureChest/:chest_code', function(req,res){
				todo.getTreasureChest(req.params.chest_code,res);
			});
			
			app.get('/addTreasureChest/:chest_code/:chest_title/:chest_description/:chest_latitude/:chest_longitude/:chest_heritage', function(req,res){
				todo.addTreasureChest(req.params.chest_code,req.params.chest_title,req.params.chest_description,req.params.chest_latitude,req.params.chest_longitude,req.params.chest_heritage,res);
			});
			
			app.get('/updTreasureChest/:chest_title/:chest_description/:chest_latitude/:chest_longitude/:chest_heritage/:chest_code', function(req,res){
				todo.updTreasureChest(req.params.chest_title,req.params.chest_description,req.params.chest_latitude,req.params.chest_longitude,req.params.chest_heritage,req.params.chest_code,res);
			});
			
			app.get('/delTreasureChest/:chest_code', function(req,res){
				todo.delTreasureChest(req.params.chest_code,res);
			});
			
			app.get('/getGame2CHs/:operator_email', function(req,res){
				todo.getGame2CHs(req.params.operator_email,res);
			});
			
			app.get('/getGame3CHs/:operator_email', function(req,res){
				todo.getGame3CHs(req.params.operator_email,res);
			});
			
			app.get('/getGame4CHs/:operator_email', function(req,res){
				todo.getGame4CHs(req.params.operator_email,res);
			});
			
/*			app.get('/getCHInfopoints/:ch_code', function(req,res){
				todo.getCHInfopoints(req.params.ch_code,res);
			});*/
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//Query di prova
			app.get('/getProva/:email',function(req,res){
				todo.getProva(req.params.email,res);
			});


		//Fine Authoring Tool ------------------------------------------------------------------------------------------------------------------------------------------------------------------------




			app.post('/post/',function(req,res){
				todo.create(req.body, res);
			});
			app.put('/todo/',function(req,res){
				todo.update(req.body, res);
			});
			app.delete('/todo/:id/',function(req,res){
				todo.cancel(req.params.id, res);
			});
			
		}
};