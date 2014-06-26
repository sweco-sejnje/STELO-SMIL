Ext.define('Smile.view.MainTopBar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.maintopbar',
	
	requires: [
		'Ext.Toolbar',
		'Ext.Spacer'
		//'Ext.os'
	],
    config: {
    	id: 'topTitleBar',
        items: [
        {
			title : 'Zoom In',
			iconCls : 'add',
			iconMask : true,
			ui : 'action',
			hidden : Ext.os.deviceType == 'Phone' ? true : false,
			id: 'mapZoomInBtn'
		},
        {
			title : 'Zoom out',
			iconCls : 'minus2',
			iconMask : true,
			ui : 'action',
			hidden : Ext.os.deviceType == 'Phone' ? true : false,
			id: 'mapZoomOutBtn'
		},
		({
			xtype : 'segmentedbutton',
			itemId : 'locateMe',
			allowMultiple : true,
			items : [{
				ui : 'action',
				iconMask : true,
				iconCls : 'locate',
				id: 'locateMe'
			}],
			listeners : {
				toggle : function(buttons, button, active) {
					if (button.iconCls === 'locate') {
						if (active) {
							geolocate.watch = true;
							firstGeolocation = true;
							geolocate.activate();			
						} else {
							vector.removeAllFeatures();
							geolocate.watch = false;
							firstGeolocation = true;
							geolocate.deactivate();

							var btn = Ext.getCmp('locateMe');
							btn.removeCls("x-button-confirm");
							btn.addCls("x-button-normal");

							var btn = Ext.getCmp('btnCreateGPSplace');
							btn.removeCls("x-button-confirm");
							btn.addCls("x-button-normal");
							btn.setHandler(function() {
							});
						};

					}
					}
			}
			}
		),
		
		{
			xtype: 'spacer'
		},
		/*{
			iconCls : "search",
			iconMask : true,
			ui : 'action',
			// hidden : settings.geoNameSearchDisabeld,
			handler : function() {
				// this is the app
				map = myMap.getMap();
				if (!GeoApp.searchFormPopupPanel) {
					GeoApp.searchFormPopupPanel = new GeoApp.SearchFormPopupPanel(
							{
								map : map
							});
				}
				GeoApp.searchFormPopupPanel.show('pop');
			}
		},*/
		
		({
			xtype : 'segmentedbutton',
			hidden: false,
			
			// itemId : 'mapInfoBtn',
			id : 'mapInfoBtnGroup',
			allowMultiple : true,
			listeners : {
				toggle : function(buttons, button, active) {
						if (active) {
							button.removeCls("x-button-normal");
							button.addCls("x-button-confirm");
							// map.events.triggerEvent('moveend',{});
						} else {
							button.removeCls("x-button-confirm");
							button.addCls("x-button-normal");
						};
				}
			},
			items : [{
						ui : 'action',
						id : 'mapInfoBtn',
						pressed: true,
						text : '', 
						cls : 'x-button-confirm',
						iconMask : true,
						iconCls : 'info',
						hidden: false
					}]
		}

		),		

		
		{
			iconMask: true,
		    iconCls: 'list',
		    id: 'smileListsBtn',
		    disabled: false,
		    text: 'list'
		}/*,
		{
			text : Ext.os.deviceType == 'Phone' ? '' : 'Bakgrundskarta',
			id : 'mapLayersBtn',
			iconCls : "screens",
			iconMask : true,
			ui : 'action'
		}
		*/
		,
		{
			xtype: 'spacer'
		},
		{
			itemId : 'featuresBtn',
			id : 'featuresBtn',
			text : Ext.os.deviceType == 'Phone' ? '' : 'Feature lista',
			iconCls : 'info',
			iconMask : true,
			ui : 'normal'
		},
		{
			hidden: true,
			iconMask: true,
		    iconCls: 'list',
		    id: 'smileLayersBtn',
		    disabled: false,
		    text: 'Lager'
		}],
	      layout: {
            type: 'hbox',
            align: 'center'
        }

    }
        
    
});
