Ext.define('Smile.controller.SmileDynamicStoreController',{
	extend:'Ext.app.Controller',
	config:{
		smileModelFields: null,
		//myMask : null,
		selectedListName: null
	},
	initModel: function(selectedSmileList){
		// this.setSmileModelFields(selectedSmileList);
		
		me = this;
		
		this.setSmileModelFields({});
		
		// TODO: enable loadingmask
		// Create loading mask
		// myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Data hämtas..."});
		
		// Do the request from Sharepoint and inite the onSuccess function
		// Or throw an infobox to the user tht someting went wrong.
		Ext.Ajax.request({
		    disableCaching: false ,
	        // timeout : settings.ajaxTimeout,
	        timeout : 5000,
	        // TODO: fix settings url
		     url : settings.describefeaturetypeURL + selectedSmileList,
	       success : function(response){
				// TODO: Fix logic to enable and disable WFS och load the store into memory
				// var Controller = Smile.app.application.getController('SmileDynamicStoreController');
				// Controller.onSuccess();
				me.onSuccess(response)
			},
			failure: function(response, opts) {
				//myMask.hide();
				console.log('Error loading data from server ' + response.status);
				Ext.Msg.alert('Kommunikationsproblem.', 'Du kan för närvarande inte hämta data från servern. Kontorllera inställningarna och försök igen.');
			}
		});
		
	},
	// This function generate the dynamic store for the model.
	// i´s also enabels and dosabels the buttons in the gui depend on layertype  
	onSuccess : function(response) {
		me = this;
		
		var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicModelMaker');
		
		var smileModel = Controller.createDynamicModel(response.responseText);		
		
		this.setSmileModelFields(smileModel.smileModelFields);
		
		var fields = smileModel.fields;
		var modelName = smileModel.modelName;
		
		me.setSelectedListName(modelName);
		
		// TODO: Setup imageLibraryModel and its functionallity
		
		// call and setup imageLibraryModel
		// smileImageListModel(modelName); 
		
		// set the proxy object with the dynamicSmileModel
	
//		for(i=0; i<fields.length; i++) {
//
//			Ext.define('Smile.model.'+modelName, {
//				extend : 'Ext.data.Model',
//				
//				config : {
//					fields : fields,
//					proxy: {
//					    type: 'ajax',
						// TODO: Fix settings URL
//					    // url: settings.getfeatureURL, 
//					    url: 'http://172.18.39.30/_layouts/SMIL/wfs.ashx',
//					    reader: {
//					        type: 'json',
//					        root: ''
//						}
//					} 				
//				}
//				
//			});
//			
//		}
//		

		
		Ext.define(modelName, {
			extend : 'Ext.data.Model',
			id: 'smileListFeatureModel',
			config : {
				fields : fields
			}
		});

		var smileListFeatureStore = Ext.create('Ext.data.Store', {
	    	model : modelName,			
			id: 'smileListFeatureStore',

			proxy : {
				type: 'ajax', 
				// TODO: fix setting getfeatureURL
				 url : settings.getfeatureURL,
				
				pageParam: undefined,
				startParam: undefined,
				limitParam: undefined,
				
				extraParams: {
	      			service:'wfs',
	      			version:'1.0.0',
	      			request:'getfeature',
	      			outputformat: 'json',
	      			typename: modelName
				},
				reader : {
					type : 'json',
					rootProperty : 'features',
					root: 'features'
				},
				autoLoad : false,
				
			    actionMethods: {
			        create: 'POST',
			        read: 'GET',
			        update: 'PUT',
			        destroy: 'DELETE'
			    },				
				afterRequest: function (request, success) {
					if (success) {
						console.log("success");
					} else {
						console.log("failed");
	                }
	     		}
     		},

			listeners: {		
				load: function(me, records, successful, operation, eOpts ){

					var proxy = me.getProxy();
					var reader = proxy.getReader();
					var Response = Ext.encode(reader.rawData);
					
// 					console.log(Response);
					
					// TODO: Fix the distance calculation in store.
//					smileListFeatureStore.each(function(record){
//						var newData = getDistanceFromUser(record.data);
//						record.set( 'distance', parseFloat(newData) );
//					});
						
//					if(featureCarousel.getActiveItem() != undefined){	
//						if(featureCarousel.getActiveItem().id == 'smileFeatureList'){
//							smileListFeatureStore.sort('distance', 'ASC');
//						}
//					}	
		
				}
			}		
		});		
		
		
//		smileListFeatureStore.load({
//		    callback: function(records, operation, success) {
//		        // the operation object contains all of the details of the load operation
//		//    	console.log("------smileListFeatureStore-------- the operation object contains all of the details of the load operation --------------")
//				console.log(records);
//		        console.log(records.length);
//		    },
//		    scope: this
//		});
		
		// generate the store with its modelname	
		me.createOrDoMap(modelName, '');
	
	},	

	createOrDoMap : function(modelName, wfsUrl) {
		
		// if store is created then change the modelname.
		// we use one store with diffrent models.
		// we only create the store here, no data is populated at this time.
		// The store is populated from the controller MapWFSService action queryMoveWFSLayer in the _CallBack function.
		


		// triggerd from the stores load event. return the distance in meters
		function getDistanceFromUser(data){
			var lonX = data.coordinates.split(',')[0]; // 22.7019720164609
			var latY = data.coordinates.split(',')[1]; // 66.0657646090535
			
			var source = new Proj4js.Proj('EPSG:900913');
			var dest = new Proj4js.Proj('EPSG:4326');
			
			var map = myMap.getMap();
			var lonLat = map.getCenter();
		
			m = new Proj4js.Point(lonLat.lon, lonLat.lat);
			Proj4js.transform(source, dest, m);		
	
			var dist = caclulateDistance(parseFloat(lonX), parseFloat(latY) , m.x , m.y );	

			return parseFloat(dist);
		}
		
		// calculate the distance between two coordinates, return meters
		function caclulateDistance(LatA, LngA, LatB, LngB){
			//return(LatA +"#"+ LngA +"#"+ LatB +"#"+ LngB);
			var rad = function(x){return x*Math.PI/180;};
			var R = 6371000;                          //Earth Radius in m
			var dLat  = rad(LatB - LatA);
			var dLong = rad(LngB - LngA);
	
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(LatA)) * Math.cos(rad(LatB)) * Math.sin(dLong/2) * Math.sin(dLong/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c;
	
			return d.toFixed(1);                      //Return 3 decimals
		};

		// TODO initialize the formapenl to be able to Load data to formpanel
		// if formpanel object (sliding panel on the right) is note created do that, this is only needed once.
//		if(form == undefined){
//			doFirstLayout(smileListFeatureStore);
//		};
	
		var myMap = Ext.getCmp('smileMapPanel');
		var map = myMap.getMap();
 		
		var lager = map.getLayersByName('SmilWmsObjekt')[0];
		if(lager != undefined){
			lager.destroy();
		}

		var layer = new OpenLayers.Layer.WMS("SmilWmsObjekt" , 
			
			// TODO: Fix Settings wmsURL
		 settings.wmsURL,
			//'http://172.18.39.241:8080/geoserver/svk/wms',
	        {  
	        	// TODO: Fix Settings wmsWorkspace+':' + modelName
	            // LAYERS: settings.wmsWorkspace+':' + modelName,
	            LAYERS: 'svk:'+ modelName,
	            
	            STYLES: '',
	            format: 'image/png',
	            TRANSPARENT: true,
	            tiled: false
	        },
	        {
	            // TODO: Fix Settings parameter tileBuffer
	            // buffer: settings.tileBuffer,
	            buffer: 0,
	            displayOutsideMaxExtent: true,
	            isBaseLayer: false,
	            noMagic : false,
	            visibility: true,
	            displayInLayerSwitcher: false
	        }
		);        	
		
		map.addLayer(layer);
		
	}
	
})