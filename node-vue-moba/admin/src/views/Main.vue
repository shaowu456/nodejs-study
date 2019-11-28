<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group> -->
          <el-menu-item-group>
            <template slot="title">客户</template>
            <el-menu-item index="/customers/create">新建客户</el-menu-item>
            <el-menu-item index="/customers/list">客户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">账号</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px;height:40px">
        <span>{{username}}</span>
        <el-dropdown trigger="click">
          <i class="el-icon-arrow-down el-icon--right" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native.prevent="leave">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      
      <el-main id="container_box" class="container_box">
         <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 40px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        username:'',
      }
    },
    computed: {
    ...mapGetters(['logininfo'])
    },
    mounted(){
      this.username = this.logininfo._doc.address
    },
    methods: {
      leave(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  };
</script>
<style>
.container_box {
  display: block;
  overflow: hidden;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-all;
}
</style>