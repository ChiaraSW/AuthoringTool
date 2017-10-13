//var todo = require('/root/todo_v2');

//var todo = require('/root/todo');
var todo = require('C:\\Users\\Chiara\\Documents\\WinSCP\\Server-AuthoringTool\\todo_v2');

module.exports = {
		configure: function(app){

			app.get('/testFunction/',function(req,res){
				todo.testFunction(res);
			});

			app.get('/search/:query',function(req,res){
				todo.search(req.params.query, res);
			});

			app.get('/getRankingByCards/',function(req,res){
				todo.getRankingByCards(res);
			});

			app.get('/getRankingByPaths/',function(req,res){
				todo.getRankingByPaths(res);
			});

			app.get('/getRankingByMedals/',function(req,res){
				todo.getRankingByMedals(res);
			});

			app.get('/canAdvanceInRankingWithNextTreasure/:email',function(req,res){
				todo.canAdvanceInRankingWithNextTreasure(req.params.email,res);
			});

			app.get('/canAdvanceInRankingWithNextHeritage/:email',function(req,res){
				todo.canAdvanceInRankingWithNextHeritage(req.params.email,res);
			});

			app.get('/getAllHeritages/:email',function(req,res){
				todo.getAllHeritages(req.params.email, res);
			});

			app.get('/getAllTreasures/:email',function(req,res){
				todo.getAllTreasures(req.params.email, res);
			});
			
			app.get('/getHeritagesGame1/',function(req,res){
				todo.getHeritagesGame1(res);
			});

			app.get('/getCoordinatesHeritage/:name',function(req,res){
				todo.getCoordinatesHeritage(req.params.name,res);
			});

			app.get('/getVisitedHeritagesCodes/:email',function(req,res){
				todo.getVisitedHeritagesCodes(req.params.email,res);
			});

			app.get('/getHeritagesCount/',function(req,res){
				todo.getHeritagesCount(res);
			});

			app.get('/getInfoTreasure/:code/:email',function(req,res){
				todo.getInfoTreasure(req.params.code, req.params.email, res);
			});

			app.get('/getHeritagesGame2/:email',function(req,res){
				todo.getHeritagesGame2(req.params.email,res);
			});

			app.get('/addVisitedHeritage/:email/:code/',function(req,res){
				todo.addVisitedHeritage(req.params.email,req.params.code,res);
			});

			app.get('/getHeritageInfo/:code/:email', function(req, res){
				todo.getHeritageInfo(req.params.code, req.params.email, res);
			});

			app.get('/getPlayerMedals/:email', function (req, res) {
			    todo.getPlayerMedals(req.params.email, res);
			});

			app.get('/getTreasureElements/:name/:email',function(req,res){
				todo.getTreasureElements(req.params.name,req.params.email,res);
			});

			app.get('/checkTreasureFound/:email/:code_treas',function(req,res){
				todo.checkTreasureFound(req.params.email,req.params.code_treas,res);
			});

			app.get('/addTreasToPlayer/:email/:code_treas',function(req,res){
				todo.addTreasToPlayer(req.params.email,req.params.code_treas,res);
			});			
			
			//********GESTIONE CARTE*********//

			app.get('/getCardCount/',function(req,res){
				todo.getCardCount(res);
			});

			app.get('/getCardCode/',function(req,res){
				todo.getCardCode(res);
			});

			app.get('/getMyCards/:email',function(req,res){
				todo.getMyCards(req.params.email,res);
			});

			app.get('/getTreasureCardInfo/:code',function(req,res){
				todo.getTreasureCardInfo(req.params.code,res);
			});

			app.get('/getFiveTreasureCardsInfo/:code1/:code2/:code3/:code4/:code5/',function(req,res){
				todo.getFiveTreasureCardsInfo(req.params.code1,req.params.code2,req.params.code3,req.params.code4,req.params.code5,res);
			});

			app.get('/addCardToUserCollection/:email/:card_code',function(req,res){
				todo.addCardToUserCollection(req.params.email,req.params.card_code,res);
			});

			app.get('/addFiveCardsToUserCollection/:email/:card1/:card2/:card3/:card4/:card5/',function(req,res){
				todo.addFiveCardsToUserCollection(req.params.email,req.params.card1,req.params.card2,req.params.card3,req.params.card4,req.params.card5,res);
			});
			
			//********FINE GESTIONE CARTE*********//

			app.get('/getMedals/:type',function(req,res){
				todo.getMedals(req.params.type,res);
			});

			app.get('/getAllPaths/',function(req,res){
				todo.getAllPaths(res);
			});

			app.get('/getMyPathsTitles/:email',function(req,res){
				todo.getMyPathsTitles(req.params.email,res);
			});

			app.get('/getActivePaths/',function(req,res){
				todo.getActivePaths(res);
			});

			app.get('/getUpcomingPaths/',function(req,res){
				todo.getUpcomingPaths(res);
			});

			app.get('/getPathStagesByTitle/:title/:email',function(req,res){
				todo.getPathStagesByTitle(req.params.title, req.params.email, res);
			});

			app.get('/getPathByTitle/:title',function(req,res){
				todo.getPathByTitle(req.params.title, res);
			});

			app.get('/getStageByTitle/:title',function(req,res){
				todo.getStageByTitle(req.params.title, res);
			});

			app.get('/getActiveStages/:email',function(req,res){
				todo.getActiveStages(req.params.email, res);
			});

			app.get('/getStageByCode/:code/:email',function(req,res){
				todo.getStageByCode(req.params.code, req.params.email, res);
			});

			app.get('/submitStageAnswer/:code/:email/:answer',function(req,res){
				todo.submitStageAnswer(req.params.code, req.params.email, req.params.answer, res);
			});

			app.get('/checkStageCompleted/:code/:email',function(req,res){
				todo.checkStageCompleted(req.params.code, req.params.email, res);
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

			app.get('/createPlayer/:email',function(req,res){
				todo.createPlayer(req.params.email,res);
			});

			app.get('/checkPlayer/:email/',function(req,res){
				todo.checkPlayer(req.params.email,res);
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
			
			app.get('/delImage/:img_code', function(req,res){
				todo.delImage(req.params.img_code,res);
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

			app.get('/addHistoricalPeriod/:hp_code/:hp_name', function(req,res){
				todo.addHistoricalPeriod(req.params.hp_code,req.params.hp_name,res);
			});
			
			app.get('/getAllStructureTypes/',function(req,res){
				todo.getAllStructureTypes(res);
			});

			app.get('/addStructureType/:st_code/:st_name', function(req,res){
				todo.addStructureType(req.params.st_code,req.params.st_name,res);
			});
			
			app.get('/getAllOrganizations/',function(req,res){
				todo.getAllOrganizations(res);
			});
			
			app.get('/getAllShapes/',function(req,res){
				todo.getAllShapes(res);
			});
			
			app.get('/addCoordinates/:coo_code/:coo_latitude/:coo_longitude', function(req,res){
				todo.addCoordinates(req.params.coo_code,req.params.coo_latitude,req.params.coo_longitude,res);
			});
			
			app.get('/updCoordinates/:coo_latitude/:coo_longitude/:coo_code',function(req,res){
				todo.updCoordinates(req.params.coo_latitude,req.params.coo_longitude,req.params.coo_code,res);
			});

			app.get('/delCoordinates/:coo_code', function(req,res){
				todo.delCoordinates(req.params.coo_code,res);
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
			
			app.get('/addHeritageMedal/:ch_code/:medal_code', function(req,res){
				todo.addHeritageMedal(req.params.ch_code,req.params.medal_code,res);
			});
			
			/*app.get('/updHeritageMedal/:new_medal_code/:new_ch_code/:old_medal_code/:old_ch_code', function(req,res){
				todo.updHeritageMedal(req.params.new_medal_code,req.params.new_ch_code,req.params.old_medal_code,req.params.old_ch_code,res);
			});*/
			
			app.get('/delHeritageMedal/:ch_code/:medal_code', function(req,res){
				todo.delHeritageMedal(req.params.ch_code,req.params.medal_code,res);
			});	
			
			app.get('/delHeritageMedalByMedalCode/:medal_code', function(req,res){
				todo.delHeritageMedalByMedalCode(req.params.medal_code,res);
			});	
			
			app.get('/getAllRegionMedal',function(req,res){
				todo.getAllRegionMedal(res);
			});
			
			app.get('/getRegionMedalByMedalCode/:medal_code',function(req,res){
				todo.getRegionMedalByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/getRegionMedalByRegionCode/:medal_region',function(req,res){
				todo.getRegionMedalByRegionCode(req.params.medal_region,res);
			});
			
			app.get('/getRegionMedalByRegionName/:medal_region',function(req,res){
				todo.getRegionMedalByRegionName(req.params.medal_region,res);
			});
			
			app.get('/addRegionMedal/:medal_code/:medal_region', function(req,res){
				todo.addRegionMedal(req.params.medal_code,req.params.medal_region,res);
			});

			app.get('/updRegionMedal/:medal_region/:medal_code',function(req,res){
				todo.updRegionMedal(req.params.medal_region,req.params.medal_code, res);
			});
			
			app.get('/delRegionMedal/:medal_code', function(req,res){
				todo.delRegionMedal(req.params.medal_code,res);
			});
			
			app.get('/getAllHPMedal',function(req,res){
				todo.getAllHPMedal(res);
			});
			
			app.get('/getHPMedalByMedalCode/:medal_code',function(req,res){
				todo.getHPMedalByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/getHPMedalByHPCode/:medal_hp',function(req,res){
				todo.getHPMedalByHPCode(req.params.medal_hp,res);
			});
			
			app.get('/addHPMedal/:medal_code/:medal_hp', function(req,res){
				todo.addHPMedal(req.params.medal_code,req.params.medal_hp,res);
			});
			
			app.get('/updHPMedal/:medal_hp/:medal_code',function(req,res){
				todo.updHPMedal(req.params.medal_hp,req.params.medal_code, res);
			});
			
			app.get('/delHPMedal/:medal_code', function(req,res){
				todo.delHPMedal(req.params.medal_code,res);
			});

			app.get('/getAllToSMedal',function(req,res){
				todo.getAllToSMedal(res);
			});
			
			app.get('/getToSMedalByMedalCode/:medal_code',function(req,res){
				todo.getToSMedalByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/getToSMedalByToSCode/:medal_tos',function(req,res){
				todo.getToSMedalByToSCode(req.params.medal_tos,res);
			});
			
			app.get('/addToSMedal/:medal_code/:medal_tos', function(req,res){
				todo.addToSMedal(req.params.medal_code,req.params.medal_tos,res);
			});
			
			app.get('/updToSMedal/:medal_tos/:medal_code',function(req,res){
				todo.updToSMedal(req.params.medal_tos,req.params.medal_code, res);
			});
			
			app.get('/delToSMedal/:medal_code', function(req,res){
				todo.delToSMedal(req.params.medal_code,res);
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
			
			app.get('/getMissionTypes',function(req,res){
				todo.getMissionTypes(res);
			});
			
			app.get('/getMission/:mission_code',function(req,res){
				todo.getMission(req.params.mission_code,res);
			});
			
			app.get('/getAllMissions/',function(req,res){
				todo.getAllMissions(res);
			});

			app.get('/addMission/:mission_code/:mission_title/:mission_num/:mission_missiontype/:mission_granularity', function(req,res){
				todo.addMission(req.params.mission_code,req.params.mission_title,req.params.mission_num,req.params.mission_missiontype,req.params.mission_granularity,res);
			});
			
			app.get('/updMission/:mission_title/:mission_num/:mission_missiontype/:mission_granularity/:mission_code', function(req,res){
				todo.updMission(req.params.mission_title,req.params.mission_num,req.params.mission_missiontype,req.params.mission_granularity,req.params.mission_code,res);
			});
			
			app.get('/delMission/:mission_code', function(req,res){
				todo.delMission(req.params.mission_code,res);
			});

			app.get('/getRegionalMission/:mission_code',function(req,res){
				todo.getRegionalMission(req.params.mission_code,res);
			});
			
			app.get('/addRegionalMission/:mission_code/:region_code', function(req,res){
				todo.addRegionalMission(req.params.mission_code,req.params.region_code,res);
			});
			
			app.get('/updRegionalMission/:region_code/:mission_code', function(req,res){
				todo.updRegionalMission(req.params.region_code,req.params.mission_code,res);
			});
			
			app.get('/delRegionalMission/:mission_code', function(req,res){
				todo.delRegionalMission(req.params.mission_code,res);
			});
			
			app.get('/getProvincialMission/:mission_code',function(req,res){
				todo.getProvincialMission(req.params.mission_code,res);
			});
			
			app.get('/addProvincialMission/:mission_code/:province_code', function(req,res){
				todo.addProvincialMission(req.params.mission_code,req.params.province_code,res);
			});
			
			app.get('/updProvincialMission/:province_code/:mission_code', function(req,res){
				todo.updProvincialMission(req.params.province_code,req.params.mission_code,res);
			});
			
			app.get('/delProvincialMission/:mission_code', function(req,res){
				todo.delProvincialMission(req.params.mission_code,res);
			});
			
			app.get('/getHeritageMission/:mission_code',function(req,res){
				todo.getHeritageMission(req.params.mission_code,res);
			});
			
			app.get('/addHeritageMission/:mission_code/:ch_code', function(req,res){
				todo.addHeritageMission(req.params.mission_code,req.params.ch_code,res);
			});
			
			app.get('/updHeritageMission/:ch_code/:mission_code', function(req,res){
				todo.updHeritageMission(req.params.ch_code,req.params.mission_code,res);
			});
			
			app.get('/delHeritageMission/:mission_code', function(req,res){
				todo.delHeritageMission(req.params.mission_code,res);
			});
			
			app.get('/getRarityMission/:mission_code',function(req,res){
				todo.getRarityMission(req.params.mission_code,res);
			});
			
			app.get('/addRarityMission/:mission_code/:rarity_code', function(req,res){
				todo.addRarityMission(req.params.mission_code,req.params.rarity_code,res);
			});
			
			app.get('/updRarityMission/:rarity_code/:mission_code', function(req,res){
				todo.updRarityMission(req.params.rarity_code,req.params.mission_code,res);
			});
			
			app.get('/delRarityMission/:mission_code', function(req,res){
				todo.delRarityMission(req.params.mission_code,res);
			});
			
			app.get('/getCategoryMission/:mission_code',function(req,res){
				todo.getCategoryMission(req.params.mission_code,res);
			});
			
			app.get('/addCategoryMission/:mission_code/:category_code', function(req,res){
				todo.addCategoryMission(req.params.mission_code,req.params.category_code,res);
			});
			
			app.get('/updCategoryMission/:category_code/:mission_code', function(req,res){
				todo.updCategoryMission(req.params.category_code,req.params.mission_code,res);
			});

			app.get('/delCategoryMission/:mission_code', function(req,res){
				todo.delCategoryMission(req.params.mission_code,res);
			});
			
			app.get('/getRegionMedalMission/:mission_code',function(req,res){
				todo.getRegionMedalMission(req.params.mission_code,res);
			});
			
			app.get('/getRegionMedalMissionByMedalCode/:medal_code',function(req,res){
				todo.getRegionMedalMissionByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/addRegionMedalMission/:mission_code/:regionmedal_code', function(req,res){
				todo.addRegionMedalMission(req.params.mission_code,req.params.regionmedal_code,res);
			});
			
			app.get('/updRegionMedalMission/:regionmedal_code/:mission_code', function(req,res){
				todo.updRegionMedalMission(req.params.regionmedal_code,req.params.mission_code,res);
			});

			app.get('/delRegionMedalMission/:mission_code', function(req,res){
				todo.delRegionMedalMission(req.params.mission_code,res);
			});
			
			app.get('/getHPMedalMission/:mission_code',function(req,res){
				todo.getHPMedalMission(req.params.mission_code,res);
			});
			
			app.get('/getHPMedalMissionByMedalCode/:medal_code',function(req,res){
				todo.getHPMedalMissionByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/addHPMedalMission/:mission_code/:hpmedal_code', function(req,res){
				todo.addHPMedalMission(req.params.mission_code,req.params.hpmedal_code,res);
			});
			
			app.get('/updHPMedalMission/:hpmedal_code/:mission_code', function(req,res){
				todo.updHPMedalMission(req.params.hpmedal_code,req.params.mission_code,res);
			});

			app.get('/delHPMedalMission/:mission_code', function(req,res){
				todo.delHPMedalMission(req.params.mission_code,res);
			});
			
			app.get('/getToSMedalMission/:mission_code',function(req,res){
				todo.getToSMedalMission(req.params.mission_code,res);
			});
			
			app.get('/getToSMedalMissionByMedalCode/:medal_code',function(req,res){
				todo.getToSMedalMissionByMedalCode(req.params.medal_code,res);
			});
			
			app.get('/addToSMedalMission/:mission_code/:tosmedal_code', function(req,res){
				todo.addToSMedalMission(req.params.mission_code,req.params.tosmedal_code,res);
			});
			
			app.get('/updToSMedalMission/:tosmedal_code/:mission_code', function(req,res){
				todo.updToSMedalMission(req.params.tosmedal_code,req.params.mission_code,res);
			});

			app.get('/delToSMedalMission/:mission_code', function(req,res){
				todo.delToSMedalMission(req.params.mission_code,res);
			});

			app.get('/getTop10',function(req,res){
				todo.getTop10(res);
			});
			
			
			//Statistiche			
			app.get('/getAllCHsCountRegions/',function(req,res){
				todo.getAllCHsCountRegions(res);
			});
			
			app.get('/getAllCHsCountProvinces/',function(req,res){
				todo.getAllCHsCountProvinces(res);
			});
			
			app.get('/getAllCardsPacketsCountRegions/',function(req,res){
				todo.getAllCardsPacketsCountRegions(res);
			});
			
			app.get('/getAllCardsPacketsCountProvinces/',function(req,res){
				todo.getAllCardsPacketsCountProvinces(res);
			});
			
			app.get('/getAllCardsPacketsCountCHs/',function(req,res){
				todo.getAllCardsPacketsCountCHs(res);
			});
			
			app.get('/getAllPathsCountRegions/',function(req,res){
				todo.getAllPathsCountRegions(res);
			});
			
			app.get('/getAllPathsCountProvinces/',function(req,res){
				todo.getAllPathsCountProvinces(res);
			});
			
			app.get('/getAllPathsCountCHs/',function(req,res){
				todo.getAllPathsCountCHs(res);
			});
			
			app.get('/getAllMedalsCount/',function(req,res){
				todo.getAllMedalsCount(res);
			});
			
			/*STATISTICHE GIOCO*/
			app.get('/getAllMissionsCountGames/',function(req,res){
				todo.getAllMissionsCountGames(res);
			});
			
			app.get('/getAllLocalizedMissionsCountGranularities/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCountGranularities(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCountRegional/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCountRegional(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCountProvincialRegion/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCountProvincialRegion(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCountProvincialProvince/:name/:mission_type/:region_code',function(req,res){
				todo.getAllLocalizedMissionsCountProvincialProvince(req.params.name,req.params.mission_type,req.params.region_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCountCHRegion/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCountCHRegion(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCountCHProvince/:name/:mission_type/:region_code',function(req,res){
				todo.getAllLocalizedMissionsCountCHProvince(req.params.name,req.params.mission_type,req.params.region_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCountCHCH/:name/:mission_type/:province_code',function(req,res){
				todo.getAllLocalizedMissionsCountCHCH(req.params.name,req.params.mission_type,req.params.province_code,res);
			});
			
			app.get('/getAllCollectCardMissionsCountRarities/:name/:mission_type',function(req,res){
				todo.getAllCollectCardMissionsCountRarities(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountGranularities/:name/:mission_type',function(req,res){
				todo.getAllCollectMedalMissionsCountGranularities(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountCategories/:name',function(req,res){
				todo.getAllCollectMedalMissionsCountCategories(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountMedalCategories/:name',function(req,res){
				todo.getAllCollectMedalMissionsCountMedalCategories(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountMedalRegion/:name',function(req,res){
				todo.getAllCollectMedalMissionsCountMedalRegion(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountMedalHP/:name',function(req,res){
				todo.getAllCollectMedalMissionsCountMedalHP(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCountMedalToS/:name',function(req,res){
				todo.getAllCollectMedalMissionsCountMedalToS(req.params.name,res);
			});
					
			app.get('/getAllCHsVisitedRegions/',function(req,res){
				todo.getAllCHsVisitedRegions(res);
			});
			
			app.get('/getAllCHsVisitedProvinces/',function(req,res){
				todo.getAllCHsVisitedProvinces(res);
			});
			
			app.get('/getAllCHsVisitedCHs/',function(req,res){
				todo.getAllCHsVisitedCHs(res);
			});
			
			app.get('/getAllCardsPacketsOpenRegions/',function(req,res){
				todo.getAllCardsPacketsOpenRegions(res);
			});
			
			app.get('/getAllCardsPacketsOpenProvinces/',function(req,res){
				todo.getAllCardsPacketsOpenProvinces(res);
			});
			
			app.get('/getAllCardsPacketsOpenCHs/',function(req,res){
				todo.getAllCardsPacketsOpenCHs(res);
			});
			
			app.get('/getAllPathsCompletedRegions/',function(req,res){
				todo.getAllPathsCompletedRegions(res);
			});
			
			app.get('/getAllPathsCompletedProvinces/',function(req,res){
				todo.getAllPathsCompletedProvinces(res);
			});
			
			app.get('/getAllPathsCompletedCHs/',function(req,res){
				todo.getAllPathsCompletedCHs(res);
			});
			
			app.get('/getAllReviewsWrittenRegions/',function(req,res){
				todo.getAllReviewsWrittenRegions(res);
			});
			
			app.get('/getAllReviewsWrittenProvinces/',function(req,res){
				todo.getAllReviewsWrittenProvinces(res);
			});
			
			app.get('/getAllReviewsWrittenCHs/',function(req,res){
				todo.getAllReviewsWrittenCHs(res);
			});
			
			app.get('/getAllMedalsWonCategories/',function(req,res){
				todo.getAllMedalsWonCategories(res);
			});
			
			app.get('/getAllMedalsWonMedals/',function(req,res){
				todo.getAllMedalsWonMedals(res);
			});
			
			/*STATISTICHE GIOCATORI*/
			
			app.get('/getAllMissionsCompletedGames/',function(req,res){
				todo.getAllMissionsCompletedGames(res);
			});
			
			app.get('/getAllCollectCardMissionsCollectedRarities/:name/:mission_type',function(req,res){
				todo.getAllCollectCardMissionsCollectedRarities(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectCardMissionsCollectedAll/:name/:mission_type',function(req,res){
				todo.getAllCollectCardMissionsCollectedAll(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectCardMissionsCollectedCommon/:name',function(req,res){
				todo.getAllCollectCardMissionsCollectedCommon(req.params.name,res);
			});
			
			app.get('/getAllCollectCardMissionsCollectedUncommon/:name',function(req,res){
				todo.getAllCollectCardMissionsCollectedUncommon(req.params.name,res);
			});
			
			app.get('/getAllCollectCardMissionsCollectedEpic/:name',function(req,res){
				todo.getAllCollectCardMissionsCollectedEpic(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCollectedCategories/:name/:mission_type',function(req,res){
				todo.getAllCollectMedalMissionsCollectedCategories(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectMedalMissionsCollectedAll/:name/:mission_type',function(req,res){
				todo.getAllCollectMedalMissionsCollectedAll(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllCollectMedalMissionsCollectedCategory/:name',function(req,res){
				todo.getAllCollectMedalMissionsCollectedCategory(req.params.name,res);
			});
			
			app.get('/getAllCollectMedalMissionsCollectedSpecificCategory/:name/:category',function(req,res){
				todo.getAllCollectMedalMissionsCollectedSpecificCategory(req.params.name,req.params.category,res);
			});
			
			app.get('/getAllCollectMedalMissionsCollectedSpecificMedal/:name',function(req,res){
				todo.getAllCollectMedalMissionsCollectedSpecificMedal(req.params.name,res);
			});

			app.get('/getAllCollectMedalMissionsCollectedSpecificMedalRegion/:name',function(req,res){
				todo.getAllCollectMedalMissionsCollectedSpecificMedalRegion(req.params.name,res);
			});
			app.get('/getAllCollectMedalMissionsCollectedSpecificMedalHP/:name',function(req,res){
				todo.getAllCollectMedalMissionsCollectedSpecificMedalHP(req.params.name,res);
			});
			app.get('/getAllCollectMedalMissionsCollectedSpecificMedalToS/:name',function(req,res){
				todo.getAllCollectMedalMissionsCollectedSpecificMedalToS(req.params.name,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedGranularities/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCompletedGranularities(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedAllMissions/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCompletedAllMissions(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedRegionalRegion/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCompletedRegionalRegion(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedRegionalMission/:name/:mission_type/:region_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedRegionalMission(req.params.name,req.params.mission_type,req.params.region_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedProvincialRegion/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCompletedProvincialRegion(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedProvincialProvince/:name/:mission_type/:region_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedProvincialProvince(req.params.name,req.params.mission_type,req.params.region_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedProvincialMission/:name/:mission_type/:province_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedProvincialMission(req.params.name,req.params.mission_type,req.params.province_code,res);
			});

			app.get('/getAllLocalizedMissionsCompletedCHRegion/:name/:mission_type',function(req,res){
				todo.getAllLocalizedMissionsCompletedCHRegion(req.params.name,req.params.mission_type,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedCHProvince/:name/:mission_type/:region_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedCHProvince(req.params.name,req.params.mission_type,req.params.region_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedCHCH/:name/:mission_type/:province_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedCHCH(req.params.name,req.params.mission_type,req.params.province_code,res);
			});
			
			app.get('/getAllLocalizedMissionsCompletedCHMission/:name/:mission_type/:ch_code',function(req,res){
				todo.getAllLocalizedMissionsCompletedCHMission(req.params.name,req.params.mission_type,req.params.ch_code,res);
			});

			app.get('/getUser/:user_email',function(req,res){
				todo.getUser(req.params.user_email,res);
			});

			app.get('/addUser/:user_code/:user_email/:user_password/:user_role', function(req,res){
				todo.addUser(req.params.user_code,req.params.user_email,req.params.user_password,req.params.user_role,res);
			});
			
			app.get('/updUser/:user_enabled/:user_code', function(req,res){
				todo.updUser(req.params.user_enabled,req.params.user_code,res);
			});
			
			app.get('/addAdmin/:admin_code/:admin_user', function(req,res){
				todo.addAdmin(req.params.admin_code,req.params.admin_user,res);
			});
			
			app.get('/getAllCulturalOrganizations/',function(req,res){
				todo.getAllCulturalOrganizations(res);
			});
			
			app.get('/getAllNotEnabledCulturalOrganizationsCount/',function(req,res){
				todo.getAllNotEnabledCulturalOrganizationsCount(res);
			});
			
			app.get('/getAllNotEnabledCulturalOrganizations/',function(req,res){
				todo.getAllNotEnabledCulturalOrganizations(res);
			});
			
			app.get('/getAllApprovedCulturalOrganizations/',function(req,res){
				todo.getAllApprovedCulturalOrganizations(res);
			});
			
			app.get('/getAllRejectedCulturalOrganizations/',function(req,res){
				todo.getAllRejectedCulturalOrganizations(res);
			});
				
			app.get('/addCulturalOrganization/:corg_code/:corg_user/:corg_name', function(req,res){
				todo.addCulturalOrganization(req.params.corg_code,req.params.corg_user,req.params.corg_name,res);
			});
			
			app.get('/updCulturalOrganization/:corg_admin/:corg_user', function(req,res){
				todo.updCulturalOrganization(req.params.corg_admin,req.params.corg_user,res);
			});

			app.get('/getAllNotEnabledCulturalOperatorsCount/:cop_email',function(req,res){
				todo.getAllNotEnabledCulturalOperatorsCount(req.params.cop_email,res);
			});
			
			app.get('/getAllNotEnabledCulturalOperators/:cop_email',function(req,res){
				todo.getAllNotEnabledCulturalOperators(req.params.cop_email,res);
			});

			app.get('/getAllApprovedCulturalOperators/:cop_email',function(req,res){
				todo.getAllApprovedCulturalOperators(req.params.cop_email,res);
			});
			
			app.get('/getAllRejectedCulturalOperators/:cop_email',function(req,res){
				todo.getAllRejectedCulturalOperators(req.params.cop_email,res);
			});
			
			app.get('/addCulturalOperator/:cop_code/:cop_user/:cop_organization', function(req,res){
				todo.addCulturalOperator(req.params.cop_code,req.params.cop_user,req.params.cop_organization,res);
			});

			app.get('/getOperatorCHs/:operator_email', function(req,res){
				todo.getOperatorCHs(req.params.operator_email,res);
			});
			
			app.get('/getRegionCHs/:region_code', function(req,res){
				todo.getRegionCHs(req.params.region_code,res);
			});
			
			app.get('/getHPCHs/:hp_code', function(req,res){
				todo.getHPCHs(req.params.hp_code,res);
			});
			
			app.get('/getToSCHs/:tos_code', function(req,res){
				todo.getToSCHs(req.params.tos_code,res);
			});
			
			app.get('/getCH/:ch_code',function(req,res){
				todo.getCH(req.params.ch_code,res);
			});
			
			app.get('/getProvinceCHs/:prov_code',function(req,res){
				todo.getProvinceCHs(req.params.prov_code,res);
			});

			app.get('/addCH/:ch_code/:ch_name/:ch_description/:ch_image/:ch_regionmedal/:ch_hpmedal/:ch_tosmedal/:ch_coordinates/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_operator', function(req,res){
				todo.addCH(req.params.ch_code,req.params.ch_name,req.params.ch_description,req.params.ch_image,req.params.ch_regionmedal,req.params.ch_hpmedal,req.params.ch_tosmedal,req.params.ch_coordinates,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_operator,res);
			});
			
			app.get('/updCH/:ch_name/:ch_description/:ch_image/:ch_regionmedal/:ch_hpmedal/:ch_tosmedal/:ch_coordinates/:ch_province/:ch_historicalperiod/:ch_structuretype/:ch_operator/:ch_code', function(req,res){
				todo.updCH(req.params.ch_name,req.params.ch_description,req.params.ch_image,req.params.ch_regionmedal,req.params.ch_hpmedal,req.params.ch_tosmedal,req.params.ch_coordinates,req.params.ch_province,req.params.ch_historicalperiod,req.params.ch_structuretype,req.params.ch_operator,req.params.ch_code,res);
			});
			
			app.get('/delCH/:ch_code', function(req,res){
				todo.delCH(req.params.ch_code,res);
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

			app.get('/getCHValidityAreas/:ch_code', function(req,res){
				todo.getCHValidityAreas(req.params.ch_code,res);
			});
			
			app.get('/addValidityArea/:va_code/:va_heritage/:va_shape', function(req,res){
				todo.addValidityArea(req.params.va_code,req.params.va_heritage,req.params.va_shape,res);
			});
			
			app.get('/updValidityArea/:va_heritage/:va_shape/:va_code', function(req,res){
				todo.updValidityArea(req.params.va_heritage,req.params.va_shape,req.params.va_code,res);
			});
			
			app.get('/delValidityArea/:va_code', function(req,res){
				todo.delValidityArea(req.params.va_code,res);
			});
			
			app.get('/addPolygon/:polygon_code/:polygon_va', function(req,res){
				todo.addPolygon(req.params.polygon_code,req.params.polygon_va,res);
			});
			
			app.get('/updPolygon/:polygon_va/:polygon_code', function(req,res){
				todo.updPolygon(req.params.polygon_va,req.params.polygon_code,res);
			});
			
			app.get('/delPolygon/:polygon_code', function(req,res){
				todo.delPolygon(req.params.polygon_code,res);
			});
			
			app.get('/getPolygonVertices/:polygon_code', function(req,res){
				todo.getPolygonVertices(req.params.polygon_code,res);
			});
			
			app.get('/addVertex/:vertex_code/:vertex_polygon/:vertex_coo/:vertex_num', function(req,res){
				todo.addVertex(req.params.vertex_code,req.params.vertex_polygon,req.params.vertex_coo,req.params.vertex_num,res);
			});
			
			app.get('/updVertex/:vertex_polygon/:vertex_coo/:vertex_num/:vertex_code', function(req,res){
				todo.updVertex(req.params.vertex_polygon,req.params.vertex_coo,req.params.vertex_num,req.params.vertex_code,res);
			});
			
			app.get('/delVertex/:vertex_code', function(req,res){
				todo.delVertex(req.params.vertex_code,res);
			});
			
			app.get('/getCircle/:circle_code', function(req,res){
				todo.getCircle(req.params.circle_code,res);
			});
			
			app.get('/addCircle/:circle_code/:circle_va/:circle_center/:circle_radius', function(req,res){
				todo.addCircle(req.params.circle_code,req.params.circle_va,req.params.circle_center,req.params.circle_radius,res);
			});
			
			app.get('/updCircle/:circle_va/:circle_center/:circle_radius/:circle_code', function(req,res){
				todo.updCircle(req.params.circle_va,req.params.circle_center,req.params.circle_radius,req.params.circle_code,res);
			});
			
			app.get('/delCircle/:circle_code', function(req,res){
				todo.delCircle(req.params.circle_code,res);
			});

			app.get('/getCHsWithPaths/:operator_email', function(req,res){
				todo.getCHsWithPaths(req.params.operator_email,res);
			});

			app.get('/addQuestion/:question_code/:question_question/:question_hintonsite/:question_hintbypaying/:question_answer', function(req,res){
				todo.addQuestion(req.params.question_code,req.params.question_question,req.params.question_hintonsite,req.params.question_hintbypaying,req.params.question_answer,res);
			});
			
			app.get('/updQuestion/:question_question/:question_hintonsite/:question_hintbypaying/:question_answer/:question_code', function(req,res){
				todo.updQuestion(req.params.question_question,req.params.question_hintonsite,req.params.question_hintbypaying,req.params.question_answer,req.params.question_code,res);
			});
			
			app.get('/delQuestion/:question_code', function(req,res){
				todo.delQuestion(req.params.question_code,res);
			});
			
			app.get('/getCHPaths/:ch_code', function(req,res){
				todo.getCHPaths(req.params.ch_code,res);
			});
		
			app.get('/getPath/:path_code', function(req,res){
				todo.getPath(req.params.path_code,res);
			});
			
			app.get('/addPath/:path_code/:path_title/:path_enabled/:path_heritage', function(req,res){
				todo.addPath(req.params.path_code,req.params.path_title,req.params.path_enabled,req.params.path_heritage,res);
			});
			
			app.get('/updPath/:path_title/:path_enabled/:path_heritage/:path_code', function(req,res){
				todo.updPath(req.params.path_title,req.params.path_enabled,req.params.path_heritage,req.params.path_code,res);
			});
			
			app.get('/delPath/:path_code', function(req,res){
				todo.delPath(req.params.path_code,res);
			});
			
			app.get('/enablePath/:path_enabled/:path_code', function(req,res){
				todo.enablePath(req.params.path_enabled, req.params.path_code,res);
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
			
			app.get('/addStage/:stage_code/:stage_title/:stage_curiosity/:stage_question/:stage_coordinates/:stage_path/:stage_isfinal', function(req,res){
				todo.addStage(req.params.stage_code,req.params.stage_title,req.params.stage_curiosity,req.params.stage_question,req.params.stage_coordinates,req.params.stage_path,req.params.stage_isfinal,res);
			});
			
			app.get('/updFinalStage/:stage_isfinal/:stage_code', function(req,res){
				todo.updFinalStage(req.params.stage_isfinal,req.params.stage_code,res);
			});
			
			app.get('/updStage/:stage_title/:stage_curiosity/:stage_question/:stage_coordinates/:stage_path/:stage_isfinal/:stage_code', function(req,res){
				todo.updStage(req.params.stage_title,req.params.stage_curiosity,req.params.stage_question,req.params.stage_coordinates,req.params.stage_path,req.params.stage_isfinal,req.params.stage_code,res);
			});
			
			app.get('/delStage/:stage_code', function(req,res){
				todo.delStage(req.params.stage_code,res);
			});

			app.get('/getCHReviewsList/:ch_code', function(req,res){
				todo.getCHReviewsList(req.params.ch_code,res);
			});
			
			app.get('/delReview/:player_code/:ch_code', function(req,res){
				todo.delReview(req.params.player_code,req.params.ch_code,res);
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