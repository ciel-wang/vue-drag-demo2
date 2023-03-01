<template>
	<el-form-item label="文本内容">
		<el-input v-model="curComponent.propValue" type="textarea" :rows="3" />
	</el-form-item>
</template>

<script>
export default {
	name: 'WText',
	computed: {
		curComponent() {
			return this.$store.state.curComponent;
		},
	},
};
</script>
