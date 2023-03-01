<template>
	<div>
		<el-form-item label="图片地址">
			<img :src="curComponent.propValue.img" alt="" width="60%" />

			<el-input v-model="curComponent.propValue.img" size="small" style="width: 90%">
				<el-button slot="append" icon="iconfont icon-tupian" @click="openImgDialog"></el-button>
			</el-input>
		</el-form-item>
		<imgList ref="imgListRef"></imgList>
	</div>
</template>

<script>
import imgList from '../img_list.vue';
export default {
	name: 'WImg',
	components: { imgList },
	computed: {
		curComponent() {
			return this.$store.state.curComponent;
		},
	},
	methods: {
		openImgDialog() {
			this.$refs.imgListRef.openImgDialog();
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/.el-upload {
	width: 95%;
	.el-upload-dragger {
		width: 100%;
		height: 140px;
		.el-icon-upload {
			margin: 16px 0;
		}
		.el-upload__text {
			font-size: 12px;
		}
	}
}
/deep/.el-upload__tip {
	margin-top: -5px;
}
</style>
