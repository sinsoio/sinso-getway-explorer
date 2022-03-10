<template>
  <div class="" v-loading.fullscreen.lock="isLoading">
    <TopBar />
    <div class="backTu">
      <img class="margin-tb-xl" src="../assets/imgs/img-banner-yinhao.png" />
      <h2 class="margin-bottom fontSize-28">
        SINSO distributed high-speed cache node
      </h2>
      <p class="fontSize-20 margin-bottom-xs coloCCC">
        which solves the distribution of VR, AR, video streaming and
      </p>
      <p class="fontSize-20 coloCCC">
        high-speed CDN, and high-speed response of DAPP
      </p>
    </div>
    <div class="marlrAuto widthCont">
      <div class="flex justify-between">
        <div
          class="flex flex-direction justify-center text-center bgBacks"
          v-for="item in list1"
          :key="item.name"
        >
          <p class="margin-bottom-sm fontSize-24 fontBlod">
            {{ isTimes ? 'load timeout' : item.uv }}
          </p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
      <div class="flex justify-between margin-bottom-xl">
        <div
          class="flex flex-direction justify-center text-center bgBacks"
          v-for="item in list2"
          :key="item.name"
        >
          <p class="margin-bottom-sm fontSize-24 fontBlod">
            {{ isTimes ? 'load timeout' : item.uv }}
          </p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- error -->
    <el-dialog
      title="Tips"
      :visible.sync="isTimes"
      width="400px"
      center
      :show-close="false"
    >
      <p class="margin-bottom-sm">
        Please re request data due to network congestion
      </p>
      <el-button class="buttos" type="primary" @click="openFullScreen">
        save
      </el-button>
    </el-dialog>
    <!-- Tips -->
    <el-dialog
      :visible.sync="isNotice"
      width="1023px"
      center
      :show-close="false"
      class="dialogs"
    >
      <div class="notice">
        <div class="content colorText align-center flex flex-direction">
          <img
            class="noticeIcon"
            src="../assets/img-gonggao.png"
            alt=""
            srcset=""
          />
          <h2
            class="fontSize-20 margin-top-sm margin-bottom fontBlod colorTitle"
          >
            Notice
          </h2>
          <div class="lineHeight fontSize-14">
            <p>
              Due to the congestion of BSC test chain access, SINSO has decided
              to build its own network Ssc, so everyone needs
            </p>
            <p>to switch to Ssc (test network) to continue node mining.</p>
            <p>
              1. The BSC test chain mining will stop running at 2022.03.13 24:00
              (UTC+8)
            </p>
            <p>
              2. After the operation is stopped, the user will first settle the
              previous income (including the pledged currency), and
            </p>
            <p>
              we will issue the same amount of Tsinso rewards on the new network
              (Ssc test network).
            </p>
            <p>
              3. Reward settlement time: 2022.03.14 00:00 to 2022.04.15 24:00
              (UTC+8)
            </p>
            <p>4. New network access start time: 2022.03.14 12:00 (UTC+8)</p>
            <p>
              5. The new network officially starts mining time: 2022.03.17 12:00
              (UTC+8)
            </p>
          </div>
          <p class="margin-top margin-bottom-sm">Old network stop countdown</p>
          <div class="timeRender">
            <span class="buleCircle">{{ time.days || '00' }}</span>
            <span>days</span>
            <span class="buleCircle">{{ time.hours || '00' }}</span>
            <span>hours</span>
            <span class="buleCircle">{{ time.mins || '00' }}</span>
            <span>mins</span>
            <span class="buleCircle">{{ time.seconds || '00' }}</span>
            <span>seconds</span>
          </div>
          <el-button
            type="primary"
            class="margin-top buttWid"
            @click="isNotice = false"
            >Confirm</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import TopBar from '../components/topBar'
