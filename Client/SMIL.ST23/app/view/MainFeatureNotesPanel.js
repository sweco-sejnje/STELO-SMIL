Ext.define('Smile.view.MainFeatureNotesPanel', {
	extend : 'Ext.Container',
	alias : 'widget.featurenotespanel',

	initialize : function() {

		this.callParent(arguments);

		var newButton = 
		 {
	            xtype: "button",
	            text: 'Skapa ny',
	            ui: 'action',
	            handler: this.onNewButtonTap,
	            scope: this
	        };
		
		var topToolbar = {
			xtype : 'toolbar',
			docked: 'top',

			title : 'Kommentarer',
			layout : 'hbox',
			items : [
					{
						text : 'Tillbaka',
						ui : 'back',
						handler : function() {
							Ext.getCmp('featureCarousel').setActiveItem(
									'mainfeatureformpanel', {
										type : 'slide',
										direction : 'right'
									});
						}
					}, {
						xtype : 'spacer'
					},
					newButton
					]
		};
		var noteList = {
			xtype : 'featurenoteslist',
			grouped:true,
			store: Ext.getStore("FeatureNote"),
			listeners : {
				disclose : {
					fn : this.onNotesListDisclose,
					scope : this
				}
			}
		};

		this.add([ topToolbar, noteList ]);
	},
	onNewButtonTap : function() {
		console.log("newNoteCommand");
		this.fireEvent("newNoteCommand", this);
	},
	onNotesListDisclose : function(list, record, target, index, evt, options) {
		//console.log(record);
	
		
		this.fireEvent('viewNoteCommand', this, record);
	},
	config : {
		layout : {
			type : 'fit'
		},
		id : 'notespanel',

		scrollable : 'true'
	}

});
