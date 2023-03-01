<template>
	<div class="w_real_page">
		<div
			v-for="(item, index) in componentData"
			:key="index"
			class="w_list"
			:class="{ actived: item.id === curComponentId }"
			@click="componentClick(item, item.id)"
		>
			<span class="iconfont" style="margin-right: 6px" :class="item.icon"></span>
			<span>{{ item.label }}</span>
			<div class="icon-container">
				<span class="iconfont icon-xiangshang" @click="upComponent(item.id)"></span>
				<span class="iconfont icon-xiangxia" style="margin: 0 6px" @click="downComponent(item.id)"></span>
				<span class="iconfont icon-shanchu" @click="deleteComponent(item.id)"></span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['componentData', 'curComponentId']),
	methods: {
		upComponent(id) {
			setTimeout(() => {
				this.$store.commit('upComponent', { id });
				this.$store.commit('recordSnapshot');
			});
		},
		downComponent(id) {
			setTimeout(() => {
				this.$store.commit('dowmComponent', { id });
				this.$store.commit('recordSnapshot');
			});
		},
		deleteComponent(id) {
			setTimeout(() => {
				this.$store.commit('deleteComponent', { id });
				this.$store.commit('recordSnapshot');
			});
		},
		componentClick(component, id) {
			this.$store.commit('setCurComponent', { component, id });
		},
	},
};
</script>

<style lang="scss">
.w_real_page {
	height: 35%;
	.w_list {
		height: 30px;
		cursor: grab;
		text-align: center;
		color: #333;
		display: flex;
		align-items: center;
		font-size: 12px;
		padding: 0 10px;
		position: relative;
		user-select: none;
		&:active {
			cursor: grabbing;
		}
		&:hover {
			background-color: rgba(200, 200, 200, 0.2);

			.icon-container {
				display: block;
			}
		}
		.icon-container {
			position: absolute;
			right: 10px;
			display: none;
			.iconfont {
				cursor: pointer;
			}
		}
	}
	.actived {
		background: #ecf5ff;
		color: #409eff;
	}
}
</style>
