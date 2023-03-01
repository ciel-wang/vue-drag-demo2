<template>
	<div v-show="menuShow" class="w_contextmenu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" @mouseup="handleMouseUp">
		<ul>
			<template v-if="curComponent">
				<template v-if="!curComponent.isLock">
					<li>复制</li>
					<li>粘贴</li>
					<li>剪切</li>
					<li @click="deleteComponent">删除</li>
					<li @click="lock">锁定</li>
					<li @click="topComponent">置顶</li>
					<li @click="bottomComponent">置底</li>
					<li @click="upComponent">上移</li>
					<li @click="downComponent">下移</li>
				</template>
				<li v-else @click="unLock">解锁</li>
			</template>
			<li v-else>粘贴</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: mapState(['menuTop', 'menuLeft', 'menuShow', 'curComponent']),
	methods: {
		deleteComponent() {
			this.$store.commit('deleteComponent', { id: this.curComponent.id });
			this.$store.commit('recordSnapshot');
		},
		lock() {
			this.$store.commit('lock');
		},
		unLock() {
			this.$store.commit('unLock');
		},
		topComponent() {
			this.$store.commit('topComponent');
			this.$store.commit('recordSnapshot');
		},
		bottomComponent() {
			this.$store.commit('bottomComponent');
			this.$store.commit('recordSnapshot');
		},
		upComponent() {
			this.$store.commit('upComponent', { id: this.curComponent.id });
			this.$store.commit('recordSnapshot');
		},
		downComponent() {
			this.$store.commit('dowmComponent', { id: this.curComponent.id });
			this.$store.commit('recordSnapshot');
		},
		handleMouseUp(e) {
			e.stopPropagation();
			e.preventDefault();
			this.$store.commit('hideContextMenu');
		},
	},
};
</script>

<style lang="scss">
.w_contextmenu {
	position: absolute;
	z-index: 1000;
	ul {
		border: 1px solid #e4e7ed;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		margin: 5px 0;
		padding: 6px 0;
		li {
			font-size: 12px;
			padding: 0 20px;
			position: relative;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #606266;
			height: 34px;
			line-height: 34px;
			box-sizing: border-box;
			cursor: pointer;
			&:hover {
				background-color: #f5f7fa;
			}
		}
	}
}
</style>
