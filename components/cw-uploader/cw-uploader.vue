<template>
	<view class="cw-uploader" :customStyle="customStyle">
		<view class="cw-uploader__wrapper">
			<!-- 预览样式 -->
			<view v-if="previewImage" class="cw-uploader__preview" :data-index="index" @tap="onClickPreview" v-for="(item, index) in lists" :key="index">
				<view v-if="item.isVideo">{{item}}</view>
				<image
					v-if="item.isImage"
					:mode="imageFit"
					:src="item.thumb || item.url"
					:alt="item.name || '图片' + index"
					class="cw-uploader__preview-image"
					:style="sizeStyle"
					:data-index="index"
					@tap="onPreviewImage"
				/>
				<video
					v-else-if="item.isVideo"
					:src="item.url.data ? item.url.data.url: ''"
					:title="item.name || '视频' + index"
					:poster="item.thumb"
					:autoplay="item.autoplay"
					class="cw-uploader__preview-image"
					:style="sizeStyle"
					:data-index="index"
					@tap="onPreviewVideo"
				></video>

				<view v-else class="cw-uploader__file" :style="sizeStyle" :data-index="index" @tap="onPreviewFile">
					<cw-icon name="description" class="cw-uploader__file-icon" />
					<view class="cw-uploader__file-name cw-ellipsis">{{ item.name || item.url }}</view>
				</view>

				<view v-if="item.status === 'uploading' || item.status === 'failed'" class="cw-uploader__mask">
					<cw-icon v-if="item.status === 'failed'" name="close" class="cw-uploader__mask-icon" />
					<cw-loading v-else custom-class="cw-uploader__loading" />
					<text v-if="item.message" class="cw-uploader__mask-message">{{ item.message }}</text>
				</view>

				<view v-if="deletable && item.deletable" :data-index="index" class="cw-uploader__preview-delete" @tap.stop.prevent="deleteItem">
					<cw-icon name="cross" class="cw-uploader__preview-delete-icon" />
				</view>
			</view>
			<!-- 上传样式 -->
			<block v-if="isInCount">
				<view v-if="($slots.default || $slots.$default) && showUpload"
				 class="cw-uploader__slot" @tap="startUpload"><slot /></view>

				<!-- 默认上传样式 -->
				<view v-if="showUpload" :class="'cw-uploader__upload ' + (disabled ? 'cw-uploader__upload--disabled' : '')" :style="sizeStyle" @tap="startUpload">
					<cw-icon :name="uploadIcon" class="cw-uploader__upload-icon" :customStyle="'color:'+uploadIconColor+';'" />
					<text v-if="uploadText" class="cw-uploader__upload-text">{{ uploadText }}</text>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
import { isImageFile, chooseFile, isVideoFile } from './utils.js';
import { chooseImageProps, chooseVideoProps } from './shared.js';
import { isBoolean, isPromise } from '../../libs/function/validator.js';
import computed from './index.js';
	/**
	 * uploader 上传
	 * @description 该组件用于上传图片场景
	 * @tutorial https://cw.yuencode.cn/cwui-docs
	 * @property {String}			accept				接受的文件类型, 可选值为all media image file video （默认 'image' ）
	 * @property {String | Array}	capture				图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头（默认 ['album', 'camera'] ）
	 * @property {Boolean}			compressed			当accept为video时生效，是否压缩视频，默认为true（默认 true ）
	 * @property {String}			camera				当accept为video时生效，可选值为back或front（默认 'back' ）
	 * @property {Number}			maxDuration			当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
	 * @property {String}			uploadIcon			上传区域的图标，只能内置图标（默认 'photograph' ）
	 * @property {String}			uploadIconColor		上传区域的图标的字体颜色，只能内置图标（默认 #dcdee0 ）
	 * @property {Boolean}			useBeforeRead		是否开启文件读取前事件（默认 false ）
	 * @property {Boolean}			previewFullImage	是否显示组件自带的图片预览功能（默认 true ）
	 * @property {String | Number}	maxCount			最大上传数量（默认 100 ）
	 * @property {Boolean}			disabled			是否启用（默认 false ）
	 * @property {String}			name				标识符，可以在回调函数的第二项参数中获取
	 * @property {Array}			sizeType			所选的图片的尺寸, 可选值为original compressed（默认 ['original', 'compressed'] ）
	 * @property {Boolean}			multiple			是否开启图片多选，部分安卓机型不支持 （默认 false ）
	 * @property {Boolean}			deletable			是否展示删除按钮（默认 true ）
	 * @property {String | Number}	maxSize				文件大小限制，单位为byte （默认 Number.MAX_VALUE ）
	 * @property {Array}			fileList			显示已上传的文件列表
	 * @property {String}			uploadText			上传区域的提示文字
	 * @property {Object}			customStyle			组件的样式，对象形式
	 * @event {Function} after-read		读取后的处理函数
	 * @event {Function} before-read		读取前的处理函数
	 * @event {Function} oversize		文件超出大小限制
	 * @event {Function} click-preview	点击预览图片
	 * @event {Function} delete 		删除图片
	 * @example <cw-uploader :fileList="fileList" ></cw-uploader>
	 */
