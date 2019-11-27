<template>
  <div>
    <el-upload
      multiple
      :action="uploadUrl"
      :headers="getAuthHeader()"
      list-type="picture-card"
      :before-upload="beforeUploadPicture"
      :on-preview="handlePictureCardPreview"
      :on-progress="uploadProgress"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :file-list="fileList"
      :show-file-list="true"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'upload',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    total: {
      type: [String, Number],
      default: 60
    },
    PfileList: {
      type: Array
    }
  },
  data() {
    return {
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadComplete: true // 图片上传完成状态
    }
  },
  watch:{
    PfileList(val){
      this.fileList = val
    },
    fileList(val) {
      this.$emit('update:PfileList', val)
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片前调用方法
    beforeUploadPicture(file) {
      if(file.size > 2*1024*1024){
        this.$message.error("上传图片不能大于2M");
        return false;
      }
    },
    // 上传图片时调用
    // eslint-disable-next-line no-unused-vars
    uploadProgress(event,file, fileList){
      this.uploadComplete = false;
    },
    // 上传图片成功
    uploadSuccess(res, file, fileList) {
      console.log(fileList)
      this.uploadComplete = true;
      this.fileChange(fileList);
    },
    // 上传图片出错
    // eslint-disable-next-line no-unused-vars
    uploadError(err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 移除图片
    handleRemove(file, fileList) {
      this.fileChange(fileList);
    },
    // 设置fileList值
    fileChange(fileList) {
      this.fileList = []
      if(fileList.length > 0){
        for(let i=0; i<fileList.length; i++){
          if(fileList[i].status === 'success'){
            this.fileList.push({
              name:fileList[i].name,
              url:fileList[i].url
            })
          }
        }
      }
    },
  }
}
</script>
