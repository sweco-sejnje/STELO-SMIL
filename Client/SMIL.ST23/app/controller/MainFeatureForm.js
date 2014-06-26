Ext.define('Smile.controller.MainFeatureForm', {
	extend: 'Ext.app.Controller',
	config:{
		controllers: ['Smile.controller.SmileDynamicStoreController'],
		refs:{
			form: '#featureFormPanel',
			carousel: '#featureCarousel'
		},
		currentNote:null
	},
	viewNoteList:function(){
		 console.log('visa Kommentrslista');
			var featureCarousel = Ext.getCmp('featureCarousel');
			
			var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
			var listname = Controller.getSelectedListName();
			var featureId = Ext.getCmp('featureFormPanel').getRecord().getData().id;
			var featureLista = listname;
		
			var store = Ext.destroy();
			store = Ext.getStore('FeatureNote');
			var noteProxy = store.getProxy();
			var noteURL =noteProxy.getUrl();
		
			
			noteProxy.getExtraParams().List=settings_comment_List[listname];
			noteProxy.getExtraParams().GeomList=listname;
			noteProxy.getExtraParams().GeomListItemID=featureId;
			
			store.load({
			    callback: function(records, operation, success) {
			        // the operation object contains all of the details of the load operation
			        console.log(records);
			    },
			    scope: this
			});
			


			
			featureCarousel.setActiveItem('featurenotespanel', {
				type: 'slide',
				direction: 'left'
			});
	},
	viewPictureList:function(){
		 console.log('visa bildlista');
			var featureCarousel = Ext.getCmp('featureCarousel');
			var PicturesStore = Ext.destroy();
			PicturesStore = Ext.getStore('FeaturePicture');
			var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
			
			var listname = Controller.getSelectedListName();
			var pictureProxy = PicturesStore.getProxy();
			pictureProxy.getExtraParams().id= Ext.getCmp('featureFormPanel').getRecord().getData().id;
			pictureProxy.getExtraParams().imageListName = settings_imageListName[Controller.getSelectedListName()]; // Konfigureras i settings filen;
			pictureProxy.getExtraParams().layerName = settings_layerName[Controller.getSelectedListName()];
			pictureProxy.getExtraParams().referenceImageColumn = settings_referenceImageColumn[Controller.getSelectedListName()];
			
			PicturesStore.load({
			    callback: function(records, operation, success) {
			        // the operation object contains all of the details of the load operation
			        console.log(records);
			    },
			    scope: this
			});
			
			
			
			
			featureCarousel.setActiveItem('featurepicturecontainer', {
				type: 'slide',
				direction: 'left'
			});	
	},
	

    renderNewRecordForm: function(feature, model, area){
    	
    	var Controller = Smile.app.application.getController('SmileDynamicModelMaker');
		var smileModelFields = Controller.getSmileModelFields();
		
		var me = this;
		var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
		var listname = Controller.getSelectedListName();	    	
    	
    	var omrade = (area.delomrade == undefined) ? '' : area.delomrade; 
    	coords = feature.geometry.toString();

    	
    	// generate dateobjekt for xTypefield datepickerfield
		var currentDate = new Date();
  		var day = currentDate.getDate();
  		var month = currentDate.getMonth() + 1 ;
  		var year = currentDate.getFullYear();
  		var todayObj = {year: year, day: day, month: month};
  		
  	
    		
  			var tillbaka = {
		            text: 'Tillbaka',
		            ui: 'back',
		            handler: function () {
		            	var myMap = Smile.app.application.getController('Main').getOpenLayersMap().getMap();
	    				
		            	var vector = myMap.getRitlager();
		                vector.removeAllFeatures();
		            	
		                featureCarousel.setActiveItem(0, {
		                	type: 'slide',
		                	direction: 'right' 
		                });
					}
		        };
        
        saveButton = {
            id: 'userFormSaveButton',
            text: 'Spara!',
            ui: 'confirm',
            handler: function() {
            	// onSaveRecordAction()
            	saveRecordtoSmile(feature);
            }
            // scope: this
        };

        deleteButton = {
            id: 'userFormDeleteButton',
            text: 'delete',
            ui: 'decline',
            handler: this.onDeleteAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [ {xtype: 'spacer'}, saveButton]
        };
        
        var form = me.getForm();
        
		form.removeAll();
		
		form.add({
			dock : 'top',
            xtype: 'toolbar',
            title: 'Nytt objekt '+omrade,
            items:[tillbaka]
		});

		
		
//		if (smileListFeatureStore.getCount() >= 1)
//		{
//		  var maxId = smileListFeatureStore.getAt(0).get('externid'); // initialise to the first record's id value.
//		  smileListFeatureStore.each(function(rec) // go through all the records
//		  {
//		    maxId = Math.max(maxId, rec.get('externid'));
//		    maxId ++;
//
//		  });
//		}
		
		//for(var prop in model.data){
		for(var prop in smileModelFields){
			
			if(
				prop !="geometry" &&
				prop !="type" &&
				prop !="attachments" &&
				prop !="properties" 
			){				
				
				var items = [];
					
				if(smileModelFields[prop]['Choice'] != undefined){
					for (var i=0; i<smileModelFields[prop]['Choice'].length; i++)
					{ 
						var _typdef = {
							value : smileModelFields[prop]['Choice'][i],
							text : smileModelFields[prop]['Choice'][i]
						};
						items.push(_typdef);					
					}				
				}
				
				if(smileModelFields[prop]['ReadOnly'] == "False" &&
				smileModelFields[prop]['Type'] != 'Guid' &&
				smileModelFields[prop]['Type'] != 'LookupMulti' &&
				smileModelFields[prop]['Title'] !="Property Bag" &&
				smileModelFields[prop]['Title'] !="Name" &&
				smileModelFields[prop]['Title'] !="fileleafref"
				){
					
					form.add({
						xtype: smileModelFields[prop]['xType'],
						name : prop,
						label : smileModelFields[prop]['Title'],
						labelAlign: 'left',
			            labelWidth: '40%',
			            value:  smileModelFields[prop]['Title'] == 'EXTERNID' ? maxId :
			            		smileModelFields[prop]['Title'] == 'Delsträcka' ? omrade :
			            		smileModelFields[prop]['xType'] == 'datepickerfield' ? todayObj :
			            		smileModelFields[prop]['DefaultValue'],
						placeHolder: smileModelFields[prop]['Description'] || '',
						options: items,
						required: smileModelFields[prop]['Required']=="False" ? false : true
						// disabled: smileModelFields[prop]['Required']=="False" ? false : true
						
		        	});
				}
			}
			}
		
		form.add(buttonbar);
		
		var featureCarousel = me.getCarousel();
		
//		form.doLayout();
//		
		featureCarousel.setActiveItem(1, {
		    	type: 'slide',
		    	direction: 'left'
	    });
//	    
    	function saveRecordtoSmile(mapObj){
			 console.log('saveRecordtoSmile körs!');
									
			 var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
			 var listname = Controller.getSelectedListName();	
			
			 var currentNote = form.getValues();
			
			var mergeRecord = Ext.Object.merge(currentNote,{ 
	    		the_geom : coords,
	    		action: 'POST',
	    		list: listname,
	    		ID:''
	    		});
			
			var note = Ext.create(listname,mergeRecord   );
			var smileListFeatureStore =Ext.getStore('smileListFeatureStore');
			smileListFeatureStore.add(note);
			
			//form.setRecord(mergeRecord);
			
			Ext.Ajax.request({
	            method: 'POST',
	            disableCaching: false, 
	            params: {
	            	data : Ext.encode(mergeRecord),
	            	list : listname,
	            	action :'POST'
	            },
	            timeout: settings.ajaxTimeout,
	            failure: function(response, opts) {
					// console.log('server-side failure with status code ' + response.status);
					Ext.Msg.alert('Fel!', 'Något gick fel vid sparningen', function()
						{
						   // crouselSheet(0);
						}
					);
				},
				failure: function(response, opts) {
	            	//myMask.hide();
    				Ext.Msg.alert('Fel!', 'Något gick fel vid sparningen', function()
						{
						   // crouselSheet(0);
						}
					);

	           	},
					
	            success: function(r, o){
	            	//myMask.hide();
	                var obj = Ext.decode(r.responseText);
	                
	                var respText = obj.split(':');
	                
	                if ( respText[0] === 'Success') {
	                	//TODO: Fixa så att vi lägger till nytt objekt i storet  och postar till servern utan att behöva ladda om med ny data från server.
	                	
	                
//	                var currentNote= form.getRecord();
//	                
//						currentNote.set('id', respText[1]);			
//						// currentNote.save();
//	                    // Do something...
//	                	// console.log('Det gick bra, ny plats sparad');
//						
//						
//	                    // Ext.dispatch({
//	                        // controller: 'SmileLoadMapFeatures',
//	                        // action: 'showSmileFeatureList',
//	                        // listName: smileListFeatureModel.modelName
//	                    // });
//	                    
//	                	// smileListFeatureStore.load();
//	                	
//	                	smileListFeatureStore.add(currentNote);
//	                	// smileListFeatureStore.sort('distance', 'ASC');
//	                	smileListFeatureStore.fireEvent('load');
//	                	
//	                	// öppna post i redigeringsläge.
//	                	renderForm(currentNote);
//
//	                	
//	                	var map = myMap.getMap();
//	                	var SMIL_Layer = map.getLayersByName('SmilObjekt')[0];
//	                	// mapObj.feature.geometry.attributes.ID = respText[1];
//	                	var stil = getStylesEdit();	
//						// var feature = mapObj.feature.geometry.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913') );
//						var feature = mapObj.feature.geometry;
//						
//	                	//var point = new OpenLayers.Geometry.Point(mapObj.feature.geometry.x , mapObj.feature.geometry.y );
//	                	// point.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
//
//	                	
//	                	var newFeature = new OpenLayers.Feature.Vector(feature, {ID : respText[1] });
//	                	
//	                	var xCoodinate = newFeature.geometry.getCentroid().x; 
//	                	
//	                	if(xCoodinate <= 181){
//	                		newFeature.geometry.transform(new OpenLayers.Projection('EPSG:4326'), new OpenLayers.Projection('EPSG:900913'));
//	                	}
//		                	//SMIL_Layer.addFeatures([mapObj.feature.geometry]);
//		                	
//		                	SMIL_Layer.addFeatures([newFeature]);
//		                	
//		                	var vector = myMap.getRitlager();
//		                	vector.removeAllFeatures();
//		                	
//	                	map.events.triggerEvent('moveend');
	                	
	                	var map = Smile.app.application.getController('Main').getOpenLayersMap().getMap();
	    				map.events.triggerEvent('moveend');
	    				
	    				var featureCarousel = Ext.getCmp('featureCarousel');
	    	        	
	    				var siteinfo = featureCarousel.setActiveItem('smileFeatureList', {
	    					type: 'slide',
	    					direction: 'left'
	    				});
	    				var Controller = Smile.app.application.getController('SmileLoadMapFeatures');
        				Controller.showSmileFeatureList(listname);
        				map.zoomTo(17);
        				Ext.Msg.alert('Sparat', 'Ny plats är sparad..', function()
						{
							// crouselSheet(0);
							// map.events.triggerEvent('moveend');

						});
	                	
	                }
	                else {
                    	Ext.Msg.alert('Fel!', 'Något gick fel vid sparningen', function()
							{
							   // crouselSheet(0);
							}
						);
	                   // Do something else...
	                	// console.log('FEL! Det gick inte bra.');
	                }
	                
	            },
	            url: settings.updateFeatureURL
	        });
							
		}
	    
	},	
	
	
	renderForm: function(record){

		var Controller = Smile.app.application.getController('SmileDynamicModelMaker');
		var smileModelFields = Controller.getSmileModelFields();
		
		var form = Ext.getCmp('featureFormPanel');
		var featureCarousel = Ext.getCmp('featureCarousel');
		
		form.removeAll();
	
		var topFormBar = new Ext.Toolbar({
				dock: 'top',
				ui: 'light',
				defaults: {
					xtype: "button",
					ui: 'normal',
					exclusiveGroup: 'work-on-map'
					// TODO: is map needed?
					// map: map
				},
				items: [ {
		            text: 'Tillbaka',
		            ui: 'back',
		            handler: function () {
		                featureCarousel.setActiveItem(0, {
		                	type: 'slide',
		                	direction: 'right' 
		                });
					}
		        },
		        {
		        	text: 'Ta bild',
		        	ui:'action',
		        	hidden:true,
		        	handler: function(){
						featureCarousel.setActiveItem('takeFeaturePicturesPage', {
	        				type: 'slide',
	        				direction: 'left'
	    				});		        		
		        	}
		        },
		        {	xtype: 'spacer'},
		        {	
		        	// --==>>  Gömd Funktion <<==--
		        	// Funktion för att visa albumbilder
					text: 'Bilder',
					ui: 'action',
					hidden: true,
					handler: function (){
						Ext.dispatch({
								controller : 'Album',
								action : 'viewList',
								btn : this,
								record : record
							});
						},
					
		        	listeners:{
		        		afterrender: function(btn){
		        			// btn.setBadge('1');
		        			
		        		}
		        	}
				}
		        //TODO: implemen Document ,
				/*
				 * ,{
					text: 'Dokument',
					ui: 'action',
					// hidden: settings.featureDocumentsDisabeld,
					handler: function (){
						var store = Ext.getStore('itemDocStore');
						store.proxy.url = settings.getDocumentsURL;
						
						store.proxy.extraParams = {
							Type: 'Document',
							FeatureList: smileListFeatureModel.modelName,
							FeatureItemID: record.data.id
						};
						store.read();
						
						featureCarousel.setActiveItem('documentListPanel', {
	        				type: 'slide',
	        				direction: 'left'
	    				});						
						
					},
					
		        	listeners:{
		        		afterrender: function(btn){
		        			// btn.setBadge('1');
		        		}
		        	}
				}*/,
				
				
				{
					text: 'Bilder',
					id:'btnShowPicture',
					ui: 'action',
					// hidden: settings.featurePicturesDisabeld,
					handler: function (){
						var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
						Controller.viewPictureList();
							

					},
					
		        	listeners:{
		        		afterrender: function(btn){
		        			// btn.setBadge('1');
		        			
		        		}
		        	}
				},
				
				{
					text: 'Kommentarer',
					// TODO: settings.featureCommentsDisabeld,
					// hidden: settings.featureCommentsDisabeld,
					ui:'action',
					handler: function (){
						var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
						Controller.viewNoteList();
					}
				},
		        {
					xtype: "button",
					hidden:true,
					text: 'Spara',
					ui: 'confirm',
					handler: function (){
						updateRecordtoSmile();
					}
				}
				]
		});
		
		form.add( topFormBar);
		
		var bottomFormBar = new Ext.Toolbar({
			dock: 'bottom',
			
			defaults: {
				xtype: "button",
				ui: 'normal'
				// TODO: is map needed?
				// map: map
			},
			items: [
			 {
				xtype: "button",
				text: 'Ta bort plats.',
				ui: 'decline',
				handler: function (){
						Ext.Msg.confirm("Tag bort", "Vill du ta bort denna plats?", function(btn){
						  if (btn == 'yes'){
						    deleteRecordFromSmile();
						  }
						});				
					}
				},
				
				
				{xtype: 'spacer'},
				{
				xtype: "button",
				text: 'Spara',
				ui: 'confirm',
				handler: function (){
						
	
						
						updateRecordtoSmile();
	//					
	//					noteEditor = form;
	//				
	//	                var currentNote = noteEditor.getRecord();
	//	
	//	                noteEditor.updateRecord(currentNote);
	//	
	//	                var errors = currentNote.validate();
	//	                if (!errors.isValid()) {
	//	                    Ext.Msg.alert('Wait!', errors.getByField('title')[0].message, Ext.emptyFn);
	//	                    return;
	//	                }
	//	
	//	                // var notesStore = notesList.getStore();
	//	                var notesStore = smileListFeatureStore;
	//	                if (null == smileListFeatureStore.findRecord('id', currentNote.data.id)) {
	//	                    smileListFeatureStore.add(currentNote);
	//	                }
	//	                
	//	                smileListFeatureStore.sync();
	////	                smileListFeatureStore.sort([{ property: 'date', direction: 'DESC'}]);
	//	                smileListFeatureStore.refresh();
	////	                featureCarousel.setActiveItem('notesListContainer', { type: 'slide', direction: 'right' });
		                
					}
				}
			]
		});
		
		
		for (var prop in record.data) {
	
			if(
				

				record.data[prop] != null &&
				prop !="geometry" &&
				prop !="coordinate" &&
				prop !="type" &&
				prop !="attachments" &&
				prop !="properties" &&
				
				prop !="the_geom" &&
				prop !="list" &&
				prop !="action"

			){			
				if(record.data[prop].length >= 25){
					if(	smileModelFields[prop]['ReadOnly'] == "False" &&
						smileModelFields[prop]['Type'] != 'Guid' &&
						smileModelFields[prop]['Type'] != 'LookupMulti' &&
						smileModelFields[prop]['Title'] !="Property Bag" &&
						smileModelFields[prop]['Title'] !="fileleafref"){
	
						form.add({
							xtype: 'textareafield',
							name : prop,
							label : smileModelFields[prop]['Title'],
							maxRows :  record.data[prop].length / 25,
							labelAlign: 'left',
				            labelWidth: '35%',
				            placeHolder: smileModelFields[prop]['Description'] || '',
				            required: smileModelFields[prop]['Required']=="False" ? false : true,
    						clearIcon : false
						});
					}	
				}else{
					
				var items = [];
				
				if(smileModelFields[prop]['Choices'] != undefined){
					for (var i=0; i<smileModelFields[prop]['Choices'].length; i++)
					{ 
						var _typdef = {
							value : smileModelFields[prop]['Choices'][i],
							text : smileModelFields[prop]['Choices'][i]
						};
						items.push(_typdef);					
					}				
				}
				
				if(
					smileModelFields[prop]['Type'] != 'Guid' &&
					smileModelFields[prop]['Type'] != 'LookupMulti' &&
					smileModelFields[prop]['Title'] !="Property Bag" &&
					smileModelFields[prop]['Title'] !="Name" &&
					smileModelFields[prop]['Title'] !="ID" &&
					smileModelFields[prop]['Title'] !="fileleafref"
				){
					form.add({
						xtype: smileModelFields[prop]['xType'],
						name : prop,
						label : smileModelFields[prop]['Title'],
						labelAlign: 'left',
			            labelWidth: '35%',
			            value: smileModelFields[prop]['DefaultValue'] || '',
						placeHolder: smileModelFields[prop]['Description'] || '',
						options: items,
						required: smileModelFields[prop]['Required']=="False" ? false : true,
						disabled: smileModelFields[prop]['ReadOnly']=="False" ? false : true,
						clearIcon : false
		        	});	
				}
				
		        	
	    		}
			}
		}
		
		form.add(bottomFormBar);
		
		// form.doLayout();
		
		// var featureCarousel = Ext.getCmp('featureCarousel');
		// featureCarousel.setActiveItem('featureForm');
		form.setRecord(record);
		
		// this.scroller.scrollTo({x: 0,y: 0});
		
		// TODO Scroll featureCarousel
//	   featureCarousel.setActiveItem('featureForm', {
//	        type: 'slide',
//	        direction: 'left'
//	   });

	},	

	createNewFeature: function(obj, element){
	
	// var area = checkPointWitinPolygon(obj, 'Delområden');
	var area = "";
	
//	var ctrlPoint = Ext.getCmp('ctrlDrawPointBtn');
//	ctrlPoint.control.deactivate();
//	var ctrlLine = Ext.getCmp('ctrlDrawLineBtn');
//	ctrlPoint.control.deactivate();
//	var ctrlArea = Ext.getCmp('ctrlDrawAreaBtn');
//	ctrlArea.control.deactivate();

    var externalProjection = new OpenLayers.Projection("EPSG:4326");
	var internalProjection = new OpenLayers.Projection("EPSG:900913");
	
	obj.geometry.transform(internalProjection, externalProjection);
	
	var featureList = Ext.getCmp('featureItems');
	featureList.show();
	
	var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
	var listname = Controller.getSelectedListName();	

	// ctrlDrawPoint.deactivate();
	var featureListModel = Ext.ModelMgr.getModel(listname);
	var model = new featureListModel;
	/////////////////////////////////////////////////////////////////////////////////////
	
	this.renderNewRecordForm(obj, model, area);
	
	}
	
})