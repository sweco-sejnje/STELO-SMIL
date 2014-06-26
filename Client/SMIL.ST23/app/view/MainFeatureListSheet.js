Ext.define('Smile.view.MainFeatureListSheet',{
	extend: 'Ext.Sheet',
    alias: 'widget.mainfeaturelistsheet',	
//	requiers: ['Smile.view.MainFeatureCarousel'],
	
    config: {
		itemId : 'featureItems',
		id : 'featureItems',
		// centered : false,
		right: 0,
		hidden: true,
		hideOnMaskTap : false,
		renderTo: 'smileIndexMap',
		modal : false,
		enter : 'right',
		exit : 'right',
		// width : settings.featureListPanelWidth,
		width : 400,
		padding: 4,
		stretchY : true,						// Fyller ut hela panelen i fönstret
		layout : {
			type : 'hbox',
			align : 'stretch' 					// gör att det går att scrolla i panelen.
		},
		defaults : {
			flex : 1
		},
		
		items : [{
			xtype: 'mainfeaturecarousel'
		},{
			xtype: 'mainfeaturelisttopbar',
			docked :'top'
		}]

    }
})