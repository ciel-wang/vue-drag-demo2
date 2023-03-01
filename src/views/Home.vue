<template>
	<div class="home">
		<Toolbar />

		<main>
			<section class="left_aside">
				<!-- 自定义组件列表 -->
				<ComponentList />
				<!-- 画布所用的组件列表 -->
				<RealAllComponents />
			</section>
			<section class="main">
				<div class="container" @drop="handleDrop" @dragover="handleDragOver" @mousedown="handleMouseDown" @mouseup="deselectCurComponent">
					<!-- 中间区域组件，包含自定义组件，网格，标记，标记线，区域选择，右键菜单 -->
					<Edit />
				</div>
			</section>

			<section class="right_aside">
				<el-tabs v-if="curComponent" v-model="activeName">
					<el-tab-pane label="属性" name="attr">
						<el-form label-width="60px" label-position="left" size="mini">
							<el-form-item label="X位置">
								<el-input-number
									v-model="curComponent.style.left"
									:min="0"
									:max="canvasStyleData.width - curComponent.style.width"
									:precision="2"
									:controls="false"
								></el-input-number>
							</el-form-item>
							<el-form-item label="Y位置">
								<el-input-number
									v-model="curComponent.style.top"
									:min="0"
									:max="canvasStyleData.height - curComponent.style.height"
									:precision="2"
									:controls="false"
								></el-input-number>
							</el-form-item>
							<el-form-item label="宽度">
								<el-input-number
									v-model="curComponent.style.width"
									:min="0"
									:max="canvasStyleData.width"
									:precision="2"
									:controls="false"
								></el-input-number>
							</el-form-item>
							<el-form-item label="高度">
								<el-input-number
									v-model="curComponent.style.height"
									:min="0"
									:max="canvasStyleData.height"
									:precision="2"
									:controls="false"
								></el-input-number>
							</el-form-item>
							<el-form-item label="旋转角度">
								<el-input-number v-model="curComponent.style.rotate" :precision="2" :controls="false"></el-input-number>
							</el-form-item>
							<el-form-item label="不透明度">
								<el-input-number v-model="curComponent.style.opacity" :min="0" :max="1" :precision="1" :controls="false"></el-input-number>
							</el-form-item>
							<common-options />
							<component :is="curComponent.component + 'Option'" />
						</el-form>
					</el-tab-pane>
					<el-tab-pane label="事件" name="events" style="padding-top: 20px">
						<!-- <EventList /> -->
					</el-tab-pane>
				</el-tabs>

				<template v-else>
					<p class="w_title">画布属性</p>
					<el-form label-width="80px" label-position="left" size="mini">
						<el-form-item label="画布宽度">
							<el-input-number v-model="canvasStyleData.width" :min="1" :precision="0" :controls="false"></el-input-number>
						</el-form-item>
						<el-form-item label="画布高度">
							<el-input-number v-model="canvasStyleData.height" :min="1" :precision="0" :controls="false"></el-input-number>
						</el-form-item>
						<el-form-item label="画布比例(%)">
							<el-input-number v-model="canvasStyleData.scale" :min="1" :max="100" :precision="0" :controls="false"></el-input-number>
						</el-form-item>
						<el-form-item label="不透明度">
							<el-input-number v-model="canvasStyleData.opacity" :min="0" :max="1" :precision="1" :controls="false"></el-input-number>
						</el-form-item>
						<el-form-item label="背景颜色">
							<el-color-picker v-model="canvasStyleData.backgroundColor" show-alpha></el-color-picker>
						</el-form-item>
						<el-form-item label="背景图片">
							<img :src="canvasStyleData.backgroundImg" alt="" width="60%" />
							<el-input v-model="canvasStyleData.backgroundImg" size="small" style="width: 90%">
								<el-button slot="append" icon="iconfont icon-tupian" @click="openImgDialog"></el-button>
							</el-input>
							<imgList ref="imgListRef"></imgList>
						</el-form-item>
						<el-form-item label="字体大小">
							<el-input-number v-model="canvasStyleData.fontSize" :min="1" :precision="0" :controls="false"></el-input-number>
						</el-form-item>
					</el-form>
				</template>
			</section>
		</main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { nanoid } from 'nanoid';
