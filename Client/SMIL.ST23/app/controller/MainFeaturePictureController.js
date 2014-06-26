Ext.define('Smile.controller.MainFeaturePictureController', {
	extend : 'Ext.app.Controller',
	requires : [ 'Smile.store.FeatureNote',
			'Smile.view.MainFeaturePictureContainer', 'Ext.dataview.List',
			'Ext.XTemplate' ],
	config : {
		stores : [ 'Smile.store.FeatureNote' ],

		refs : {
			// We're going to lookup our views by xtype.
			picturesListContainer : "featurepicturecontainer",
			pictureEditor : "editpictureformpanel"
		},
		control : {
			picturesListContainer : {
				// The commands fired by the Picture list container.
				newPictureCommand : "onNewPictureCommand",
				editPictureCommand : "onEditPictureCommand",
				viewPictureCommand: "onViewPictureCommand"
			},
			pictureEditor : {
				// The commands fired by the Picture editor.
				
				savePictureCommand : "onSavePictureCommand",
				deletePictureCommand : "onDeletePictureCommand"
			}

		}
	},
	// Commands.
	onViewPictureCommand: function(view, index, item, e) {
		console.log('ViewPicture Controller');
	
		 var featureCarousel = Ext.getCmp('featureCarousel');
	 var record = view.getStore().getAt(index);
	 var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	 //var panelWidth = width - featureCarousel.itemLength;
	 //var panelHeight = Ext.Viewport.getHeight();
	 var panelWidth = width-16;
	 var panelHeight = height-16;

   
	 overlay = Ext.Viewport.add({
         xtype: 'panel',
         stretchY : true,						// Fyller ut hela panelen i fönstret
 		layout : {
 			type : 'hbox',
 			align : 'stretch' 					// gör att det går att scrolla i panelen.
 		},
 		defaults : {
 			flex : 1
 		},
         // We give it a left and top property to make it floating by default
         left: 8,
         top: 8,
        
         // Make it modal so you can click the mask to hide the overlay
         modal: true,
         hideOnMaskTap: true,

         // Make it hidden by default
         hidden: true,

         // Set the width and height of the panel
        // width: isPhone ? 260 : 400,
         //height: isPhone ? '70%' : 400,
         width: panelWidth,
         height: panelHeight,
         // Here we specify the #id of the element we created in `index.html`
         contentEl: 'content',

         // Style the content and make it scrollable
         styleHtmlContent: true,
         scrollable: true,

         // Insert a title docked at the top with a title
         items: [
             {
                 docked: 'top',
                 xtype: 'toolbar',
                 title: record.data.ImageName,
                 items:[        { flex:1, xtype:'component' },
                        
			{
				xtype : 'button',
				//docked: 'right',
				cls: 'close-btn',
	            ui: 'decline',
				text : 'Stäng',
	
				handler : function() {
					overlay.destroy();
				}
			}]
             },{
            	
          		html: 	'<div style="width: '+(panelWidth-8)+'px; height: '+(panelHeight-8)+'px;">'+ 
				'<img style="max-width:95%; max-height:95%; margin:false; display:block;" '+
				' src="'+record.data.imageurl+'"/></div>'
 	}
         ]
     });

    // Ext.Viewport.add(overlay)
	overlay.show();
	},

	onDeletePictureCommand: function(record) {
		var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
		var listname = Controller.getSelectedListName();	
		//console.log('DeletePicture Controller');
		var featureId = Ext.getCmp('featureFormPanel').getRecord().getData().id;
		var featureLista = listname;
	 	currentNote = record.data;
 	Ext.Ajax.request({
        method: 'POST',
        url: settings.saveImageURL,
        disableCaching: false,  
        timeout : settings.ajaxTimeout,
       
        params: {
   			action :'delete',
   			imglibrary : settings_imageListName[featureLista],
   			ID : currentNote.id,
        	featureid :  featureId,
        	featurelist : featureLista
        },
        failure: function(response, opts) {
			Ext.Msg.alert('Fel!', 'Något gick fel vid borttagning', function()
				{
				   // crouselSheet(0);
				}
			);
		},
        success: function(r, o){
            var obj = Ext.decode(r.responseText);
            console.dir(obj);
            if (obj === 'Success') {
            	Ext.Msg.alert('Borttagen', 'Bild är borttagen', function()
						{
						   // App.images.destroy();
						}
				);
            	var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
				Controller.viewPictureList();
		
//				var carousel = Ext.getCmp('featureCarousel');
//				carousel.setActiveItem('featureForm', {
//					type: 'slide',
//					direction: 'left'
//				});				
            }
            else {
            	Ext.Msg.alert('Fel!', 'Något gick fel vid borttagning av bild.', function()
					{
					   // crouselSheet(0);
					}
				);
               // Do something else...
            	console.log('FEL! Det gick inte bra.');
            }
            
        }
    });
	},
	onSavePictureCommand: function(record) {
		console.log('SavePicture Controller');
		
		var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
		var listname = Controller.getSelectedListName();	
		console.log('Updatr info Controller');
		var featureId = Ext.getCmp('featureFormPanel').getRecord().getData().id;
		var featureNote = record.data.note;  
		var featureLista = listname;
	 	currentNote = record.data;
 	Ext.Ajax.request({
        method: 'POST',
        url: settings.saveImageURL,
        disableCaching: false,  
        timeout : settings.ajaxTimeout,
       
        params: {
   			action :'post',
   			imglibrary : settings_imageListName[featureLista],
   			ID : currentNote.id,
        	featureid :  featureId,
        	featurelist : featureLista,
        	note : featureNote
        },
        failure: function(response, opts) {
			Ext.Msg.alert('Fel!', 'Något gick fel vid uppdatering', function()
				{
				   // crouselSheet(0);
				}
			);
		},
        success: function(r, o){
//            var obj = Ext.decode(r.responseText);
//            console.dir(obj);
//            if (obj === 'Success') {
//            	Ext.Msg.alert('Borttagen', 'Bild är uppdaterad', function()
//						{
//						   // App.images.destroy();
//						}
//				);
            	var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
				Controller.viewPictureList();
		
			
//				}
//            else {
//            	Ext.Msg.alert('Fel!', 'Något gick fel vid borttagning av bild.', function()
//					{
//					   // crouselSheet(0);
//					}
//				);
//               // Do something else...
//            	console.log('FEL! Det gick inte bra.');
//            }
            
        }
    });
		
 
	},
	onEditPictureCommand : function(component, record) {

		console.log("onEditPictureCommand");
	
		
		 var featureCarousel = Ext.getCmp('featureCarousel');
		var editPicture = Ext.getCmp('editpictureformpanel');

		var picture = Ext.create('Smile.model.FeaturePicture', {
			note : record.get('note'),
			category : record.get('category'),
			filename : record.get('filename'),
			imglibrary : record.get('imglibrary'),
			id : record.get('id')

		});
		featureCarousel.setActiveItem('editpictureformpanel', {
			type : 'slide',
			direction : 'left'
		});

		editPicture.setRecord(picture);
		

		
	},
	onNewPictureCommand : function(component) {

		// console.log("onNewPictureCommand");
		var featureCarousel = Ext.getCmp('featureCarousel');

		featureCarousel.setActiveItem('featurepictureformpanel', {
			type : 'slide',
			direction : 'left'
		});

	}
});