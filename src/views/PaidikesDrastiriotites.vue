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
						<div class="col-lg-7 mb-5 mb-lg-0">
							<img v-if="objData.metadata.instructions" v-lazy="objData.metadata.instructions.url">
						</div>
						<div class="col-lg-5">
							<h3 class="pb-3 underline section-title">ΦΟΡΜΑ ΣΥΜΜΕΤΟΧΗΣ</h3>
							<div class="form">
								<form @submit.prevent="submitForm" novalidate>
									<div class="mb-3">
										<input :disabled="registration && registration.status === 'success'" :class="{error: registration && registration.status === 'error' && errorMessage('name', registration)}" class="form-control rounded-0" placeholder="Ονοματεπώνυμο" v-model="name" name="name" type="text">
										<span class="d-block error text-danger" v-if="registration && registration.status === 'error' && errorMessage('name', registration)">{{errorMessage('name', registration)}}</span>
									</div>
									<div class="mb-3">
										<input @keypress="validateNumber" minlength="10" maxlength="10" :disabled="registration && registration.status === 'success'" :class="{error: registration && registration.status === 'error' && errorMessage('phone', registration)}" class="form-control rounded-0" placeholder="Τηλέφωνο" v-model="phone" name="phone" type="text">
										<span class="d-block error text-danger" v-if="registration && registration.status === 'error' && errorMessage('phone', registration)">{{errorMessage('phone', registration)}}</span>
									</div>
									<div class="mb-3">
										<input min="1" max="4" :disabled="registration && registration.status === 'success'" :class="{error: registration && registration.status === 'error' && errorMessage('members', registration)}" class="form-control rounded-0" placeholder="Άτομα" v-model="members" name="members" type="number">
										<span class="d-block error text-danger" v-if="registration && registration.status === 'error' && errorMessage('members', registration)">{{errorMessage('members', registration)}}</span>
									</div>
									<div class="mt-4 d-flex justify-content-end">
										<button :class="{disabled: registration && registration.status === 'success'}" :disabled="registration && registration.status === 'success'" class="form-control btn shadow-none rounded-0 my-0 w-auto">ΑΠΟΣΤΟΛΗ</button>
									</div>
								</form>
								<div class="alert alert-success mb-0 mt-4" v-if="registration && registration.status === 'success'" role="alert">{{registration.text}} <i class="bi bi-emoji-wink"></i></div>
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
import { bus } from '../main';

export default {
	mixins: [data],
	components: {
		Loader,
		InnerHeader
	},
	data() {
		return {
			name: '',
			phone: '',
			members: 1
		};
	},
	created() {
		bus.$on('resetRegistrationForm', () => {
			this.name = '';
			this.phone = '';
			this.members = 1;
		});
	},
	methods: {
		errorMessage(field, res) {
			const error = res.errors.find(item => {
				return item.field === field;
			});
			if(error) {
				return error.text;
			}
		},
		submitForm() {
			this.$store.dispatch('register', {
				name: this.name,
				phone: this.phone,
				members: this.members
			});
		},
		validateNumber(event) {
			const theEvent = event || window.event;

			// Handle paste
			if (theEvent.type === 'paste') {
				key = event.clipboardData.getData('text/plain');
			} else {
				// Handle key press
				var key = theEvent.keyCode || theEvent.which;
				key = String.fromCharCode(key);
			}
			const regex = /[0-9]|\./;
			if( !regex.test(key) ) {
				theEvent.returnValue = false;
				if(theEvent.preventDefault) theEvent.preventDefault();
			}
		},
		fetchData() {
			this.$store.dispatch('fetchContent', {
				id: '62496e991ce5640009e3c000',
				props: 'title,content,thumbnail,metadata'
			});   
		}
	},
	computed: {
		registration() {
			return this.$store.getters['registration'];
		}
	}
};
</script>

<style lang="scss">
.form {
	.form-control,
	.form-control:-webkit-autofill,
	.form-control:-webkit-autofill:hover, 
	.form-control:-webkit-autofill:focus, 
	.form-control:-webkit-autofill:active {
		height: 46px;
		line-height: 44px;
		border: 1px solid #181818;
		background: transparent;
		-webkit-text-fill-color: #181818;
		-webkit-box-shadow: 0 0 0px 1000px #fff inset;
		color: #181818;
		padding: 0 1.125rem;

		&::-webkit-input-placeholder { /* Edge */
			color: #181818;
		}

		&:-ms-input-placeholder { /* Internet Explorer 10-11 */
			color: #181818;
		}

		&::placeholder {
			color: #181818;
		}

		&:focus:not(button) {
			border-color: #999;
		}

		&.error {
			color: #842029;
			background: #f8d7da;
			border-color: #f5c2c7;
			-webkit-text-fill-color: #842029;
			-webkit-box-shadow: 0 0 0px 1000px #f8d7da inset;
		}
	}

	button.form-control {
		font-size: 0.75rem;
		line-height: 37px;
		padding: 0 1.40625rem;
		letter-spacing: 2px;
		border: 1px solid #222;
		transition: all .3s;
		background: transparent;
		-webkit-text-fill-color: #181818;

		&:hover {
			background: #222;
			color: #fff;
			-webkit-text-fill-color: #fff;
		}
	}

	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button {
		opacity: 1;
	}

	span.error {
		font-size: 0.75rem;
		margin-top: 0.46875rem;
	}
}
</style>