
import Notiflix from "notiflix";
import PhotoApiService from "./js/photo-api-service";
import { crateMarkup  } from "./js/create-markup";
import LoadMoreBnt from "./js/load-more-btn";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
	searchForm: document.querySelector('.search-form'),
	searchBnt: document.querySelector('.btn-search'),	
	gallery: document.querySelector('.gallery')
}

const photoApiService = new PhotoApiService();
const loadMoreBtn = new LoadMoreBnt({selector: '.load-more'});
const newSimpleLightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSearch(e) {
	const perPage = 40;
	e.preventDefault();

	

	loadMoreBtn.hide();
	loadMoreBtn.disabled();

	photoApiService.query = e.currentTarget.elements.searchQuery.value;
	photoApiService.resetPage();

	photoApiService.fetchPhoto().then(data => {

		if(data.hits.length === 0) {
			loadMoreBtn.hide();
			Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
			return;
		} else if (data.hits.length < perPage)  {
			Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
			loadMoreBtn.hide();
			loadMoreBtn.disabled();
		}
		
		else {
				Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
				loadMoreBtn.show();
		loadMoreBtn.enabled();
			}

		clearPhotoGallery();
		appendPhotoMarcup(data);
		newSimpleLightbox.refresh();
	});	
}

function onLoadMore() {
	loadMoreBtn.disabled();
	photoApiService.fetchPhoto().then(data => {
		const perPage = 40;
		if(data.hits.length < perPage) {
			Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
			loadMoreBtn.hide();
			loadMoreBtn.disabled();
		}

		loadMoreBtn.enabled();
		appendPhotoMarcup(data);
		newSimpleLightbox.refresh();		
	})
}

function appendPhotoMarcup(data) {
	refs.gallery.insertAdjacentHTML('beforeend', crateMarkup(data));
}

function clearPhotoGallery() {
	refs.gallery.innerHTML = ' ';
}
