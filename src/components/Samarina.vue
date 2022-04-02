<template>
	<section id="samarina" class="samarina section">
		<div class="parallax position-relative">
			<div class="parallax-img position-absolute w-100 h-100 bg-img" v-lazy:background-image="samarina.thumbnail"></div>
			<div class="container-fluid px-0 position-relative">
				<div class="row gx-0">
					<div class="col-lg-6 offset-lg-6">
						<div class="parallax-content">

						</div>
					</div>
				</div>
			</div>
		</div>
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
					<div id="filters" class="py-5 flex-column h-100" v-show="showFilters">
						<div class="d-flex justify-content-end px-4">
							<button @click="closeFilters" :class="{'animate-btn': animateBtn}" class="close-btn position-relative"></button>
						</div>
						<div class="p-4">
							<div class="filters-scroll">
								<ul class="list-unstyled mb-0">
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
						<div class="text-center mt-auto">
							<button class="reset-btn btn shadow-none rouded-0" :class="{disabled: disabled}" :disabled="disabled" @click="resetMarkers">ΑΚΥΡΩΣΗ ΦΙΛΤΡΩΝ</button>
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
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#F7F5F2"
            },
            {
                "weight": 0.8
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#DDD4CB"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#DDD4CB"
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
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
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
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#F7F5F2"
            }
        ]
    }
]
			},
			clusterStyles: [
				{
					textColor: '#fff',
					url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAxCAYAAACYq/ofAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjhjN2I4NC1mMGZhLWNkNDEtODgzOS02ZDM0M2UyNzYzZDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjdDQzM4QUFGRkM2MTFFOUJBNDFGQkFBMjExOUE2QzEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjdDQzM4QTlGRkM2MTFFOUJBNDFGQkFBMjExOUE2QzEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Y2RkYTRjMjctYzdmOC00ZTQzLTg4NDktODcwZGYwMGE0N2RiIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NDM0ZTUzODQtZmJkYy0xMWU5LTg4ODMtZTQxY2MyNzkxZjU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+nkNUHgAAB05JREFUeNrEWm2IVGUUvnN3dp3ddXfHXTXNcsW13My+ITDDsKKo/mQUQYiVlSkKBUFYsBAEgUF/oogy6UuwMLKEkija0soQQs1atcVQshXd9nt39mNmZ3qOPbMez74zzsedeuFhdu/c95z3ee855z3n3Al5AY2mxnlhfEwByoEwESJkpIgEEQdGj504nghCfyiAxVcBlUBZgWLGgWEgVgypUIEEKvBRwycQ5BgFBkBorKREQEB2vQ6IZLktSbMZJ1JKVxkh5udnkTEC9IHQeOBEQKIaH7UZ5sRpHiMkElH+UqZMKM5dHyGRCM2y3CFTNqAfZIYCIQICck+UCu2QxQ9yIU1AI3BRDv4ipE4DJ4BjJDg1i45eEEoVTAQkZNfqgQrzldhwH/3kOmB+EYFDFvgHsF/8g6br0tcNMslMQsIXUFJthKaoTKLLEqA5oMjZRBwB9nFdNWpzKriWgWJMq45CZDe6gRnArRnMYIjm0iHmQBtPqFBdSzO9mGZYncGUvgE6aQ1iFUOQ01e0s2MRNVTQzCdh550EfiHR5cBNwBVmsWmSh4EfgVYu9GrgEoe57eUTqgSJgSCj1qX4uMtcll3/nru2Abgvwy57GZ7eJ8BrfNo382npsQsk/sxFWM6ncU9fb399NCr3z+Klo8C3wBPAG3T6ijx8Q+69BniEzryVIXs6vz8AEodLdrLjydzIs0CexpvAVY7bZGEHgN9pbh7N6HLg2gyEDwFP8qlMAYl9/0WKMhMfXwIzzVey+LfFJIB5JJm+5wwXe5wm+jhJ6SH33AkSZ/JdU7gQIqIIZLbjz/W81AW0AD8ATwOvOhxYB4b3gIeBpcCLQAO/214IiSCy3+fxcQuwClgBvMz4n8uQSPQssAN4H/gOJF76X9J4kqmis68qUISQWAcSsWLWEfaKH68XQcLjXAm/jxaVHqjKLu9qDXMl9L4VUC2yBvo3F1iVjoaYnteprLSTKUQXBA9nETKdmWttQET6RSx0/p1FZyUDQwdTpfQ52Bc2MT3E9OAOMTtMlDPgZyqJGWIbAiThUZbIfMEsvIrf3cCzSKzmHePfFb7xkziLnbA6xKTWeExyJAm5wFp+t9ILfqwkgbUM74epu5xrSft1hGud8HXfpCkJRxkrj/pKCpNkcAWUzGfaHfRoouwV1FVO3dbcIlzrRKrlm9o56ci/YuYEl7RjkVe6sYg60mMm12BzRF1k+b4jfQ478qY69X+3SuxKMaar/Myj7jHHsXFe6evnkI4krWNZIQGPlA1A2UpcTSRlolbShLwI63NPBYCOEhLpUI59NrRyDbblpDc35ZuFlzke41QmeunRzCy2VOOQ6QWc5BqsuWtfTvo8BLXtjThstk39v4DkD5aAxEHKXqCutTl8csT48rhvwlg5iyYdo2exftZDStotJSCyhbL12KuqUk81+XRTL+EbUwqR6Sl1rZGne6e6thp415hcseMkZa5W1zqpu1FdO+Wd6/RPmJrv8IkIq7j0kKRMGg/b1LU5wEOSfgdIZB1lzlHXtlG3bpYfdxzaYz4zXm1elez86WtSkm42DbKNvK8lABItlLXRFF6bTTmc4H26p5YQDr5qimmHl8fWrq41MCRuMufJB+x+PFfg2ZLi3K2Upc+PTdTZoK61K/PXDb2JAzHmCLn7TWiWxtyHbKzpQLCDzYbbDPkLjXbO2UUZ2qFbqWuJOTv2O0JxbIII30MMG7+ImxBbyS7ienYAdS60E7iekAz2K0YWO0b53Up1/06Tyx2hjuXGhA5yTdpfhtPvUELqBC9nsaLtsYeZaNQo+g34iG1Rz0SZjwmx5YXKNLrY1JPs9n5ihpkvafuDzHibTUdTnto0Y1adIBKf1HwAmSgLGd3WlBP0XiPgKHtYrzjaqDI+h4I1Gao8KY3vcXwlJvYMnXuh2dBPeXDrdqwUer2ZksZ+4xfV3rnuuHZmUbQMeIqwvajdWXxjt6Mpl5azzJBIUfewIZHkWt3ZL7PMXqMoykSu1ZCZDTzAFGIpQ2i6jtiThcgeVde0cG4bZc02JFqp2za3e21GHMrw+GtNdEjRxuW12u3e5Hd+sju/MhL52ZoWqhaXhVwGLHbU/mL3X3v/vp5rMOschPx+z1FpTRo9fb2j9dFoufKLECNIN3dylvGl9Okv7zpGMP90NiKQLVXg3cBcb/Irbilrv+CBWG9IjGi/yLWw6jEhNMSoIZ+fAT850huRN5jDGTLo0D1GmZ8ZXTp09+TdaZS3qGwH2Te6VdzFdobixayzq1RhlEvxpA+0NppmGVN2aykXfLObz6s3V3M6zt0dJeEaKDuRo8y5nNvLjZnqud+3D+Ty6s3PRSkFdZkiLF2/TOPJLM77V54lbZJzpzlIjLPbOZCLMD9XrRA4ypg/6EgQfZpWPj+sKeMcVydHdJyhzpxGXt142mg/zGKIplDlnf8zpnx+DDPGOXp+jOF13MtznO3GF/rzIv68o5JIQU53nvPT4XWYCWDBbaZ/BBgAVeNemE85G34AAAAASUVORK5CYII=',
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
.samarina {
	.parallax {

		.parallax-img {
			top: 0;
			left: 0;
			background-attachment: fixed;
		}

		.parallax-content {
			padding: 9.5% 6.5% 6% 6.5%;
			background-color: rgba(255,255,255,0.8);
			min-height: 775px;
		}
	}

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

			.filters {
				pointer-events: all;
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
					background: #181818;
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
			pointer-events: none;

			@media (max-width: 575.98px) {
				width: 100%;
			}

			#filters {
				background-color: #fff;
				width: 100%;
				min-width: 360px;
				max-width: 360px;
				box-shadow: -10px 10px 30px 0px rgba(0,0,0,0.1);
				display: flex;

				@media (max-width: 575.98px) {
					min-width: auto;
					max-width: none;
					box-shadow: none;
				}

				.filters-scroll {
					max-height: calc(700px - (17px + 6rem + 50px + 3rem));
					overflow: auto;

					&::-webkit-scrollbar {
						width: 7px;
					}

					&::-webkit-scrollbar-track {
						background: #f1f1f1;
					}

					&::-webkit-scrollbar-thumb {
						background: #181818;
					}
				}

				ul {
					li {
						a {
							color: #181818;

							&.active {
								background: rgba(24, 24, 24, .1)
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
					background: #181818;
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

			.reset-btn {
				background: #181818;
				color: #fff;
				outline: none;
				width: 200px;
				height: 50px;
				border: 1px solid #181818;
				transition: all .3s;
				cursor: pointer;

				&:hover {
					background: transparent;
					color: #181818;
				}
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