<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo">
			<the-header ref="header" :obj-data="objData" :logo="logo"></the-header>
			<home-carousel ref="home" :obj-data="objData"></home-carousel>
			<sarmaniata ref="sarmaniata" :obj-data="objData"></sarmaniata>
			<samarina ref="samarina" :obj-data="objData"></samarina>
			<photos ref="photos" :obj-data="objData"></photos>
			<events ref="events" :obj-data="objData"></events>
			<the-footer ref="contact" :obj-data="objData" :logo="logo"></the-footer>
		</div>
	</div>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue';
import Sarmaniata from '../components/Sarmaniata.vue';
import Samarina from '../components/Samarina.vue';
import Events from '../components/Events.vue';
import Photos from '../components/Photos.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import Loader from '../components/Loader.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { bus } from '../main';

export default {
	components: {
		TheHeader,
		HomeCarousel,
		Sarmaniata,
		Samarina,
		Events,
		Photos,
		Loader,
		TheFooter
	},
	data() {
		return {
			loading: false,
			headerHeight: null
		};
	},
	methods: {
		animations() {
			const elements = document.getElementsByClassName('animated');
			const interval = setInterval(() => {
				if(elements && elements.length > 0) {
					elements.forEach(item => {
						gsap.to(item, {
							scrollTrigger: {
								start: "top 85%",
								trigger: item,
								onEnter: () => item.classList.add('fire')
							}
						});
					});
					clearInterval(interval);
				}
			}, 50);
		},
		scrollSpy() {
			const interval = setInterval(() => {
				const sections = this.$refs;
				if(sections && Object.keys(sections).length && this.headerHeight) {
					const header = this.$refs.header;
					delete sections['header']
					for(const prop in sections) {
						gsap.to(this.$refs[prop].$el, {
							scrollTrigger: {
								start: `top ${this.headerHeight + 5}px`,
								end: `bottom ${this.headerHeight + 5}px`,
								trigger: this.$refs[prop].$el,
								onEnter: () => {
									header.$el.querySelector(`.menu-link[data-id=${prop}]`).classList.add('active');
								},
								onLeave: () => {
									header.$el.querySelector(`.menu-link[data-id=${prop}]`).classList.remove('active');
								},
								onEnterBack: () => {
									header.$el.querySelector(`.menu-link[data-id=${prop}]`).classList.add('active');
								},
								onLeaveBack: () => {
									header.$el.querySelector(`.menu-link[data-id=${prop}]`).classList.remove('active');
								}
							}
						});
					}
					clearInterval(interval);
				}
			}, 50);
		},
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
		bus.$on('header-height', value => this.headerHeight = value);
		this.loading = false;
	},
	mounted() {
		this.scrollSpy();
		this.animations();
	},
	computed: {
		logo() {
			return this.$store.getters['logo'];
		},
		objData() {
			return this.$store.getters['homepageObjData'];
		}
	}
};
</script>