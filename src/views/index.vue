<template>
  <div class="">
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
          <p class="margin-bottom-sm fontSize-24 fontBlod">{{ item.uv }}</p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
      <div class="flex justify-between margin-bottom-xl">
        <div
          class="flex flex-direction justify-center text-center bgBacks"
          v-for="item in list2"
          :key="item.name"
        >
          <p class="margin-bottom-sm fontSize-24 fontBlod">{{ item.uv }}</p>
          <p class="coloCCC">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import TopBar from '../components/topBar'
export default {
  name: '',
  components: { TopBar },
  props: {},
  data() {
    return {
      web3: '',
      mineInstance: '',
      list1: [
        { name: 'Total Network Nodes', uv: 0 },
        { name: 'Total Active Nodes', uv: 0 },
        { name: 'Number of completed staked nodes', uv: 0 },
      ],
      list2: [
        { name: 'Total number of TSINSO mineable', uv: 0 },
        { name: 'Total number of TSINSO mined', uv: 0 },
        { name: 'Total TSINSO Staked for Mining', uv: 0 },
      ],
    }
  },
  computed: {},
  methods: {
    getMineInstance() {
      if (!this.mineInstance) {
        let web3 = this.web3
        this.mineInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_MINE_CONTRACT_ABI),
          process.env.VUE_APP_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    async getPoolInfo() {
      let poolInfo = await this.getMineInstance().methods.getPoolInfo().call()
      this.list1[0].uv = poolInfo[0]
      this.list1[1].uv = poolInfo[1]
      this.list1[2].uv = poolInfo[2]
      this.list2[0].uv = this.numberHandle(poolInfo[3])
      this.list2[1].uv = this.numberHandle(poolInfo[4])
      this.list2[2].uv = this.numberHandle(poolInfo[5])
    },
    numberHandle(amount) {
      return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(8)
    },
  },
  created() {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_RAW_URL)
    )
    this.web3 = web3
    this.getPoolInfo()
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
</style>
