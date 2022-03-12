<template>
	<header class="fixed-top mx-auto py-3 py-xl-0" :class="{active: show}">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12">
					<nav class="d-flex flex-wrap flex-lg-nowrap align-items-center navbar-expand-xl position-relative px-1 px-xl-3">
						<router-link class="d-block" to="/">
							<img src="http://tk-themes.net/html-ueneo/images/logodark.png">
						</router-link>
						<div class="ms-auto ms-xl-0">
							<nav class="social mx-2 mx-xl-4">
								<ul class="nav align-items-center">
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
						<nav class="main-menu ms-auto d-flex align-items-center justify-content-center" v-click-outside="closeMenu">
							<ul v-scroll-spy-active v-scroll-spy-link="{selector: 'a.menu-link'}" class="nav flex-nowrap flex-xl-wrap flex-column flex-xl-row text-center text-xl-start w-100">
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">HOME</a>
								</li>
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">HISTORY</a>
								</li>
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">SERVICES</a>
								</li>
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">PORTFOLIO</a>
								</li>
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">PRICING</a>
								</li>
								<li class="position-relative">
									<a href="#" click.prevent class="d-block menu-link">BLOG</a>
								</li>
								<li class="position-relative">
									<a href="https://youtube.com" class="d-block">CONTACT</a>
								</li>
							</ul>
						</nav>
						<button class="hamburger shadow-none p-0 hamburger--collapse hamburger--collapse navbar-toggler" :class="{'is-active': show}" type="button" @click.stop="show = !show">
							<span class="hamburger-box">
								<span class="hamburger-inner"></span>
							</span>						
						</button>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
	directives: {
		ClickOutside
	},
	data() {
		return {
			show: false
		};
	},
	mounted() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize());
	},
	methods: {
		closeMenu() {
			if(this.show) {
				this.show = false;
			}
		},
		handleResize() {
			if(window.matchMedia('(min-width: 1200px)').matches) {
				if(this.show === true) {
					this.show = false;
				}
			}
		}
	}
};
</script>

<style lang="scss">
body {
	height: 4000px;
}
header {
	background: #fff;
	border-bottom: 1px solid #e2e2e2;
	max-width: 1920px;

	.hamburger {
      line-height: 1;

      .hamburger-inner, .hamburger-inner:after, .hamburger-inner:before {
         height: 2px;
         width: 35px;
      }

      &.is-active:hover, &:hover {
        opacity: 1;
      }
    }

	nav {
		ul {
			li {
				a {
					color: #181818;
					transition: color .3s ease;
				}
			}
		}

		&.social {
			ul {
				li {
					border-right: 1px solid;

					&:last-child {
						border: 0;
					}

					a {
						&:hover {
							color: #999;
						}
					}
				}
			}
		}

		&.main-menu {
			ul {
				li {
					a {
						font-family: 'Montserrat', sans-serif;
						letter-spacing: 2px;
						font-size: 0.75rem;
						padding: 2.1875rem 1.875rem;

						&:hover {
							color: #8b8b8b;
						}
					}

					&:after {
						content: '';
						position: absolute;
						top: 100%;
						height: 2px;
						background: #8b8b8b;
						width: 100%;
						transform: scaleX(0);
					}

					&.active {
						&:after {
							transform: none;
						}

						a {
							color: #8b8b8b;
						}
					}

					&:last-child {
						a {
							padding-right: 0;
						}
					}
				}
			}

			@media (max-width: 1399.98px) {
				ul {
					li {
						a {
							font-size: 0.6875rem;
						}
					}
				}
			}

			@media (max-width: 1199.98px) {
				width: 100%;
				position: absolute;
				transition: transform .3s;
				top: calc(47px + 1rem + 1px);
				background: #181818;
				width: 100%;
				max-width: 295px;
				min-height: calc(100vh - 80px);
				max-height: calc(100vh - 80px);
				right: calc(-1rem - 295px);
				overflow: auto;
				padding: 1.5625rem;

				ul {
					max-height: calc(100vh - 80px);

					li {
						&:after {
							display: none;
						}

						a {
							padding: 1rem 0;
							color: #fff;
							border-bottom: 1px solid #222;
							font-size: 0.75rem;
						}
					}
				}
			}
		}
	}

	@media (max-width: 1199.98px) {
		&.active {
			.main-menu {
				transform: translateX(-295px);
				
				&::-webkit-scrollbar {
					width: 7px;
				}

				&::-webkit-scrollbar-track {
					background: #181818;
				}

				&::-webkit-scrollbar-thumb {
					background: #fff;
				}
			}
		}
	}
}
</style>