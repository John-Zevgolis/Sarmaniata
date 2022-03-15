<template>
	<footer>
		<div class="footer-top position-relative">
			<div class="container">
			<div class="row justify-content-center">
				<div class="col-xxl-11">
					<div class="row">
						<div class="col-lg-5">
							<div class="mb-4">
								<img :src="logo">
							</div>
							<div class="description" v-html="contact.content"></div>
							<div class="address">
								<ul class="list-unstyled mb-0">
									<li v-for="(item, index) in contact.metadata.contact_info" :key="index">
										<span v-if="item.address" class="d-flex align-items-center">
											<span class="icon-square me-4 text-center d-inline-block">
												<font-awesome-icon icon="fa-solid fa-location-dot" />
											</span>
											{{item.address}}
										</span>
										<a :href="`tel:${trimWhiteSpaces(item.phone)}`" v-if="item.phone" class="d-flex align-items-center">
											<span class="icon-square me-4 text-center d-inline-block">
												<font-awesome-icon icon="fa-solid fa-phone" />
											</span>
											{{item.phone}}
										</a>
										<a :href="`mailto:${trimLowercase(item.email)}`" v-if="item.email" class="d-flex align-items-center">
											<span class="icon-square me-4 text-center d-inline-block">
												<font-awesome-icon icon="fa-solid fa-envelope" />
											</span>
											{{item.email}}
										</a>
									</li>
								</ul>
							</div>
							<div class="time">
								<span class="d-inline-block text-white title mb-4">Opening Hours</span>
								<div class="time-detail">
									<p>Mon - Sat  :   8am - 5pm <br> Sunday : 8am - 10am</p>
								</div>
							</div>
						</div>
						<div class="col-lg-5 offset-lg-2">
							<div class="contact mt-4 mt-lg-0">
								<h3 class="pb-3 text-white fw-normal">{{contact.title}}</h3>
								<p>{{contact.metadata.subtitle}}</p>
							</div>
							<div class="form">
								<form>
									<div>
										<input class="form-control shadow-none rounded-0" placeholder="Name" name="name" type="text">
									</div>
									<div>
										<input class="form-control shadow-none rounded-0" placeholder="Email" name="email" type="email">
									</div>
									<div>
										<input class="form-control shadow-none rounded-0" placeholder="Subject" name="subject" type="text">
									</div>
									<div>
										<textarea class="form-control shadow-none rounded-0" placeholder="Message" name="message"></textarea>
									</div>
									<div class="mt-4 d-flex justify-content-end">
										<button @click.prevent class="form-control shadow-none rounded-0 my-0 w-auto">SEND MESSAGE</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		<div class="footer-bottom py-3 py-md-4">
			<div class="container">
				<div class="row">
					<div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
						<p class="d-block copyright">© {{year}} ZANKOVER DESIGNS - ALL RIGHT RESERVED</p>
					</div>
					<div class="col-md-6">
						<nav class="social mx-2 mx-xl-4">
							<ul class="nav justify-content-center justify-content-md-end align-items-center">
								<li class="px-3">
									<a href="#" target="_blank">
										<font-awesome-icon icon="fa-brands fa-twitter" />
									</a>
								</li>
								<li class="px-3">
									<a href="#" target="_blank">
										<font-awesome-icon icon="fa-brands fa-facebook-f" />
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	props: ['logo', 'objData'],
	methods: {
		trimWhiteSpaces(value) {
			return value.trim().replace(/\s/g, "");
		},
		trimLowercase(value) {
			return value.trim().toLowerCase();
		}
	},
	computed: {
		year() {
			return new Date().getFullYear();
		},
		contact() {
			const items = [];
			for (const prop in this.objData.metadata) {
				items.push(this.objData.metadata[prop]);
			}
			return items.find(item => {
				return item.id === '622e1f0df1322f0009f67fc0'
			});
		},
	}
};
</script>

<style lang="scss" scoped>
footer {
	background: #181818;

	.description, p {
		color: #696969;
		line-height: 24px;
		margin: 0;
	}

	.footer-top {
		padding: 7.9375rem 0 5.4375rem;

		@media (max-width: 991.98px) {
			padding: 3.75rem 0;
		}

		@media (max-width: 575.98px) {
			padding: 2.5rem 0;
		}

		&:after {
			content: '';
			display: block;
			height: 100%;
			width: 1px;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			background-color: #222;

			@media (max-width: 991.98px) {
				display: none;
			}
		}

		.description {
			&:after {
				content: '';
				display: block;
				width: 30px;
				height: 3px;
				margin-top: 1.5rem;
				background: #fff;
			}

			p {
				padding-bottom: 1.0625rem;
				letter-spacing: .1px;
				margin-bottom: 0.3125rem;
			}
		}

		.address {
			ul {
				padding: 2.5rem 0 2.8125rem;

				li,a {
					color: #fff;
					font-size: 0.625rem;
					line-height: 24px;
					letter-spacing: 2px;
					margin-bottom: 1rem;

					&:last-child {
						margin-bottom: 0;
					}

					.icon-square {
						width: 31px;
						min-width: 31px;
						max-width: 31px;
						height: 31px;
						border: 1px solid #222;

						svg {
							path {
								fill: #383838;
								transition: fill .3s ease;
							}
						}
					}

					&:hover {
						.icon-square {
							svg {
								path {
									fill: #fff;
								}
							}
						}
					}
				}
			}
		}

		.time {
			.title {
				font-size: 1.25rem;
				line-height: 24px;
				font-style: italic;
				padding: 0 3.75rem 0.4375rem 0;
				border-bottom: 1px solid #222;
			}
		}

		.contact {
			@media (max-width: 991.98px) {
				padding-top: 1.875rem;
				border-top: 1px solid #222;
			}

			h3 {
				font-size: 1.375rem;
				letter-spacing: 4px;
				line-height: 24px;
				margin-bottom: 0.625rem;

				@media (max-width: 991.98px) {
					font-size: 1.25rem;
				}

				@media (max-width: 767.98px) {
					font-size: 1.125rem;
				}

				@media (max-width: 575.98px) {
					font-size: 1rem;
				}

				&:after {
					content: '';
					display: block;
					width: 30px;
					height: 3px;
					margin-top: 1rem;
					background: #fff;
				}
			}

			p {
				font-style: italic;
			}
		}

		.form {
			margin-top: 3.75rem;

			.form-control {
				height: 46px;
				line-height: 44px;
				border: 1px solid #222;
				background: transparent;
				color: #585858;
				font-style: italic;
				padding: 0 1.125rem;
				margin: 0.46875rem 0;

				&::-webkit-input-placeholder { /* Edge */
					color: #585858;
				}

				&:-ms-input-placeholder { /* Internet Explorer 10-11 */
					color: #585858;
				}

				&::placeholder {
					color: #585858;
				}

				&:focus:not(button) {
					border-color: #999;
				}
			}

			textarea.form-control {
				height: 194px;
				resize: none;
			}

			button.form-control {
				font-size: 0.75rem;
				line-height: 37px;
				padding: 0 1.40625rem;
				letter-spacing: 2px;
				border: 2px solid #222;
				transition: all .3s;
				background: transparent;

				&:hover {
					background: #222;
				}
			}
		}
	}

	.footer-bottom {
		border-top: 1px solid #222;

		p {
			font-size: 0.625rem;
			letter-spacing: 2px;
		}

		.social {
			ul {
				li {
					border-right: 1px solid #3c3c3c;

					&:last-child {
						border: 0;
					}

					a {
						transition: color .3s ease;
						color: #696969;

						&:hover {
							color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>