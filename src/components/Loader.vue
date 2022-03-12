<template>
	<div class="loader fixed-top h-100" :class="{remove: loading}">
		<div class="position-absolute loading">
			<img src="http://tk-themes.net/html-ueneo/images/loader2.gif">
		</div>
		<div class="left-overlay h-100 w-50 position-absolute bg-white"></div>
		<div class="right-overlay h-100 w-50 position-absolute bg-white"></div>
	</div>
</template>

<script>
export default {
	props: ['loading']
};
</script>

<style lang="scss">
.loader {
	z-index: 5000;
	transition: all .3s 1s ease-out;

	.loading {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.left-overlay,
	.right-overlay {
		top: 0;
		transition: all .7s .3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.left-overlay {
		left: 0;
	}

	.right-overlay {
		right: 0;
	}

	&.remove {
		visibility: hidden;
		opacity: 0;

		.loading {
			opacity: 0;
			visibility: hidden;
		}

		.left-overlay {
			transform: translateX(-100%);
		}

		.right-overlay {
			transform: translateX(100%);
		}
	}
}
</style>