<template>
	<div>
		<img :src="propValue.img" alt="" width="100%" height="100%" />
	</div>
</template>
<script>
export default {
	name: 'WImg',
	props: {
		propValue: {
			type: Object,
			default: {},
		},
	},
};
</script>
