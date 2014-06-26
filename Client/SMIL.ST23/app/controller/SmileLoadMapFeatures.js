Ext.define('Smile.controller.SmileLoadMapFeatures',{
	extend:'Ext.app.Controller',
	
	showSmileFeatureList: function(listName){
		
		// Set the name of the selected list on main toolbar featurelist
		var btn = Ext.getCmp('featuresBtn');
		btn.setText(listName);
		
		var list = Ext.getCmp('smileFeatureList');

		

		// Populate the storemodel and adds the layer to the map.
		// init and create the dynamig store for layer SmilObject
		// This also adds the wms layer layer on the map.
		var Controller = Smile.app.application.getController('SmileDynamicStoreController');
		Controller.initModel(listName);

		// Get the map and the layer.		
		var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
	    var map = mObj.getMap();
        var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
        
	    
        // TODO: Fix Smil_Layer
       	// remove old features on the layer.
        // SMIL_Layer.destroyFeatures();
        

		// Adds the select controls for the the features on the layer.
		// includes select, unSelect and showFeaureInfo function
		this.addMapControls();
		
		// Add WFS Query layer
		// Handeels the zoomleve event trigger.
		// Create a vectorlayer fot the WFS features
		// Populate the smielFeatureStore
		// Calls this controller, the SmileLoadMapFeatures controller action addGeoJSONLayer to add the smielFeatureStore layer on the map as vector.

		var Controller = Smile.app.application.getController('MapWFSService');

		Controller.queryMoveWFSLayer({
			
			url: settings.wfsUrl, featureType: listName,
            featureNS: settings.featureNS,
            MaxFeatures: 250,
            mapWfsQueryTopLevel : 16
		});
		

		
	},
	
    addGeoJSONLayer : function(resp){
    	var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
        var map = mObj.getMap();
        var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];

  		SMIL_Layer.removeAllFeatures();
        
        var gformat = new OpenLayers.Format.GeoJSON(
			  {
			      'externalProjection': new OpenLayers.Projection("EPSG:4326"),
			      'internalProjection': new OpenLayers.Projection("EPSG:900913")
			  });

        var feats = gformat.read(resp.responseText);

        SMIL_Layer.addFeatures(feats);
        
        // TODO: Settings for zoom to eztent needs to be fixed
//        if(settings.zoomToExtentOnLayerLoad){
//        	map.zoomToExtent(SMIL_Layer.getDataExtent());
//        };
        
        // TODO: Enable featurelist button
//        Ext.dispatch({
//			controller : 'SmileLoadMapFeatures',
//			action : 'enableFeatureButton'
//		});     	
    },
	
    enableFeatureButton : function(){
	    var featuresBtn = Ext.getCmp('featuresBtn');
        featuresBtn.removeCls("x-button-normal");
        featuresBtn.addCls("x-button-action");
    },
    
    addMapControls : function(){
    	
    	// get the layer 
    	var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
		var map = mObj.getMap();
    	var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
    	
    	// Add the control
        selectCtrl = new OpenLayers.Control.SelectFeature([SMIL_Layer], {
            toggle: true,
            clickout: true,
            onSelect: onFeatureSelect,
            id: 'SMIL_select_ctrl'
        	}
		);

		// dont know yet??
        selectCtrlForStore = new OpenLayers.Control.SelectFeature([SMIL_Layer],
		{ toggle: true,
		    onUnselect: onFeatureUnselectStore
			}
		);
		
		// adds the select contorl and activate it
        map.addControl(selectCtrl);
        selectCtrl.activate();
		
		// adds the unSelect control, but no activate???
        map.addControl(selectCtrlForStore);
		
		// open the featurelist panel
        function onFeatureSelect(feature) {
        	
        	var featureList = Ext.getCmp('featureItems');
        	featureList.show();
        	
        	var featureCarousel = Ext.getCmp('featureCarousel');
        	
			var siteinfo = featureCarousel.setActiveItem('smileFeatureList', {
				type: 'slide',
				direction: 'left'
			});
			
            showFeatureInfo(feature);
        }
		
		// hides the panel if its open when feature is unselected
        function onFeatureUnselectStore(feature) {
            var carousel = Ext.getCmp('featureCarousel');
            if (carousel.isVisible()) {
                carousel.setActiveItem(0);
                var sheet = Ext.getCmp('featureItems');
                sheet.hide();
            }
        }

		// get the selected record
		// scrolls to the top of the list.
		// and render the form for the record.
        function showFeatureInfo(feature) {
        	
            var pId = feature.attributes.ID;
		    
            var smileListFeatureStore = Ext.getStore('smileListFeatureStore');
            var record =smileListFeatureStore.findRecord('id',pId);

            var browseList = Ext.getCmp('smileFeatureList');
			browseList.select(record);
			browseList.scrollToRecord(record);

			var featureCarousel = Ext.getCmp('featureCarousel');
       		var activeIndex = featureCarousel.getActiveIndex();
       		
       		if(activeIndex == 1){

       			var Controller =  Smile.app.application.getController('MainFeatureForm');
				Controller.renderForm(record);

       		}
 		  	
//            featureList.show();

//            var siteinfo = featureCarousel.setActiveItem('featureForm', {
//                type: 'slide',
//                direction: 'left'
//            });

//            renderForm(record);

        }    	
    }	    
	
});