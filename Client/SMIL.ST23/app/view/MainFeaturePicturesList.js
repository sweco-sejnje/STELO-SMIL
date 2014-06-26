
Ext.define('Smile.view.MainFeaturePicturesList',{
	extend: 'Ext.dataview.List',
    alias: 'widget.featurepictureslist',	

    config: {
        loadingText: "Loading Notes...",
        emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
        onItemDisclosure: true,
       
        itemTpl:  new Ext.XTemplate(
                '<tpl for=".">',
                '<img src="{thumb}" style="width:90px; height:70px; float:left; margin: 0 10px 10px 0" />',
                '<p>{note:ellipsis(50)}</p><br>Datum:{created}',
            '</tpl>'
	)
	//"<div class=\"list-item-title\">{Title}</div>",        
    }
});