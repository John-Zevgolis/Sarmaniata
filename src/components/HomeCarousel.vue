<template>
	<section class="home-carousel position-relative">
		<VueSlickCarousel v-bind="settings">
			<div v-for="(item, index) in home.metadata.carousel" :key="index">
				<div class="bg-img d-flex justify-content-center align-items-center" :style="`background-image: url(${item.thumbnail});`">
					<div class="position-relative box text-center">
					<h1 v-if="index === 0" class="mb-2 underline">{{item.title}}</h1>
					<h2 v-else class="mb-2 underline">{{item.title}}</h2>
					<div v-html="item.content"></div>
					</div>
				</div>
			</div>
		</VueSlickCarousel>
		<div class="bar-left position-absolute text-center d-none d-md-block">PREVIOUS</div>
		<div class="bar-right position-absolute text-center d-none d-md-block">NEXT</div>
		<button class="position-absolute scroll-down bg-transparent border-0" @click="moveToFirstSection">
			<span class="d-block discovery">DISCOVERY</span>
			<img class="position-absolute" src="http://tk-themes.net/html-ueneo/images/discovery.png">
			<span class="d-block line position-relative"></span>
		</button>
	</section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
	components: {
		VueSlickCarousel,
	},
	props: ['objData'],
	data() {
		return {
			header: null,
			historySection: null,
			settings: {
				"lazyLoad": "ondemand",
				"fade": true,
				"infinite": true,
				"speed": 500,
				"slidesToShow": 1,
				"autoplay": true,
				"autoplaySpeed": 6000,
				"pauseOnHover": false
			}
		}
	},
	methods: {
		moveToFirstSection() {
			console.log(this.headerHeight)
			const y = document.getElementsByClassName('sarmaniata')[0].offsetTop - this.headerHeight;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	},
	computed: {
		home() {
			const items = [];
			for (const prop in this.objData.metadata) {
				items.push(this.objData.metadata[prop]);
			}
			return items.find(item => {
				return item.id === '622e1ed3f1322f0009f67fbe'
			});
		},
		headerHeight() {
			return this.$store.getters['headerHeight'];
		}
	}
};
</script>

<style lang="scss" scoped>
.home-carousel {
	margin-top: 115px;

	@media (max-width: 1199.98px) {
		margin-top: 109.69px;
	}

	.bar-left,
	.bar-right {
		top: 50%;
		transform: translateY(-50%);
		border-bottom: 1px dashed rgba(255,255,255,0.6);
		min-width: 220px;
		color: #fff;
		font-size: .75rem;
		padding-bottom: 0.625rem;
		font-family: 'Montserrat', sans-serif;
		line-height: 1.42857143;
		letter-spacing: 2px;
		margin-top: -10px;

		@media (max-width: 1399.98px) {
			top: auto;
			transform: none;
			bottom: 55px;
		}

		&:after {
			content: '';
			position: absolute;
			border-radius: 100%;
			width: 5px;
			height: 5px;
			background: #fff;
			bottom: -2.5px;
		}
	}

	.bar-left {
		left: calc(40px + 75px);

		@media (max-width: 1399.98px) { 
			left: calc(40px + 25px);
		}

		&:after {
			left: 100%;
		}
	}

	.bar-right {
		right: calc(40px + 75px);

		@media (max-width: 1399.98px) { 
			right: calc(40px + 25px);
		}

		&:after {
			right: 100%;
		}
	}

	.scroll-down {
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;

		.discovery {
			color: #fff;
			letter-spacing: 2px;
			font-size: 0.6875rem;
		}

		img {
			left: 50%;
			top: calc(16.5px + 5px + 10px);
			transform: translateX(-50%);
		}

		.line {
			height: 75px;
			width: 0;
			border-right: 1px dashed rgba(255,255,255,0.6);
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;

			&:after {
				content: '';
				border-radius: 100%;
				bottom: 100%;
				width: 5px;
				height: 5px;
				background: #fff;
				display: block;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
}
</style>