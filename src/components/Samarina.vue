<template>
	<section class="samarina">
		<div class="map position-relative" :class="{active: showFilters}">
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
			<GmapMap :center="{lat: 10, lng: 10}" :options="options" id="map" ref="Map">
				<GmapCluster :zoomOnClick="true" :styles="clusterStyles">
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
				</GmapCluster>
			</GmapMap>
			<div class="filters h-100 position-absolute">
				<transition name="filters-animation">
					<div id="filters" class="pt-5 pb-3 h-100" v-show="showFilters">
						<div class="d-flex justify-content-end px-4">
							<button @click="closeFilters" :class="{'animate-btn': animateBtn}" class="close-btn position-relative"></button>
						</div>
						<div class="row mx-0">
							<div class="col px-0">
								<div class="goals p-4">
									<h6 class="mb-0">SELECT A SUSTAINABILITY GOAL</h6>
									<ul class="list-unstyled">
										<li v-for="(item, index) in filters" :key="index">
											<a href="#" :class="{active: item.category.active}" @click.prevent="filterMarkers(item)" class="d-flex align-items-center p-2 rounded border border-white">
												<span class="d-block me-3">
													<img width="32" :src="item.icon">
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
									<button class="reset-btn btn shadow-none" :class="{disabled: disabled}" :disabled="disabled" @click="resetMarkers">RESET FILTERS</button>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>  
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
			disabled: true,
			categories: [],
			options: {
				fullscreenControl: false,
				styles: [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]

			},
			clusterStyles: [
				{
					textColor: '#fff',
					url: 'https://static.umobit.com/landings/Mytil_map/assets/images/expand.png',
					height: 50,
					width: 49
				}
			]
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
			this.disabled = true;
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
			if(this.filters.some(item => {
				return item.category.active === true;
			})) {
				this.disabled = false;
			}

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
		transition: all .3s;
	}

	&.active {
		#map {
			width: calc(100% - 360px);

			@media (max-width: 991.98px) {
				width: 100%;
			}
		}
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

		#filters {
			background-color: #fff;
			max-height: 100%;
			width: 100%;
			min-width: 360px;
			max-width: 360px;
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
			background: #000;
			color: #fff;
			outline: none;
			width: 200px;
			height: 50px;
			border: 1px solid #000;
			transition: all .3s;
			cursor: pointer;

			&:hover {
				background: transparent;
				color: #000;
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
  transform: translateX(calc(-100%/2));
  opacity: 0;
}

.filters-animation-enter-active {
  transition: all .3s ease-out;
}

.filters-animation-leave-active {
  transition: all .3s ease-in;
}

</style>