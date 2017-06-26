//var todo = require('/root/todo');
var todo = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\todo_v2');

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
			
			app.get('/addImage/:img_code/:img_path/:img_filename', function(req,res){
				todo.addImage(req.params.img_code,req.params.img_path,req.params.img_filename,res);
			});
			
			app.get('/updImage/:img_path/:img_filename/:img_code',function(req,res){
				todo.updImage(req.params.img_path,req.params.img_filename,req.params.img_code,res);
			});
			
			app.get('/getAllCategories/',function(req,res){
				todo.getAllCategories(res);
			});
			
			app.get('/getAllRarities/',function(req,res){
				todo.getAllRarities(res);
			});
			
			app.get('/getAllRoles/',function(req,res){
				todo.getAllRoles(res);
			});
			
			app.get('/getAllRegions/',function(req,res){
				todo.getAllRegions(res);
			});
			
			app.get('/getAllProvinces/:reg_name',function(req,res){
				todo.getAllProvinces(req.params.reg_name,res);
			});
			
			app.get('/getAllHistoricalPeriods/',function(req,res){
				todo.getAllHistoricalPeriods(res);
			});
			
			app.get('/getAllStructureTypes/',function(req,res){
				todo.getAllStructureTypes(res);
			});
			
			app.get('/getAllOrganizations/',function(req,res){
				todo.getAllOrganizations(res);
			});
			
			app.get('/addCoordinates/:coo_code/:coo_latitude/:coo_longitude', function(req,res){
				todo.addCoordinates(req.params.coo_code,req.params.coo_latitude,req.params.coo_longitude,res);
			});
			
			app.get('/updCoordinates/:coo_latitude/:coo_longitude/:coo_code',function(req,res){
				todo.updCoordinates(req.params.coo_latitude,req.params.coo_longitude,req.params.coo_code,res);
			});
			
			app.get('/getAllMedals/',function(req,res){
				todo.getAllMedals(res);
			});

			app.get('/getMedal/:medal_code',function(req,res){
				todo.getMedal(req.params.medal_code,res);
			});

			app.get('/addMedal/:medal_code/:medal_name/:medal_category/:medal_num/:medal_image', function(req,res){
				todo.addMedal(req.params.medal_code,req.params.medal_name,req.params.medal_category,req.params.medal_num,req.params.medal_image,res);
			});
			
			app.get('/updMedal/:medal_name/:medal_category/:medal_num/:medal_image/:medal_code',function(req,res){
				todo.updMedal(req.params.medal_name,req.params.medal_category,req.params.medal_num,req.params.medal_image,req.params.medal_code,res);
			});

			app.get('/delMedal/:medal_code', function(req,res){
				todo.delMedal(req.params.medal_code,res);
			});			
			
			app.get('/getAllCards/',function(req,res){
				todo.getAllCards(res);
			});
			
			app.get('/getCard/:card_code',function(req,res){
				todo.getCard(req.params.card_code,res);
			});
			
			app.get('/addCard/:card_code/:card_name/:card_image/:card_description/:card_cardvalue/:card_destructionvalue/:card_cost/:card_rarity', function(req,res){
				todo.addCard(req.params.card_code,req.params.card_name,req.params.card_image,req.params.card_description,req.params.card_cardvalue,req.params.card_destructionvalue,req.params.card_cost,req.params.card_rarity,res);
			});
			
			app.get('/updCard/:card_name/:card_image/:card_description/:card_cardvalue/:card_destructionvalue/:card_cost/:card_rarity/:card_code',function(req,res){
				todo.updCard(req.params.card_name,req.params.card_image,req.params.card_description,req.params.card_cardvalue,req.params.card_destructionvalue, req.params.card_cost,req.params.card_rarity,req.params.card_code,res);
			});
			
			app.get('/delCard/:card_code', function(req,res){
				todo.delCard(req.params.card_code,res);
			});
			
			app.get('/getUser/:user_email',function(req,res){
				todo.getUser(req.params.user_email,res);
			});
			
			app.get('/addUser/:user_code/:user_email/:user_password/:user_role', function(req,res){
				todo.addUser(req.params.user_code,req.params.user_email,req.params.user_password,req.params.user_role,res);
			});
			
			app.get('/addAdmin/:admin_code/:admin_user', function(req,res){
				todo.addAdmin(req.params.admin_code,req.params.admin_user,res);
			});
			
			app.get('/getAllCulturalOrganizations/',function(req,res){
				todo.getAllCulturalOrganizations(res);
			});
				
			app.get('/addCulturalOrganization/:corg_code/:corg_user/:corg_name', function(req,res){
				todo.addCulturalOrganization(req.params.corg_code,req.params.corg_user,req.params.corg_name,res);
			});
			
			app.get('/addCulturalOperator/:cop_code/:cop_user/:cop_organization', function(req,res){
				todo.addCulturalOperator(req.params.cop_code,req.params.cop_user,req.params.cop_organization,res);
			});
			
			app.get('/getOperatorCHs/:operator_email', function(req,res){
				todo.getOperatorCHs(req.params.operator_email,res);
			});
			
			app.get('/getCH/:ch_code',function(req,res){
				todo.getCH(req.params.ch_code,res);
			});
			
			app.get('/addCH/:ch_code/:ch_name/:ch_description/:ch_image/:ch_g1/:ch_g2/:ch_g3/:ch_g4/:ch_coordinates/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_operator', function(req,res){
				todo.addCH(req.params.ch_code,req.params.ch_name,req.params.ch_description,req.params.ch_image,req.params.ch_g1,req.params.ch_g2,req.params.ch_g3,req.params.ch_g4,req.params.ch_coordinates,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_operator,res);
			});
			
			app.get('/updCH/:ch_name/:ch_description/:ch_image/:ch_g1/:ch_g2/:ch_g3/:ch_g4/:ch_coordinates/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_operator/:ch_code', function(req,res){
				todo.updCH(req.params.ch_name,req.params.ch_description,req.params.ch_image,req.params.ch_g1,req.params.ch_g2,req.params.ch_g3,req.params.ch_g4,req.params.ch_coordinates,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_operator,req.params.ch_code,res);
			});
			
			app.get('/delCH/:ch_code', function(req,res){
				todo.delCH(req.params.ch_code,res);
			});
			
			app.get('/getGame1CHs/:operator_email', function(req,res){
				todo.getGame1CHs(req.params.operator_email,res);
			});
			
			app.get('/getCHSiteInformation/:ch_code', function(req,res){
				todo.getCHSiteInformation(req.params.ch_code,res);
			});
			
			app.get('/addCHSiteInformation/:chsi_code/:chsi_title/:chsi_description/:chsi_image/:chsi_heritage', function(req,res){
				todo.addCHSiteInformation(req.params.chsi_code,req.params.chsi_title,req.params.chsi_description,req.params.chsi_image,req.params.chsi_heritage,res);
			});

			app.get('/updCHSiteInformation/:chsi_title/:chsi_description/:chsi_image/:chsi_heritage/:chsi_code', function(req,res){
				todo.updCHSiteInformation(req.params.chsi_title,req.params.chsi_description,req.params.chsi_image,req.params.chsi_heritage,req.params.chsi_code,res);
			});

			app.get('/getCHTreasureChests/:ch_code', function(req,res){
				todo.getCHTreasureChests(req.params.ch_code,res);
			});
			
			app.get('/getTreasureChest/:chest_code', function(req,res){
				todo.getTreasureChest(req.params.chest_code,res);
			});
			
			app.get('/addTreasureChest/:chest_code/:chest_title/:chest_description/:chest_coordinates/:chest_heritage', function(req,res){
				todo.addTreasureChest(req.params.chest_code,req.params.chest_title,req.params.chest_description,req.params.chest_coordinates,req.params.chest_heritage,res);
			});
			
			app.get('/updTreasureChest/:chest_title/:chest_description/:chest_coordinates/:chest_heritage/:chest_code', function(req,res){
				todo.updTreasureChest(req.params.chest_title,req.params.chest_description,req.params.chest_coordinates,req.params.chest_heritage,req.params.chest_code,res);
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
			
			app.get('/getGame3CHsWithPaths/:operator_email', function(req,res){
				todo.getGame3CHsWithPaths(req.params.operator_email,res);
			});

			app.get('/addQuestion/:question_code/:question_question/:question_hintonsite/:question_hintbypaying/:question_answer', function(req,res){
				todo.addQuestion(req.params.question_code,req.params.question_question,req.params.question_hintonsite,req.params.question_hintbypaying,req.params.question_answer,res);
			});
			
			app.get('/updQuestion/:question_question/:question_hintonsite/:question_hintbypaying/:question_answer/:question_code', function(req,res){
				todo.updQuestion(req.params.question_question,req.params.question_hintonsite,req.params.question_hintbypaying,req.params.question_answer,req.params.question_code,res);
			});
			
			app.get('/getCHPaths/:ch_code', function(req,res){
				todo.getCHPaths(req.params.ch_code,res);
			});
		
			app.get('/getPath/:path_code', function(req,res){
				todo.getPath(req.params.path_code,res);
			});
			
			app.get('/addPath/:path_code/:path_title/:path_question/:path_enabled/:path_heritage', function(req,res){
				todo.addPath(req.params.path_code,req.params.path_title,req.params.path_question,req.params.path_enabled,req.params.path_heritage,res);
			});
			
			app.get('/updPath/:path_title/:path_question/:path_enabled/:path_heritage/:path_code', function(req,res){
				todo.updPath(req.params.path_title,req.params.path_question,req.params.path_enabled,req.params.path_heritage,req.params.path_code,res);
			});
			
			app.get('/delPath/:path_code', function(req,res){
				todo.delPath(req.params.path_code,res);
			});
			
			app.get('/getCHStages/:ch_code', function(req,res){
				todo.getCHStages(req.params.ch_code,res);
			});

			app.get('/getPathStages/:path_code', function(req,res){
				todo.getPathStages(req.params.path_code,res);
			});
			
			app.get('/getStage/:stage_code', function(req,res){
				todo.getStage(req.params.stage_code,res);
			});
			
			app.get('/addStage/:stage_code/:stage_title/:stage_curiosity/:stage_question/:stage_coordinates/:stage_path', function(req,res){
				todo.addStage(req.params.stage_code,req.params.stage_title,req.params.stage_curiosity,req.params.stage_question,req.params.stage_coordinates,req.params.stage_path,res);
			});
			
			app.get('/updStage/:stage_title/:stage_curiosity/:stage_question/:stage_coordinates/:stage_path/:stage_code', function(req,res){
				todo.updStage(req.params.stage_title,req.params.stage_curiosity,req.params.stage_question,req.params.stage_coordinates,req.params.stage_path,req.params.stage_code,res);
			});
			
			app.get('/delStage/:stage_code', function(req,res){
				todo.delStage(req.params.stage_code,res);
			});
			
			
			
			
			
			app.get('/getGame4CHs/:operator_email', function(req,res){
				todo.getGame4CHs(req.params.operator_email,res);
			});
			
			/*app.get('/getCHInfopoints/:ch_code', function(req,res){
				todo.getCHInfopoints(req.params.ch_code,res);
			});
			
			app.get('/getInfopoint/:ip_code', function(req,res){
				todo.getInfopoint(req.params.ip_code,res);
			});
			
			app.get('/addInfopoint/:ip_code/:ip_description/:ip_path/:ip_latitude/:ip_longitude/:ip_views/:ip_heritage', function(req,res){
				todo.addInfopoint(req.params.ip_code,req.params.ip_description,req.params.ip_path,req.params.ip_latitude,req.params.ip_longitude,req.params.ip_views,req.params.ip_heritage,res);
			});
			
			app.get('/updInfopoint/:ip_description/:ip_path/:ip_latitude/:ip_longitude/:ip_views/:ip_heritage/:ip_code', function(req,res){
				todo.updInfopoint(req.params.ip_description,req.params.ip_path,req.params.ip_latitude,req.params.ip_longitude,req.params.ip_views,req.params.ip_heritage,req.params.ip_code,res);
			});
			
			app.get('/delInfopoint/:ip_code', function(req,res){
				todo.delInfopoint(req.params.ip_code,res);
			});
			*/
			app.get('/getCHEnciclopedicPage/:ch_code', function(req,res){
				todo.getCHEnciclopedicPage(req.params.ch_code,res);
			});
			
			app.get('/addCHEnciclopedicPage/:chep_code/:chep_title/:chep_description/:chep_curiosity/:chep_image/:chep_heritage', function(req,res){
				todo.addCHEnciclopedicPage(req.params.chep_code,req.params.chep_title,req.params.chep_description,req.params.chep_curiosity,req.params.chep_image,req.params.chep_heritage,res);
			});
			
			app.get('/updCHEnciclopedicPage/:chep_title/:chep_description/:chep_curiosity/:chep_image/:chep_heritage/:chep_code', function(req,res){
				todo.updCHEnciclopedicPage(req.params.chep_title,req.params.chep_description,req.params.chep_curiosity,req.params.chep_image,req.params.chep_heritage,req.params.chep_code,res);
			});

			app.get('/getCHReviewsList/:ch_code', function(req,res){
				todo.getCHReviewsList(req.params.ch_code,res);
			});
			
			app.get('/delReview/:game4_code/:ch_code', function(req,res){
				todo.delReview(req.params.game4_code,req.params.ch_code,res);
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