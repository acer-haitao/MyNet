function ajax(json) {
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	var j = {};
	
	j.method = json.method || 'get';
	j.url = json.url || '';
	j.data = json.data || '';
	j.dataType = json.dataType || 'json';
	j.fn = json.fn || function(){};
	
	if (j.method == 'get' && j.data) {
		j.url += '?' + j.data;
	}
	
	xhr.open(j.method, j.url, true);
	if (j.method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(j.data);
	}
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (j.dataType == 'text') {
					j.fn(xhr.responseText);
				} else if (j.dataType == 'xml') {
					j.fn(xhr.responseXML);
				} else if (j.dataType == 'json') {
					j.fn(JSON.parse(xhr.responseText));
				}
				
			}
		}
		
	}
}