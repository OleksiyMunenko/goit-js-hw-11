export default class LoadMoreBnt {

	constructor({ selector, isHidden = true }) {
		this.button = document.querySelector(selector);
		if (isHidden) this.hide();
		else this.show;
	 }
  
	 disabled() {
		this.button.disabled = true;
		this.button.textContent = "Loading..."
	 }
  
	 enabled() {
		this.button.disabled = false;
		this.button.textContent = "Load more"
	 }
	 hide() {
		this.button.classList.add('is-hidden');
	 }
	 show() {
		this.button.classList.remove('is-hidden');
	 }

	
} 