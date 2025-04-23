<template>
  <div class="menu-wrapper">
    <div class="item" v-for="(item, index) in menuList" :key="index">
      {{item.name}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from '@/assets/utils'

export default {
  name: 'menu-view',
  data() {
    return {
      menuList: [],
      token: null,
    }
  },
  methods: {
    getMenu() {
      let data = new URLSearchParams()
      let today = new Date()
      let nextDate = new Date(today)
      nextDate.setDate(today.getDate() + 7)
      data.append('token', this.token)
      data.append('offset', 0)
      data.append('page', 10)
      data.append('startdate', formatDate(today, 'yyyy-MM-dd'))
      data.append('enddate', formatDate(nextDate, 'yyyy-MM-dd'))
      data.append('window_id', -1)
      data.append('address_id', 84)
      axios({
        method: 'post',
        url: '/api2/h5/index.php/home/getCookbooks_v2',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data
      }).then(res => {
        // console.log(res.data.data.cookbooks[0].lunch.content)
        let data = res.data || {}
        if (!res.data.code) {
          this.$message({
            type: 'error',
            message: data.msg,
          })
        }
        let cookbooks = data.data?.cookbooks || []
        if (cookbooks.length > 0) {
          this.menuList = cookbooks[0].lunch?.content
        }
      })
    }
  },
  mounted() {
    this.getMenu()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.token) {
        if (to.params.token === 'xuyq') {
          vm.token = '9ed9d05c3ed1208bad788f7b2bb05330'
        } else {
          vm.token = to.params.token
        }
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.menu-wrapper
  margin: 20px
  border-top: 1px solid #eee
  border-left: 1px solid #eee
  border-right: 1px solid #eee
  .item
    padding: 10px
    border-bottom: 1px solid #eee
</style>
