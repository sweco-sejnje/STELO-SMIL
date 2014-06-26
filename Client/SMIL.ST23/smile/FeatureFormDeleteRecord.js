function deleteRecordFromSmile(){
			// console.log('Delete Record from Smile körs.');
		//	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Tar bort objekt..."});
			//myMask.show();		
			// onSaveRecordAction(record);

	var form = Ext.getCmp('featureFormPanel');
	var currentNote = form.getRecord();
			form.updateRecord(currentNote);
			// currentNote.save();
			
			var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
			var listname = Controller.getSelectedListName();
			Ext.Ajax.request({
	            method: 'post',
	            disableCaching: false,
		        timeout : settings.ajaxTimeout,
	            url: settings.updateFeatureURL,
	            params: {data : Ext.encode(currentNote.data),
	            		list : listname,
	            		action :'DELETE'},
		            failure: function(response, opts) {
		            //	myMask.hide();
        				Ext.Msg.alert('Fel!', 'Något gick fel vid borttagning av objektet.', function()
							{
							   // crouselSheet(0);
							}
						);

		           	},success: function(r, o){
	           	//	myMask.hide();
	                var obj = Ext.decode(r.responseText);
		            var respText = obj.split(':');
	                if (respText[0] == 'Success') {
	                	
	                	var map = Smile.app.application.getController('Main').getOpenLayersMap().getMap();
	                	
	                	var UtilController =  Smile.app.application.getController('SmileMapFunctions');
	    				UtilController
	                   
	    				var feature = UtilController.getLayerFeatureFromRecord(currentNote);
	                    
	                    var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
	                    SMIL_Layer.removeFeatures([feature]);
	                   
	                    var smileListFeatureStore =Ext.getStore('smileListFeatureStore');
	                    smileListFeatureStore.remove(currentNote);
	                   
	                    var featureCarousel = Ext.getCmp('featureCarousel');
	    	        	
	    				var siteinfo = featureCarousel.setActiveItem('smileFeatureList', {
	    					type: 'slide',
	    					direction: 'left'
	    				});
	                    
                		// map.events.triggerEvent('moveend');
                	
	                    Ext.Msg.alert('Borttaget', 'Platsen är nu borttagen', function()
						{
						   // informera användaren att platsen är borta
						}
						);
	                	
	                }
	                else {
	                	
	                	Ext.Msg.alert('Något gick fel.', 'Objektet kunde inte tas bort.', function()
						{
						   // Informera användare att det inte gick bra
						}
						);
	                	
	                   // Do something else...
	                //	console.log('FEL! Det gick inte bra.');
	                }
	                
	            }
	            
	        });
					
}