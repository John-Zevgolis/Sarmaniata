<template>
	<section class="home-carousel position-relative">
		<VueSlickCarousel v-bind="settings">
			<div>
				<div class="bg-img d-flex justify-content-center align-items-center" :style="`background-image: url(http://tk-themes.net/html-ueneo/images/bg-index1.jpg);`">
					<div class="position-relative box text-center">
						<h1 class="mb-2 fw-normal">WE ARE A UENEO CREATIVE</h1>
						<p>Branding, Photography & Web developement</p>
					</div>
				</div>
			</div>
			<div>
				<div class="bg-img d-flex justify-content-center align-items-center" :style="`background-image: url('http://tk-themes.net/html-ueneo/images/bg-index2.jpg');`">
					<div class="position-relative box text-center">
						<h1 class="mb-2 fw-normal">A LEGACY OF QUALITY</h1>
						<p>Branding, Photography & Web developement</p>
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
			const y = document.getElementsByClassName('history')[0].getBoundingClientRect().top + window.pageYOffset - document.getElementsByTagName('header')[0].offsetHeight;
			window.scrollTo({top: y, behavior: 'smooth'});
		}
	}
};
</script>

<style lang="scss">
.home-carousel {
	margin-top: 89px;

	@media (max-width: 1199.98px) {
		margin-top: 80px;
	}

	.slick-slider {
		.slick-track {
			display: flex;

			&:after,&:before {
				display: none;
			}
		}

		.slick-slide {
			height: auto;
			float: none;

			& > div {
				height: 100%;

				& > div {
					height: 100%;
				}
			}

			.bg-img {
				min-height: calc(100vh - 89px);

				@media (max-width: 1199.98px) {
					min-height: calc(100vh - 80px);
				}

				.box {
					z-index: 1;
					color: #fff;
					max-width: calc(100% - ((75px + 40px + 220px + 5px) * 2 + 75px * 2));

					@media (max-width: 1399.98px) { 
						max-width: calc(100% - 2rem);
					}

					h1,h2,p {
						opacity: 0;
					}

					h1,h2 {
						font-size: 3.125rem;
						transform: translateY(20px);

						@media (max-width: 1199.98px) {
							font-size: 2.25rem;
						}

						@media (max-width: 991.98px) {
							font-size: 1.5rem;
						}

						@media (max-width: 767.98px) {
							font-size: 1.125rem;
						}

						&:after {
							content: '';
							width: 30px;
							height: 3px;
							background: #fff;
							display: block;
							margin: 1rem auto 0;
						}
					}

					p {
						font-style: italic;
						font-size: 1.375rem;
						transform: translateY(30px);
						line-height: 1.4;

						@media (max-width: 991.98px) {
							font-size: 1.25rem;
						}

						@media (max-width: 767.98px) {
							font-size: 1.125rem;
						}
					}
				}

				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, .3);
				}
			}

			&.slick-active {
				z-index: 1;

				.bg-img {
					.box {
						h1,h2 {
							animation: heading .3s forwards .3s;
						}

						p {
							animation: button .6s forwards .3s;
						}
					}
				}
			}
		}

		.slick-arrow {
			border: 2px solid #fff !important;
			width: 40px;
			height: 40px;
			border-radius: 100%;
			display: flex !important;
			justify-content: center;
			align-items: center;
			z-index: 1;
			transition: .3s;

			@media (max-width: 1399.98px) {
				top: 90%;
				transform: none;
			}

			@media (max-width: 767.98px) {
				top: auto;
				bottom: 40px;
			}

			&:hover {
				background: rgba(255, 255, 255, .5);
			}

			&:before {
				display: none;
			}

			&:after {
				display: inline-block;
				font-family: bootstrap-icons !important;
				font-style: normal;
				font-weight: normal !important;
				font-variant: normal;
				text-transform: none;
				line-height: 1;
				vertical-align: -0.125em;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				color: #fff;
				font-size: 1rem;
			}

			&.slick-prev {
				left: 75px;

				@media (max-width: 1399.98px) {
					left: 25px;
				}

				&:after {
					content: "\f284";
					margin-left: -2px;
				}
			}

			&.slick-next {
				right: 75px;

				@media (max-width: 1399.98px) {
					right: 25px;
				}

				&:after {
					content: "\f285";
					margin-right: -2px;
				}
			}
		}
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
			top: 90%;
			transform: none;
			margin-top: -5px;
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

@keyframes heading {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes button {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>