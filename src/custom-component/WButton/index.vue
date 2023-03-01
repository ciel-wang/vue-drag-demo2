<template>
	<div class="v-button">{{ propValue }}</div>
</template>

<script>
// import OnEvent from '../common/OnEvent'

export default {
	name: 'WButton',
	// extends: OnEvent,
	props: {
		propValue: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
.v-button {
	cursor: pointer;
	background: #fff;
	border: 1px solid #dcdfe6;
	color: #606266;
	transition: 0.1s;
	font-weight: 500;
	width: 100%;
	height: 100%;
	&:active {
		color: #3a8ee6;
		border-color: #3a8ee6;
	}
	&:hover {
		background-color: #ecf5ff;
		color: #3a8ee6;
	}
}
</style>
