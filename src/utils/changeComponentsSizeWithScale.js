import store from '@/store';
import { divide, multiply } from 'mathjs';

// 根据画布比例修改组件样式比例
const needToChangeAttrs2 = ['width', 'height', 'fontSize'];
export function changeComponentSizeWithScale(component) {
	Object.keys(component.style).forEach((key) => {
		if (needToChangeAttrs2.includes(key)) {
			if (key === 'fontSize' && component.style[key] === '') return;

			component.style[key] = format(component.style[key], store.state.canvasStyleData.scale);
		}
	});
}

function format(value, scale) {
	return multiply(value, divide(parseFloat(scale), 100));
}
