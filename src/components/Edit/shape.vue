<template>
	<div class="shape" :class="{ active }" @click="selectCurComponent" @mousedown="handleMouseDownOnShape">
		<span v-show="isActive()" class="iconfont icon-xuanzhuan" @mousedown="handleRotate"></span>
		<span v-show="element.isLock" class="iconfont icon-unlock"></span>
		<div
			v-for="item in isActive() ? getPointList() : []"
			:key="item"
			class="shape_point"
			:style="getPointStyle(item)"
			@mousedown="handleMouseDownOnPoint(item, $event)"
		></div>
		<slot></slot>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mod360 } from '@/utils/translate';
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize';

export default {
	props: {
		active: {
			type: Boolean,
			default: false,
		},
		element: {
			required: true,
			type: Object,
			default: () => {},
		},
		defaultStyle: {
			required: true,
			type: Object,
			default: () => {},
		},
		id: {
			required: true,
			type: [Number, String],
			default: 0,
		},
	},
	data() {
		return {
			pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
			pointList2: ['r', 'l'], // 左右两个方向
			// 每个点对应的初始角度
			initialAngle: {
				lt: 0,
				t: 45,
				rt: 90,
				r: 135,
				rb: 180,
				b: 225,
				lb: 270,
				l: 315,
			},
			// 每个范围的角度对应的光标
			angleToCursor: [
				{ start: 338, end: 23, cursor: 'nw' },
				{ start: 23, end: 68, cursor: 'n' },
				{ start: 68, end: 113, cursor: 'ne' },
				{ start: 113, end: 158, cursor: 'e' },
				{ start: 158, end: 203, cursor: 'se' },
				{ start: 203, end: 248, cursor: 's' },
				{ start: 248, end: 293, cursor: 'sw' },
				{ start: 293, end: 338, cursor: 'w' },
			],
			cursors: {},
		};
	},
	methods: {
		isActive() {
			return this.active && !this.element.isLock;
		},
		getPointList() {
			return this.element.component === 'line-shape' ? this.pointList2 : this.pointList;
		},
		selectCurComponent(e) {
			e.stopPropagation();
			e.preventDefault();
			this.$store.commit('hideContextMenu');
		},
		/**
		 * setInEditorStatus:设置点击事件是否在画布内
		 * setClickComponentStatus：设置当前是否点击在组件上，用于取消组件的选中状态
		 * setCurComponent：设置当前组件
		 * maxLeft，maxTop：当前组件相对于画布最大的left值和top值，保证在画布内
		 * 组件移动中top和left值 = 当前x值 - 移动开始x值 + 组件移动前的left值
		 */
		handleMouseDownOnShape(e) {
			// 将当前点击组件的事件传播出去
			// this.$nextTick(() => eventBus.$emit('componentClick'))
			this.$store.commit('setInEditorStatus', true);
			this.$store.commit('setClickComponentStatus', true);
			// if (isPreventDrop(this.element.component)) {
			// 	e.preventDefault()
			// }
			e.stopPropagation();
			this.$store.commit('setCurComponent', { component: this.element, id: this.id });
			if (this.element.isLock) return;
			this.cursors = this.getCursor();
			const pos = { ...this.defaultStyle };
			const maxLeft = this.canvasStyleData.width - pos.width;
			const maxTop = this.canvasStyleData.height - pos.height;
			const startY = e.clientY;
			const startX = e.clientX;
			// 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
			const startTop = Number(pos.top);
			const startLeft = Number(pos.left);
			// 如果元素没有移动，则不保存快照
			let hasMove = false;
			const move = (moveEvent) => {
				hasMove = true;
				const curX = moveEvent.clientX;
				const curY = moveEvent.clientY;
				let top = curY - startY + startTop;
				let left = curX - startX + startLeft;
				// 如果组件在画布内，修改当前组件样式
				if (top >= 0 && top <= maxTop && left >= 0 && left <= maxLeft) {
					pos.top = top;
					pos.left = left;
					this.$store.commit('setShapeStyle', pos);
				}
				// 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
				// 如果不使用 $nextTick，吸附后将无法移动
				this.$nextTick(() => {
					// 触发元素移动事件，用于显示标线、吸附功能
					// 后面两个参数代表鼠标移动方向
					// curY - startY > 0 true 表示向下移动 false 表示向上移动
					// curX - startX > 0 true 表示向右移动 false 表示向左移动
					// eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
				});
			};
			const up = () => {
				hasMove && this.$store.commit('recordSnapshot');
				// 触发元素停止移动事件，用于隐藏标线
				// eventBus.$emit('unmove')
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		},
		/**
		 * 不考虑旋转问题
		 * disY = currY - startY y方向上当前坐标-开始坐标=移动距离
		 * disX = currX - startX x方向上当前坐标-开始坐标=移动距离
		 * newHeight = height + (hasT ? -disY : hasB ? disY : 0) 移动后，组件的高度 = 高度加上移动距离，如果移动的是组件的顶部圆点，disY>0时高度是减少的，所以要移动距离要取反值
		 * newWidth = width + (hasL ? -disX : hasR ? disX : 0) 移动后，组件的宽度 = 宽度加上移动距离，如果移动的是组件的左边圆点，disX>0时宽度是减少的，所以要移动距离要取反值
		 * 组件的left和top等于组件开始的left和top + 移动距离；
		 */
		handleMouseDownOnPoint(point, e) {
			e.stopPropagation();
			e.preventDefault();
			const pos = { ...this.defaultStyle };
			const height = Number(pos.height);
			const width = Number(pos.width);
			const top = Number(pos.top);
			const left = Number(pos.left);
			const startX = e.clientX;
			const startY = e.clientY;
			// 是否需要保存快照
			let needSave = false;
			const move = (moveEvent) => {
				needSave = true;
				const currX = moveEvent.clientX;
				const currY = moveEvent.clientY;
				const disY = currY - startY;
				const disX = currX - startX;
				const hasT = /t/.test(point);
				const hasB = /b/.test(point);
				const hasL = /l/.test(point);
				const hasR = /r/.test(point);
				const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
				const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
				pos.height = newHeight > 0 ? newHeight : 0;
				pos.width = newWidth > 0 ? newWidth : 0;
				pos.left = left + (hasL ? disX : 0);
				pos.top = top + (hasT ? disY : 0);
				this.$store.commit('setShapeStyle', pos);
			};
			const up = () => {
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
				// needSave && this.$store.commit('recordSnapshot')
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		},
		/**
		 * 考虑组件的旋转
		 */
		handleMouseDownOnPoint2(point, e) {
			this.$store.commit('setInEditorStatus', true);
			this.$store.commit('setClickComponentStatus', true);
			e.preventDefault();
			e.stopPropagation();
			const style = { ...this.defaultStyle };
			// 组件宽高比
			const proportion = style.width / style.height;
			// 组件中心点
			const center = {
				x: style.left + style.width / 2,
				y: style.top + style.height / 2,
			};
			// 获取画布位移信息
			const editorRectInfo = this.editor.getBoundingClientRect();
			const pointRect = e.target.getBoundingClientRect();
			// 当前点击圆点相对于画布的中心坐标
			const curPoint = {
				x: Math.round(pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2),
				y: Math.round(pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2),
			};
			// 获取对称点的坐标
			const symmetricPoint = {
				x: center.x - (curPoint.x - center.x),
				y: center.y - (curPoint.y - center.y),
			};
			// 是否需要保存快照
			let needSave = false;
			let isFirst = true;
			const needLockProportion = this.isNeedLockProportion();
			const move = (moveEvent) => {
				// 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
				// 因此第一次点击时不触发 move 事件
				if (isFirst) {
					isFirst = false;
					return;
				}
				needSave = true;
				const curPositon = {
					x: moveEvent.clientX - Math.round(editorRectInfo.left),
					y: moveEvent.clientY - Math.round(editorRectInfo.top),
				};
				calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
					center,
					curPoint,
					symmetricPoint,
				});
				this.$store.commit('setShapeStyle', style);
			};
			const up = () => {
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
				needSave && this.$store.commit('recordSnapshot');
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		},
		isNeedLockProportion() {
			if (this.element.component != 'Group') return false;
			const ratates = [0, 90, 180, 360];
			for (const component of this.element.propValue) {
				if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
					return true;
				}
			}

			return false;
		},
		/**
		 * getPointStyle : 计算每个小圆点相对于shape组件的绝对定位
		 * lt:(0,0)
		 * lb:(0,height)  l存在，则left为0，并且t存在，则top为0，否则为height
		 * rt:(width,0)
		 * rb:(width,height) r存在，则left为width，并且t存在，则top为0，否则为height
		 *
		 * t:(width/2,0)
		 * b:(width/2,height) (t || b)存在，left为width一半，top = b ? height : 0
		 * r:(width,height/2)
		 * l:(0,height/2) (r || l)存在，top为heigth一半，left = r ? width : 0
		 */
		getPointStyle(point) {
			const { width, height } = this.defaultStyle;
			const hasT = /t/.test(point);
			const hasB = /b/.test(point);
			const hasL = /l/.test(point);
			const hasR = /r/.test(point);
			let newLeft = 0;
			let newTop = 0;

			// 四个角的点
			if (point.length === 2) {
				newLeft = hasL ? 0 : width;
				newTop = hasT ? 0 : height;
			} else {
				// 上下两边中间的点，宽度居中
				if (hasT || hasB) {
					newLeft = width / 2;
					newTop = hasT ? 0 : height;
				}
				// 左右两边中间的点，高度居中
				if (hasL || hasR) {
					newLeft = hasL ? 0 : width;
					newTop = Math.floor(height / 2);
				}
			}
			const style = {
				marginLeft: '-4px',
				marginTop: '-4px',
				left: `${newLeft}px`,
				top: `${newTop}px`,
				cursor: this.cursors[point],
			};
			return style;
		},
		/**
		 * handleRotate:处理组件旋转
		 */
		handleRotate(e) {
			this.$store.commit('setClickComponentStatus', true);
			e.preventDefault();
			e.stopPropagation();
			// 初始坐标和初始角度
			const pos = { ...this.defaultStyle };
			const startY = e.clientY;
			const startX = e.clientX;
			const startRotate = pos.rotate;
			// 获取元素中心点位置
			const rect = this.$el.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			// 旋转前的角度
			const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180);
			// 如果元素没有移动，则不保存快照
			let hasMove = false;
			const move = (moveEvent) => {
				hasMove = true;
				const curX = moveEvent.clientX;
				const curY = moveEvent.clientY;
				// 旋转后的角度
				const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180);
				// 获取旋转的角度值
				pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore;
				// 修改当前组件样式
				this.$store.commit('setShapeStyle', pos);
			};
			const up = () => {
				hasMove && this.$store.commit('recordSnapshot');
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
				this.cursors = this.getCursor(); // 根据旋转角度获取光标位置
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		},
		// 处理鼠标的css样式
		getCursor() {
			const { angleToCursor, initialAngle, pointList, curComponent } = this;
			const rotate = mod360(curComponent.style.rotate); // 取余 360
			const result = {};
			let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
			pointList.forEach((point) => {
				const angle = mod360(initialAngle[point] + rotate);
				const len = angleToCursor.length;
				// eslint-disable-next-line no-constant-condition
				while (true) {
					lastMatchIndex = (lastMatchIndex + 1) % len;
					const angleLimit = angleToCursor[lastMatchIndex];
					if (angle < 23 || angle >= 338) {
						result[point] = 'nw-resize';
						return;
					}
					if (angleLimit.start <= angle && angle < angleLimit.end) {
						result[point] = angleLimit.cursor + '-resize';
						return;
					}
				}
			});
			return result;
		},
	},
	computed: mapState(['curComponent', 'editor', 'canvasStyleData']),
};
</script>

<style lang="scss">
.shape {
	position: absolute;
	&:hover {
		cursor: move;
	}
	.active {
		outline: 1px solid #70c0ff;
		user-select: none;
	}
	&_point {
		position: absolute;
		background: #fff;
		border: 1px solid #59c7f9;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		z-index: 1;
	}
	.icon-xuanzhuan,
	.icon-unlock {
		position: absolute;
	}
	.icon-xuanzhuan {
		cursor: grab;
		top: -34px;
		left: 50%;
		transform: translateX(-50%);
		color: #59c7f9;
		&:active {
			cursor: grabbing;
		}
	}
	.icon-unlock {
		top: 0;
		right: 0;
	}
}
</style>
