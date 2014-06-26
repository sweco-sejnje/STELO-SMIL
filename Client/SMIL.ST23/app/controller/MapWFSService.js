Ext.define('Smile.controller.MapWFSService', {
	extend: 'Ext.app.Controller',
	config:{
		refs:{
			infoBtn :'#mapInfoBtn'	
		}
	},
    queryMoveWFSLayer: function(obj){
            
            // get parameters objet from contorller.        
            var param = obj;
            
            var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
            var map = mObj.getMap();
        
        // listner handle the startlevel for wfs querys
            map.events.register('moveend', this, function (event) {
            var level = map.getZoom();
            
            if( level >= param.mapWfsQueryTopLevel)
            {
              // call funktion
             var bounds = map.getExtent().transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326") );
             
             // Run the wfs query
             var btn = this.getInfoBtn();
             if(btn.element.hasCls('x-button-confirm') ) {
             	notice(bounds);
             }
             
            }else{
// TODO: Disable this store recalculate 
//                var smileListFeatureStore = Ext.getStore('smileListFeatureStore');
//                if(smileListFeatureStore != undefined){
//                    // If zoomlevel is above "wfs layer" and the store is not emty, do the map center lengt calculation anyway
//                    if(smileListFeatureStore.data.items.length != 0){
//                        smileListFeatureStore.fireEvent('load');
//                    }
//                }
            }
        });
        
        // listner to handle the level to show wms layer.
        map.events.register('zoomend', this, function (event) {
        	var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
            var map = mObj.getMap();
            var level = map.getZoom();
            
 
         
            layer = map.getLayersByName('SmilWmsObjekt')[0];
            
            if(layer != undefined){
                if(level <= param.mapWfsQueryTopLevel -1 )
                    {
                        layer.setVisibility(true);
                    }else{
						layer.setVisibility(false);
				}
			}
        });
        
        function notice(bounds) {

// TODO: fix check for presed state on button mapInfoBtn
//            // Check if function is activated in the ui
//            var btnAction = Ext.getCmp('mapInfoBtn');
//            if(!btnAction.pressed){
//                    
//                    // if store is not emty and query button is not active, do the map center lengt calculation anyway. 
//                    if(smileListFeatureStore.data.items.length != 0){
//                            smileListFeatureStore.fireEvent('load');
//                    }
//                    // Bail out of function                        
//                    return void(0);
//            }
                            
                       var layer = map.getLayersByName('Selected Features2')[0];
                       if(layer != undefined){
                               map.removeLayer(layer);
                               layer.destroy();
                       }

// TODO: Fix loadingmask                       
//            myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Områdesdata hämtas..."});
//            myMask.show();
                    
        var myStyles = new OpenLayers.StyleMap({
            "default": new OpenLayers.Style({
                // pointRadius: "${type}", // sized according to type attribute
                pointRadius: 10,
                fillColor: "${getColor}",  
                strokeColor: "#110000",
                strokeWidth: 2,
                graphicZIndex: 1
            },            {
            context: {
                getColor : function (feature) {
                    return feature.attributes.Status  == 'Ingen åtgärd' ? 'green' :
                               	data.properties.mdist_max  >= 'Aktuell för byte'? 'yellow' :
                           		data.properties.mdist_max  >= 1 ? 'orange' :
                                                                'gray' ;
                        }
                    } 
                }),
            "select": new OpenLayers.Style({
                fillColor: "#66ccff",
                strokeColor: "#3399ff",
                graphicZIndex: 8	
            })
        });
                            
                var filterQuery = new OpenLayers.Filter.Spatial({ 
                            type: OpenLayers.Filter.Spatial.BBOX, 
                            value: bounds,
                            projection: new OpenLayers.Projection("EPSG:4326")
                   });
                
                var SMap = new OpenLayers.Layer.Vector("Selected Features2", {
                   // styleMap: myStyles,
                	// TODO: Fix Style on WFS layer.
                	 //styleMap: getStyles2(),
                    // strategies: [new OpenLayers.Strategy.BBOX()],
                    displayInLayerSwitcher: true,
                    filter: filterQuery,
                    projection: new OpenLayers.Projection("EPSG:4326"),
                    protocol: new OpenLayers.Protocol.WFS({
                    url: param.url,
                    featureType: param.featureType,
                    featureNS: param.featureNS,
                    outputFormat: "application/json"
                            })
                });
               

/*                        
                        SMap.events.register("featureselected", SMap, selected);
                        SMap.events.register("featureunselected", SMap, unSelected);
                        
                        function selected (evt) {
                            // alert(evt.feature.id + " selected on " + this.name);
                            console.log(evt.feature.data);
                        }
                        
                        function unSelected (evt) {
                            // alert(evt.feature.id + " selected on " + this.name);
                            // console.log(evt.feature.data);
                        }
                        
                        function closeEditing() {
                                // avoid reentrance
                                if (!arguments.callee._in) {
                                        arguments.callee._in = true;
                                        selectFeature.unselectAll();
                                        delete arguments.callee._in;
                                }
                        }                        
                        
                        var selectFeature = new OpenLayers.Control.SelectFeature(SMap, {
                                eventListeners : {
                                        deactivate : closeEditing
                                }
                        });
                        
                        // add the selectControl and activates it.Is it needed?
                        map.addControl(selectFeature);
                        selectFeature.activate();                            
*/
                
                    // Show layer if its hidden
                SMap.setVisibility(true);
                // Add layer to map
                map.addLayers([SMap]);
                                    
                    var response = SMap.protocol.read({
                        // readOptions: {output: "object"},
                        // resultType: "hits",
                        // maxFeatures: null,
                        // scope: new OpenLayers.Strategy.BBOX(),
                        
                        filter : filterQuery,
                        maxFeatures: param.MaxFeatures ,
                        callback: _CallBack
                    });
                    
                    // response callback the sends the GeoJson response to the SmileLoadMapFeatures controller ans shwos them on the map.
                    // Sends the response to the respObjcobject (GeoJSON) to smileFeatureStore loadDataviaReader function. 
                    function _CallBack (resp) {
                        // TODO: Fix loadingmask
                    	// myMask.hide();
                    	
                        //SMap.addFeatures(resp.features);

                        respObj = {};
                        respObj = Ext.JSON.decode(resp.priv.responseText);
                        
                        if(resp.success()){
                                if(respObj.features.length >= param.MaxFeatures){
                                        Ext.Msg.alert('För många objekt.', 'Fler än '+param.MaxFeatures+'st finns i området. Sök i ett mindre område för att få med alla objekt.');
                                };                                            
                        }
                        
						// Send the response to controller and render the response
                        var Controller = Smile.app.application.getController('SmileLoadMapFeatures');
                        Controller.addGeoJSONLayer({
                        	responseText : respObj
                        });
                        
                        var store = Ext.getStore('smileListFeatureStore');
                        // remove all records in the store.
                        // TODO: Fix Store
                        store.removeAll();

                    	// TODO: Fix Store
                        // Populate store with the response.
                        // The load trigger is activated and calculate the distance to the records from the center of the map.
                          store.loadDataViaReader(respObj);
//						  store.add(respObj);
	//					store.load();
                        
                        var list = Ext.getCmp('smileFeatureList');

                        list.setItemTpl(new Ext.XTemplate('<div class="contact">{lampa}</div>'));
                        list.setStore(store);
                        
                        //btn = Ext.getCmp('mapInfoBtnGroup');
                        //btn.setPressed(0, false);
                    };
                    

        }
                    
    } 
    
});