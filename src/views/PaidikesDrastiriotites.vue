<template>
	<div>
		<transition name="fade">
			<loader v-show="loading"></loader>
		</transition>
		<div v-if="objData">{{objData.title}}</div>
	</div>
</template>

<script>
import data from '../mixins/data';
import Loader from '../components/Loader.vue';

export default {
	mixins: [data],
	components: {
		Loader
	},
	methods: {
		fetchData() {
			this.$store.dispatch('fetchContent', {
				id: '62496e991ce5640009e3c000',
				props: 'title,metadata'
			});   
		},
	}
};
</script>