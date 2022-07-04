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
	async created() {
		this.loading = true;
		await this.fetchData();
		await this.fetchEventsData();
		await this.fetchLogo();
		await this.fetchFooterData();
		await this.fetchWhiteLogo();
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
		},
		fetchFooterData() {
			this.$store.dispatch('fetchFooterContent', {
				props: 'title,content,metadata'
			});   
		},
		fetchWhiteLogo() {
			this.$store.dispatch('fetchWhiteLogo');
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
		},
		footerData() {
			return this.$store.getters['footerData'];
		},
		whiteLogo() {
			return this.$store.getters['whiteLogo'];
		}
	},
	watch: {
		objData(value) {
			this.title = value.title;
		}
	}
};