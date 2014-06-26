/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

 Ext.Loader.setConfig({
     
        disableCaching:false
      });
Ext.Loader.setPath({
'Ext.smile': 'smile'
});
Ext.application({
    name: 'Smile',
	autoCreateViewport: false,

 statusBarStyle: 'black',
	viewport: {
		// hide navigation bar of browser
		autoMaximize: true
		
	},
    requires: [
    		'Smile.view.MainFeaturePictureContainer',
    		'Smile.view.SmileLayersList',
		'Ext.viewport.Viewport',
		'Ext.viewport.Ios',
		'Ext.util.Geolocation',
		'Ext.JSON',
		'Ext.form.Number',
		'Ext.form.Select',
 		'Ext.form.Field',
		'Ext.form.Number',
		'Ext.form.Text',
		'Ext.form.Toggle',
		'Ext.form.TextArea',
		'Ext.form.FieldSet',
		'Ext.form.Hidden',
		'Ext.form.Radio',
		'Ext.form.DatePicker',
		'Ext.MessageBox',
		'Ext.Panel'

    ],	
	models: [
        'Capabilities',
        'FeatureNote',
        'FeaturePicture',
		'Layer'
    ],
    stores: [
        'Capabilities',
        'FeatureNote',
        'FeaturePicture'
    ],
	views: [
		'Main',
		'MainTopBar',
		'MainBottomBar',
		'Smile.view.MainFeatureForm'
	],
	
	controllers: [
		'Main',
		'MainTopBar',
		'MainFeatureNotesPanel',
		'SmileListController',
		'SmileLoadMapFeatures',
		'SmileDynamicStoreController',
		'SmileDynamicModelMaker',
		'MapWFSService',
		'MainFeaturePictureController',
		'MainFeatureForm',
		'MainFeatureListTopBar',
		'SmileMapFunctions'
	],
	

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Smile.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
// overrride to handle responses to store.

Ext.override(Ext.data.Store, {
	loadDataViaReader : function(data, append) {
        var me      = this;
        var proxy = me.getProxy()
        var reader = proxy.getReader();
        var	result  = reader.read(data);
        var	records = result.getRecords();
        
        me.add(records);
        me.fireEvent('load', me, result.getRecords(), true);
    },
    loadDataViaReader_old : function(data, append) {
        var me      = this;
        var	result  = me.proxy.reader.read(data);
        var	records = result.records;

        me.loadRecords(records, { addRecords: append });
        me.fireEvent('load', me, result.records, true);
    }            
});

