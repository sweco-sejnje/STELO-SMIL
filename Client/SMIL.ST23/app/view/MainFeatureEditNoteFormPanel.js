Ext.define('Smile.view.MainFeatureEditNoteFormPanel', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.editnoteformpanel',
	initialize : function() {

		this.callParent(arguments);
		
		var backButton = {
		            xtype: "button",
		            ui: "back",
		            text: "Tillbaka",
		            handler : function() {
						Ext.getCmp('featureCarousel').setActiveItem('featurenotespanel', {
							type : 'slide',
							direction : 'right'
						});
		        }
		        };

		var saveButton = {
			    xtype: "button",
			    ui: "action",
			    text: "Save",
			    handler: this.onSaveButtonTap,
			    scope: this
			};

		        var topToolbar = {
		            xtype: "toolbar",
		            docked: "top",
		            title: "Kommentar",
		            items: [
		                backButton,
		                { xtype: "spacer" },
		                saveButton
		            ]
		        };
		        this.add([
		                  topToolbar,
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
		          				value:'',
		          				hidden : true

		          			}, {
		          				xtype : 'textfield',
		          				name : 'List',
		          				label : 'List',
		          				value:'Kommentarer',
		          				hidden : true
		          			}, {
		          				xtype : 'textfield',
		          				name : 'GeomList',
		          				label : 'Geom lista',
		          				value: '',
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
		                
		              ]);
		 	
	},
	
	onSaveButtonTap: function () {
	    console.log("saveNoteCommand");
	    this.fireEvent("saveNoteCommand", this);
	},
	config : {
		id : 'editnoteformpanel',
		width : 'fil',
		height : 'fit',
	}
})
