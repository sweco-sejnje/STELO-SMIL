Ext.define('Smile.view.Popup', {
    extend: 'Ext.Panel',
    alias: 'widget.popup',
    requires: [	'Smile.view.PopupList',
    			'Smile.model.Capabilities',
    			'Ext.dataview.List','Ext.XTemplate'],
    config: {
        modal: true,
        hidden: true,
        //labelWidth: 200,
        fullscreen: true,
        centered: true,
        hideOnMaskTap: true,
        width: 300,
        html: 'Smilelager',
        height: 380,
        scrollable: true        
    },
    items: {
//    	    xtype:'list',
//			store: 'Capabilities',
//			styleHtmlContent: true,
//			itemTpl: '{<p>1{name}</p>}'
    	
//  {
        xtype: 'list',
        scrollable: true,
        ui: 'round',
        height: '100%',
        store: {
            fields: ['name'],
            data: [
                {name: 'Cowper'},
                {name: 'Everett'},
                {name: 'University'},
                {name: 'Forest'}
            ]
        },
        itemTpl: '{name}'
    }
    	
		//}  
    	
});