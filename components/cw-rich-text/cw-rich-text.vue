<template>
	<view class="cw-rich-text"><rich-text :nodes="nodes" /></view>
</template>

<script>
export default {
	props: {
		detail: {
			type: Array
		}
	},
	data() {
		return {
			nodes: []
		};
	},
	watch: {
		detail: {
			deep: true,
			immediate:true,
			handler(value) {
				const traveNodes = nodes => {
					if (!Array.isArray(nodes)) {
						return [];
					}

					return nodes.map(item => transferNode(item));
				};

				const transferNode = node => {
					if (typeof node === 'string') {
						if (node.indexOf('<br/>') > -1 || node.indexOf('<script>') > -1) {
							return {
								type: 'text',
								text: ''
							};
						}

						return {
							type: 'text',
							text: node
						};
					}

					const { tag, children, attrs } = node;

					switch (tag) {
						case 'script':
							return '';

						case 'font':
							const styles = [];

							if (Array.isArray(attrs)) {
								attrs.forEach(({ name, value }) => {
									styles.push(`${name}:${value}`);
								});
							}

							return {
								type: 'node',
								name: 'span',
								attrs: {
									style: styles.join(';')
								},
								children: traveNodes(children)
							};

						default:
							const attrsMap = {};

							if (Array.isArray(attrs)) {
								attrs.forEach(({ name, value }) => {
									if (['class', 'style', 'name', 'span', 'width', 'src', 'height', 'colspan', 'rowspan', 'type'].includes(name)) {
										attrsMap[name] = value;
									}
								});
							}

							if (attrsMap.class) {
								attrsMap.class += ` ${tag}`;
							} else {
								attrsMap.class = tag;
							}

							return {
								type: 'node',
								name: tag,
								attrs: attrsMap,
								children: traveNodes(children)
							};
					}
				};

				this.nodes = traveNodes(value);
			}
		}
	}
};
</script>
<style scoped>
.cw-rich-text {
	font-size: 14px;
	color: #323333;
	line-height: 1.5;
}

.cw-rich-text .table {
	width: 100%;
	border-spacing: 0;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	border-collapse: collapse;
	text-align: left;
}

.cw-rich-text .table .td,
.cw-rich-text .table .th {
	border: 1px solid #e8eaec !important;
}

.cw-rich-text .table .td:first-child::after,
.cw-rich-text .table .th:first-child::after {
	content: '';
	display: inline-block;
	vertical-align: top;
	min-height: 28px;
}

.cw-rich-text .th {
	background-color: #f5f5f5 !important;
}

/* blockquote 样式 */
.cw-rich-text .blockquote {
	display: block;
	border-left: 8px solid #d0e5f2;
	padding: 5px 10px;
	margin: 10px 0;
	line-height: 1.5;
	font-size: 100%;
	background-color: #f2f2f2 !important;
}

.cw-rich-text .hr {
	border-top: 1px solid #e8eaec !important;
	margin: 20px 0;
}

/* ul ol 样式 */
.cw-rich-text .ul,
.cw-rich-text .ol {
	margin: 10px 0 10px 20px;
	padding: 0;
}

.cw-rich-text .img {
	max-width: 100%;
}
</style>
