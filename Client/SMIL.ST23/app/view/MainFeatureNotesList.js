
Ext.define('Smile.view.MainFeatureNotesList',{
	extend: 'Ext.dataview.List',
    alias: 'widget.featurenoteslist',	

    config: {
        loadingText: "Loading Notes...",
        
        emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
        onItemDisclosure: true,
        itemTpl: 	'<div class="list-item-title">{Title}</div>' +
 					'<div class="list-item-narrative">{CreatedBy}</div>',
      
    }
});