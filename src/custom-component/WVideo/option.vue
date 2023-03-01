<template>
	<div>
		<el-form-item label="地址">
			<el-input v-model="curComponent.propValue.data" type="textarea" :rows="3" />
		</el-form-item>
		<el-form-item label="自动播放">
			<el-switch v-model="curComponent.propValue.autoplay"></el-switch>
		</el-form-item>
		<el-form-item label="控制台">
			<el-switch v-model="curComponent.propValue.controls"></el-switch>
		</el-form-item>
		<el-form-item label="循环">
			<el-switch v-model="curComponent.propValue.loop"></el-switch>
		</el-form-item>
	</div>
</template>

<script>
export default {
	name: 'WVideo',
	computed: {
		curComponent() {
			return this.$store.state.curComponent;
		},
	},
};
</script>
