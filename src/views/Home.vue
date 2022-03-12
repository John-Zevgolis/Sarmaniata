<template>
	<div>
		<the-header></the-header>
		<div v-scroll-spy="{offset: header, time: 100, steps: 0}">
			<home-carousel></home-carousel>
			<history></history>
			<div style="min-height: 100vh; background: aquamarine;">@mdo</div>
			<div style="min-height: 100vh; background: yellow;">@one</div>
			<div style="min-height: 100vh; background: beige;">two</div>
			<div style="min-height: 100vh; background: orange;">three</div>
		</div>
	</div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import HomeCarousel from '../components/HomeCarousel.vue';
import History from '../components/History.vue';

export default {
	components: {
		TheHeader,
		HomeCarousel,
		History
	},
	data() {
		return {
			header: null
		};
	},
	methods: {
		headerHeight() {
			this.header = document.getElementsByTagName('header')[0].offsetHeight;
		}
	},
	mounted() {
		this.headerHeight();
		window.addEventListener('resize', this.headerHeight);
	}
};
</script>