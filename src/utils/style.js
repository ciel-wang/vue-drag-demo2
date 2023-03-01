let unitArr = ['width', 'height', 'fontSize', 'top', 'left', 'borderRadius', 'borderWidth', 'letterSpacing', 'lineHeight'];
// 为样式添加单位
export function setStyleUnit(style, filter = []) {
	const result = {};
	Object.keys(style).forEach((key) => {
		if (!filter.includes(key)) {
			if (key != 'rotate') {
				if (style[key] !== '') {
					result[key] = style[key];
					if (unitArr.includes(key)) result[key] += 'px';
				}
			} else {
				result.transform = key + '(' + style[key] + 'deg)';
			}
		}
	});
	return result;
}
export const styleData = [
	{ key: 'backgroundColor', label: '背景色' },
	{ key: 'borderWidth', label: '边框宽度' },
	{ key: 'borderStyle', label: '边框风格' },
	{ key: 'borderColor', label: '边框颜色' },
	{ key: 'borderRadius', label: '圆角' },
	{ key: 'color', label: '字体颜色' },
	{ key: 'fontSize', label: '字体大小' },
	{ key: 'fontWeight', label: '字体粗细' },
	{ key: 'lineHeight', label: '行高' },
	{ key: 'letterSpacing', label: '字间距' },
	{ key: 'textAlign', label: '左右对齐' },
	{ key: 'verticalAlign', label: '上下对齐' },
];
export const textAlignOptions = [
	{ label: '左对齐', value: 'left' },
	{ label: '居中', value: 'center' },
	{ label: '右对齐', value: 'right' },
];

export const borderStyleOptions = [
	{ label: '实线', value: 'solid' },
	{ label: '虚线', value: 'dashed' },
];

export const verticalAlignOptions = [
	{ label: '上对齐', value: 'top' },
	{ label: '居中对齐', value: 'middle' },
	{ label: '下对齐', value: 'bottom' },
];
export const selectKey = ['textAlign', 'borderStyle', 'verticalAlign'];
export const optionMap = {
	textAlign: textAlignOptions,
	borderStyle: borderStyleOptions,
	verticalAlign: verticalAlignOptions,
};
