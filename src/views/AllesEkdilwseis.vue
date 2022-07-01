<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page py-5">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<h1 class="section-title underline mb-5 text-center">{{objData.title}}</h1>
						</div>
					</div>
					<div class="row" :class="{'mb-5': index < objData.metadata.ekdilwseis.length - 1}" v-for="(activity, index) in objData.metadata.ekdilwseis" :key="index">
						<div class="col-12 mb-4">
							<div class="img-wrapper ps-lg-4 mb-4 mb-lg-0" v-if="activity.thumbnail">
								<img :alt="activity.title" v-lazy="activity.thumbnail">
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
		<ShareNetwork
			class="share-btns position-fixed"
			network="facebook"
			url="https://sarmaniata.gr/alles-ekdilwseis">
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
	// 				content: 'Sarmaniata | Άλλες Εκδηλώσεις'
	// 			},
	// 			{
	// 				property: 'og:description', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{	
	// 				property: 'og:image', 
	// 				content: 'https://sarmaniata.gr/winter.jpg'
	// 			},
	// 			{
	// 				property: 'og:image:alt', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{
	// 				property: 'og:image:secure_url',
	// 				content: 'https://sarmaniata.gr/winter.jpg'
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
	// 				content: 'Sarmaniata | Άλλες Εκδηλώσεις'
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
	// 				content: 'https://sarmaniata.gr/winter.jpg'
	// 			}
	// 		]
	// 	}
	// },
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