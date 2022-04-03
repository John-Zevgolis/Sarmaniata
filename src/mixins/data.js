export default {
	metaInfo () {
		return {
			titleTemplate: `%s | ${this.title}`
		}
	},
	data() {
		return {
			title: '',
			loading: false
		};
	},
	async created () {
		this.loading = true;
		await this.fetchData();
		this.loading = false;
	},
	computed: {
		objData() {
			return this.$store.getters['objData'];
		}
	},
	watch: {
		objData(value) {
			this.title = value.title;
		}
	}
};