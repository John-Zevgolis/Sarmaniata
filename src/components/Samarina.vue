<template>
	<section class="samarina">
		<div class="map position-relative">
			<transition name="infobox-animation">
				<div class="infobox d-flex position-absolute col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-3 px-0" style="height: 400px;" :class="{loading: infoLoading}" v-if="showInfoBox">
					<button aria-label="Close" @click="closeInfobox" class="close-btn bg-transparent border-0 position-absolute d-flex justify-content-center align-items-center">
						<span>&#10006;</span>
					</button>
					<div class="project-box w-100 d-flex flex-column">
						<div class="box-content bg-white pt-4 px-4 flex-grow-1">
							<h5 class="title" v-if="infoboxContent.title">
								<span class="field">{{infoboxContent.title}}</span>
							</h5>
						</div>
					</div>
				</div>
			</transition>
			<button class="filters-btn position-absolute" @click="showFilters = true">
                <div class="filter-wrapper w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
                    <div class="filter">
                        <div class="filter-line d-flex justify-content-center align-items-center">
                            <div class="filter-line-inner-long"></div>
                            <div class="filter-line-inner-thick"></div>
                            <div class="filter-line-inner-short"></div>
                        </div>
                        <div class="filter-line d-flex justify-content-center align-items-center">
                            <div class="filter-line-inner-short"></div>
                            <div class="filter-line-inner-thick"></div>
                            <div class="filter-line-inner-long"></div>
                        </div>
                        <div class="filter-line d-flex justify-content-center align-items-center">
                            <div class="filter-line-inner-long"></div>
                            <div class="filter-line-inner-thick"></div>
                            <div class="filter-line-inner-short"></div>
                        </div>
                    </div>
                </div>
            </button>
            <div class="filters position-absolute h-100">
				<transition name="filters-animation">
					<div id="filters" class="pt-5 pb-3 h-100" v-show="showFilters">
						<div class="d-flex justify-content-end px-5">
							<button @click="closeFilters" :class="{'animate-btn': animateBtn}" class="close-btn position-relative"></button>
						</div>
						<div class="row mx-0">
							<div class="col px-0">
								<div class="goals px-5 py-4">
									<h6 class="mb-0">SELECT A SUSTAINABILITY GOAL</h6>
									<ul class="list-unstyled">
										<li v-for="(item, index) in filters" :key="index">
											<a href="#" :class="{active: item.category.active}" @click.prevent="filterMarkers(item)" class="d-flex align-items-center">
												<span class="d-block me-3">
													<img :src="item.icon">
												</span>
												{{item.category.text}}
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row mx-0">
							<div class="col-8 offset-2 px-0">
								<div class="units text-center mt-n4 pt-4">
									<button class="reset-btn" @click="resetMarkers">RESET FILTERS</button>
								</div>
							</div>
						</div>
					</div>
				</transition>
            </div>  
			<GmapMap :center="{lat: 10, lng: 10}" :options="options" id="map" ref="Map">
				<GmapMarker
					v-for="marker in samarina.metadata.locations" 
					:key="marker.id" 
					:position="{'lat':marker.lat, 'lng': marker.lon}"
					:icon="{url: getMarkers(marker)}"
					:clickable="true"
					@click="infobox({
						title: marker.title,
						position: $event.latLng,
						id: marker.id
					})"
				/>
			</GmapMap>
		</div>
	</section>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';

