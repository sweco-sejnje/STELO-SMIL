function convertToBase64File(){
	var file    =  document.getElementById('fileUploadObject').files[0];
	var reader  = new FileReader();
	
	reader.onloadend = function () {
		 // return reader.result;
		var txt = document.getElementById('textUploadObject');
		txt.value =  reader.result;
	};
	
	if (file) {
		reader.readAsDataURL(file);
	}
	
};