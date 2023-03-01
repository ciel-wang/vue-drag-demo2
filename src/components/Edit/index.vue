<template>
	<div
		id="editor"
		class="editor w_edit"
		:style="{
			...setStyleUnit(canvasStyleData, ['width', 'height', 'scale']),
			width: changeStyleWithScale(canvasStyleData.width) + 'px',
			height: changeStyleWithScale(canvasStyleData.height) + 'px',
			backgroundImage: `url(${canvasStyleData.backgroundImg})`,
			backgroundColor: canvasStyleData.backgroundColor,
		}"
		@contextmenu="handleContextMenu"
	>
		<!-- 网格，fill="url(#smallGrid)"用id为smallGrid的绘制 -->
		<svg class="grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse">
					<path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1"></path>
				</pattern>
				<pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse">
					<rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)"></rect>
					<path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.5)" stroke-width="1"></path>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)"></rect>
		</svg>
		<!-- 组件部分 -->
		<shape
			v-for="item in componentData"
			:key="item.id"
			:element="item"
			:active="item.id === (curComponent || {}).id"
			:defaultStyle="item.style"
			:style="setStyleUnit(item.style)"
			:id="item.id"
			:class="{ lock: item.isLock }"
		>
			<component
				:is="item.component"
				:id="'component' + item.id"
				:propValue="item.propValue"
				:element="item"
				:style="setStyleUnit(item.style, ['width', 'height', 'top', 'left', 'rotate'])"
			>
			</component>
		</shape>
		<!-- 右键菜单 -->
		<ContextMenu />
	</div>
</template>

<script>
/**
 * changeStyleWithScale：根据画布比例动态变化画布宽高
 * setStyleUnit：为样式添加单位
 */
import { mapState } from 'vuex';
import { changeStyleWithScale } from '@/utils/translate';
import { setStyleUnit } from '@/utils/style';
import ContextMenu from './ContextMenu.vue';
import shape from './shape.vue';
import components from '@/custom-component/index.js';

export default {
	mixins: [components],
	components: { ContextMenu, shape },
	methods: {
		changeStyleWithScale,
		setStyleUnit,
		/**
		 * e.offsetY，e.offsetX：鼠标点击位置距离点击元素x、y的距离值
		 * target.offsetLeft，target.offsetTop：目标元素距离父级的x/y值
		 * 菜单的top、left值 = e.offsetX + target.offsetLeft的累加值
		 */
		handleContextMenu(e) {
			e.stopPropagation();
			e.preventDefault();
			let target = e.target;
			let top = e.offsetY;
			let left = e.offsetX;
			while (target instanceof SVGElement) {
				target = target.parentNode;
			}
			while (!target.className.includes('editor')) {
				left += target.offsetLeft;
				top += target.offsetTop;
				target = target.parentNode;
			}
			this.$store.commit('showContextMenu', { top, left });
		},
	},
	computed: mapState(['canvasStyleData', 'componentData', 'curComponent']),
	mounted() {
		// 获取编辑器元素
		this.$store.commit('getEditor');
	},
};
</script>

<style lang="scss">
.w_edit {
	position: relative;
	// background-color: #fff;
	// background: #fff;
	margin: auto;
	.lock {
		opacity: 0.5;
		&:hover {
			cursor: not-allowed;
		}
	}
}
.grid {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
