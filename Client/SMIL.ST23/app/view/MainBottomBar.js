Ext.define('Smile.view.MainBottomBar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.mainbottombar',

	requires: [
		'Ext.Toolbar',
		'Ext.Spacer',
		//'Ext.os'
	],
    config: {
    	id: 'bottomTitleBar',
        items: [
        {
			xtype:'spacer'
		},
		{
			itemId : 'logoutBtn',
			id : 'logoutBtn',
			text : Ext.os.deviceType == 'Phone' ? '' : 'Logga ut',
			iconCls : 'action',
			iconMask : true,
			ui : 'action',
			handler : function() {
				document.location.href = "/_layouts/SignOut.aspx";
			}
		}
        ],
		layout: {
			type: 'hbox',
			align: 'center'
        }

    }
        
    
});
