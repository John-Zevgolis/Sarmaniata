<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo">
			<the-header :obj-data="objData" :logo="logo"></the-header>
			<div v-if="headerHeight" v-scroll-spy="{offset: headerHeight, time: 100, steps: 0}">
				<home-carousel :obj-data="objData"></home-carousel>
				<sarmaniata></sarmaniata>
				<div style="min-height: 100vh; background: aquamarine;">ΦΩΤΟΓΡΑΦΙΕΣ</div>
				<div style="min-height: 100vh; background: yellow;">ΧΑΡΤΟΓΡΑΦΗΣΗ</div>
				<the-footer :obj-data="objData" :logo="logo"></the-footer>
			</div>
		</div>
	</div>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue';
import Sarmaniata from '../components/Sarmaniata.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import Loader from '../components/Loader.vue';

export default {
	components: {
		TheHeader,
		HomeCarousel,
		Sarmaniata,
		Loader,
		TheFooter
	},
	data() {
		return {
			loading: false
		};
	},
	methods: {
		fetchLogo() {
			this.$store.dispatch('fetchLogo');
		},
		fetchData() {
			this.$store.dispatch('fetchHomepage', {
				id: '622e0cef23ee59000927c017',
				props: 'metadata'
			});  
		}
    },
	async created() {
		this.loading = true;
		await this.fetchLogo();
		await this.fetchData();
		this.loading = false;
	},
	computed: {
		headerHeight() {
			return this.$store.getters['headerHeight'];
		},
		logo() {
			return this.$store.getters['logo'];
		},
		objData() {
			return this.$store.getters['homepageObjData'];
		}
	}
};
</script>