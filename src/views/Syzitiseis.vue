<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData && logo && events && footerData && whiteLogo">
			<inner-header ref="header" :events="events" :logo="logo"></inner-header>
			<section class="inner-page py-5">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<h1 class="section-title underline mb-5 text-center">{{objData.title}}</h1>
						</div>
					</div>
					<div class="row" :class="{'mb-5': index < objData.metadata.chats.length - 1}" v-for="(chat, index) in objData.metadata.chats" :key="index">
						<div class="col-12 mb-4">
							<div class="img-wrapper ps-lg-4 mb-4 mb-lg-0" v-if="chat.thumbnail">
								<img :alt="chat.title" v-lazy="chat.thumbnail">
							</div>
							<span class="text-justify" v-if="chat.content" v-html="chat.content"></span>
						</div>
					</div>
				</div>
			</section>
			<inner-footer ref="contact" :obj-data="footerData" :logo="whiteLogo"></inner-footer>
		</div>
		<ShareNetwork
			class="share-btns position-fixed"
			network="facebook"
			url="https://sarmaniata.gr/syzitiseis">
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
import InnerFooter from '../components/InnerFooter.vue';

export default {
	mixins: [data],
	components: {
		Loader,
		InnerHeader,
		InnerFooter
	},
	// metaInfo() {
	// 	return {
	// 		meta: [
	// 			{
	// 				property: 'og:url',
	// 			},
	// 			{
	// 				property: 'og:title', 
	// 				content: 'Sarmaniata | Συζητήσεις'
	// 			},
	// 			{
	// 				property: 'og:description', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{	
	// 				property: 'og:image', 
	// 				content: 'https://sarmaniata.gr/autumn.jpg'
	// 			},
	// 			{
	// 				property: 'og:image:alt', 
	// 				content: 'Ομάδα για τη φύση και τον πολιτισμό της Σαμαρίνας'
	// 			},
	// 			{
	// 				property: 'og:image:secure_url',
	// 				content: 'https://sarmaniata.gr/autumn.jpg'
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
	// 				content: 'Sarmaniata | Συζητήσεις'
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
	// 				content: 'https://sarmaniata.gr/autumn.jpg'
	// 			}
	// 		]
	// 	}
	// },
	methods: {
		fetchData() {
			this.$store.dispatch('fetchContent', {
				id: '62496e4f6d83ac0009358a4d',
				props: 'title,content,thumbnail,metadata'
			});   
		}
	}
};
</script>