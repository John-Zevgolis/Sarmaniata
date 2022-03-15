<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: 'Sarmaniata',
            meta: [
                { name: 'description', content: '' }
            ]
        }
    }
};
</script>

<style lang="scss">
@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Bold.woff2') format('woff2'),
        url('/fonts/OpenSans-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Light.woff2') format('woff2'),
        url('/fonts/OpenSans-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Italic.woff2') format('woff2'),
        url('/fonts/OpenSans-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Medium.woff2') format('woff2'),
        url('/fonts/OpenSans-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('/fonts/OpenSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Open Sans';
    src: url('/fonts/OpenSans-SemiBold.woff2') format('woff2'),
        url('/fonts/OpenSans-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

body {
  max-width: 1920px;
  margin: 0 auto;
  font-family: 'Open Sans';
}

img {
  height: auto;
  max-width: 100%;
}

a {
  text-decoration: none;
}

.bg-img {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: all .6s ease-out;
}

.fade-leave-active {
  transition: all .6s ease-in;
}

.slick-slider {
    .slick-track {
        display: flex;

        &:after,&:before {
            display: none;
        }
    }

    .slick-slide {
        height: auto;
        float: none;

        & > div {
            height: 100%;

            & > div {
                height: 100%;
            }
        }

        .bg-img {
            min-height: calc(100vh - 115px);

            @media (max-width: 1199.98px) {
                min-height: calc(100vh - 109.69px);
            }

            .box {
                z-index: 1;
                color: #fff;
                max-width: calc(100% - ((75px + 40px + 220px + 5px) * 2 + 75px * 2));

                @media (max-width: 1399.98px) { 
                    max-width: calc(100% - 2rem);
                }

                h1,h2,p {
                    opacity: 0;
                }

                h1,h2 {
                    font-size: 3.125rem;
                    transform: translateY(20px);

                    @media (max-width: 1199.98px) {
                        font-size: 2.25rem;
                    }

                    @media (max-width: 991.98px) {
                        font-size: 1.5rem;
                    }

                    @media (max-width: 767.98px) {
                        font-size: 1.125rem;
                    }

                    &:after {
                        content: '';
                        width: 30px;
                        height: 3px;
                        background: #fff;
                        display: block;
                        margin: 1rem auto 0;
                    }
                }

                p {
                    font-style: italic;
                    font-size: 1.375rem;
                    transform: translateY(30px);
                    line-height: 1.4;

                    &:before {
                        content: "“";
                    }
                    
                    &:after {
                        content:"”"
                    }

                    @media (max-width: 991.98px) {
                        font-size: 1.25rem;
                    }

                    @media (max-width: 767.98px) {
                        font-size: 1.125rem;
                    }
                }
            }

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .4);
            }
        }

        &.slick-active {
            z-index: 1;

            .bg-img {
                .box {
                    h1,h2 {
                        animation: heading .3s forwards .3s;
                    }

                    p {
                        animation: button .6s forwards .3s;
                    }
                }
            }
        }
    }

    .slick-arrow {
        border: 2px solid #fff !important;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        display: flex !important;
        justify-content: center;
        align-items: center;
        z-index: 1;
        transition: .3s;

        @media (max-width: 1399.98px) {
            top: auto;
            transform: none;
            bottom: 40px;
        }

        &:hover {
            background: rgba(255, 255, 255, .5);
        }

        &:before {
            display: none;
        }

        &:after {
            display: inline-block;
            font-family: bootstrap-icons !important;
            font-style: normal;
            font-weight: normal !important;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: -0.125em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #fff;
            font-size: 1rem;
        }

        &.slick-prev {
            left: 75px;

            @media (max-width: 1399.98px) {
                left: 25px;
            }

            &:after {
                content: "\f284";
                margin-left: -2px;
            }
        }

        &.slick-next {
            right: 75px;

            @media (max-width: 1399.98px) {
                right: 25px;
            }

            &:after {
                content: "\f285";
                margin-right: -2px;
            }
        }
    }
}

@keyframes heading {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes button {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
