settings = {};

//settings.server = "http://tvab.swecosundsvall.se" ;
settings.server = "http://172.18.39.28:8084";
//settings.server = "http://vf.swecosundsvall.se" ;
settings = {
	wmsURL : "http://172.18.39.241:8080/geoserver/svk/wms?",
	//wmsURL : "http://nomad.swecosundsvall.se/geoserver/tvab/wms",
	
	projectWMS : settings.server+"/_layouts/smil/MapProxy/MapProxy.ashx?",
	
	wmsGetFeatureInfoDisabeld : true,
	
	getfeatureURL : settings.server+'/_layouts/SMIL/wfs.ashx',
	
	describefeaturetypeURL : settings.server+'/_layouts/SMIL/getfeaturetypes.ashx?service=wfs&version=1.0.0&request=describefeaturetype&typename=',
	
	getcapabilitiesURL : settings.server+'/_layouts/SMIL/wfs.ashx?service=wfs&version=1.0.0&request=getcapabilities',

	updateFeatureURL : settings.server+'/_layouts/smil/geoitem.ashx',	
	getCommentsURL : settings.server+'/_layouts/smil/comment.ashx',
	getPicturesURL : settings.server+'/_layouts/smil/GetImages.ashx',
	
	fileTransferURL: settings.server+'/sites/_layouts/transfer/FileTransfer.ashx',
	saveImageURL : settings.server+'/_layouts/SMIL/Base64SaveImage.ashx',
	
	getDocumentsURL : settings.server+'/_layouts/smil/ConnectedData.ashx',
	
	tileBuffer : 0,
	mapUser : 'lm_svk',
	
	geoNameSearchDisabeld: false,
	geoNameSearchUserName: 'demo',
	geoNameSearchZoomLevel: 11, // Default 10
	
	geolocateZoomLevel: 10,
	
	// Zoomlevel when higiligting a record in featureList.
	zoomToRecord : false,
	zoomHighLightRecord: 8,
	
	// Level to activate the specified label.
	mapLabelShowZoomlevel : 16,
	mapLabelField: 'LAMPA',
	
	// fieldname listed in the featureList list
	featureListPanelWidth: 400,
	FeatureListField1 : 'fastighet',
	 
	// FeatureForm
	labelWidth :"35%",	
	
	// Feature addons
	featureCommentsDisabeld: true,
	featurePicturesDisabeld: false,
	featureDocumentsDisabeld: false,
	
	
	wfsUrl: settings.server+"/_layouts/SMIL/wfs.ashx",
	wfsMaxFeatures: 950,
	featureNS : 'http://www.svk.se/utv',
	mapWfsQueryTopLevel: 14, // 13 default
	
	//wmsSmileRasterLayer : "http://nomad.swecosundsvall.se/geoserver/svk/wms",
	wmsSmileRasterLayer : "http://172.18.39.241:8080/geoserver/svk/wms",
	
	
	// Namespace/workspace för wms lagret 
	wmsWorkspace : 'tvab',
	wmsCommonWorkspace : 'tvab',
	
	// Antal som retuneras i WMSgetFeatureInforutan
	wmsGetFeatureInfoCount : 10	,
	// load list settings
	zoomToExtentOnLayerLoad : false,
	
	mapLon: 1927370.595665,
	mapLat: 8952160.5854808,
	mapZoomLevel : 11,
	
	ajaxTimeout: 10000,
	delOmraden: "res/gisdata/omraden.geojson"
};

var settings_imageListName = {};
var settings_layerName = {};
var settings_referenceImageColumn = {};
var settings_comment_List = {};
var settings_comment_GemoList = {};
var settings_viewColumn = {};
 



settings_imageListName['Gatubelysning_TVAB'] = 'Bilder_TVAB';
settings_layerName['Gatubelysning_TVAB'] = 'Gatubelysning_TVAB';
settings_referenceImageColumn['Gatubelysning_TVAB'] = 'Bild';


settings_comment_List['Gatubelysning_TVAB'] = 'Kommentarer_TVAB';
settings_comment_GemoList['Gatubelysning_TVAB'] = 'Gatubelysning_TVAB';

