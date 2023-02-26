const axios = require('axios').default;

export default class PhotoApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
	}

	async fetchPhoto() {
		const KEY_API = '33885883-b95f37344ff62663f5727aa4e';
		const URL = 'https://pixabay.com/api/';
		try {
			const data = await axios.get(`${URL}?key=${KEY_API}&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`);
			this.incrementPage();
			return data.data;
		} catch(error) {
			console.log(error);
		}
	}


	incrementPage() {
		this.page += 1;
	}

	resetPage() {
		this.page = 1;
	}

	get query() {
		return this.searchQuery;
	} 

	set query(newQuery) {
		this.searchQuery = newQuery;
	}

}