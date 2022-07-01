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
	async mounted() {
		this.loading = true;
		await this.fetchData();
		await this.fetchEventsData();
		await this.fetchLogo();
		this.loading = false;
	},
	methods: {
		fetchLogo() {
			this.$store.dispatch('fetchLogo');
		},
		fetchEventsData() {
			this.$store.dispatch('fetchEvents', {
				id: '622e1ef3bbb43300095a3890',
				props: 'metadata'
			});   
		}
	},
	computed: {
		objData() {
			return this.$store.getters['objData'];
		},
		logo() {
			return this.$store.getters['logo'];
		},
		events() {
			return this.$store.getters['events'];
		}
	},
	watch: {
		objData(value) {
			this.title = value.title;
		}
	}
};