import { deepCopy } from '@/utils/utils';
import { changeComponentSizeWithScale } from '@/utils/changeComponentsSizeWithScale';
import Toolbar from '@/components/Toolbar'; // 头部菜单栏
import Edit from '@/components/Edit'; // 中间的画布
import ComponentList from '@/components/ComponentList'; // 左侧自定义组件列表
import componentData from '@/custom-component/component-list'; // 左侧列表数据
import RealAllComponents from '@/components/RealAllComponents'; //左侧下方展示的画布所有组件
import components from '@/custom-component/option.js'; //引入所有的组定义组件
import CommonOptions from './CommonOptions.vue'; //公共样式
import imgList from '@/custom-component/img_list';

export default {
	name: 'Home',
	mixins: [components], // 注册自定义组件
	components: { Toolbar, Edit, ComponentList, RealAllComponents, CommonOptions, imgList },
	computed: mapState(['editor', 'isClickComponent', 'curComponent', 'canvasStyleData']),
	data() {
		return {
			activeName: 'attr',
		};
	},
	methods: {
		openImgDialog() {
			this.$refs.imgListRef.openImgDialog('bg');
		},
		/**
		 * drop:在拖拽结束时触发,被拖放的元素在目标元素上同时鼠标放开触发的事件(注：需要阻止dragover的默认行为才会触发drop事件)
		 * getData(name):从DataTransfer里获取名为name的数据
		 * getBoundingClientRect():获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
		 * nanoid:给每个组件一个唯一标识
		 * changeComponentSizeWithScale:根据画布比例修改组件样式比例
		 * addComponent:添加组件
		 * recordSnapshot：记录操作快照
		 */
		handleDrop(e) {
			e.preventDefault();
			e.stopPropagation();
			const index = e.dataTransfer.getData('index');
			const rectInfo = this.editor.getBoundingClientRect();
			if (index) {
				const component = deepCopy(componentData[index]);
				// 判断组件是否在画布内
				component.style.top = e.clientY < rectInfo.top || e.clientY > rectInfo.bottom ? 0 : e.clientY - rectInfo.y;
				component.style.left = e.clientX < rectInfo.left || e.clientX > rectInfo.right ? 0 : e.clientX - rectInfo.x;
				component.id = nanoid();
				changeComponentSizeWithScale(component);
				this.$store.commit('addComponent', { component });
				this.$store.commit('recordSnapshot');
			}
		},
		/**
		 * dragover:拖放元素在目标元素上时
		 * dropEffect：设置拖拽元素被放下时的样式
		 */
		handleDragOver(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		},
		/**
		 * setClickComponentStatus:点击画布时设置isClickComponent为false,在shape组件中点击时设置为true
		 * setInEditorStatus：设置是否在画布内，用于tabbar的按钮
		 */
		handleMouseDown(e) {
			e.stopPropagation();
			this.$store.commit('setClickComponentStatus', false);
			this.$store.commit('setInEditorStatus', true);
		},
		deselectCurComponent(e) {
			if (!this.isClickComponent) {
				this.$store.commit('setCurComponent', { component: null, id: null });
			}
			// 0 左击 1 滚轮 2 右击
			if (e.button != 2) {
				this.$store.commit('hideContextMenu');
			}
		},
	},
};
</script>

<style lang="scss">
.home {
	height: 100vh;
	.el-form-item__label {
		font-size: 12px;
	}
	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin-bottom: 10px;
	}
	main {
		height: calc(100% - 64px);
		position: relative;
		.left_aside {
			position: absolute;
			top: 0;
			left: 0;
			width: 300px;
			height: 100%;
			padding: 10px;
			& > div {
				overflow: auto;
				height: 50%;
				&:first-child {
					border-bottom: 1px solid #ddd;
				}
			}
		}
		.main {
			position: absolute;
			top: 0;
			left: 300px;
			width: calc(100% - 600px);
			height: 100%;
			padding: 30px;
			background-color: #f5f5f5;
			.container {
				width: 100%;
				height: 100%;
				overflow: auto;
			}
		}
		.right_aside {
			position: absolute;
			top: 0;
			right: 0;
			width: 300px;
			height: 100%;
			padding: 10px;
			overflow: hidden;
			& > .el-tabs {
				height: 100%;
				.el-tabs__content {
					height: calc(100% - 55px);
					overflow: auto;
				}
			}
		}
	}
	.w_title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		margin-bottom: 15px;
		border-bottom: 2px solid #e4e7ed;
		color: #409eff;
	}
}
</style>
