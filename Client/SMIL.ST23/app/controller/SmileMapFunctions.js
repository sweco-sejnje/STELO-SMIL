Ext.define('Smile.controller.SmileMapFunctions', {
	extend: 'Ext.app.Controller',
    config: {
        refs: {
			mapPanel: '#smileMapPanel'
        }
    },	
	newFeature: function(obj, element){
		
		// var area = checkPointWitinPolygon(obj, 'Delområden');
		var area = "";
		
		var ctrlPoint = Ext.getCmp('ctrlDrawPointBtn');
		ctrlPoint.control.deactivate();
		var ctrlLine = Ext.getCmp('ctrlDrawLineBtn');
		ctrlPoint.control.deactivate();
		var ctrlArea = Ext.getCmp('ctrlDrawAreaBtn');
		ctrlArea.control.deactivate();
	
	    var externalProjection = new OpenLayers.Projection("EPSG:4326");
		var internalProjection = new OpenLayers.Projection("EPSG:900913");
		
		obj.feature.geometry.transform(internalProjection, externalProjection);
		
		var featureList = Ext.getCmp('featureItems');
		featureList.show();
	
		// ctrlDrawPoint.deactivate();
		var featureListModel = Ext.ModelMgr.getModel(smileListFeatureModel.modelName);
		var model = new featureListModel;
		/////////////////////////////////////////////////////////////////////////////////////
		
		renderNewRecordForm(obj, model, area);
		
	},
    
	checkPointWitinPolygon: function(obj, areaName){

	    var polygonLayer = map.getLayersByName(areaName)[0];
	  
		// if(obj.feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Point"){}    	
	        	
		for (var i = 0 ; i <= polygonLayer.features.length-1; ++i) {
			var polygon = polygonLayer.features[i];
		 	var pointWithin = polygon.geometry.containsPoint(obj.feature.geometry.getCentroid());
			if(pointWithin){
				var area = polygon.attributes;
				return area;
			}   	 		
		 }
		 
		 return false;
	},
    
    
	getLayerFeatureFromRecord: function (record){
		var me = this;
		var panel = me.getMapPanel();
		var map = panel.getMap();
		var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
		
		selectCtrl.unselectAll();
		var returnObj;
		Ext.each(SMIL_Layer.features,
			function(rec){
				if(rec.attributes.ID == record.get('id') ){
					returnObj = rec;
				} ;
			}
		);
		
		return returnObj;
	},

	highLightRecord: function (record){
		var me = this;
		var panel = me.getMapPanel();
		var map = panel.getMap();
		
		var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
		
		var selectCtrl = map.getControl('SMIL_select_ctrl'); 
		
		selectCtrl.unselectAll();
	
		Ext.each(SMIL_Layer.features,
			function(rec){
				(rec.attributes.ID == record.get('id') ) ? selectCtrlForStore.select(rec) : null ;
			}
		);
		
	},

	zoomHighLightRecord: function(record){
		var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
		
		selectCtrl.unselectAll();
		
		Ext.each(SMIL_Layer.features,
			function(rec){
				(rec.attributes.ID == record.get('id') ) ? selectCtrlForStore.select(rec) : null ;
			}
		);
		
	    var json = new OpenLayers.Format.GeoJSON();
	    var olobj = json.parseGeometry(record.raw.geometry);
	    
	    var externalProjection = new OpenLayers.Projection("EPSG:4326");
		var internalProjection = new OpenLayers.Projection("EPSG:900913");
		
		var bounds = olobj.getBounds().transform( externalProjection, internalProjection);
		
		var center = olobj.getCentroid().transform( externalProjection, internalProjection);
		var lonlat = new OpenLayers.LonLat(center.x, center.y);
	
	    map = myMap.getMap();
	    
	    if(record.raw.geometry.type == "Point"){
	    	map.setCenter(lonlat,settings.zoomHighLightRecord );
	    }else{
	    	map.zoomToExtent(bounds,false);
		}
	}

})