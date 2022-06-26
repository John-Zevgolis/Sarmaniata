<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page py-5">
				<div class="container">
					<div class="row mb-5" v-for="(activity, index) in objData.metadata.ekdilwseis" :key="index">
						<div class="col-12">
							<div class="img-wrapper ps-lg-4 mb-4 mb-lg-0" v-if="activity.metadata.image">
								<img v-lazy="activity.metadata.image.url">
							</div>
							<span class="text-justify" v-if="activity.metadata.text" v-html="activity.metadata.text"></span>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import data from '../mixins/data';
import Loader from '../components/Loader.vue';
import InnerHeader from '../components/InnerHeader.vue';

export default {
	mixins: [data],
	components: {
		Loader,
		InnerHeader
	},
	methods: {
		fetchData() {
			this.$store.dispatch('fetchContent', {
				id: '62496ed86d83ac0009358a4f',
				props: 'title,content,thumbnail,metadata'
			});   
		}
	}
};
</script>

<style lang="scss">
.img-wrapper {
	float: right;
	width: 100%;
	max-width: 50%;
	

	@media (max-width: 991.98px) {
		float: none;
		max-width: none;
	}
}

h2 {
	span {
		font-size: 2.5rem;
		font-family: "GFS Didot", serif;
		font-style: italic;

		@media (max-width: 1199.98px) {
			font-size: calc(1.825rem + 0.9vw);
		}
	}
}
</style>