<template>
  <div class="wrapper">
    <div class="item-wrap">
      <div class="label">选择课程：</div>
      <el-select v-model="instanceId"
                 placeholder="请选择课程"
                 :clearable="true"
                 @change="selectChange">
        <el-option
            v-for="item in courseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="item-wrap">
      <div class="label">抢课时间：</div>
      <el-date-picker
          :disabled="true"
          value-format="timestamp"
          v-model="targetTime"
          type="datetime"
          placeholder="选择课程后自动获取">
      </el-date-picker>
    </div>
    <div class="item-wrap">
      <div class="label">座位号：</div>
      <el-input type="number" @change="changeValue" v-model="seatNumber"></el-input>
      <div class="label" style="text-align: center">谁的卡：</div>
      <el-select v-model="cardContractId" @change="changeValue">
        <el-option
            v-for="item in cardContractOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="message-wrap">
      <div class="nowTime">当前时间：{{nowTime}}</div>
      <div class="message" v-for="(msg, index) in message" :key="index">{{msg}}</div>
    </div>
    <div class="button-wrap">
      <el-button type="primary" @click="startQH">开始</el-button>
      <el-button @click="clear">清空消息</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate, getNowTime } from '@/assets/utils'

// const WXAPPCHATID = 'eyJuYW1lIjoi5a2ZIiwicGhvbmUiOiIxNTk2ODMzMjcyMCIsImFjY291bnRJZCI6MjQwNTMzNywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc4ODQ2NDI5NTkxfQ==./1/zHBoKV2Uk84SYuE00fy0hKzszic2forWHPyD49aE='
// const WXAPPCHATID = 'eyJuYW1lIjoi6IuP5Li96ImzIiwicGhvbmUiOiIxNTMwNTgzODU4OCIsImFjY291bnRJZCI6NTYwMTc3NywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc5NjI0MjAyODQ0fQ==.Ki6ru23WS60ViDLkCjoWVU4VNs/vRC90qPOnCzqwqyY='
const WXAPPCHATID = {
  '9404475': 'eyJuYW1lIjoi5a2ZIiwicGhvbmUiOiIxNTk2ODMzMjcyMCIsImFjY291bnRJZCI6MjQwNTMzNywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc4ODQ2NDI5NTkxfQ==./1/zHBoKV2Uk84SYuE00fy0hKzszic2forWHPyD49aE=',
  '5789034': 'eyJuYW1lIjoi6JSh5Li55YekIiwicGhvbmUiOiIxODc2NzMzOTI3NyIsImFjY291bnRJZCI6NTU5OTcxMCwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc5ODgxMTYzNzM1fQ==.CsVE0bEHIZ2p1uVkV7mIGWELkmuBiXkZQ/JQMftkgT8=',
  '5336840': 'eyJuYW1lIjoi6IuP5Li96ImzIiwicGhvbmUiOiIxNTMwNTgzODU4OCIsImFjY291bnRJZCI6NTYwMTc3NywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc5NjI0MjAyODQ0fQ==.Ki6ru23WS60ViDLkCjoWVU4VNs/vRC90qPOnCzqwqyY='
}
export default {
  name: 'HomeView',
  computed: {
  },
  data() {
    // 情迷 9404475
    // 蔡丹凤 5789034
    // 苏丽艳 5336840
    return {
      message: [],
      targetTime: null,
      successFlag: false,
      timer: null,
      timer2: null,
      instanceId: null,
      courseOptions: [],
      seatNumber: 6,
      cardContractId: '9404475',
      nowTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      cardContractOptions: [
        { label: '情迷', value: '9404475' },
        { label: '蔡丹凤', value: '5789034' },
        { label: '苏丽艳', value: '5336840' },
      ]
    }
  },
  methods: {
    getSeat() {
      axios({
        method: 'post',
        url: '/api/wx/groupCourse/1432/reserve/' + this.instanceId,
        headers: {
          WXAPPCHATID: WXAPPCHATID[this.cardContractId],
        },
        data: {
          cardContractId: this.cardContractId,
          cardType: 3,
          couponInstanceId: null,
          seatNums: [this.seatNumber],
          reservedNum: 1
        }
      }).then(res => {
        if (res.data.data === -1) {
          this.successFlag = true
          this.message.push('抢号成功 ' + getNowTime())
          clearInterval(this.timer)
        } else {
          this.message.push(res.data.message + getNowTime())
          // if (res.data.status === 1) {
          //   clearInterval(this.timer)
          // }
          if (res.data.message.includes('对不起') || res.data.message.includes('已被其他人')) {
            clearInterval(this.timer)
          }
        }
      })
    },
    start() {
      this.getSeat()
    },
    polling() {
      let nowTime = new Date().getTime()
      if (nowTime > (this.targetTime - 1000 * 5)) {
      // if (nowTime > (this.targetTime - 1000 * 5) && nowTime < (this.targetTime + 1000 * 15)) {
        this.start()
        this.timer = setInterval(() => {
          if (!this.successFlag) {
            this.start()
          }
        }, 500)
        clearInterval(this.timer2)
      } else {
        clearInterval(this.timer)
        this.message.push('还没到抢号时间 '+ getNowTime())
      }
    },
    clear() {
      this.message = []
    },
    startQH() {
      if (!this.instanceId) {
        alert('请先选择课程，再点击开始')
        return
      }
      if (this.timer2) {
        return
      }

      window.localStorage.setItem('cardContractId', this.cardContractId)
      window.localStorage.setItem('seatNumber', this.seatNumber)

      this.timer2 = setInterval(() => {
        this.polling()
      }, 1000)
    },
    getCourseList() {
      axios({
        method: 'get',
        url: '/api/wxApp/login/1432/groupCourse/' + formatDate(new Date(), 'yyyyMMdd'),
        headers: {
          WXAPPCHATID: WXAPPCHATID[this.cardContractId],
        },
      }).then(res => {
        this.courseOptions = (res.data?.data || []).map(course => ({
          label: course.courseName + ` (${course.trainerName})`,
          value: course.instanceId,
          startTime: course.startTime,
          minutesBeforeStart: course.canReserveMinutesBeforeStart
        }))
      })
    },
    selectChange(val) {
      let index = this.courseOptions.findIndex(course => course.value === val)
      let option = this.courseOptions[index]
      let courseTime = formatDate(new Date(), 'yyyy-MM-dd ') + option.startTime + ':00'
      this.targetTime = new Date(courseTime).getTime() - option.minutesBeforeStart * 60 * 1000
    },
    changeValue() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      this.clear()
    }
  },
  mounted() {
    this.cardContractId = window.localStorage.getItem('cardContractId') || this.cardContractId
    this.seatNumber = window.localStorage.getItem('seatNumber') || this.seatNumber

    this.getCourseList()
    setInterval(() => {
      this.nowTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }, 1000)
  }
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
    margin-top: 20px
    padding: 10px
    height: 450px
    overflow-y: auto
    border: 1px solid #e7e7e7

.item-wrap
  display: flex
  align-items: center
  margin-top: 10px
  .label
    flex: 0 0 60px
  .el-date-picker, .el-input, .el-select
    flex: 1
.button-wrap
  margin: 10px
  display: flex
  justify-content: space-between
  .el-button
    width: 150px

</style>
