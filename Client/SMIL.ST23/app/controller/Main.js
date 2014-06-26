Ext.define('Smile.controller.Main', {
    extend: 'Ext.app.Controller',
	
    config: {
        refs: {
			openLayersMap: '#smileMapPanel',
			button: '#smileListsBtn',
			
			per : 'panel #mapZoomInBtn'
        },
		control: {
			openLayersMap: {
				maprender: 'onMapRender',
				zoomend: 'onZoomEnd',
				movestart: 'onMoveStart',
				moveend: 'onMoveEnd'
			},

			
			button: {
				tap: 'onButtonTap' 
			},

            "#mapZoomInBtn": {
                tap: 'onZoomInBtn'
            },
            "#mapZoomOutBtn": {
                tap: 'onZoomOutBtn'
            },			
            "mappanel #smileListsBtn": {
                tap: 'onSmileListsBtn'
            }
			
		},
		
		map: null,
		vectorLayer: null,
		features: [],
		selectFeatureControl: null
    },
	
    onZoomInBtn: function(){
    	var xtypeMap = this.getOpenLayersMap();
    	var map = xtypeMap.getMap();
    	
    	map.zoomIn();
    	
    },
    onZoomOutBtn: function(){
    	var xtypeMap = this.getOpenLayersMap();
    	var map = xtypeMap.getMap();
    	
    	map.zoomOut();
    	
    },    
    
	onMapRender: function(component, map, layer) {
		console.log("map render");
		
		var me = this;
		me.setMap(map);
		
		var vectorLayer = this.createVectorLayer(map);
		
		var selectFeatureControl = new OpenLayers.Control.SelectFeature(vectorLayer, {
			autoActivate: true
		});
		me.setSelectFeatureControl(selectFeatureControl);
		map.addControl(selectFeatureControl);

		// Draw layer
		var drawLayer = this.createDrawLayer(map);
		var selectDrawControl = new OpenLayers.Control.SelectFeature(drawLayer, {
			autoActivate: true
		});
		me.setSelectFeatureControl(selectDrawControl);
		map.addControl(selectDrawControl);
		
		
		
	},
	onZoomEnd: function(component, map, layer, zoom) {
		console.log("zoom end -> new zoom level: " + zoom);
		
	},
	onMoveStart: function(component, map, layer) {
		console.log("move start");
	},
	onMoveEnd: function(component, map, layer) {
		console.log("move end");
	},
	
	onButtonTap: function(component){
		console.log("buttonTap");
	},
	
	onFeatureSelected: function(scope, event, map) {
		
		 var feature = event.feature;
		 var position = feature.geometry.getBounds().getCenterLonLat();
		 content = feature.id;
		 
		// var messagebox = Ext.Msg.confirm(feature.id, "Hej jag är en feature?", this.confirmMessageHandler, this);
		 
		 
	},
	
	onDrawFeatureAdded: function(scope, event, map) {
		
		 var feature = event.feature;
		 var position = feature.geometry.getBounds().getCenterLonLat();
		 content = feature.id;
		 // var messagebox = Ext.Msg.confirm(feature.id, "Hej jag är en feature?", this.confirmMessageHandler, this);
		 
		 var Controller = Smile.app.application.getController('MainFeatureForm');
		 Controller.createNewFeature(feature);
		 
	},	
	
	onFeatureUnSelected: function(scope, event, map) {
		var feature = event.feature;
		
	},

	confirmMessageHandler: function(buttonId, value) {
        if(buttonId != 'yes') {
            this.getSelectFeatureControl().unselectAll();
        }
    },
	
	createVectorLayer: function(map) {
		var me = this;
		var vectorLayer = new OpenLayers.Layer.Vector("SmilObjekt",{
			eventListeners: {
				featureselected: function(event){ 
					me.onFeatureSelected(me, event, map);
				},
				featureunselected: function(event){
					me.onFeatureUnSelected(me, event, map);
				}
			},
			styleMap: me.getStyle2()
		
		});
		
		this.setVectorLayer(vectorLayer);
		map.addLayer(vectorLayer);
		return vectorLayer;
	},
	
	createDrawLayer: function(map) {
		var me = this;
		var vectorLayer = new OpenLayers.Layer.Vector("Drawlayer",{
			eventListeners: {
				// featureselected: function(event){ 
					// me.onFeatureSelected(me, event, map);
				// },
				// featureunselected: function(event){
					// me.onFeatureUnSelected(me, event, map);
				// },
				
				featureadded: function(event){
					me.onDrawFeatureAdded(me, event, map);
				}
			}
		});
		
		this.setVectorLayer(vectorLayer);
		map.addLayer(vectorLayer);
		return vectorLayer;
	},
	
    addMarker: function(point, attributes, style) {
        this.getMapCmp().transformLonLatObject(point);
        var markerFeature = new OpenLayers.Feature.Vector(point, attributes, style);
        this.getFeatures().push(markerFeature);
        this.getVectorLayer().addFeatures(markerFeature);
    },

    addLineString: function(startPoint, endPoint, attributes, style) {
        this.getMapCmp().transformLonLatObject(startPoint);
        this.getMapCmp().transformLonLatObject(endPoint);
        var lineString = new OpenLayers.Geometry.LineString([startPoint, endPoint]);
        var lineFeature = new OpenLayers.Feature.Vector(lineString, attributes, style);
        this.getFeatures().push(lineFeature);
        this.getVectorLayer().addFeatures(lineFeature);
    },
    
    getMarkerStyle: function(type) {
        var markerWidth = 32;
        var markerHeight = 37;
        var shadowWidth = 51;
        var shadowHeight = 37;
        var style = {
            externalGraphic: './resources/images/marker_icons/' + type + '.png',
            graphicWidth: markerWidth,
            graphicHeight: markerHeight,
            graphicYOffset: -markerHeight,
            backgroundGraphic: './resources/images/marker_icons/shadow.png',
            backgroundWidth: shadowWidth,
            backgroundHeight: shadowHeight,
            backgroundXOffset: -(markerWidth/2),
            backgroundYOffset: -shadowHeight
        };
        return style;
        
    }    
    ,
    getStyle2: function(){
    	
     
        	
        	var HLDefaultStyle = new OpenLayers.Style();

        	var size = 10;
        				
        	var myStyles = new OpenLayers.StyleMap({ 
             "default": new OpenLayers.Style({
             			pointRadius : 6,
                        fillColor: "${getColor}",                         
                        strokeColor: "black",
                        strokeOpacity : 0.5,
        				label : "${getLabel}",
        				labelAlign : "cm",
        				labelSelect : true,
        				fontSize: "10px",
                        fillOpacity: 0.8, 
                        graphicZIndex: 1,
                        strokeWidth: 2

                    },
                    {
                    	 context: {
                             getColor : function (feature) {
                                 return feature.attributes.Status == 'Ej angett' ? '#080808' :
                                        feature.attributes.Status == 'Ingen åtgärd' ? '#669966' :
                                        feature.attributes.Status == 'Aktuell för byte' ? '#FFFF33' :
                                        feature.attributes.Status == 'Akut åtgärd' ? '#CC0000' :
                                                                             'gray' ;
                             },
                            getLabel: function (feature) {
                            	if(feature.layer.map.getZoom() > settings.mapLabelShowZoomlevel) {
                            		if(feature.attributes[settings.mapLabelField] != undefined){
                            			return feature.attributes[settings.mapLabelField];	
                            		}else{
                            			return '';
                            		}
        	        				
                            	}else{
                            		return '';
                            	}
        	      			}
                        } 
                    }),
        	"select" : new OpenLayers.Style({ 
        			   pointRadius : Ext.isPhone ? size*2 : size ,
        			   strokeColor: "orange",
        			   strokeWidth: 6
        			})
               });
        	
               
    HLDefaultStyle.addRules([myStyles]);
    //      return new OpenLayers.StyleMap({'default': HLDefaultStyle, 'select' : selectStyle});
          return myStyles;
   }
	
});