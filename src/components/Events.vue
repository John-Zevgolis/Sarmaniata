<template>
	<section id="events" class="section events py-5">
		<div class="container py-5">
			<div class="row">
				<div class="col-12 text-center">
					<h3 class="underline section-title mb-5 from-bottom animated">{{events.title}}</h3>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-xl-10 col-xxl-9">
					<div class="row">
						<div class="col-sm-6 col-md-3 mb-4 mb-md-0 text-center" v-for="(event, index) in events.metadata.icons" :key="index">
							<router-link class="d-inline-block opacity-0 animated" :to="`${event.slug}`">
								<span class="icon d-flex justify-content-center align-items-center rounded-circle mx-auto animated scale">
									<i class="bi bi-camera-reels-fill" v-if="event.slug === 'provoles'"></i>
									<i class="bi bi-puzzle-fill" v-if="event.slug === 'paidikes-drastiriotites'"></i>
									<i class="bi bi-chat-dots-fill" v-if="event.slug === 'syzitiseis'"></i>
									<font-awesome-icon icon="fa-brands fa-atlassian" v-if="event.slug === 'alles-ekdilwseis'" />
								</span>
								<span class="d-block mt-3">{{event.title}}</span>
							</router-link>
						</div>
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
	props: ['obj-data'],
	computed: {
		events() {
			const items = [];
			for (const prop in this.objData.metadata) {
				items.push(this.objData.metadata[prop]);
			}
			return items.find(item => {
				return item.id === '622e1ef3bbb43300095a3890'
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.events {
	h3 {
		&:after {
			margin-left: auto;
			margin-right: auto;
		}
	}

	a {
		color: #181818;

		.icon {
			width: 120px;
			height: 120px;
			background: #ABCE83;
			transition: all .3s;

			i,svg {
				font-size: 40px;
			}

			&:hover {
				color: #fff;
				background: #181818;
			}
		}
	}
}
</style>