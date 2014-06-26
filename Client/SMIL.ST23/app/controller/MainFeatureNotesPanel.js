Ext.define('Smile.controller.MainFeatureNotesPanel', {
	extend : 'Ext.app.Controller',
	requires : [ 'Smile.store.FeatureNote', 'Smile.view.MainFeatureNotesPanel',
			'Ext.dataview.List', 'Ext.XTemplate' ],
	config : {
		stores : [ 'Smile.store.FeatureNote' ],

		refs : {
			// We're going to lookup our views by xtype.
			notesListContainer : "featurenotespanel",
			noteEditor : "editnoteformpanel"
		},
		control : {
			notesListContainer : {
				// The commands fired by the notes list container.
				newNoteCommand : "onNewNoteCommand",
				viewNoteCommand : "onViewNoteCommand"
			},
			noteEditor : {
				// The commands fired by the note editor.
				saveNoteCommand : "onSaveNoteCommand"
			}

		}
	},

	// Commands.
	onViewNoteCommand : function(component, record) {

		var featureCarousel = Ext.getCmp('featureCarousel');
		var viewNote = Ext.getCmp('noteformpanel');
		var now = new Date();
		var noteId = now.getTime();
		var note = Ext.create('Smile.model.FeatureNote', {
			Title : record.get('Title'),
			CreatedBy : record.get('CreatedBy'),
			Comment : record.get('Comment')
		});
		featureCarousel.setActiveItem('noteformpanel', {
			type : 'slide',
			direction : 'left'
		});
		viewNote.setRecord(note);
	},
	onSaveNoteCommand : function() {
		console.log("onSaveNoteCommand");
		var featureCarousel = Ext.getCmp('featureCarousel');
		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var newValues = noteEditor.getValues();
		
		var Controller = Smile.app.application.getController('Smile.controller.SmileDynamicStoreController');
		var listName = Controller.getSelectedListName();
		var featureId = Ext.getCmp('featureFormPanel').getRecord().getData().id;
		var featureLista = listName;

		noteEditor.updateRecord(currentNote);

		
		var notesStore = Ext.getStore('FeatureNote');
		var proxy = notesStore.getProxy();
		Ext.Ajax.request({
			url : proxy.getApi().create,
			method : 'POST',
			// type:'json',
			params : {
				
				Title : newValues.Title,
				Comment : newValues.Comment,
				GeomListItemID : featureId,
				List : settings_comment_List[listName],
				GeomList : listName,
				Action : 'POST'
			},
			 success: function(r, o){
				 var Controller = Smile.app.application.getController('Smile.controller.MainFeatureForm');
					Controller.viewNoteList();
             
     				Ext.Msg.alert('Sparat', 'Ny kommentar är sparad..', function()
						{
						});
	           }
		});
		var tmpExtra = proxy.getExtraParams();
		proxy.setExtraParams({});
		
		proxy.getExtraParams().List = tmpExtra.List;
		proxy.getExtraParams().GeomList = tmpExtra.GeomList;
		proxy.getExtraParams().GeomListItemID = tmpExtra.GeomListItemID;
		
		featureCarousel.setActiveItem('featurenotespanel', {
			type : 'slide',
			direction : 'right'
		});

	},

	onNewNoteCommand : function(component) {
		console.log("onNewNoteCommand");
		var featureCarousel = Ext.getCmp('featureCarousel');
		var noteEditor = this.getNoteEditor();
		var now = new Date();
		var noteId = now.getTime();
		var newNote = Ext.ModelMgr.create({

			Title : '',
			CreatedBy : '',
			Comment : '',
			Action : 'POST',
			List : 'Kommentarer',
			GeomList : '',
			GeomListItemID : ''

		}, 'Smile.model.FeatureNote');
		noteEditor.setRecord(newNote);

		featureCarousel.setActiveItem('editnoteformpanel', {
			type : 'slide',
			direction : 'left'
		});

	}
});