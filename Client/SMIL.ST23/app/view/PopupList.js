Ext.define("Smile.view.PopupList", {
    extend: 'Ext.dataview.List',
    alias: 'widget.popuplist',
    xtype:'listView',
    requires: [
	    'Smile.model.Capabilities'
	],

    config: {

		store: 'Capabilities',
		
		// parent is scrollable
		scrollable:false,
		itemTpl: new Ext.XTemplate(
			'<p>{name}</p>' 
		) // end XTemplate
	}  // end config
});