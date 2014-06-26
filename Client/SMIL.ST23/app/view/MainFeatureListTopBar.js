Ext.define('Smile.view.MainFeatureListTopBar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.mainfeaturelisttopbar',

	requires: [
		'Ext.Toolbar',
		'Ext.Spacer'
		//'Ext.os'
	],
    config: {
			dock: 'top',
			
			defaults: {
//				xtype: "gxm_button",
				// ui: 'small'
//				exclusiveGroup: 'work-on-map',
//				map: map
			}
			,
			items: [

			{
				xtype : 'button',
				ui : 'normal',
				text : 'Skapa ny plats från GPS',
				id: 'btnCreateGPSplace'
			}
			,
			{	
				xtype: 'spacer'
			},
			{
				xtype : 'button',
				cls: 'close-btn',
	            ui: 'decline',
				text : 'Stäng',
	
				handler : function() {
					var featureList = Ext.getCmp('featureItems');
					featureList.hide();
				}
			}
			]
			
    }
});
