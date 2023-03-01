import Vue from 'vue';
import Vuex from 'vuex';
import { deepCopy, swap } from '@/utils/utils';
import { Message } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 画布配置数据
		canvasStyleData: {
			width: 1200,
			height: 800,
			scale: 100,
			color: '#000',
			opacity: 1,
			backgroundColor: '#fff',
			backgroundImg: '',
			fontSize: 14,
		},
		isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
		componentData: [], // 画布组件数据
		curComponent: null, // 记录当前选中的组件
		curComponentId: null,
		editor: null, // 画布document节点
		snapshotData: [], // 编辑器快照数据
		snapshotIndex: -1, // 快照索引
		menuShow: false, // 是否显示右键菜单
		menuTop: 0, // 右击菜单数据
		menuLeft: 0,
		// 点击画布时设置为false，点击组件时设置为true
		isClickComponent: false,
	},
	mutations: {
		getEditor(state) {
			state.editor = document.getElementById('editor');
		},
		// 添加画布组件数据
		addComponent(state, { component, index }) {
			if (index !== undefined) {
				state.componentData.splice(index, 0, component);
			} else {
				state.componentData.push(component);
			}
		},
		// 设置画布数据
		setComponentData(state, componentData = []) {
			Vue.set(state, 'componentData', componentData);
		},
		setCanvasStyle(state, style) {
			state.canvasStyleData = style;
		},
		// 添加新的快照
		recordSnapshot(state) {
			state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData);
			// 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
			// if (state.snapshotIndex < state.snapshotData.length - 1) {
			// 	state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
			// }
		},
		setInEditorStatus(state, status) {
			state.isInEdiotr = status;
		},
		setClickComponentStatus(state, status) {
			state.isClickComponent = status;
		},
		setCurComponent(state, { component, id }) {
			state.curComponent = component;
			state.curComponentId = id;
		},
		setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
			if (top) curComponent.style.top = Math.round(top);
			if (left) curComponent.style.left = Math.round(left);
			if (width) curComponent.style.width = Math.round(width);
			if (height) curComponent.style.height = Math.round(height);
			if (rotate) curComponent.style.rotate = Math.round(rotate);
		},
		/**
		 * 通过id查找在componentData中所在的index值，index值越大层级越大
		 * upComponent：如果index < componentData.length-1 则将index和index+1位置的值交换，否则已经在最顶层了
		 * dowmComponent：如果index > 0 则将index和index-1位置的值交换，否则已经在最底层了
		 * deleteComponent：如果删除的是当前选中的组件，则要清空curComponent和curComponentId，删除当前index
		 * topComponent：删除当前index，将当前组件push到最后
		 * bottomComponent：删除当前index，将当前组件unshift到第一个
		 */
		showContextMenu(state, { top, left }) {
			state.menuShow = true;
			state.menuTop = top;
			state.menuLeft = left;
		},
		hideContextMenu(state) {
			state.menuShow = false;
		},
		upComponent(state, { id }) {
			const { componentData } = state;
			let index = componentData.findIndex((v) => v.id === id);
			if (index < componentData.length - 1) {
				swap(componentData, index, index + 1);
			} else {
				Message({ message: '已经到顶了', type: 'warning' });
			}
		},
		dowmComponent(state, { id }) {
			const { componentData } = state;
			let index = componentData.findIndex((v) => v.id === id);
			if (index > 0) {
				swap(componentData, index, index - 1);
			} else {
				Message({ message: '已经到底了', type: 'warning' });
			}
		},
		deleteComponent(state, { id }) {
			const { componentData } = state;
			if (id == state.curComponentId) {
				state.curComponentId = null;
				state.curComponent = null;
			}
			let index = componentData.findIndex((v) => v.id === id);
			state.componentData.splice(index, 1);
		},
		topComponent(state) {
			const { componentData, curComponentId, curComponent } = state;
			let index = componentData.findIndex((v) => v.id === curComponentId);
			if (index < componentData.length - 1) {
				componentData.splice(index, 1);
				componentData.push(curComponent);
			} else {
				Message({ message: '已经到顶了', type: 'warning' });
			}
		},
		bottomComponent(state) {
			const { componentData, curComponentId, curComponent } = state;
			let index = componentData.findIndex((v) => v.id === curComponentId);
			if (index > 0) {
				componentData.splice(index, 1);
				componentData.unshift(curComponent);
			} else {
				Message({ message: '已经到底了', type: 'warning' });
			}
		},
		lock({ curComponent }) {
			curComponent.isLock = true;
		},
		unLock({ curComponent }) {
			curComponent.isLock = false;
		},
	},
	actions: {},
	modules: {},
});
