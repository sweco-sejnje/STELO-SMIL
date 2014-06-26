Ext.define('Smile.controller.MainTopBar', {
    extend: 'Ext.app.Controller',
    requires: [
    			'Smile.store.Capabilities',
    			'Smile.view.SmileLayersList',
    			'Ext.dataview.List','Ext.XTemplate'],	
    config: {
        refs: {
			openLayersMap: '#smileMapPanel',
			button: '#smileListsBtn',
			locateMeBtn: '#locateMe'
        },
		control: {

            "maintopbar #smileListsBtn": {
                tap: 'onSmileListsBtnTap'
            },
            "maintopbar #mapLayersBtn": {
                tap: 'onSmileLayersBtnTap'
            },
            "maintopbar #featuresBtn": {
                tap: 'onfeaturesBtnTap'
            },
            "locateMeBtn": {
            	tap: 'onLocateMeBtnTap'
            }
		}
    },

    onfeaturesBtnTap: function(component){
        	var featureList = Ext.getCmp('featureItems');
        	
        	if(featureList.isHidden()){
	        	featureList.show();	
        	}else{
				featureList.hide();        		
        	}
        	
        	var featureCarousel = Ext.getCmp('featureCarousel');
        	
			var siteinfo = featureCarousel.setActiveItem('smileFeatureList', {
				type: 'slide',
				direction: 'left'
			});    	
    	
    },
    
	onSmileListsBtnTap: function(component){

		var Controller = Smile.app.application.getController('SmileListController');
		Controller.showSmileList(component);

	},
	onLocateMeBtnTap: function(component){
				
		var mapPanel = this.getOpenLayersMap();

		
		// Run the wfs query
		var btn = this.getLocateMeBtn();
		if(btn.getPressedButtons()[0] != undefined){
			mapPanel.setShowCurrentLocation(true);
			mapPanel.setAutoMapCenter(true)
		}else{
			mapPanel.setShowCurrentLocation(false);
			mapPanel.setAutoMapCenter(false);
			
			var map = mapPanel.getMap();
			var vector = map.getLayersByName('Geolocation Layer')[0];
			vector.removeAllFeatures();
			
			// Deactivate locate me button.
			var button = Ext.getCmp('locateMe');
			button.removeCls("x-button-confirm");
			button.addCls("x-button-normal");
			
			// Deactivate create place button
			var btn = Ext.getCmp('btnCreateGPSplace');
			btn.removeCls("x-button-confirm");
			btn.addCls("x-button-normal");
			btn.setHandler(function() {
			});			
			
		}

	},	
	onSmileLayersBtnTap: function(component){

		var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
	    var map = mObj.getMap();
	    
	    var itemTpl = new Ext.XTemplate(
            '<tpl if="baselayer == true">',
            	'<div class="gx-layer-base">',
            '</tpl>',
            '<tpl if="baselayer == false">',
            	'<div class="gx-layer-nobase">',
            '</tpl>',
            
	            '<tpl if="visibility == true">',
	            	'<tpl if="baselayer == true">',
	                	'<img width="20" src="resources/images/radio-round-green.png">',
	                '</tpl>',
	                '<tpl if="baselayer == false">',
	                	'<img width="20" src="resources/images/check-round-green.png">',
	            	'</tpl>',    
	            '</tpl>',
	
	            '<tpl if="visibility == false">',
	            	'<tpl if="baselayer == true">',
	                	'<img width="20" src="resources/images/radio-round-grey.png">',
	            	'</tpl>',
	            	'<tpl if="baselayer == false">',
	                	'<img width="20" src="resources/images/check-round-grey.png">',
	            	'</tpl>',
	            '</tpl>', 
        	'<span class="gx-layer-item">{name}</span>',
	        '</div>'
        );
	    
	    map.events.on({
	        "changelayer": this.onChangeLayer,
	        scope: this
	    });		

	    function findLayerRecord(layer){
	        var found;
	        this.store.each(function(record){
	            if (record.get("id") === layer.id) {
	                found = record;
	            }
	        }, this);
	        return found;
	    };
	    
	    function onChangeLayer(evt){
	        if (evt.property == "visibility") {
	            var record = this.findLayerRecord(evt.layer);
	            record.set("visibility", evt.layer.getVisibility());
	        }
	    };
	    
	    function createStore(){
	        Ext.regModel('Smile.model.Layer', {
	            fields: ['id', 'name', 'visibility', 'zindex', 'baselayer']
	        });
	        var data = [];
	        
	        //var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
	        //this.map = mObj.getMap();
	        
	        Ext.each(map.layers, function(layer){
	        	if (layer.name !=="Geolocation Layer" ) {
	        	// if (layer.name !=="Geolocation Layer" && layer.name !=="SmilObjekt" && layer.name !=="Ritlager") {
		            if (layer.displayInLayerSwitcher === true) {
		                var visibility = layer.isBaseLayer ? (map.baseLayer == layer) : layer.getVisibility();
		                data.push({
		                    id: layer.id,
		                    name: (layer.name == 'SmilObjekt') ? 'Feature list' : layer.name,
		                    visibility: visibility,
		                    zindex: layer.getZIndex(),
		                    baselayer: layer.isBaseLayer
		                });
		            }
	        	}
	        });
	        return new Ext.data.Store({
	            model: 'Smile.model.Layer',
	            sorters: 'zindex',
	            data: data
	        });
	    }		

	   	var store = createStore();
	    
		var listPanel = new Ext.Panel({
            left: 0,
            padding: 10,
            width: 400,
            height: 600,
            modal: true,
            hideOnMaskTap: true,
            autoDestroy: true,
			layout: 'fit',
            items: [{
                xtype: 'list',
                id: 'smileLayerList',
                scrollable: true,
                disableSelection: true,
                ui: 'round',
                height: '100%',
                store: store,
                itemTpl: itemTpl,
                 listeners: {
                    itemtap: function(dataview, index, target, record, e, eOpts) {
						var record = dataview.getStore().getAt(index);
			            var layer = map.getLayersBy("id", record.get("id"))[0];
			            if (layer.isBaseLayer) {
			                map.setBaseLayer(layer);
			            }
			            else {
			                layer.setVisibility(!layer.getVisibility());
			            }
			            record.set("visibility", layer.getVisibility());
			        }
				}
            }],
			listeners:{
            	hide: function(){
            		listPanel.destroy();
            	}
            }
        })
        
        listPanel.showBy(component)
	}
});