var dayjs = require('dayjs')
export default {
  name: '',
  components: { TopBar },
  props: {},
  data() {
    return {
      isNotice: false,
      time: { days: 0, hours: 0, mins: 0, seconds: 0 },
      poolInfo: '',
      isTimes: false,
      isLoading: true,
      web3: '',
      mineInstance: '',
      list1: [
        { name: 'Total Network Nodes', uv: 'loading' },
        { name: 'Total Active Nodes', uv: 'loading' },
        { name: 'Number of completed staked nodes', uv: 'loading' },
      ],
      list2: [
        { name: 'Total number of TSINSO mineable', uv: 'loading' },
        { name: 'Total number of TSINSO mined', uv: 'loading' },
        { name: 'Total TSINSO Staked for Mining', uv: 'loading' },
      ],
    }
  },
  computed: {},
  watch: {
    poolInfo(value) {
      if (value) {
        this.isTimes = false
        this.isLoading = false
        if (!sessionStorage.getItem('isNotice')) {
          this.isInst = 1
          this.setIng()
          this.isNotice = true
          sessionStorage.setItem('isNotice', true)
        }
      }
    },
  },
  methods: {
    getMineInstance() {
      if (!this.mineInstance) {
        let web3 = this.web3
        this.mineInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_OLD_MINE_CONTRACT_ABI),
          process.env.VUE_APP_OLD_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    async getPoolInfo() {
      this.timing()
      let poolInfo = await this.getMineInstance().methods.getPoolInfo().call()

      this.list1[0].uv = poolInfo[0]
      this.list1[1].uv = poolInfo[1]
      this.list1[2].uv = poolInfo[2]
      this.list2[0].uv = this.numberHandle(poolInfo[3])
      this.list2[1].uv = this.numberHandle(poolInfo[4])
      this.list2[2].uv = this.numberHandle(poolInfo[5])
      this.poolInfo = poolInfo
    },
    openFullScreen() {
      this.isTimes = false
      this.isLoading = true
      this.getPoolInfo()
    },
    numberHandle(amount) {
      return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(8)
    },
    timing() {
      setTimeout(() => {
        if (!this.poolInfo) {
          this.isTimes = true
          this.isLoading = false
        }
      }, 45000)
    },
    setIng() {
      this.times = setInterval(
        () => {
          this.isInst = 0
          const date2 = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss'))
          const date1 = dayjs('2022-03-13 24:00:00')
          let second = date1.diff(date2, 'second') // 20214000000 default milliseconds
          if (second > 0) {
            let days = Math.floor(second / 86400)
            let hours = Math.floor((second % 86400) / 3600)
            let mins = Math.floor(((second % 86400) % 3600) / 60)
            let seconds = Math.floor(((second % 86400) % 3600) % 60)
            days = days < 10 ? '0' + days : days
            hours = hours < 10 ? '0' + hours : hours
            mins = mins < 10 ? '0' + mins : mins
            seconds = seconds < 10 ? '0' + seconds : seconds
            this.time = { days, hours, mins, seconds }
          } else {
            this.time = { days: '00', hours: '00', mins: '00', seconds: '00' }
            setInterval(this.times)
          }
        },
        this.isInst == 1 ? 0 : 1000
      )
    },
    switchCli() {
      let web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.VUE_APP_RAW_URL)
      )
      this.web3 = web3
      this.getPoolInfo()
    },
  },
  created() {
    let val = false
    this.$store.commit('modifyOdd1', { val })
    this.switchCli()
  },
  mounted() {},
}
</script>
<style scoped>
.backTu {
  width: 100%;
  height: 450px;
  background: url(../assets/imgs/img-banner.png) no-repeat;
  background-size: cover;
  padding-left: 150px;
  margin-bottom: 50px;
}
.backTu > img {
  width: 65px;
}
.bgBacks {
  width: 460px;
  height: 236px;
  background: url(../assets/imgs/img-shuju-bg.png) no-repeat;
  background-size: cover;
}
.hash {
  height: 98px;
  background: linear-gradient(180deg, #f9fdff, #edf6f9);
}
.buttos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 140px;
}

/* dialog */
.notice {
  width: 100%;
  height: 640px;
  background: url('../assets/img-gonggao-bg.png');
  background-size: cover;
  padding: 63px 52px 52px 52px;
}
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 79px 23px 60px;
}
.noticeIcon {
  width: 86px;
  height: 86px;
  margin-top: -43px;
}
.timeRender > span {
  padding: 6px 6px 8px 6px;
  color: #00abeb;
}
.timeRender > .buleCircle {
  background: #00abeb;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
::v-deep .dialogs .el-dialog__body {
  padding: 0 !important;
}
::v-deep .dialogs .el-dialog {
  box-shadow: none !important;
  background-color: transparent !important;
}
.colorTitle {
  color: #242526;
}
.colorText {
  color: #092530;
}
.lineHeight {
  line-height: 2;
}
</style>
