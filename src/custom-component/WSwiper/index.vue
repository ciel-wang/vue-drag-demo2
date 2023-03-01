<template>
	<el-carousel
		style="width: 100%; height: 100%"
		:autoplay="propValue.autoplay"
		:interval="propValue.interval"
		:indicator-position="propValue.indicatorPosition"
		:type="propValue.isCard ? 'card' : 'none'"
		:loop="propValue.loop"
		:direction="propValue.direction"
	>
		<el-carousel-item v-for="(item, index) in propValue.data" :key="index">
			<img :src="item.value" draggable="false" width="100%" height="100%" />
			<h3 v-if="propValue.isShowText" class="label_class">{{ item.label || 123 }}</h3>
		</el-carousel-item>
	</el-carousel>
</template>
<script>
export default {
	name: 'WSwiper',
	props: {
		propValue: {
			type: Object,
			default: {},
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/.el-carousel__container {
	height: 100% !important;
}
.label_class {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
	color: #fff;
}
</style>
