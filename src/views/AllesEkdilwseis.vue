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
							<div class="img-wrapper ps-lg-4 mb-4 mb-lg-0" v-if="activity.thumbnail">
								<img v-lazy="activity.thumbnail">
							</div>
							<span class="text-justify" v-if="activity.content" v-html="activity.content"></span>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-center">
							<router-link class="px-4 py-3 mt-4 custom-btn d-inline-flex align-items-center" to="/" aria-label="Home">
								ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ
								<i class="bi bi-arrow-return-left ms-3"></i>
							</router-link>
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

.custom-btn {
	@media (max-width: 420px) {
		font-size: .813rem;
	}
}
</style>