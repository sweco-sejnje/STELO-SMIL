Ext.define("Smile.view.SmileLayersList", {
    extend: 'Ext.dataview.List',
    alias: 'widget.smilelayerslist',
    requires: [
    			'Ext.dataview.List','Ext.XTemplate'],	    
    config: {
	
        refs: {
			openLayersMap: '#smileMapPanel'
        }
    },    
    map: null,
    
    createStore: function(){
        Ext.regModel('Smile.model.Layer', {
            fields: ['id', 'name', 'visibility', 'zindex']
        });
        var data = [];
        
        //var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
        //this.map = mObj.getMap();
        
        Ext.each(this.map.layers, function(layer){
        	if (layer.name !=="Geolocation Layer" ) {
        	// if (layer.name !=="Geolocation Layer" && layer.name !=="SmilObjekt" && layer.name !=="Ritlager") {
	            if (layer.displayInLayerSwitcher === true) {
	                var visibility = layer.isBaseLayer ? (this.map.baseLayer == layer) : layer.getVisibility();
	                data.push({
	                    id: layer.id,
	                    name: (layer.name == 'SmilObjekt') ? 'Feature list' : layer.name,
	                    visibility: visibility,
	                    zindex: layer.getZIndex()
	                });
	            }
        	}
        });
        return new Ext.data.Store({
            model: 'Smile.model.Layer',
            sorters: 'zindex',
            data: data
        });
    },
    
    initialize: function(){
    	
    	var mObj = Ext.ComponentQuery.query('.openlayersmap')[0];
        this.map = mObj.getMap();
    	
        this.store = this.createStore();
        this.itemTpl = new Ext.XTemplate(
            '<tpl if="visibility == true">', 
                '<img width="20" src="res/images/check-round-green.png">', 
            '</tpl>', 
            '<tpl if="visibility == false">', 
                '<img width="20" src="res/images/check-round-grey.png">', 
            '</tpl>', 
            '<span class="gx-layer-item">{name}</span>'
        );
        this.listeners = {
            itemtap: function(dataview, index, item, e){
                var record = dataview.getStore().getAt(index);
                var layer = this.map.getLayersBy("id", record.get("id"))[0];
                if (layer.isBaseLayer) {
                    this.map.setBaseLayer(layer);
                }
                else {
                    layer.setVisibility(!layer.getVisibility());
                }
                record.set("visibility", layer.getVisibility());
            }
        };
        
        this.map.events.on({
            "changelayer": this.onChangeLayer,
            scope: this
        });
        
        this.callParent(arguments);
//        App.LayerList.superclass.initComponent.call(this);
    },

    findLayerRecord: function(layer){
        var found;
        this.store.each(function(record){
            if (record.get("id") === layer.id) {
                found = record;
            }
        }, this);
        return found;
    },
    
    onChangeLayer: function(evt){
        if (evt.property == "visibility") {
            var record = this.findLayerRecord(evt.layer);
            record.set("visibility", evt.layer.getVisibility());
        }
    }

});