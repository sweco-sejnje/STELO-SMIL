function updateRecordtoSmile(){
	// console.log('updateRecordtoSmile körs!');
	
	
	//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Uppdaterar information..."});
	//myMask.show();						
	// onSaveRecordAction(record);
	var form = Ext.getCmp('featureFormPanel');
	var currentNote = form.getRecord();
	form.updateRecord(currentNote);
	// currentNote.save();
	var UtilController =  Smile.app.application.getController('SmileMapFunctions');
	UtilController.getLayerFeatureFromRecord(currentNote);
	var obj = UtilController.getLayerFeatureFromRecord(currentNote);//getLayerFeatureFromRecord(currentNote);
	
	// klona för att inte transformera ibort befintligt objekt på kartan
	var tempObj = obj.clone();
	
	var toProjection = new OpenLayers.Projection("EPSG:4326");
	var fromProjection = new OpenLayers.Projection("EPSG:900913");
	var returnTransObj = tempObj.geometry.transform( fromProjection, toProjection);						
	
	var coords = returnTransObj.toString();
					
	currentNote.data.properties = "";
	// var noteData = Ext.encode(currentNote.data);
	var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
	var listname = Controller.getSelectedListName();
	var data = {
    	the_geom : coords,
    	action :'PUT',
    	list : listname
		};
	var ModelMaker = Smile.app.application.getController('Smile.controller.SmileDynamicModelMaker');
	var listname = Controller.getSelectedListName();
	var mergedObj = ModelMaker.merge_options(data, currentNote.data);
	var noteData = Ext.encode(mergedObj);
	Ext.Ajax.request({
        method: 'post',
		timeout : settings.ajaxTimeout,
        url: settings.updateFeatureURL,
        disableCaching: false,  
        params: {
        	data : noteData,
        	action :'PUT',
        	list : listname
        	},
        failure: function(response, opts) {
        	//myMask.hide();
			Ext.Msg.alert('Fel!', 'Något gick fel vid uppdateringen', function()
				{
				   // crouselSheet(0);
				}
			);

       	},
        success: function(r, o){
        	//myMask.hide();
            var obj = Ext.decode(r.responseText);
            var respText = obj.split(':');
            if (respText[0] === 'Success') {
            	
	            // console.log('Laddar lista -- '+ smileListFeatureModel.modelName);    	
                // Ext.dispatch({
                    // controller: 'SmileLoadMapFeatures',
                    // action: 'showSmileFeatureList',
                    // listName: smileListFeatureModel.modelName
                // });
                
                // Do something...
            	// console.log('det gick bra');
            	
				// Get the map and the layer.

//            	var map = myMap.getMap();
//		        var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
//		        SMIL_Layer.refresh({force:true});
            	var map = Smile.app.application.getController('Main').getOpenLayersMap().getMap();
				map.events.triggerEvent('moveend');
				
            	Ext.Msg.alert('Sparat', 'Informationen är uppdaterad.', function()
				{
				   //Inforera att det gick bra att uppdatera
					// map.events.triggerEvent('moveend');

				}
				);
            	
            }
            else {
            	
            	Ext.Msg.alert('Fel', 'Fel vid uppdatering!', function()
				{
				   // crouselSheet(0);
				}
				);
            	
               // Do something else...
            	// console.log('FEL! Det gick inte bra.');
            }
            
        }
    });
						
};


function onSaveRecordAction(record) {

	form.updateRecord(record);

	if (null == smileListFeatureStore.findRecord('objectid', record.data.objectid)) {
    	smileListFeatureStore.add(record);
    } else {
         record.setDirty();
    }
 
 	smileListFeatureStore.sync();

}