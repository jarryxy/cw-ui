<template>
<view class="cw-employee">
    <view class="avatar">
        <image class="avatar-url" :src="info.avatar" lazy-load mode="scaleToFill"/>
    </view>
    <view class="postinfo">
        <view class="name">
            {{info.realName}}
        </view>
        <view class="department">
            {{info.department ? info.department : '-'}}
        </view>
        <view class="job">
            {{info.job ? info.job : '-'}}
        </view>
    </view>
</view>

</template>

<script >
export default {
	props: {
	  info: Object
	}
}
</script>
<style lang="scss" scoped>
.cw-employee {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.cw-employee .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50px;
    margin-right: 12px;
    overflow: hidden;
}

.cw-employee .avatar .avatar-url {
    width: 100%;
    height: 100%;
}

.cw-employee .postinfo {
    text-align: left;
}

.cw-employee .postinfo .name {
    font-size: 14px;
    color: #333;
    line-height: 20px;
}

.cw-employee .postinfo .department,
.cw-employee .postinfo .job {
    font-size: 12px;
    color: #666;
    line-height: 16px;
}

</style>