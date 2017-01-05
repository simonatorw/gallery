class Net {
	
	ajax(method, url) {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			
			xhr.open(method, url);
			xhr.onload = resolve;
			xhr.onerror = reject;
			xhr.send();
		});
	}
}