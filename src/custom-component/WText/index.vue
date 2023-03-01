<template>
	<div>{{ propValue }}</div>
</template>

<script>
export default {
	name: 'WText',
	props: {
		propValue: {
			type: String,
			default: '',
		},
	},
};
</script>
