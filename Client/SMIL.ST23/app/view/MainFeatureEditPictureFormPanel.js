Ext.define('Smile.view.MainFeatureEditPictureFormPanel', {
	extend : 'Ext.form.FormPanel',
	alias : 'widget.editpictureformpanel',
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
				dock : 'top',
				title : 'Bildinformation',
				items : [ {
					text : 'Tillbaka',
					ui : 'back',
					handler : function() {
						var featureCarousel = Ext.getCmp('featureCarousel');
						featureCarousel.setActiveItem('featurepicturecontainer', {
							type : 'slide',
							direction : 'right'
						});
					}
				} 
				]
			};
		var fieldset =  {
				xtype : 'fieldset',
				items:[
				        { xtype: 'textfield', name: 'id',label: 'Id', type: 'int', hidden: true },
				        { xtype: 'textfield', name: 'imagename',label: 'Bildnamn', type: 'string', hidden:true},
				        { xtype: 'textareafield', name: 'note', label: 'Notering', type: 'string',maxRows :11 }
			        	]
			};
		var bottombar = {
			xtype: 'toolbar',
			dock: 'bottom',
			items:[ 
//					{
//						xtype:'button',
//						text: 'Uppdatera information',
//						ui: 'confirm',
//						handler: this.saveButtonTap,
//						scope: this
//					},
					{xtype:'spacer'},
					{
						xtype:'button',
						text: 'Ta bort bild',
			            ui: 'decline',
			            handler: this.deleteButtonTap,
			            scope: this
			        }
				]
			
		};
		
		

		this.add([ topToolbar, fieldset, bottombar ]);
	},
	config : {
		id : 'editpictureformpanel',
		bodyPadding : 0,
		bodyMargin : 0,
	},
	saveButtonTap: function () {
		console.log('test');
		var me = this;
		var frm = this.getRecord();
		this.updateRecord(frm);
		var record = this.getRecord();
		me.fireEvent("savePictureCommand", record)
//		Ext.Msg.confirm("Bildborttagning.", "Är du säker på att du vill ta bort denna bild?", function(btn){
//	  		if (btn == 'yes'){
//	  			me.fireEvent("editPictureCommand", record)
//	        	/*
//	  			Ext.dispatch({
//			        controller: 'AlbumForm',
//			        action: 'deleteImage',
//			        record: record
//			    });
//			    */
//	  			
//	  		}
//		});
    
		//var frm = this.getRecord();
    	//this.updateRecord(frm);
    
      /*  Ext.dispatch({
            controller: 'AlbumForm',
            action: 'saveForm',
            record: this.record
        });
        */
    	
		
 	},
	
deleteButtonTap: function () {
		var me = this;
		var frm = this.getRecord();
		this.updateRecord(frm);
		var record = this.getRecord();
		
		Ext.Msg.confirm("Bildborttagning.", "Är du säker på att du vill ta bort denna bild?", function(btn){
	  		if (btn == 'yes'){
	  			me.fireEvent("deletePictureCommand", record)
	        	/*
	  			Ext.dispatch({
			        controller: 'AlbumForm',
			        action: 'deleteImage',
			        record: record
			    });
			    */
	  			
	  		}
		});
    }
})
