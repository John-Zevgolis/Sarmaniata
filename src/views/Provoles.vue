<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page py-5">
				<div class="container">
					<div class="row mb-5" v-for="(imerominia, index) in objData.metadata.provoles" :key="index">	
						<div class="col-12">
							<span v-if="imerominia.title" class="d-block date text-center mb-5">{{imerominia.title}}</span>
							<div class="row mb-5 text-center text-lg-start" v-for="(tainia, i) in imerominia.metadata.tainies" :key="i">
								<div class="col-lg-auto mb-4 mb-lg-0">
									<img v-if="tainia.thumbnail" v-lazy="tainia.thumbnail">
								</div>
								<div class="col-lg">
									<h2 v-if="tainia.title" class="section-title mb-4">{{tainia.title}}</h2>
									<div v-if="tainia.content" class="text-justify" v-html="tainia.content"></div>
								</div>
							</div>
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
				id: '62496daf1ce5640009e3bffc',
				props: 'title,content,thumbnail,metadata'
			});   
		}
	}
};
</script>

<style lang="scss">
.date {
	font-size: 2.5rem;
	font-family: "GFS Didot", serif;
	font-style: italic;
	color: #181818;

	@media (max-width: 1199.98px) {
		font-size: calc(1.825rem + 0.9vw);
	}
}
</style>