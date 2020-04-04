export default class LinkValidation {
	constructor() {
		this.linkRegexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
	}
	validateLink(link) {
		const { linkRegexp } = this;
		if (!link.match(linkRegexp)) {
			return 'Link is invalid';
		} else {
			return null;
		}
	}
}
