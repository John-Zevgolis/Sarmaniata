<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo">
			<the-header :obj-data="objData" :logo="logo"></the-header>
			<home-carousel :obj-data="objData"></home-carousel>
			<sarmaniata :obj-data="objData"></sarmaniata>
			<samarina :obj-data="objData"></samarina>
			<div class="section" id="photos" style="min-height: 100vh; background: aquamarine;">ΦΩΤΟΓΡΑΦΙΕΣ</div>
			<div class="section" id="events" style="min-height: 100vh; background: yellow;">ΧΑΡΤΟΓΡΑΦΗΣΗ</div>
			<the-footer :obj-data="objData" :logo="logo"></the-footer>
		</div>
	</div>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue';
import Sarmaniata from '../components/Sarmaniata.vue';
import Samarina from '../components/Samarina.vue';
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import Loader from '../components/Loader.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
	components: {
		TheHeader,
		HomeCarousel,
		Sarmaniata,
		Samarina,
		Loader,
		TheFooter
	},
	data() {
		return {
			loading: false
		};
	},
	methods: {
		scrollSpy() {
			const interval = setInterval(() => {
				const sections = gsap.utils.toArray('.section');
				if(sections && sections.length && this.headerHeight) {
					sections.forEach(item => {
						const id = item.id;
						gsap.to(item, {
							scrollTrigger: {
								start: `top ${this.headerHeight + 5}px`,
								end: `bottom ${this.headerHeight + 5}px`,
								trigger: item,
								onEnter: () => {										
									document.querySelector(`[data-id=${id}]`).classList.add('active');
								},
								onLeave: () => {
									document.querySelector(`[data-id=${id}]`).classList.remove('active');
								},
								onEnterBack: () => {
									document.querySelector(`[data-id=${id}]`).classList.add('active');
								},
								onLeaveBack: () => {
									document.querySelector(`[data-id=${id}]`).classList.remove('active');
								}
							}
						});
					});
					clearInterval(interval);
				}
			}, 50);
		},
		animations() {
			const elements = document.getElementsByClassName('from-bottom');
			const interval = setInterval(() => {
				if(elements && elements.length) {
					elements.forEach(item => {
						gsap.to(item, {
							scrollTrigger: {
								start: "top 85%",
								trigger: item,
								onEnter: () => item.classList.add("fire")
							}
						});
					});
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
		this.loading = false;
	},
	mounted() {
		this.animations();
		this.scrollSpy();
	},
	computed: {
		logo() {
			return this.$store.getters['logo'];
		},
		objData() {
			return this.$store.getters['homepageObjData'];
		},
		headerHeight() {
			return this.$store.getters['headerHeight'];
		}
	}
};
</script>