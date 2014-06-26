Ext.define('Smile.model.FeaturePicture', {
	extend : 'Ext.data.Model',
	config : {
		idProperty: 'id',
	    fields: [
	             {name: "category", type: "string", mapping: 'Category'},
	             {name: "coordinate", type: "string", mapping: 'Coordinate'},
	             {name: "created", type: "string", mapping: 'Created'},
	             {name: "id", type: "string", mapping: "ID"},
	             {name: "imagename", type: "string", mapping: 'ImageName'},
	             {name: "imageurl", type: "string",mapping:'ImageUrl'},
	         	 {name: "note", type: "string",mapping:'Note'},
	         	 {name: "path", type: "string", mapping : 'PreviewUrl'},
	             {name: "thumb", type: "string", mapping : 'ThumbNailUrl'}
	    ]
	}
});