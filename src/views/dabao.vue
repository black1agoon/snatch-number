<template>
  <div class="wrapper">
    <div class="message-wrap">
      <div class="msg"  v-for="(msg, index) in message" :key="index">
        <div class="index">{{msg.index}}</div>
        <div class="nowTime">当前时间：{{msg.time}}</div>
        <div class="message">{{msg.msg}}</div>
      </div>
    </div>
    <div class="button-wrap">
      <el-button type="primary" @click="startQH">开始</el-button>
      <el-button type="danger" @click="end">停止</el-button>
      <el-button @click="clear">清空消息</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  data() {
    return {
      message: [],
      timer: null
    }
  },
  methods: {
    start(index) {
      let data = new URLSearchParams()
      data.append('token', '9ed9d05c3ed1208bad788f7b2bb05330')
      data.append('address_id', 84)
      data.append('take_type', 1)
      data.append('pack_fee', 0)
      data.append('type', 5)
      data.append('note', '')
      data.append('take_address', '')
      data.append('pick_up', '')
      axios({
        method: 'post',
        url: '/api2/h5/index.php/order/save',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'SERVERID=446e75a085d03284d5bb6779d2d6c71b|1745302197|1745302194'
        },
        data
      }).then(res => {
        let date = new Date()
        this.message.push({
          msg: res.data.msg,
          index,
          time: date.getTime()
        })
      })
    },
    clear() {
      this.message = []
    },
    startQH() {
      let index = 0
      this.timer = setInterval(() => {
        this.start(index)
        index++
      }, 300)
    },
    end() {
      clearInterval(this.timer)
    }
  },
}
</script>

<style lang="stylus" scoped>
.wrapper
  display: flex
  flex-direction: column
  width: 100%
  height: 100vh
  overflow: hidden
  padding: 10px
  box-sizing: border-box
  .message-wrap
    flex: 1
    margin-top: 5px
    padding: 10px
    height: 450px
    overflow-y: auto
    border: 1px solid #e7e7e7
    .msg
      display: flex
      align-items: center
.button-wrap
  margin: 10px
  display: flex
  justify-content: space-between
  .el-button
    width: 150px
</style>
