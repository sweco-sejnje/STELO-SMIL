Ext.define('Smile.view.MainFeatureForm', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.mainfeatureformpanel',

//	requires: [
//		'Smile.view.MainFeatureSheetList'
//	],
    config: {
		id:'featureFormPanel',
		bodyPadding: 0,
		bodyMargin: 0,
		scrollable: 'vertical',
		width : 'fit',
		height : 'fit',
		
		layout: 'vbox',
		listeners : {
			activate : function(panel){
				// console.log('Formpanel syns!');
				// this.scroller.scrollTo({x: 0,y: 0});
					
			},
			afterrender: function(panel){
				
			}
			
		}
	}
})    