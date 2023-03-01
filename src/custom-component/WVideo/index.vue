<template>
	<video muted width="100%" height="100%" :src="propValue.data" v-bind="params" style="object-fit: fill"></video>
</template>

<script>
export default {
	name: 'WVideo',
	props: {
		propValue: {
			type: Object,
			default: {},
		},
	},
	computed: {
		params() {
			let result = {};
			if (this.propValue.controls) result.controls = 'controls';
			if (this.propValue.loop) result.loop = 'loop';
			if (this.propValue.autoplay) result.autoplay = 'autoplay';
			return result;
		},
	},
};
</script>
