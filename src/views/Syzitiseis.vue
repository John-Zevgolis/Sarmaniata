<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page pt-4 pb-5">
				<div class="container">aposkata
					<!-- <div class="row align-items-center">
						<div class="col-lg-10">
							<div class="bg-img" v-lazy:background-image="objData.thumbnail"></div>
						</div>
						<div class="col-lg-2 info mt-4 mt-lg-0 text-center text-lg-start">
							<p><strong>τοποθεσία:</strong> {{objData.metadata.location}}</p>
							<p><strong>ημερομηνίες:</strong> {{objData.metadata.date}}</p>
							<p><strong>ώρα:</strong> {{objData.metadata.time}}</p>
							<p><strong>διοργάνωση:</strong> {{objData.metadata.organization}}</p>
						</div>
					</div>
					<div class="row">
						<div class="col-12 mt-4 text-center" v-html="objData.content"></div>
					</div> -->
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
				id: '62496e4f6d83ac0009358a4d',
				props: 'title,content,metadata,thumbnail'
			});   
		}
	}
};
</script>