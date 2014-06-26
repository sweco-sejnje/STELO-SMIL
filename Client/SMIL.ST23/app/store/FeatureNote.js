Ext.define('Smile.store.FeatureNote', {
    extend: 'Ext.data.Store',
    
    requires: [
        'Smile.model.FeatureNote',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    config: {
    	autoLoad: false,
        model: 'Smile.model.FeatureNote',
        sortProperty: 'Created',
        grouper:  function(record) {
            return record.get('Created').toDateString();
        },
        storeId: 'FeatureNote',
        proxy : {
    		type : 'ajax', 
    		api: {
                create: settings.getCommentsURL,
                read: '',//settings.getCommentsURL + '?List=Kommentarer&GeomList=trv&GeomListItemID=46',
                update: 'my_update_url',
                destroy: 'my_destroy_url'
            },
            noCache: true,
           	limitParam: false,
            enablePagingParams: false,
            startParam: false,	
    		url : settings.getCommentsURL,
    		  
    		reader : {
    			type : 'json',
    			rootProperty : ''
    		},

    		writer:{
    			decode: true,
                type:'json',
           },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            actionMethods: {
    	        create: 'POST',
    	        read: 'GET',
    	        update: 'POST',
    	        destroy: 'DELETE'
    	    }
    		,
            listeners: [
                {
                    fn: 'onJsonpstoreLoad',
                    event: 'load'
                }
            ],
            
          
            getGroupString: function (record) {
            if (record && record.data.Created) {
                return record.get('Created').toDateString();
            } else {
                return '';
            }
        }
    		}
        //http://svkutv.swecosundsvall.se/_layouts/smil/comment.ashx?_dc=1393577392384&List=Kommentarer&GeomList=WFSPoints_test_postgre&GeomListItemID=174
        //data:[{Title:'Sweco 1'},{Title:'Sweco 2'},{Title:'Sweco 3'}]        		
    

    }
});
