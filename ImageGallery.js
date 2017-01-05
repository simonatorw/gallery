class ImageGallery {
	
	constructor(selector, imgDir = '.', dataUrl) {
		this.selector = selector;
		this.imgDir = imgDir;
		this.dataUrl = dataUrl;
		this._imgs = [];
		this._getData();
	}
	
	_getData() {
		const net = new Net();
		
		net.ajax('GET', this.dataUrl).then((e) => {
		   this._imgs = JSON.parse(e.target.response);
		   this._addEvents();
		   this._buildGallery();
		}, () => {
			console.log('Error fetching data.');
		})
	}
	
	_buildTemplate() {
		let tpl = ``;
		
		for (let i = 0, max = this._imgs.length; i < max; i++) {
			tpl = `${tpl}<div class="imgContainer" id="con_${i}">
				<img src="${this.imgDir}/${this._imgs[i]}" class="img" draggable="true" id="img_${i}">
			</div>`;
		}
		
		return tpl;
	}
	
	_render(tpl) {
		document.querySelector(this.selector).innerHTML = tpl;
	}
	
	_setData(item, target) {
		const itemIndex = parseInt(item.split('_')[1], 10);
		const targetIndex = parseInt(target.split('_')[1], 10);
		const itemValue = this._imgs[itemIndex];
		
		this._imgs.splice(itemIndex, 1);
		this._imgs.splice(targetIndex, 0, itemValue);
	}
	
	_addEvents() {
		const parentContainer = document.querySelector(this.selector);

		parentContainer.addEventListener('dragstart', function(e) {
			if (e.target.className === 'img') {
				e.dataTransfer.setData('text', e.target.id);
			}
		}, false);
		
		parentContainer.addEventListener('dragover', function(e) {
			if (e.target.className === 'imgContainer' || e.target.className === 'img') {
				e.preventDefault();
			}
		}, false);
		
		parentContainer.addEventListener('drop', (e) => {
			if (e.target.className === 'imgContainer' || e.target.className === 'img') {
				e.preventDefault();
				
				this._setData(e.dataTransfer.getData('text'), e.target.id);
				this._buildGallery();

			}
		}, false);
	}
	
	_buildGallery() {
		this._render(this._buildTemplate());
	}
}