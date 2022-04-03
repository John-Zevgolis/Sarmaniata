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
				id: '62496e4f6d83ac0009358a4d',
				props: 'title,metadata'
			});   
		},
	}
};
</script>