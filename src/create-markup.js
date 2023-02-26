function crateMarkup(data) {
	const dataHits = data.hits;

	return dataHits.map(hit => {
		return `
		<div class="photo-card">
			<a class="link-img" href="${hit.largeImageURL}">
				<img  class="gallery_image" src="${hit.webformatURL}" alt="${hit.tags}"  />
			</a>
		<div class="info">
		  <p class="info-item">
			 <b>Likes</b>
			 ${hit.likes}
		  </p>
		  <p class="info-item">
			 <b>Views</b>
			  ${hit.views}
		  </p>
		  <p class="info-item">
			 <b>Comments</b>
			 ${hit.comments}
		  </p>
		  <p class="info-item">
			 <b>Downloads</b>
			 ${hit.downloads}
		  </p>
		  </div>
		  </div>
		`;
	}).join(' ');
	

}

export { crateMarkup };

