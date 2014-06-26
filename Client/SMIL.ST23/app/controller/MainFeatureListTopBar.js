Ext.define('Smile.controller.MainFeatureListTopBar', {
	extend: 'Ext.app.Controller',
    config: {
        refs: {
			mapPanel: '#smileMapPanel',
			createPlaceBtn: '#btnCreateGPSplace'
        },
		control: {
            "createPlaceBtn": {
                tap: 'onCreatePlace'
            }
    	}
    },
   	onCreatePlace: function(){
		var button = this.getCreatePlaceBtn();
		var mapPanel = this.getMapPanel();
		var map = mapPanel.getMap();
		
		if(button.element.hasCls('x-button-confirm')){
		
					var geo = mapPanel.getGeo();					
					var lonX = geo.getLongitude();
					var latY = geo.getLatitude();
		
					
					var vectorLayer = map.getLayersByName('Drawlayer')[0];
		
		            var layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		            layer_style.fillOpacity = 0.2;
		            layer_style.graphicOpacity = 1;
		            layer_style.strokeOpacity = 0.6;
					layer_style.pointRadius = 10;
		            
		           // Style Point
		            var style_blue = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		            style_blue.strokeColor = "blue"; 
		            style_blue.fillColor = "blue";
		            
		            // Make Point
		            var point = new OpenLayers.Geometry.Point(lonX,latY).transform(map.projection, new OpenLayers.Projection("EPSG:900913") );
		            var pointFeature = new OpenLayers.Feature.Vector(point,null,style_blue);

		            // Layer
					map.addLayer(vectorLayer);
		            vectorLayer.addFeatures([pointFeature]);  
			
		}
	}
});