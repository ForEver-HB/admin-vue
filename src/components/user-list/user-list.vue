<template>
  <div class='user-list-wrap'>
    <el-row>
      <el-col :span='24'>
        <el-breadcrumb separator-class='el-icon-arrow-right' class='user-list-breadcrumb'>
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class='user-list-search'>
      <el-col :span='10'>
        <el-input placeholder='请输入内容' v-model='searchText' class='input-with-select'>
          <el-button slot='append' icon='el-icon-search' @click='handleSearch'></el-button>
        </el-input>
      </el-col>
      <el-col :span='2'>
        <el-button type='success' plain @click='handleShowAddUser'>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data='tableData'
      style='width: 100%'>
      <el-table-column
        prop='username'
        label='姓名'
        width='180'>
      </el-table-column>
      <el-table-column
        prop='email'
        label='邮箱'
        width='180'>
      </el-table-column>
      <el-table-column
        prop='mobile'
        width='180'
        label='电话'>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <el-switch
            v-model='scope.row.mg_state'
            active-color="#13ce66"
            @change = '(val) => {handleStateChange(val,scope.row)}'
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" type="primary" icon="el-icon-delete"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
      :current-page='currentPage'
      :page-sizes='[1,2,3,4]'
      class='bottom_Pagination'
      layout='total, sizes, prev, pager, next, jumper'
      :total='totalSize'>
    </el-pagination>

    <!-- 用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="userForm" :rules='addUserFormRules' ref="addUserForm" class="demo-ruleForm">
        <el-form-item label="用户名" label-width="120px"  prop="username">
          <el-input v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="userForm.password" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='handleAddUser'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      totalSize: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 1,
      userForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      dialogFormVisible: false,
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 5, message: '长度在 6 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      // console.log(`当前页: ${val}`)
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    handleSearch () {
      this.loadUsersByPage(1)
    },
    // 根据页码加载用户列表数据
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: pageSize,
          query: this.searchText
        }
      })
      const { users, total } = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async handleStateChange (state, user) {
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'}设置成功`
        })
      }
    },
    handleShowAddUser () {
      this.dialogFormVisible = true
    },
    async handleAddUser () {
      this.$refs['addUserForm'].validate(async valid => {
        // console.log(valid)
        if (!valid) {
          return false
        }
        const res = await this.$http.post(`/users`, this.userForm)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          this.dialogFormVisible = false
          this.loadUsersByPage(this.currentPage)
        }
      })
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}
.user-list-search {
  margin: 10px 0;
}
.bottom_Pagination {
  margin-top: 10px;
}
</style>
