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
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addUserFormRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 15,
          message: '长度在 6 到 15 个字符',
          trigger: 'blur'
        }
        ],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }]
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
      const {
        users,
        total
      } = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async handleStateChange (state, user) {
      const {
        id: userId
      } = user
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
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
    },
    // 用户删除
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${user.id}`)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑用户
    async handleEditUser () {
      console.log(this.editUserForm)
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
      }
      this.dialogEditFormVisible = false
      this.loadUsersByPage(this.currentPage)
    },

    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      this.editUserForm = res.data.data
    }
  }
}
