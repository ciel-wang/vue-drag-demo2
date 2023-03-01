<template>
	<div class="w_componentlist" @dragstart="handleDragStart">
		<!-- draggable:定义该元素是否可被拖动 -->
		<div v-for="(item, index) in componentList" :key="index" class="w_componentlist_item" draggable :data-index="index">
			<!-- <span v-if="item.icon.substr(0,2) === 'el'" :class="item.icon"></span>
            <span v-else class="iconfont" :class="'icon-' + item.icon"></span> -->
			<span>{{ item.label }}</span>
		</div>
	</div>
</template>

<script>
import componentList from '@/custom-component/component-list';

export default {
	data() {
		return {
			componentList,
		};
	},
	methods: {
		/**
		 * dataTransfer:存储拖放时要携带的数据
		 * setData(name,data):name为存储数据的名称，data为携带的数据
		 * 目标元素使用getData(name)方法通过存储时的name值从DataTransfer里获取数据
		 * 左侧组件列表拖动元素存储元素序列号，在画布中获取序列号并渲染组件
		 */
		handleDragStart(e) {
			e.dataTransfer.setData('index', e.target.dataset.index);
		},
	},
};
</script>

<style lang="scss">
.w_componentlist {
	padding: 10px;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, 80px);
	grid-template-rows: repeat(auto-fill, 40px);
	&_item {
		width: 80px;
		height: 40px;
		border: 1px solid #ddd;
		border-radius: 6px;
		text-align: center;
		color: #333;
		padding: 2px 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: grab;
		font-size: 12px;
		&:active {
			cursor: grabbing;
		}
	}
}
</style>
