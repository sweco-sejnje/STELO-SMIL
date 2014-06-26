Ext.define('Smile.view.MainFeaturePictureFormPanel', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.featurepictureformpanel',


    config: {
		id:'featurepictureformpanel',
		bodyPadding: 0,
		bodyMargin: 0,
		items:[{
			xtype: 'toolbar',
        	dock: 'top',
        	title: 'Ta bild',
        	items:[
        	{
	            text: 'Tillbaka',
	            ui: 'back',
	            handler: function () {
	            	//PicturesStore.read();
	            	var featureCarousel = Ext.getCmp('featureCarousel');
	            	featureCarousel.setActiveItem('featurepicturecontainer', {
	                	type: 'slide',
	                	direction: 'right' 
	                });
				}
	        }]
		}, {
			xtype : 'fieldset',
			 items: [{ 
				       	xtype: 'textareafield', 
				       	name: 'note', 
				       	label: 'Notering', 
				       	type: 'string', 
				       	placeHolder : 'Skriv noteringen till bilden innan du trycker på ladda upp bild.', 
				       	maxRows :11 
			        }
			 ,
				
				{
					dock: 'bottom',
					ui: '',
					items:[
						{	
							html:[ 	'<form action="'+settings.saveImageURL+'" method="post" name="testForm" enctype="multipart/form-data">',
							//html:[ 	'<form action="http://vf.swecosundsvall.se/_layouts/SMIL/Base64SaveImage.ashx?" method="post" name="testForm" enctype="multipart/form-data">',
									 '<input type="file" id="fileUploadObject" name="file" accept="image/*" capture="camera" style="width: 120px" onchange="convertToBase64File()" />',
									 '<input type="hidden" type="field" id="textUploadObject" />',
									 '</form>'].join('')
						},
						{
							xtype: 'spacer'
						},
			           {	
			            	xtype: 'button',
							ui: 'confirm',
			             	text:'Ladda upp bild.',
			            	handler: function(button, event){
			            	var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');	
			          		var listname = Controller.getSelectedListName();
		            		var uploadCtrl = document.getElementById('fileUploadObject');
		            		var file = uploadCtrl.files[0];
		            		            		
		            		if(uploadCtrl.files.length == 0){
								Ext.Msg.alert('Ingen bild är vald.', 'Ta en bild och försök igen.', Ext.emptyFn);
								return void(0);	            			
		            		}
		            		
							//var p = new Ext.MessageBox({progress: true});
							
							var formdata = new FormData();

							var result = document.getElementById('textUploadObject').value;
							var base64txt = result.split(';base64,')[1];
							formdata.append("upload", base64txt);

			    			
							var featureLista = listname;//smileListFeatureModel.modelName;
							var featForm = Ext.getCmp('featureFormPanel');
		                	var record = featForm.getRecord();
		                	var featureId = record.getId('id');
		                	var now = new Date();
		                	
							var fileExtension = file.name.split('.')[1];
							var fileName = featureLista +'-'+featureId+'-'+now.getTime() + '.'+ fileExtension;
							formdata.append("fileName", fileName);   
							
							formdata.append("action", "post");

		    				//p.show();
		    				//p.updateProgress(0, 'Laddar upp.');
		    				xhr = new XMLHttpRequest();
							
							var upload = xhr.upload;
							
		    				upload.addEventListener("progress", function (ev) {
								if (ev.lengthComputable) {
									 console.log( (ev.loaded / ev.total) * 100 + "%");
									//p.updateProgress((ev.loaded / ev.total), 'Laddar upp.');
								}
		    				});
		    				
		    				upload.addEventListener("load", function (ev) {
		    					// p.hide();
		    					// Ext.Msg.alert('Ok','Bild är uppladdad', Ext.emptyFn);
		    				});
		    				
		    				upload.addEventListener("error", function (ev) {
								Ext.Msg.alert('Error!', ev, Ext.emptyFn);
								//p.hide();
							}, false);
		    				
		    				xhr.onreadystatechange=function(){

								if (xhr.readyState==4 && xhr.status==200){
							    	//p.hide();
							    	fileAddAttributes(xhr.responseText);
								}
							};
							//settings.fileTransferURL
							
		    				xhr.open( 'POST', settings.fileTransferURL , true);
			    		 	xhr.send( formdata );
			            	

			    		 	function fileAddAttributes(fileToken, featureComment){

			    		 		var uploadCtrl = document.getElementById('fileUploadObject');
			            		var file = uploadCtrl.files[0];

			            		var pictureForm = Ext.getCmp('featurepictureformpanel');
			    				var	featureComment = pictureForm.getValues().note;
			    			
			    		 		var token = fileToken.replace(/"/g, "");
			            		var featureLista = listname;//smileListFeatureModel.modelName;
		        				var featureId;
		        				var now = new Date();
			    			
			                	var featForm = Ext.getCmp('featureFormPanel');
			                	var record = featForm.getRecord();
			                	var featureId = record.getId('id');
								var fileExtension = file.name.split('.')[1];
								var fileName = featureLista +'-'+featureId+'-'+ now.getTime() + '.'+ fileExtension;
		        				
			    		 		var formdata = new FormData();
			    		 		formdata.append("action", "post");
			    		 		formdata.append("category","Kategori");
								formdata.append("note", featureComment);
								formdata.append("fileName", fileName);
								formdata.append("imgLibrary",settings_imageListName[listname]);//  );
								formdata.append("featurelist", featureLista );
								formdata.append("featureId", featureId );
								formdata.append("token", token );
								
								xhr = new XMLHttpRequest();
								var upload = xhr.upload;
								
			    				upload.addEventListener("error", function (ev) {
									Ext.Msg.alert('Error!', ev, Ext.emptyFn);
									//p.hide();
								}, false);						
								
		    				upload.addEventListener("load", function (ev) {
		    					// p.hide();
		    					// Ext.Msg.alert('Ok','Bild är uppladdad', Ext.emptyFn);
								var fu = uploadCtrl;
								if (fu != null) {
									uploadCtrl.outerHTML = fu.outerHTML;
								}
								var pictureForm = Ext.getCmp('featurepictureformpanel');
								pictureForm.setValues().note='';//{note: ""});
								
		    				});						
			    				xhr.onreadystatechange=function(){
									
									if (xhr.readyState==4 && xhr.status==200){
									    	
									    	if(xhr.responseText == '"Success"'){
									    		Ext.Msg.alert('Ok','Bild är uppladdad', Ext.emptyFn);
									    		var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
												Controller.viewPictureList();
									    	}else{
									    		Ext.Msg.alert('Fel','Något gick fel vid uppladdningen av bilden', Ext.emptyFn);
									    	}
									}
								};
								
								xhr.open( 'POST', settings.saveImageURL , true);
			    		 		xhr.send( formdata );
			    		 	
			    		 	};
			    		 	
			            	}
			            }
			 ]
			} 			
				]		
			}
		]
    }
})    