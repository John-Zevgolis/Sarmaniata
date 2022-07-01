<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page py-5 provoles">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<h1 class="section-title underline mb-5 text-center">{{objData.title}}</h1>
						</div>
					</div>
					<div class="row" :class="{'mb-4': index < objData.metadata.provoles.length - 1}" v-for="(imerominia, index) in objData.metadata.provoles" :key="index">	
						<div class="col-12">
							<span v-if="imerominia.title" class="d-block date text-center mb-5">{{imerominia.title}}</span>
							<div class="row mb-5 text-center text-lg-start" v-for="(tainia, i) in imerominia.metadata.tainies" :key="i">
								<div class="col-lg-auto mb-4 mb-lg-0">
									<img :alt="tainia.title" v-if="tainia.thumbnail" v-lazy="tainia.thumbnail">
								</div>
								<div class="col-lg">
									<h2 v-if="tainia.title" class="section-title mb-4">{{tainia.title}}</h2>
									<div v-if="tainia.content" class="text-justify" v-html="tainia.content"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-12 mb-4">
							<p><small>*Μείνετε συντονισμένοι στην σελίδα μας στο facebook, όπου θα αναρτηθούν οι ώρες και η τοποθεσία των προβολών</small></p>
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
		<ShareNetwork
			class="share-btns position-fixed"
			network="facebook"
			url="https://sarmaniata.gr/provoles">
			<span class="share-facebook d-flex justify-content-center align-items-center">
				<font-awesome-icon icon="fa-brands fa-facebook-f" />
			</span>
		</ShareNetwork>
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
	// metaInfo() {
	// 	return {
	// 		meta: [
	// 			{
	// 				property: 'og:url',
	// 			},
	// 			{
	// 				property: 'og:title', 
	// 				content: 'Sarmaniata | Προβολές'
	// 			},
	// 			{
	// 				property: 'og:description', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{	
	// 				property: 'og:image', 
	// 				content: 'https://sarmaniata.gr/spring.jpg'
	// 			},
	// 			{
	// 				property: 'og:image:alt', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{
	// 				property: 'og:image:secure_url',
	// 				content: 'https://sarmaniata.gr/spring.jpg'
	// 			},
	// 			{
	// 				property: 'og:image:type', 
	// 				content: 'image/jpg'
	// 			},
	// 			{
	// 				property: 'twitter:card', 
	// 				content: 'summary_large_image'
	// 			},
	// 			{
	// 				property: 'twitter:title', 
	// 				content: 'Sarmaniata | Προβολές'
	// 			},
	// 			{
	// 				property: 'twitter:description', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{
	// 				property: 'twitter:url'
	// 			},
	// 			{
	// 				property: 'twitter:image',
	// 				content: 'https://sarmaniata.gr/spring.jpg'
	// 			}
	// 		]
	// 	}
	// },
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
.provoles {
	.date {
		font-size: 2.5rem;
		font-family: "GFS Didot", serif;
		font-style: italic;
		color: #181818;

		@media (max-width: 1199.98px) {
			font-size: calc(1.825rem + 0.9vw);
		}
	}
}
</style>