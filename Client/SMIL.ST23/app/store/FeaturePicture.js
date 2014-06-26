Ext.define('Smile.store.FeaturePicture', {
    extend: 'Ext.data.Store',
    
    requires: [
        'Smile.model.FeaturePicture',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
    	autoLoad: true,
        model: 'Smile.model.FeaturePicture',
        storeId: 'FeaturePicture',
       // data:[{"ID":277,"Created":"2014-01-20 15:01","Modified":"2014-01-20 15:01","ImageName":"WFSPoints_test_postgre-174-2014-01-20-150336.jpg","Category":"Kategori","ThumbNailUrl":"http://svkutv.swecosundsvall.se/images2/_t/WFSPoints_test_postgre-174-2014-01-20-150336_jpg.jpg","PreviewUrl":"http://svkutv.swecosundsvall.se/images2/_w/WFSPoints_test_postgre-174-2014-01-20-150336_jpg.jpg","ImageUrl":"http://svkutv.swecosundsvall.se/images2/WFSPoints_test_postgre-174-2014-01-20-150336.jpg","Coordinate":"","Note":"Pumpar"}]
        proxy : {
    		type : 'ajax',
    		 limitParam: false,
             enablePagingParams: false,
             noCache: false,
    		 url : settings.getPicturesURL,
    		  
    		reader : {
    			type : 'json',
    			rootProperty : ''
    		}
    		,
            listeners: [
                {
                    fn: 'onJsonpstoreLoad',
                    event: 'load'
                }
            ]
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
    	}
    	
    
});
