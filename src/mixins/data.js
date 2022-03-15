export default {
	created () {
		this.fetchData();
	},
	computed: {
		objData() {
			return this.$store.getters['objData'];
		}
	}
};