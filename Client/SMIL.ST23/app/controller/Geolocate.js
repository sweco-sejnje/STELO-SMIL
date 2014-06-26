var vector = new OpenLayers.Layer.Vector("Geolocation Layer", {});

var map = myMap.getMap();

map.addLayers([vector]);



var geolocate = new OpenLayers.Control.Geolocate({
    id: 'locate-control',
    geolocationOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 7000
    }
});

var currentPosition;

var style = {
    fillOpacity: 0.1,
    fillColor: '#000',
    strokeColor: '#f00',
    strokeOpacity: 0.6
};

geolocate.events.register("locationupdated", this, function(e) {
	
	var btn = Ext.getCmp('locateMe');
	btn.removeCls("x-button-normal");
    btn.addCls("x-button-confirm");
 
 	var btn = Ext.getCmp('btnCreateGPSplace');
 	if(btn != undefined){
		var pointBtn = Ext.getCmp('ctrlDrawPointBtn');
		
	
		if(pointBtn.isDisabled() == false ){ 
			btn.removeCls("x-button-normal");
		    btn.addCls("x-button-confirm");
		    btn.setHandler(function() {
		    		var map = myMap.getMap();
		    		
					var source = new Proj4js.Proj('EPSG:3006');
					var dest = new Proj4js.Proj('EPSG:4326');
							
					var lonLat = map.getCenter();
					var lonX = currentPosition.position.coords.longitude;
					var latY = currentPosition.position.coords.latitude;
		
					var vectorLayer = map.getLayersByName('Ritlager')[0];
		
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
		    });
		}    
	}
	
	currentPosition = e;
	
	map = myMap.getMap();
	
	locateMeGroup = App.viewport.query('#locateMe')[0];
    locatemeBtn = locateMeGroup.getPressed()[0] ;
    
    
    if(locatemeBtn &&locatemeBtn.pressed == true && vector.features.length != 0) {
    	map.setCenter(e.point);
    }else{
    	map.setCenter(e.point, settings.geolocateZoomLevel);
    }

	// check if Featurestor is avaible
	if(smileListFeatureStore != undefined){

		// calculate the lengt from the map center if store is loaded, this is done on the store load event.
		if(smileListFeatureStore.data.items.length != 0){
			smileListFeatureStore.fireEvent('load');
		} 

	}
	
	// remove geolcate layer
    vector.removeAllFeatures();
    // add Cross and circle
    vector.addFeatures([
        new OpenLayers.Feature.Vector(
            e.point,
            {},
            {
                graphicName: 'cross',
                strokeColor: '#f00',
                strokeWidth: 2,
                fillOpacity: 0,
                pointRadius: 15
            }
        ),
        new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.Polygon.createRegularPolygon(
                new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                e.position.coords.accuracy / 2,
                50,
                0
            ),
            {},
            style
        )
    ]);
    

    	
//    if(map.getZoom() <= settings.geolocateZoomLevel )
//    {
//    	map.setCenter(e.point, settings.geolocateZoomLevel);
//    }else{
//    	map.setCenter(e.point);
//    }
    
});

map.addControl(geolocate);