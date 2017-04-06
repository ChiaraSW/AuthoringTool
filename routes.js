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



			//Inizio Authoring Tool--------

			app.get('/getProva/:email',function(req,res){
				todo.getProva(req.params.email,res);
			});


			//Fine Authoring Tool --------




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