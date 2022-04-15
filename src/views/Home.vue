<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && whiteLogo">
			<the-header ref="header" :obj-data="objData" :logo="logo"></the-header>
			<home-wrapper v-if="headerHeight" :header-height="headerHeight" :logo="whiteLogo" :obj-data="objData"></home-wrapper>
		</div>
	</div>
</template>

<script>

import TheHeader from '../components/TheHeader.vue';
import HomeWrapper from '../components/HomeWrapper.vue';
import Loader from '../components/Loader.vue';
import { bus } from '../main';

export default {
	components: {
		Loader,
		TheHeader,
		HomeWrapper
	},
	data() {
		return {
			loading: false,
			headerHeight: null
		};
	},
	methods: {
		fetchLogo() {
			this.$store.dispatch('fetchLogo');
		},
		fetchWhiteLogo() {
			this.$store.dispatch('fetchWhiteLogo');
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
		await this.fetchWhiteLogo();
		await this.fetchData();
		bus.$on('header-height', value => this.headerHeight = value);
		this.loading = false;
	},
	computed: {
		logo() {
			return this.$store.getters['logo'];
		},
		whiteLogo() {
			return this.$store.getters['whiteLogo'];
		},
		objData() {
			return this.$store.getters['homepageObjData'];
		}
	}
};
</script>