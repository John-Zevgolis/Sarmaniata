<template>
	<div>
		<home-carousel :header-height="headerHeight" ref="home" :obj-data="objData"></home-carousel>
		<sarmaniata ref="sarmaniata" :obj-data="objData"></sarmaniata>
		<samarina ref="samarina" :obj-data="objData"></samarina>
		<photos ref="photos" :obj-data="objData"></photos>
		<events ref="events" :obj-data="objData"></events>
		<the-footer ref="contact" :obj-data="objData" :logo="logo"></the-footer>
	</div>
</template>

<script>
import HomeCarousel from '../components/HomeCarousel.vue';
import Sarmaniata from '../components/Sarmaniata.vue';
import Samarina from '../components/Samarina.vue';
import Events from '../components/Events.vue';
import Photos from '../components/Photos.vue';
import TheFooter from '../components/TheFooter.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
	props: ['obj-data', 'logo', 'header-height'],
	components: {
		HomeCarousel,
		Sarmaniata,
		Samarina,
		Events,
		Photos,
		TheFooter
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
			const sections = this.$refs;
			const header = this.$parent.$refs.header;
			delete sections['header'];
			for(const prop in sections) {
				gsap.to(this.$refs[prop].$el, {
					scrollTrigger: {
						start: `top ${this.headerHeight + 5}px`,
						end: `bottom ${this.headerHeight + 5}px`,
						trigger: this.$refs[prop].$el,
						onEnter: () => {
							header.$el.querySelector(`.menu-link[href="#${prop}"]`).classList.add('active');
						},
						onLeave: () => {
							header.$el.querySelector(`.menu-link[href="#${prop}"]`).classList.remove('active');
						},
						onEnterBack: () => {
							header.$el.querySelector(`.menu-link[href="#${prop}"]`).classList.add('active');
						},
						onLeaveBack: () => {
							header.$el.querySelector(`.menu-link[href="#${prop}"]`).classList.remove('active');
						}
					}
				});
			}
		}
	},
	mounted() {
		this.scrollSpy();
		this.animations();
	}
}
</script>