export default {
	props: ['objData'],
	data() {
		return {
			showInfoBox: false,
			infoLoading: false,
			infoboxContent: null,
			selectedMarker: null,
			infoboxTimeout: null,
			filtersTimeout: null,
			closeBtnTimeout: null,
			bounds: null,
			showFilters: false,
			animateBtn: false,
			locations: null,
			categories: [],
			options: {
				fullscreenControl: false,
				styles: [
    {
        "stylers": [
            {
                "hue": "#baf4c4"
            },
            {
                "saturation": 10
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#effefd"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

			}
		}
	},
	created() {
		this.locations = this.samarina.metadata.locations;
	},
	mounted() {
		this.createMap();
	},
	methods: {
		resetMarkers() {
			this.samarina.metadata.locations = this.locations;

			this.categories = [];

			this.filters.forEach(item => {
				item.category.active = false;
			});

			if(this.showInfoBox) this.showInfoBox = false;

			this.selectedMarker = null;

			this.createMap();
		},
		filterMarkers(item) {
			item.category.active = !item.category.active;

			if(item.category.active) {
				if(this.categories.indexOf(item.category.value) === -1) {
					this.categories.push(item.category.value);
				}
				this.deactivateMarker();
			} else {
				if(this.categories.indexOf(item.category.value) > -1) {
					this.categories = this.categories.filter(item2 => {
						return item2 !== item.category.value;
					})
				}
				this.deactivateMarker();
			}
			
			this.samarina.metadata.locations = this.locations.filter(item => {
				if(this.categories.find(item2 => {
					return item2 === item.category.value;
				})) {
					return item;
				}
			});

			if(!this.samarina.metadata.locations.length) this.samarina.metadata.locations = this.locations;
			
			this.createMap();
		},
		deactivateMarker() {
			if(this.selectedMarker) {
				const activeMarker = this.locations.find(item2 => {
					return item2.id === this.selectedMarker;
				});
				if(!this.categories.find(item2 => {
					return item2 === activeMarker.category.value;
				})) {
					this.showInfoBox = false;
					this.selectedMarker = null;
				}
			}
		},
		infobox({ title, position, id }) {
			if(this.selectedMarker === id) return;
			this.showInfoBox = true;
			this.infoLoading = true;
			this.selectedMarker = id;
			this.infoboxContent = {
				title,
				position
			}
			this.$refs.Map.panTo(this.infoboxContent.position);
		},
		closeFilters() {
			this.animateBtn = true;
			if(this.filtersTimeout) {
				clearTimeout(this.filtersTimeout);
			}
			this.filtersTimeout = setTimeout(() => {
				this.showFilters = false;
			}, 300);
		},
		closeInfobox() {
			this.showInfoBox = false;
			this.selectedMarker = null;
		},
		getMarkers(marker) {
			if (this.selectedMarker === marker.id) return marker.activeIcon;
			return marker.icon;
		},
		createMap() {
			if(this.$refs.Map) {
				this.$refs.Map.$mapPromise.then(() => {
					this.bounds = new this.google.maps.LatLngBounds();
					this.samarina.metadata.locations.map(marker => {
						const loc = new this.google.maps.LatLng(marker.lat, marker.lon);
						this.bounds.extend(loc);
					});
					this.$refs.Map.panToBounds(this.bounds);
					this.$refs.Map.fitBounds(this.bounds);
				});
			}
		}
	},
	computed: {
		google: gmapApi,
		samarina() {
			const items = [];
			for (const prop in this.objData.metadata) {
				items.push(this.objData.metadata[prop]);
			}
			return items.find(item => {
				return item.id === '622e1f58bbb43300095a3892'
			});
		},
		filters() {
			return this.locations.filter((item, index, array) => {
				return array.findIndex(item2 => {
					return item2.category.value === item.category.value;
				}) === index;
			});
		}
	},
	watch: {
		infoLoading() {
			if(this.infoboxTimeout) {
				clearTimeout(this.infoboxTimeout);
			}
			this.infoboxTimeout = setTimeout(() => {
				this.infoLoading = false;
			}, 350);
		},
		showFilters(value) {
			if(!value) {
				if(this.closeBtnTimeout) {
					clearTimeout(this.closeBtnTimeout);
				}
				this.closeBtnTimeout = setTimeout(() => {
					this.animateBtn = false;
				}, 300);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.map {
	#map {
		height: 700px;
		width: 100%;
	}

	.infobox {
		left: 5%;
		top: 50%;
		transform: translate(0, -50%);
		z-index: 1;
		box-shadow: 0px 2px 57px 0px rgba(0, 0, 46, .1);

		@media (max-width: 575.98px) {
			left: 1rem;
			right: 1rem;
		}

		.close-btn {
			top: 0;
			right: 0;
			font-size: 1.3rem;
			color: #181818;
		}

		&.loading {
			.field {
				color: transparent;
				background-image: linear-gradient(90deg, #F4F4F4 0px, rgba(229, 229, 229, 0.8) 40px, #F4F4F4 80px) !important;
				background-size: 100%;
				animation: shine-lines .5s infinite ease-out;
			}
		}
	}

	.filters-btn {
		background-color: transparent;
		border: none;
		cursor: pointer;
		outline: none;
		width: 100px;
		height: 100px;
		z-index: 5;
		top: 55px;
		right: 0;

		@media (max-width: 575.98px) {
			width: 80px;
			height: 80px;
		}

		.filter-wrapper {
			top: 0;
			left: 0;
			background: #fff;
			transition: all .4s;
		}

		.filter-line {
			width: 38px;
			height: 10px;
			margin: 1px 0;

			& > div {
				background: #000;
				transition: all .4s;
			}
		}

		.filter-line-inner-long {
			width: 22px;
			height: 3px;
		}

		.filter-line-inner-thick {
			width: 6px;
			height: 6px;
			border-radius: 100%;
		}

		.filter-line-inner-short {
			width: 7px;
			height: 3px;
		}

		&:hover {
			.filter-line-inner-long {
				width: 7px;
				height: 3px;
			}

			.filter-line-inner-short {
				width: 22px;
				height: 3px;
			}
		}
	}

	.filters {			
		right: 0;
		top: 0;
		z-index: 5;

		@media (max-width: 576px) {
			width: 100%;
			max-width: 100%;
		}

		#filters {
			background-color: #fff;
			max-height: 100%;
			width: 100%;
			min-width: 460px;
			max-width: 460px;
			overflow: auto;
			box-shadow: -10px 10px 30px 0px rgba(0,0,0,0.1);

			@media (max-width: 575.98px) {
				min-width: auto;
				max-width: none;
				box-shadow: none;
			}

			ul {
				li {
					a {
						&.active {
							background: rgba(0, 0, 0, .1);
						}
					}
				}
			}
		}

		.close-btn {
			border: none;
			outline: none;
			background-color: transparent;
			cursor: pointer;
			display: block;
			width: 17px;
			height: 17px;

			&:before,
			&:after{
				content: '';
				width: 17px;
				height: 2px;
				background: #000;
				position: absolute;
				top: 0;
				left: 0;
				transform: rotate(-45deg);
				transition: all 0.3s;
			}

			&:after{
				transform: rotate(45deg);
				transition: all 0.3s;
			}

			&.animate-btn {
				&:before,
				&:after {
					transform: rotate(180deg);
				}
			}
		}

		h6 {
			font-size: 1rem;
			color: #000;
		}

		.reset-btn {
			background-color: #fff;
			color: #000;
			outline: none;
			width: 200px;
			height: 50px;
			border: 1px solid #000;
			transition: all .3s;
			cursor: pointer;

			&:hover {
				background-color: #000;
				color: #fff;
			}
		}
	}
}

@keyframes shine-lines {
    0% {
        background-position: -100px;
    }

    40%, 100% {
        background-position: 140px;
    }
}

.infobox-animation-enter,
.infobox-animation-leave-to {
  opacity: 0;
  transform: translate(-100%, -50%) !important;
}

.infobox-animation-enter-active {
  transition: all .3s ease-out;
}

.infobox-animation-leave-active {
  transition: all .3s ease-in;
}

.filters-animation-enter,
.filters-animation-leave-to {
  transform: translateX(100%);
}

.filters-animation-enter-active {
  transition: all .3s ease-out;
}

.filters-animation-leave-active {
  transition: all .3s ease-in;
}

</style>