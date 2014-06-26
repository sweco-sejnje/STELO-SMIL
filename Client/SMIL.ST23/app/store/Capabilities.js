Ext.define('Smile.store.Capabilities', {
    extend: 'Ext.data.Store',
    
    requires: [
        'Smile.model.Capabilities',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
    	autoLoad: true,
        model: 'Smile.model.Capabilities',
        storeId: 'Capabilities',
        proxy: {
            type: 'ajax',
            extraParams: {
                outputFormat: 'json'
            },
            limitParam: false,
            enablePagingParams: false,
            noCache: false,
            url: settings.wfsUrl + '?service=wfs&version=1.0.0&request=getcapabilities',
            //url: 'http://172.18.39.30/_layouts/SMIL/wfs.ashx?service=wfs&version=1.0.0&request=getcapabilities',
            reader: {
                type: 'json',
                rootProperty: 'WFS_Capabilities.FeatureTypeList'
            }
        },
        listeners: [
            {
                fn: 'onJsonpstoreLoad',
                event: 'load'
            }
        ],
        sorters: {
            direction: 'ASC',
            property: 'name'
        }
    },

    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.getProxy().getReader().on([{
            fn: 'onJsonException',
            event: 'exception',
            scope: me
        }]);
        me.getProxy().on([{
            fn: 'onAjaxException',
            event: 'exception',
            scope: me
        }]);
    },

    onJsonException: function(reader, response, error, eOpts) {
		Ext.Msg.alert('Fel - Json', 'Det gick inte att ladda information från servern', Ext.emptyFn);
    },

    onAjaxException: function(proxy, response, operation, eOpts) {
		Ext.Msg.alert('Fel - Ajax', 'Det gick inte att ladda information från servern', Ext.emptyFn);
    },

    onJsonpstoreLoad: function(store, records, successful, operation, eOpts) {
		console.log('Capabilites Store data laddat '+ records.length+'st records');
    }
});
