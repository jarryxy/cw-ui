// props for choose image
export const chooseImageProps = {
	props: {
		sizeType: {
			type: Array,
			default: ()=>{
				return ['original', 'compressed']
			}
		},
		capture: {
			type: Array,
			default:()=>{
				return ['album', 'camera']
			}
		}
	}
}; // props for choose video

export const chooseVideoProps = {
	props: {
		capture: {
			type: Array,
			default:()=>{
				return ['album', 'camera']
			}
		},
		compressed: {
			type: Boolean,
			default: true
		},
		maxDuration: {
			type: Number,
			default: 60
		},
		camera: {
			type: String,
			default: 'back'
		}
	}
};
