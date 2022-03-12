<template>
    <div>
        <loader :loading="loading"></loader>
        <router-view></router-view>
    </div>
</template>

<script>
import Loader from './components/Loader.vue';

export default {
    components: {
        Loader
    },
    metaInfo() {
        return {
            title: 'Sarmaniata',
            meta: [
                { name: 'description', content: '' }
            ]
        }
    },
    data() {
        return {
            loading: false,
        };
    },
    mounted() {
        this.loading = true; 
    }
};
</script>

<style>
@font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Bold.woff2') format('woff2'),
        url('/fonts/Montserrat-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Light.woff2') format('woff2'),
        url('/fonts/Montserrat-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Medium.woff2') format('woff2'),
        url('/fonts/Montserrat-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Regular.woff2') format('woff2'),
        url('/fonts/Montserrat-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-SemiBold.woff2') format('woff2'),
        url('/fonts/Montserrat-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Bold.woff2') format('woff2'),
        url('/fonts/CrimsonPro-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Light.woff2') format('woff2'),
        url('/fonts/CrimsonPro-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Medium.woff2') format('woff2'),
        url('/fonts/CrimsonPro-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Italic.woff2') format('woff2'),
        url('/fonts/CrimsonPro-Italic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-SemiBold.woff2') format('woff2'),
        url('/fonts/CrimsonPro-SemiBold.woff') format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Crimson Pro';
    src: url('/fonts/CrimsonPro-Regular.woff2') format('woff2'),
        url('/fonts/CrimsonPro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

body {
  max-width: 1920px;
  margin: 0 auto;
  font-family: 'Crimson Pro';
}

h1,h2,h3,h4,h5,h6 {
    font-family: 'Montserrat';
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
</style>
