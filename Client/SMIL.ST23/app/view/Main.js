Ext.define('Smile.view.Main', {
    extend: 'Ext.Container',
    alias: 'widget.mainpanel',
    
    xtype: 'main',
	id: 'mainTabPanel',
	requires: [
		//'Ext.smile.OpenLayersMap',
		'Ext.Carousel',
		'Ext.Spacer',
		'Smile.view.Popup',
		'Smile.view.MainFeatureListSheet',
		'Smile.view.MainFeatureCarousel',
		'Smile.view.MainFeatureListTopBar',
		'Smile.view.MainFeatureListSmileFeatureList',
		'Smile.view.MainFeatureForm',
		'Smile.view.MainFeatureNotesPanel',
		'Smile.view.MainFeatureNotesList',
		'Smile.view.MainFeatureNoteFormPanel',
		'Smile.view.MainFeatureEditNoteFormPanel',
		'Smile.view.MainFeaturePictureContainer',
		'Smile.view.MainFeaturePicturesList',
		'Smile.view.MainFeaturePictureFormPanel',
		'Smile.view.MainFeatureEditPictureFormPanel'
		
	],
	
    config: {

        items: [

        	{
        		xtype:'maintopbar',
        		docked: 'top'
        	},
			{
				// Ext.ux.OpenLayersMap Component
				xtype: 'openlayersmap',
				id: 'smileMapPanel',
				useCurrentLocation: true,
				autoMapCenter: false,
				mapOptions: {
					zoom: 15,
					controls: [		//new OpenLayers.Control.LayerSwitcher(),
									new OpenLayers.Control.TouchNavigation(),
									new OpenLayers.Control.Attribution(),
 									new OpenLayers.Control.Navigation(),
 									new OpenLayers.Control.Geolocate({
									    id: 'locate-control',
									    geolocationOptions: {
									        enableHighAccuracy: true,
									        maximumAge: 0,
									        timeout: 7000
									    }
									})]
				}
			},
			{
				xtype: 'mainbottombar',
				docked: 'bottom'
			},
			{
				xtype: 'mainfeaturelistsheet'
			},
			{
				xtype: 'popup'
			}
		]
    }
        
    
});
