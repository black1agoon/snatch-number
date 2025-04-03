<template>
  <div class="wrapper">
<!--    <div class="item-wrap">-->
<!--      <div class="label">选择健身房：</div>-->
<!--      <el-select v-model="gymValue"-->
<!--                 placeholder="选择健身房"-->
<!--                 :clearable="true"-->
<!--                 @change="selectChange">-->
<!--        <el-option-->
<!--            v-for="item in gymOptions"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
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
<!--      <div class="label" style="text-align: center">谁的卡：</div>-->
<!--      <el-select v-model="cardContractId" @change="changeValue">-->
<!--        <el-option-->
<!--            v-for="item in cardContractOptions"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
    </div>

    <div class="item-wrap">
      <div class="label">延迟毫秒：</div>
      <el-input-number v-model="delayTime" :min="100" :step="100">
      </el-input-number>
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
import { getSign } from '@/assets/sign'

const WXAPPCHATID = {
  '28161525': 'eyJuYW1lIjoi6IOh6LaF576kIiwicGhvbmUiOiIxNTg4ODM0MzgwOCIsImFjY291bnRJZCI6MjIxODgxMDksImltcGVyc29uYXRlZCI6ZmFsc2UsImNoYW5uZWwiOm51bGwsImlwIjpudWxsLCJ0cyI6MTc0MjM3NDU2MzI3OX0=.i28+GF7iP2nWdzMt/qRGF8cGPw2tOGPnp76nmWdoaMU=',
  '9404475': 'eyJuYW1lIjoi5a2ZIiwicGhvbmUiOiIxNTk2ODMzMjcyMCIsImFjY291bnRJZCI6MjQwNTMzNywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc4ODQ2NDI5NTkxfQ==./1/zHBoKV2Uk84SYuE00fy0hKzszic2forWHPyD49aE=',
  // '5789034': 'eyJuYW1lIjoi6JSh5Li55YekIiwicGhvbmUiOiIxODc2NzMzOTI3NyIsImFjY291bnRJZCI6NTU5OTcxMCwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc5ODgxMTYzNzM1fQ==.CsVE0bEHIZ2p1uVkV7mIGWELkmuBiXkZQ/JQMftkgT8=',
  // '5336840': 'eyJuYW1lIjoi6IuP5Li96ImzIiwicGhvbmUiOiIxNTMwNTgzODU4OCIsImFjY291bnRJZCI6NTYwMTc3NywiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjc5NjI0MjAyODQ0fQ==.Ki6ru23WS60ViDLkCjoWVU4VNs/vRC90qPOnCzqwqyY=',
  // '5783220': 'eyJuYW1lIjoi57qq5Li954eVIiwicGhvbmUiOiIxMzc1NzM4OTk5MCIsImFjY291bnRJZCI6NTYwMDI4NSwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjgxNzEyMjM2ODI2fQ==.rpSdozqYvVU5gCrmF5hKwxGV/YRyTGzP2GxUO3CmUWM=',
  // '8532723': 'eyJuYW1lIjoi5pu55b2mKOe7rSkiLCJwaG9uZSI6IjEzMjUwOTA2MTY2IiwiYWNjb3VudElkIjo1NjAxODA1LCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJpcCI6bnVsbCwidHMiOjE2ODE3MTI3MjYzMTh9.vQoD2HluXVeS+VA1kLkQFoQBiO8mDAaFU0OMggCnWn4=',
  // '5836651': 'eyJuYW1lIjoi5aSn6IOGIiwicGhvbmUiOiIxNTg1ODM2NjI2MSIsImFjY291bnRJZCI6NjY1MTgzOSwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjg0MjIyOTIxMDI2fQ==.lxSOblLyxjSDRdV+E8B15KAu2xrfELLzKeK2AfTC6bw=',
  // '5289089': 'eyJuYW1lIjoi5aea5L2z5LyfIiwicGhvbmUiOiIxODg1ODM0MzAyMiIsImFjY291bnRJZCI6NjE4MzU1OSwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjg0MjIzMzE4MTEzfQ==.Dul+POetim3gBE92EBy10PEyxSvrTH74lO2aWtu08PQ=',
  // '14393228': 'eyJuYW1lIjoi6YeR56eA6IqzIiwicGhvbmUiOiIxMzk1NzM3MjI0OSIsImFjY291bnRJZCI6NTU4MjQ0MSwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjg0MjIzNzkzNjY2fQ==.vaNuEGdSNcYAGaWfctOzyDu+mk/L3mukAOf7VzPrETM=',
  '13700132': 'eyJuYW1lIjoi5Y2O5Zut5ZutIiwicGhvbmUiOiIxMzYwNjgzNjYxNSIsImFjY291bnRJZCI6ODA1MzI3NSwiaW1wZXJzb25hdGVkIjpmYWxzZSwiaXAiOm51bGwsInRzIjoxNjg0MjI0MTAyOTUwfQ==.tJkYGv/JfCk5eV1tfocVTDzVhAxKa0xllxEMNH+kAFE='

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
      gymValue: '1432',
      instanceId: null,
      courseOptions: [],
      seatNumber: 6,
      cardContractId: '9404475',
      delayTime: 200,
      nowTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      cardContractOptions: [
        { label: '情迷', value: '9404475' },
        // { label: '蔡', value: '5789034' },
        // { label: '苏', value: '5336840' },
        // { label: '纪', value: '5783220' },
        // { label: '曹', value: '8532723' },
        // { label: '大', value: '5836651' },
        // { label: '姚', value: '5289089' },
        // { label: '女', value: '14393228' },
        // { label: '园', value: '13700132' },
      ],
      gymOptions: [
        // { label: '解放路店', value: '1431' },
        { label: '东湖大道店', value: '1432' },
      ],
    }
  },
  methods: {
    getSeat() {
      let data = {
        cardContractId: this.cardContractId,
        cardType: 3,
        seatNums: [this.seatNumber],
        reservedNum: 1,
        version: '2.9.305',
      }
      this.message.push('开始抢号:' + getNowTime())

      axios({
        method: 'post',
        url: `/api/wx/groupCourse/${this.gymValue}/reserve/${this.instanceId}?sign=${getSign(data, this.instanceId)}&thirdParty=true&signKeys=cardContractId,cardType,reservedNum,seatNums,version`,
        // https: www.forzadata.cn/api/wx/groupCourse/1432/reserve/23800686?sign=abbae6d0e5bee3bb84764bba16106b42&thirdParty=true&signKeys=cardContractId,cardType,reservedNum,seatNums,version
        headers: {
          WXAPPCHATID: WXAPPCHATID[this.cardContractId],
        },
        data
      }).then(res => {
        if (res.data.data === -1) {
          this.message.push('抢号成功 ' + getNowTime())
          // clearInterval(this.timer)
          clearInterval(this.timer2)
          this.timer2 = null
        } else {
          this.message.push(res.data.message + getNowTime())
          // if (res.data.status === 1) {
          //   clearInterval(this.timer)
          // }
          if (res.data.message.includes('对不起') || res.data.message.includes('已被其他人')) {
            // clearInterval(this.timer)
            clearInterval(this.timer2)
            this.timer2 = null
          }
        }
      })
    },
    start() {
      this.getSeat()
    },
    polling() {
      let nowTime = new Date().getTime()
      // console.log(nowTime)
      if (nowTime > ((this.targetTime) + this.delayTime)) {
      // if (nowTime > (this.targetTime - 1000 * 5) && nowTime < (this.targetTime + 1000 * 15)) {
        this.start()
        // this.timer = setInterval(() => {
        //   if (!this.successFlag) {
        //     this.start()
        //   }
        // }, 500)
        clearInterval(this.timer2)
      } else {
        clearInterval(this.timer)
        let msg = '还没到抢号时间 ' + getNowTime()
        if (this.message.findIndex(m => m === msg) === -1) {
          this.message.push(msg)
        }
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
      // console.log(this.timer2)
      if (this.timer2) {
        return
      }
      window.localStorage.setItem('gymValue', this.gymValue)
      window.localStorage.setItem('seatNumber', this.seatNumber)
      window.localStorage.setItem('delayTime', this.delayTime)

      this.timer2 = setInterval(() => {
        this.polling()
      }, 1)
    },
    getCourseList() {
      axios({
        method: 'get',
        url: `/api/wxApp/login/${this.gymValue}/groupCourse/${formatDate(new Date(), 'yyyyMMdd')}`,
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
      // this.targetTime = new Date('2025-03-25 15:00:00').getTime()
    },
    changeValue() {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      this.clear()
    }
  },
  mounted() {
    this.gymValue = window.localStorage.getItem('gymValue') || this.gymValue
    this.seatNumber = window.localStorage.getItem('seatNumber') || this.seatNumber
    this.delayTime = +window.localStorage.getItem('delayTime') || this.delayTime

    this.getCourseList()
    setInterval(() => {
      this.nowTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }, 1000)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.cardContractId) {
        vm.cardContractId = to.params.cardContractId
      }
    })
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
    flex: 0 0 80px
  .el-date-picker, .el-input, .el-select
    flex: 1
.button-wrap
  margin: 10px
  display: flex
  justify-content: space-between
  .el-button
    width: 150px

</style>
