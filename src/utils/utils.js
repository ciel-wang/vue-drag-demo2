import Vue from 'vue';
export function deepCopy(target) {
	if (typeof target == 'object') {
		const result = Array.isArray(target) ? [] : {};
		for (const key in target) {
			if (typeof target[key] == 'object') {
				result[key] = deepCopy(target[key]);
			} else {
				result[key] = target[key];
			}
		}
		return result;
	}
	return target;
}
// 互换位置
export function swap(arr, i, j) {
	const temp = arr[i];
	Vue.set(arr, i, arr[j]);
	Vue.set(arr, j, temp);
}

function concat(prop, count, type, extend = [], defaults) {
	let list = [];
	for (let i = 1; i <= count; i++) {
		list.push({
			label: prop + i,
			value: `/assets/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`,
		});
	}
	return list;
}
//加载图片素材库
export const imgOption = [concat('bg', 18, 'png'), concat('border', 16, 'png'), concat('img', 1, 'png')];
