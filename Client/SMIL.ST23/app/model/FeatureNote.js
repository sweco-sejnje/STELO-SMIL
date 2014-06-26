Ext.define('Smile.model.FeatureNote', {
	extend : 'Ext.data.Model',
	config : {
		idProperty: 'id',
	    fields: [
		    { name: "Title", type: 'string' },
	        { name: "Comment", type: 'string' },
	        { name: "ID", type: 'string' },
	        { name: "List", type: 'string' },
	        { name: "GeomList", type: 'string' },
	        { name: "GeomListItemID", type: 'string' },
	        { name: "CreatedBy", type: 'string' },
	        { name: "ModifiedBy", type: 'string' },
	        { name: "Created", type: 'date', dateFormat: 'c' },
	        { name: "Modififed", type: 'date', dateFormat: 'c' },
	        { name: "Action", type: 'string'} 
	    ]
	}
});