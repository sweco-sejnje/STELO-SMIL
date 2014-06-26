Ext.define('Smile.view.MainFeatureCarousel', {
    extend: 'Ext.Carousel',
    alias: 'widget.mainfeaturecarousel',

//	requires: [
//		'Smile.view.MainFeatureSheetList'
//	],
    config: {
		id : 'featureCarousel',	
		indicator: false,
		draggable: false,
		items : [{
			xtype: 'smileFeatureList'
		},
		{
			xtype: 'mainfeatureformpanel'
		},
		{
			xtype: 'featurenotespanel'
		},
		{
			xtype: 'noteformpanel'
		},
		{
			xtype: 'editnoteformpanel'
		},
		{
			xtype: 'featurepicturecontainer'
		},
		{
			xtype: 'featurepictureformpanel'
		},
		{
			xtype: 'editpictureformpanel'
		}

		]},
		listeners : {
		
			cardswitch: function(panel, newCard, oldCard, index, animation){
				//
			}
		
			}
	
	    }
)    