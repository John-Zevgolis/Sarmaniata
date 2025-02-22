<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    metaInfo () {
        return {
            title: 'Sarmaniata'
        }
    },
}
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
    src: url('/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('/fonts/OpenSans-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'GFS Didot';
    src: url('/fonts/GFSDidot-Regular.woff2') format('woff2'),
        url('/fonts/GFSDidot-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

body {
  max-width: 1920px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
}

h1,h2,h3,h4,h5,h6 {
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 34px;

    &.underline {
        &:after {
            content: '';
            display: block;
            width: 30px;
            height: 2px;
            background: #252525;
            margin: 1rem 0 0;
        }
    }

    &.section-title {
        color: #181818;
        letter-spacing: 4px;
    }
}

h3 {
    font-size: 1.5rem;

    &.section-title {
        margin-bottom: 2.1875rem;
    }

    @media (max-width: 767.98px) {
        font-size: 1.375rem;
    }

    @media (max-width: 576.98px) {
        font-size: 1.25rem;
    }
}

p {
    color: #696969;
    line-height: 24px;
}

img {
  height: auto;
  max-width: 100%;
}

.text-justify {
    p {
        text-align: justify;
    }
}

.custom-btn {
    background: #181818;
    color: #fff;
    outline: none;
    border: 1px solid #181818;
    transition: all .3s;
    cursor: pointer;

    &:hover {
        background: transparent;
        color: #181818;
    }
}

.logo {
    img {
        @media (max-width: 1399.98px) {
            max-width: 85px;
        }
    }
}

.animated {
    transition: all .3s;

    &.overlay {
        top: 0;
        left: 0;
        transition: all .6s cubic-bezier(0.16, 0.01, 0.77, 1);

        &.fire {
            animation: overlay .6s forwards;
        }
    }

    &.from-bottom {
        transform: translateY(30px);
    }

    &.scale {
        transform: scale(0);

        &.fire {
            transform: none;
        }
    }
    
    &.from-bottom, &.opacity-0 {
        opacity: 0;
        visibility: hidden;

        &.fire {
            opacity: 1 !important;
            transform: none;
            visibility: visible;
        }
    }
}

@keyframes overlay {
    from {
        transform: scaleY(1);
    }
    to {
        transform: scaleY(0);
    }
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
        display: flex !important;

        &:after,&:before {
            display: none !important;
        }
    }

    .slick-slide {
        height: auto !important;
        float: none !important;

        & > div {
            height: 100%;

            & > div {
                height: 100%;
            }
        }

        .bg-img {
            min-height: calc(100vh - 115px);
            padding: 1.5rem 0 calc(91.5px + 1.5rem);

            @media (max-width: 1399.98px) {
                min-height: calc(100vh - 97.5px);
            }

            @media (max-width: 991.98px) {
                min-height: calc(100vh - 96.55px);
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
                    letter-spacing: 0;
                    line-height: 1.1;

                    @media (max-width: 991.98px) {
                       font-size: 2.75rem;
                    }

                    @media (max-width: 767.98px) {
                       font-size: 2.25rem;
                    }

                    @media (max-width: 575.98px) {
                        font-size: 1.875rem;
                    }

                    &:after {
                        background: #fff;
                        margin: .75rem auto 0;
                    }
                }

                p {
                    font-style: italic;
                    font-size: 1.375rem;
                    transform: translateY(30px);
                    line-height: 1.4;
                    color: #fff;
                    font-family: 'GFS Didot', serif;
                    margin: 0;

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

                    @media (max-width: 575.98px) {
                        font-size: 1rem;
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

.vue-map-container {
    .vue-map {
        .gm-style {
            .cluster {
                & > div {
                    border-radius: 100%;
                    animation: pulse 2s ease-in infinite;

                    @keyframes pulse {
                      0% {
                        box-shadow: 0 0 0 0 rgba(24, 24, 24, .4);
                      }
                      70% {
                          box-shadow: 0 0 0 10px rgba(24, 24, 24, 0);
                      }
                      100% {
                          box-shadow: 0 0 0 0 rgba(24, 24, 24, 0);
                      }
                    }
                } 
            }
        }

        .marker-position {
            transform: translate(-50%, 5px);
            text-align: center;
        }
    }
}

.cool-lightbox-toolbar {
    i[title="download"] {
        display: none !important;
    }
}

.inner-page {
    margin-top: 115px;

    @media (max-width: 1399.98px) {
        margin-top: 96.5px;
    }

    @media (max-width: 1199.98px) {
        margin-top: 97.5px;
    }

    @media (max-width: 991.98px) {
        margin-top: 97.4px;
    }

    h1 {
        &:after {
            margin: 1.5rem auto 0;
        }
    }

    h2 {
        span {
            font-size: 2.5rem;
            font-family: "GFS Didot", serif;
            font-style: italic;

            @media (max-width: 1199.98px) {
                font-size: calc(1.825rem + 0.9vw);
            }
        }
    }

    p {
        &:last-child {
            margin-bottom: 0;
        }
    }

    .bg-img {
        padding-top: 44.21875%;
    }

    .img-wrapper {
        float: right;
        max-width: 50%;

        @media (max-width: 991.98px) {
            float: none;
            max-width: none;
        }
    }

    p:not(.info p, .info-text p) {
        font-size: 1.25rem;
        font-style: italic;
        font-family: 'GFS Didot', serif;

        @media (max-width: 767.98px) {
            font-size: 1.125rem;
        }
    }

    .info {
        p {
            font-size: 0.8125rem;
            line-height: 1.5;
        }
    }

    .info-text {
        p {
            @media (max-width: 767.98px) {
                font-size: 0.875rem;
            }
        }
    }

    .custom-btn {
        @media (max-width: 420px) {
            font-size: .813rem;
        }
    }
}

.share-btns {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    span {
        width: 50px;
        height: 50px;
        border-radius: 5px 0 0 5px;
        color: #fff;
        font-size: 1.125rem;

        &.share-facebook {
            background: #4267B2
        }
    }
}
</style>
