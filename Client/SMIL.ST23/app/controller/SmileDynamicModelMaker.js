Ext.define('Smile.controller.SmileDynamicModelMaker',{
	extend:'Ext.app.Controller',
	config:{
		smileModelFields:null
	},

	//function to merge two objects into one objet. used
	merge_options:function(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	},
	createDynamicModel: function(smileJsonTXT){
		
		var me = this;
		
		var smileModelFields = {};
		
		// Make json object of the response
		var jsonData = Ext.JSON.decode(smileJsonTXT);
		var fields = [];
		
		// get the modelname from the requestmodel
		var modelName = jsonData.Dataset[0].name;
		
		// get the geometryType for the layer
		var listGeometryType = jsonData.Dataset[0].GeometryType;

		// Setup the mappingtypes between Sharepoint and Sencha Touch 1.1.0
		var mapping = {}; // fyll på nedan för att få att lägga till typer från SharePoint som mappas till Sencha
		
		mapping['String'] = 'string';
		mapping['Integer'] = 'int';
		mapping['Text'] = 'string';
		mapping['Note'] = 'string';
		mapping['URL'] = 'string';
		mapping['AllDayEvent'] = 'boolean';
		mapping['DateTime'] = 'date';
		
		var fieldType = {};
		fieldType['SPChoiceStyling'] = 'selectfield';		// Ext.form.Select
		fieldType['Choice'] = 'selectfield';		// Ext.form.Select
 		fieldType['Single'] = 'field';				// Ext.form.Field
		fieldType['Number'] = 'numberfield';		// Ext.form.Number
		fieldType['Text'] = 'textfield';			// Ext.form.Text
		fieldType['Caculated'] = 'textfield';		// Ext.form.Text
		fieldType['Boolean'] = 'togglefield';		// Ext.form.Toggle
		fieldType['DateTime'] = 'datepickerfield';
		fieldType['Note'] = 'textareafield';		// Ext.form.TextArea
// TODO: Fix Fieldtypes		
//		fieldType[''] = 'fieldset';					// Ext.form.FieldSet
//		fieldType[''] = 'hiddenfield';				// Ext.form.Hidden
// 		fieldType['Boolean'] = 'radiofield';		// Ext.form.Radio

//		fieldType[''] = 'checkboxfield';			// Ext.form.Checkbox

		// read the fieldefinition from SharePoint into currentFields object.
		smileFields = jsonData.Dataset[0].fielddef;
		var currentFields = [];
		for (i = 0; i < smileFields.length; i++){
		    var properties = smileFields[i];
		    for (prop in properties){
		       currentFields.push(prop);
		    }
		    
		}
		
		// create fields object hirarchy.		
		// fields = ['type', 'properties'];
		fields = [];
		
		// Generate the object smielModelFields. Model object for the dynamic store.
		for (i =0; i < currentFields.length; i++){
			var field = currentFields[i];
			
			if(field) {
				// Exclude these SharePoint fieltypes in the model.
				if( (field =='Attachments') || (field =='LinkTitle') || (field =='Geometry') ){
					// console.log( field +' tas inte med i modellen')	;
				}else{
					var fldName = field.toLowerCase();
					
					var _typeDef = {
						name : field.toLowerCase(),
						type : mapping[jsonData.Dataset[0].fielddef[i][field]['Type']] || 'string',
						mapping : 'properties.'+field,
						xType : fieldType[jsonData.Dataset[0].fielddef[i][field]['Type']] || 'textfield'
					};
					
					var fldName = field.toLowerCase();
					fields.push(_typeDef);
					smileModelFields[fldName]= this.merge_options(smileFields[i][field], _typeDef) ;						
				}
				
			}
		}

		// add coordinates objects with a read only attribute (this attribute is not rendred out, needs to be changed in a later release)
		// But these fields does note have to be rendered out to the end user. I´s neserry when we calculate the distance to the object in the load event on the store.
		
		smileModelFields['coordinates']={ 
			name: "coordinates",
			type: "string",
			mapping: "geometry.coordinates",
			xType: "textfield",
			// Choices: null,
			// DefaultValue: null,
			Description: "",
			InternalName: "Coordinates",
			// IsInternalColumn: null,
			// IsLinkedColumn: null,
			ReadOnly: "True",
			Required: "False",
			Sortable: "True",
			Title: "Coordinates",
			Type: "Text"
		};
		
		fields.push( {name: "coordinates", type: "string", mapping: "geometry.coordinates", xType: "textfield"} );
		
		// Distance field must be in the stor so its possible to sort the distnace from the center of the map, distance unit is in meters.
		/*
		smileModelFields['distance']={
				name: "distance",
			type: "number",
			// mapping: "",
			xType: "numberfield",
			// Choices: null,
			// DefaultValue: null,
			Description: "",
			InternalName: "distance",
			// IsInternalColumn: null,
			// IsLinkedColumn: null,
			ReadOnly: "True",
			Required: "False",
			Sortable: "True",
			Title: "Distance"
			// Type: "Number"
		};
		
		fields.push( {name: "distance", type: "number", xType: "numberfield"} );
		*/
		
		/*
		smileModelFields['the_geom']={
				name: "the_geom",
			type: "string",
			// mapping: "",
			xType: "textfield",
			// Choices: null,
			// DefaultValue: null,
			Description: "",
			InternalName: "the_geom",
			// IsInternalColumn: null,
			// IsLinkedColumn: null,
			ReadOnly: "True",
			Required: "False",
			Sortable: "True",
			Title: "the_geom"
			// Type: "Number"
		};
		
		fields.push( {name: "the_geom", type: "string", xType: "textfield"} );
		*/
		
			
	
		// TODO: Model validation to be done

		me.setSmileModelFields(smileModelFields);
	
	return { 
		fields: fields, 
		smileModelFields: smileModelFields,
		modelName : modelName,
		geometryType : listGeometryType
		};		
		
	}

	
}	)