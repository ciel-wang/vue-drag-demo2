<template>
	<div class="w_toolbar">
		<div style="float: right">
			<el-button>撤销</el-button>
			<el-button @click="clearCanvas">清空画布</el-button>
			<div class="w_btn w_btn1">预 览</div>
			<div class="w_btn w_btn2" @click="handlerSave">保 存</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Toolbar',
	computed: mapState(['componentData', 'canvasStyleData', 'curComponent']),
	methods: {
		clearCanvas() {
			this.$store.commit('setCurComponent', { component: null, index: null });
			this.$store.commit('setComponentData', []);
			this.$store.commit('recordSnapshot');
		},
		unLock() {
			this.$store.commit('unLock');
		},
		lock() {
			this.$store.commit('lock');
		},
		handlerSave() {
			let obj = {
				canvasData: this.componentData,
				canvasStyle: this.canvasStyleData,
			};
			localStorage.setItem('formdata', JSON.stringify(obj));
			this.$message.success('保存成功');
		},
	},
};
</script>

<style lang="scss">
.w_toolbar {
	padding-left: 20px;
	border-bottom: 1px solid #ccc;
	height: 63px;
	line-height: 63px;
	.w_btn {
		width: 110px;
		height: 100%;
		text-align: center;
		display: inline-block;
		color: #fff;
		cursor: pointer;
	}
	.w_btn1 {
		background-color: #67c23a;
		margin-left: 10px;
	}
	.w_btn2 {
		background-color: #409eff;
	}
}
</style>
