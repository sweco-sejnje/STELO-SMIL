Ext.define('Smile.view.MainFeaturePictureContainer', {
	extend : 'Ext.Container',
	alias : 'widget.featurepicturecontainer',

	initialize : function() {

		this.callParent(arguments);

		var newPictureButton = 
		 {
	            xtype: "button",
	            text: 'Ta bild',
	            ui: 'action',
	            handler: this.onNewPictureButtonTap,
	            scope: this
	        };
		
		var topToolbar = 
		{
				xtype: 'toolbar',
	        	docked: 'top',
	        	title: 'Bild lista',
	        	items:[
	        	{
		            text: 'Tillbaka',
		            ui: 'back',
		            handler: function () {
		            	//PicturesStore.read();
		             	
		            	var featureCarousel = Ext.getCmp('featureCarousel');
		                featureCarousel.setActiveItem('mainfeatureformpanel', {
		                	type: 'slide',
		                	direction: 'right' 
		                });
		            },
		            
					}
	        	,{
					xtype: 'spacer'
				},
				newPictureButton
	        	]
			};
		
		var pictureList = {
			xtype : 'featurepictureslist',
			
			store: Ext.getStore("FeaturePicture"),
			
			listeners : {
				itemtap:{
					fn : this.onPicturesListTap,
					scope : this
				},
				disclose : {
					fn : this.onPicturesListDisclose,
					scope : this
				}
			}
		};

		this.add([ topToolbar, pictureList ]);
	},
	onNewPictureButtonTap : function() {
		console.log("newPictureCommand");
		this.fireEvent("newPictureCommand", this);
	},
	onPicturesListDisclose : function(list, record, target, index, evt, options) {
		console.log("editPictureCommand");
		this.fireEvent('editPictureCommand', this, record);
		evt.stopEvent();
	},
	onPicturesListTap : function(view, index, item, e) {
		
		console.log("viewPicture");
		this.fireEvent('viewPictureCommand',view, index, item, e);
	},
	config : {
		layout : {
			type : 'fit'
		},
		id : 'featurepicturecontainer',

		scrollable : 'true'
	}

});
