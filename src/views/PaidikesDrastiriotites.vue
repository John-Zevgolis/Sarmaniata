<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page pt-4 pb-5">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2" v-if="objData.thumbnail">
							<div class="bg-img" v-lazy:background-image="objData.thumbnail"></div>
						</div>
						<div v-if="objData.metadata" class="col-xl-2 info mt-3 mt-xl-0 text-center text-xl-start">
							<p v-if="objData.metadata.location"><strong>τοποθεσία:</strong> {{objData.metadata.location}}</p>
							<p v-if="objData.metadata.date"><strong>ημερομηνία:</strong> {{objData.metadata.date}}</p>
							<p v-if="objData.metadata.time"><strong>ώρα:</strong> {{objData.metadata.time}}</p>
							<p v-if="objData.metadata.organization"><strong>διοργάνωση:</strong> {{objData.metadata.organization}}</p>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-12 mt-4 mt-xl-0 text-center" v-html="objData.content"></div>
					</div>
					<div class="row mt-4 mt-md-5" v-if="objData.metadata">
						<div class="col-md-6">
							<img v-if="objData.metadata.instructions" v-lazy="objData.metadata.instructions.url">
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
				id: '62496e991ce5640009e3c000',
				props: 'title,content,thumbnail,metadata'
			});   
		}
	}
};
</script>