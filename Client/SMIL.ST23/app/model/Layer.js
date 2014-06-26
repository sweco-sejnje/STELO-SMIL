Ext.define('Smile.model.Layer', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string', mapping: 'Name'  },
			{name: 'visibility', type: 'string' },
			{name: 'zindex', type: 'int'  },
			{name: 'Title', type: 'string'}	
			]
	}
});