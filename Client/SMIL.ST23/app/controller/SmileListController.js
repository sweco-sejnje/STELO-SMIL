Ext.define('Smile.controller.SmileListController', {
	extend: 'Ext.app.Controller',
    config: {
        refs: {
			map: '#smileMapPanel'
        }
    },
	showSmileList: function(component){

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
                id: 'smileLayerLists',
                scrollable: true,
                ui: 'round',
                height: '100%',
                store: 'Capabilities',
                itemTpl: '{name}',
				listeners: {
					itemtap: function(dataview, index, target, record, e, eOpts) {
						var listName = record.get('name');
						console.log(listName);
						listPanel.hide();
						listPanel.destroy();
						
						var Controller = Smile.app.application.getController('SmileLoadMapFeatures');
        				Controller.showSmileFeatureList(listName);

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

})