Ext.define('Smile.view.MainFeatureNoteFormPanel', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.noteformpanel',

	config : {
		id : 'noteformpanel',
		width : 'fil',
		height : 'fit',

		items : [ {
			xtype : 'toolbar',
			dock : 'top',
			title : 'Kommentar',
			items : [ {
				text : 'Tillbaka',
				ui : 'back',
				handler : function() {
					Ext.getCmp('featureCarousel').setActiveItem('featurenotespanel', {
						type : 'slide',
						direction : 'right'
					});
				}
			}]
		},
		{
			xtype : 'fieldset',
			items : [ {
				xtype : 'textfield',
				name : 'Title',
				label : 'Titel',
				placeHolder : 'Skriv titel',
				required : true
			}, {
				xtype : 'textfield',
				name : 'GeomListItemID',
				label : 'GeomListItemID',
				hidden : true

			}, {
				xtype : 'textfield',
				name : 'List',
				label : 'List',
				hidden : true
			}, {
				xtype : 'textfield',
				name : 'GeomList',
				label : 'Geom lista',
				hidden : true
			}, {
				xtype : 'textareafield',
				name : 'Comment',
				label : 'Kommentar',
				placeHolder : 'Skriv din kommentar',
				required : true
			}, {
				xtype : 'textfield',
				name : 'CreatedBy',
				label : 'Skapad av',
				placeHolder : 'Skapas automatiskt',
				listeners : {
					afterrender : function(ele) {
						ele.fieldEl.dom.readOnly = true;
					}
				}
			}, {
				xtype : 'textareafield',
				name : 'Action',
				label : 'Action',
				value : 'POST',
				hidden : true
			} ]
		}

		]

	}
})