export default {
	mixins: [chooseImageProps, chooseVideoProps, computed],
	props: {
		accept: {
			type: String,
			default: 'image'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		},
		uploadText: {
			type: String,
			default: ''
		},
		uploadIconColor:{
			type: String,
			default: '#dcdee0'
		},
		useBeforeRead: {
			type: Boolean,
			default: false
		},
		afterRead: null,
		beforeRead: null,
		previewSize: {
			type: [String, Number],
			default: 80
		},
		name: {
			type: String,
			default: ''
		},
		fileList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		maxSize: {
			type: Number,
			default: Number.MAX_default
		},
		maxCount: {
			type: Number,
			default: 100
		},
		deletable: {
			type: Boolean,
			default: true
		},
		showUpload: {
			type: Boolean,
			default: true
		},
		previewImage: {
			type: Boolean,
			default: true
		},
		previewFullImage: {
			type: Boolean,
			default: true
		},
		imageFit: {
			type: String,
			default: 'scaleToFill'
		},
		uploadIcon: {
			type: String,
			default: 'photograph'
		},
		customStyle: {
			type: Object,
			default: ()=>{
				return {}
			}
		}
	},
	data() {
		return {
			lists: [],
			isInCount: true
		};
	},
	methods: {
		formatFileList() {
			const { fileList = [], maxCount } = this;
			const lists = fileList.map(item =>
				Object.assign(Object.assign({}, item), {
					isImage: isImageFile(item),
					isVideo: isVideoFile(item),
					deletable: isBoolean(item.deletable) ? item.deletable : true
				})
			);
			this.lists = lists;
			this.isInCount = lists.length < maxCount;
		},

		getDetail(index) {
			return {
				name: this.name,
				index: index == null ? this.fileList.length : index
			};
		},

		startUpload() {
			if (disabled) {
				return;
			}
			const { lists, disabled, accept, multiple, capture, compressed, maxDuration, sizeType, camera, maxCount } = this;
			chooseFile({ lists, disabled, accept, multiple, capture, compressed, maxDuration, sizeType, camera, maxCount: maxCount - lists.length })
				.then(res => {
					this.onBeforeRead(multiple ? res : res[0]);
				})
				.catch(error => {
					console.error(error);
					this.$emit('error', error);
				});
		},

		onBeforeRead(file) {
			const { beforeRead, useBeforeRead } = this;
			let res = true;

			if (typeof beforeRead === 'function') {
				res = beforeRead(file, this.getDetail());
			}

			if (useBeforeRead) {
				res = new Promise((resolve, reject) => {
					this.$emit(
						'before-read',
						Object.assign(
							Object.assign(
								{
									file
								},
								this.getDetail()
							),
							{
								callback: ok => {
									if (ok) {
										resolve();
									} else {
										reject();
									}
								}
							}
						)
					);
				});
			}

			if (!res) {
				return;
			}

			if (isPromise(res)) {
				res.then(data => this.onAfterRead(data || file));
			} else {
				this.onAfterRead(file);
			}
		},

		onAfterRead(file) {
			const { maxSize, afterRead } = this;
			const oversize = Array.isArray(file) ? file.some(item => item.size > maxSize) : file.size > maxSize;
			if (oversize) {
				this.$emit(
					'oversize',
					Object.assign(
						{
							file
						},
						this.getDetail()
					)
				);
				return;
			}

			if (typeof afterRead === 'function') {
				afterRead(file, this.getDetail());
			}
			this.$emit('after-read', Object.assign({ file }, this.getDetail()));
		},

		deleteItem(event) {
			const { index } = event.currentTarget.dataset;
			this.$emit(
				'delete',
				Object.assign(Object.assign({}, this.getDetail(index)), {
					file: this.fileList[index]
				})
			);
		},

		onPreviewImage(event) {
			if (!this.previewFullImage) {
				return;
			}

			const { index } = event.currentTarget.dataset;
			const { lists } = this;
			const item = lists[index];
			uni.previewImage({
				urls: lists.filter(item => isImageFile(item)).map(item => item.url),
				current: item.url,

				fail() {
					uni.showToast({
						title: '预览图片失败',
						icon: 'none'
					});
				}
			});
		},

		onPreviewVideo(event) {
			if (!this.previewFullImage) {
				return;
			}

			const { index } = event.currentTarget.dataset;
			const { lists } = this;
			uni.previewMedia({
				sources: lists
					.filter(item => isVideoFile(item))
					.map(item =>
						Object.assign(Object.assign({}, item), {
							type: 'video'
						})
					),
				current: index,

				fail() {
					uni.showToast({
						title: '预览视频失败',
						icon: 'none'
					});
				}
			});
		},

		onPreviewFile(event) {
			const { index } = event.currentTarget.dataset;
			uni.openDocument({
				filePath: this.lists[index].url,
				showMenu: true
			});
		},

		onClickPreview(event) {
			const { index } = event.currentTarget.dataset;
			const item = this.lists[index];
			this.$emit('click-preview', Object.assign(Object.assign({}, item), this.getDetail(index)));
		}
	},
	watch: {
		fileList: {
			handler() {
				this.formatFileList();
			},
			immediate: true
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../../libs/css/common.scss';

.cw-uploader {
	position: relative;
	display: inline-block;
}

.cw-uploader__wrapper {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
}

.cw-uploader__slot:empty {
	display: none;
}

.cw-uploader__slot:not(:empty) + .cw-uploader__upload {
	display: none !important;
}

.cw-uploader__upload {
	position: relative;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	box-sizing: border-box;
	width: 80px;
	height: 80px;
	margin: 0 8px 8px 0;
	background-color: #f7f8fa;
}

.cw-uploader__upload:active {
	background-color: #f2f3f5;
}

.cw-uploader__upload-icon {
	// color: #dcdee0;
	font-size: 24px;
}

.cw-uploader__upload-text {
	margin-top: 8px;
	color: #969799;
	font-size: 12px;
}

.cw-uploader__upload--disabled {
	opacity: 0.5;
}

.cw-uploader__preview {
	position: relative;
	cursor: pointer;
	margin: 0 8px 8px 0;
}

.cw-uploader__preview-image {
	display: block;
	overflow: hidden;
	width: 80px;
	height: 80px;
}

.cw-uploader__preview-delete {
	padding: 0 0 8px 8px;
}

.cw-uploader__preview-delete,
.cw-uploader__preview-delete:after {
	position: absolute;
	top: 0;
	right: 0;
	width: 14px;
	height: 14px;
	line-height: 14px;
}

.cw-uploader__preview-delete:after {
	content: '';
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 0 0 0 12px;
}

.cw-uploader__preview-delete-icon {
	position: absolute;
	top: -2px;
	right: -2px;
	z-index: 1;
	transform: scale(0.5);
	font-size: 16px;
	color: #fff;
}

.cw-uploader__file {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	width: 80px;
	height: 80px;
	background-color: #f7f8fa;
}

.cw-uploader__file-icon {
	color: #646566;
	font-size: 20px;
}

.cw-uploader__file-name {
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	margin-top: 8px;
	padding: 0 4px;
	color: #646566;
	font-size: 12px;
}

.cw-uploader__mask {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
	-webkit-align-items: center;
	align-items: center;
	-webkit-justify-content: center;
	justify-content: center;
	color: #fff;
	background-color: rgba(50, 50, 51, 0.88);
}

.cw-uploader__mask-icon {
	font-size: 22px;
}

.cw-uploader__mask-message {
	margin-top: 6px;
	padding: 0 4px;
	font-size: 12px;
	line-height: 14px;
}

.cw-uploader__loading {
	width: 22px;
	height: 22px;
	color: #fff !important;
}
</style>
