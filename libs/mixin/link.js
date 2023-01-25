export default {
	props: {
		url: String,
		linkType: {
			type: String,
			value: 'navigateTo'
		}
	},
	methods: {
		jumpLink(urlKey = 'url') {
			const url = this[urlKey];
			if (url) {
				if (this.linkType === 'navigateTo' && getCurrentPages().length > 9) {
					uni.redirectTo({
						url
					});
				} else {
					if (!this.linkType) {
						console.error("this.linkType is " + this.linkType)
						return
					}
					uni[this.linkType]({
						url
					});
				}
			}
		}
	}
}
