Ext.define('Smile.view.MainFeatureListSmileFeatureList',{
	extend: 'Ext.List',
    alias: 'widget.smileFeatureList',	
//	requiers: ['Smile.view.MainFeatureCarousel'],
	
    config: {
		width : 'fit',
		height : 'fit',
		scroll: 'vertical',
		xtype : 'list',
		padding: 0,
		// ***************  todo *****************
		// store : 'smileListFeatureStore',
		id  : 'smileFeatureList',
		onItemDisclosure : function(record, btn, index) {
			
			var featureCarousel = Ext.getCmp('featureCarousel');
			// TODO: Scroll to top diabeld	
			// this.scroller.scrollTo({x: 0,y: 0});	
			featureCarousel.setActiveItem(1);	
			
			var card = featureCarousel.getComponent(1);
			// card.scroller.scrollTo({x:0, y:0});
			
			var Controller =  Smile.app.application.getController('MainFeatureForm');
			Controller.renderForm(record);
			

			// console.log(this.component);
			
			// TODO: zoomHighLightRecord
			//zoomHighLightRecord(record);
		},	

		listeners : {
			itemtap: function( list, index, target, record, e, eOpts ){
				var UtilController =  Smile.app.application.getController('SmileMapFunctions');
				UtilController.highLightRecord(record);
			
			
//				if(settings.zoomToRecord){
//					zoomHighLightRecord(record);
//				}else{
//					highLightRecord(record);
//				};				
			}
		},
//		itemTpl: ['<div class="contact">Apa</div>']
		  itemTpl:  new Ext.XTemplate(
	                '<tpl for=".">',
	                
	                '<p>{plats}</p>',
	            '</tpl>'
		)
	 	
    }
})
