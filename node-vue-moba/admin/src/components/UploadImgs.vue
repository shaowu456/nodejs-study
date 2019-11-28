<template>
  <div class="my_upload">
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
      type: Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
      fileList: this.PfileList,
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
      debugger
      console.log(fileList)
      this.uploadComplete = true;
      this.fileList.push({
        name:res.originalname,
        url:res.url
      })
      console.log(this.fileList)
    },
    // 上传图片出错
    // eslint-disable-next-line no-unused-vars
    uploadError(err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 移除图片
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      let index = this.fileList.findIndex((item) => {
        return item.name === file.name
      })
      this.fileList.splice(index,1)
      console.log(index)
    }
  }
}
</script>
<style>
.my_upload .el-upload-list--picture-card .el-upload-list__item{
  width: 108px !important;
  height: 108px !important;
}
.my_upload  .el-upload--picture-card{
  width: 108px !important;
  height: 108px !important; 
  line-height: 120px !important;
}
</style>
