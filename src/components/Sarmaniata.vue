<template>
	<section class="sarmaniata">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h3 class="section-title underline mb-5">{{sarmaniata.title}}</h3>
					<div class="pt-2">
						<div class="bg-img-wrapper mb-4 mb-lg-0">
							<div class="bg-img position-relative" v-lazy:background-image="sarmaniata.thumbnail">
								<div class="overlay position-absolute w-100 h-100" ref="overlay"></div>
							</div>
						</div>
						<span v-html="sarmaniata.content"></span>
					</div>
				</div>
			</div>
		</div>	
	</section>	
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
	props: ['objData'],
	mounted() {
		this.scrollAnimation();
	},
	methods: {
		scrollAnimation() {
			gsap.to('.overlay', {
				scrollTrigger: {
					start: "center bottom",
					trigger: this.$refs.overlay,
					onEnter: () => this.$refs.overlay.classList.add("remove")
				}
			});
		}
	},
	computed: {
		sarmaniata() {
			const items = [];
			for (const prop in this.objData.metadata) {
				items.push(this.objData.metadata[prop]);
			}
			return items.find(item => {
				return item.id === '622e1c0764eb9d00090f4ff9'
			});
		}
	}
};
</script>

<style lang="scss">
.sarmaniata {
	padding: 7.5rem 0;

	.bg-img-wrapper {
		float: right;
		width: 100%;
		max-width: 50%;
		

		@media (max-width: 991.98px) {
			float: none;
			max-width: none;
		}

		.bg-img {
			padding-top: 141.59292%;
		}

		.overlay {
			background: #fff;
		}
	}

	p {
		font-style: italic;
	}
}
</style>