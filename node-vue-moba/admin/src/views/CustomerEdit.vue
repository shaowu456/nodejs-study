<template>
  <div class="about">
    <h1 style="margin:0">{{id ? '编辑' : '新建'}}客户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="bases" type="border-card">
        <el-tab-pane name="bases" label="基础信息">
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="model.phone"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :headers="getAuthHeader()"
              :show-file-list="false"
              :on-success="afterUpload"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="model.sex">
              <el-option
                v-for="item of categories"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="model.birthday"
              value-format="yyyy-MM-dd"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input :disabled="true" v-model="model.age"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="model.address"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="skills" label="详情">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeader()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="创建日期">
                <el-date-picker
                  v-model="item.createDate"
                  value-format="yyyy-MM-dd"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" style="margin-top:2rem" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { jsGetAgeByBirth } from '@/lib/utils'
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      items: [],
      model: {
        name: "",
        avatar: "",
        skills: []
      },
      createDate: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  watch: {
    'model.birthday'(val) {
      debugger
      console.log(val)
      this.model.age = jsGetAgeByBirth(val)
    }
  },
  methods: {
    async save() {
      // eslint-disable-next-line no-unused-vars
      let res;
      let params = Object.assign({},this.model)
      if (this.id) {
        res = await this.$http.put(`rest/customers/${this.id}`, params);
      } else {
        res = await this.$http.post("rest/customers", params);
      }
      this.$router.push("/customers/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/customers/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    afterUpload(res) {
      // console.log(res)
      // this.model.avater = res.url
      this.$set(this.model, "avatar", res.url); //显示赋值
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.id && this.fetch();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  line-height: 278px;
  text-align: center;
}
.avatar {
  width: 278px;
  height: 278px;
  display: block;
}
</style>