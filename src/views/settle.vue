<template>
  <div>
    <TopBar @onneCli="getProinfo" @clearCl="clear" />
    <div class="settle">
      <div class="backCCC">
        <div class="minCont marlrAuto padding-tb-xl" v-if="!isSettlement">
          <h3 class="margin-bottom-xs">
            Please connect to the node address to view your node information. Do
            a good job in node reward settlement.
          </h3>
          <h3 class="margin-bottom">
            Please settle within the specified time, thank you for your
            cooperation!
          </h3>

          <div class="flex align-center coloCCC">
            <img
              class="dataIcon"
              src="../assets/img-icon-time.png"
              alt=""
              srcset=""
            />
            <p class="fontSize-14">
              Settlement time 2022.03.14 00:00 to 2022.04.15 24:00
            </p>
          </div>
        </div>
        <div class="minCont marlrAuto padding-tb-xl" v-else>
          <h3 class="margin-bottom-xs">
            Because the network was congested before, which brought you some bad
            experience, so now we upgrade the network.
          </h3>
          <h3>
            Build your own network to ensure the stable operation of everyone's
            machines.
          </h3>
        </div>
      </div>
      <div v-if="textText">
        <div
          class="minCont marlrAuto margin-top-xl fontSize-12"
          v-if="!isSettlement"
        >
          <p class="flexCont">
            <span>Node Adress</span>
            <span>{{ minerDetail.address || textText }}</span>
          </p>
          <p class="flexCont addition">
            <span>Staked</span>
            <span>
              <span class="margin-right" v-if="!isTus">{{
                minerDetail.address ? minerDetail.deposits : 'loading'
              }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont">
            <span>Total Node Revenue</span>
            <span>
              <span class="margin-right" v-if="!isTus">
                {{
                  minerDetail.address ? minerDetail.totalAwards : 'loading'
                }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont addition">
            <span>Lock-up Rewards</span>
            <span>
              <span class="margin-right" v-if="!isTus">
                {{
                  minerDetail.address ? minerDetail.lockedAwards : 'loading'
                }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont">
            <span>Cashable Rewards</span>
            <span>
              <span class="margin-right" v-if="!isTus">
                {{
                  minerDetail.address ? minerDetail.cashableAwards : 'loading'
                }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont addition">
            <span>Cashed Rewards</span>
            <span>
              <span class="margin-right" v-if="!isTus">
                {{
                  minerDetail.address ? minerDetail.withdrawnAwards : 'loading'
                }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont">
            <span>Total settlement</span>
            <span>
              <span class="margin-right" v-if="!isTus">
                {{
                  minerDetail.address ? minerDetail.totalNums : 'loading'
                }}</span
              >TSINSO</span
            >
          </p>
          <div class="flex justify-end margin-tb-xl">
            <el-button
              class="buttWid"
              v-if="isChoise == 1"
              @click="openDialog"
              type="primary"
              round
              >Settle accounts
            </el-button>
            <el-button
              class="buttWid"
              disabled
              v-else-if="isChoise == 2"
              type="info"
              round
              >Settled
            </el-button>
            <el-button
              class="buttWid"
              disabled
              v-else-if="isChoise == 0"
              type="info"
              round
              >Not Start
            </el-button>
            <el-button
              v-if="minerDetail"
              class="buttWid"
              type="primary"
              round
              @click="isSettlement = true"
              >Inquire</el-button
            >
          </div>
        </div>
        <div class="minCont marlrAuto margin-top-xl fontSize-12" v-else>
          <p class="flexCont">
            <span>Node Adress</span>
            <span>{{ minerDetail.address }}</span>
          </p>
          <p class="flexCont addition">
            <span>Total settlement</span>
            <span>
              <span class="margin-right">{{ minerDetail.totalNums }}</span
              >TSINSO</span
            >
          </p>
          <p class="flexCont margin-bottom">
            <span>State</span>
            <span v-if="isChoise == 1" class="colBlue">Unsettled</span>
            <span v-else-if="isChoise == 0" class="colorFail">Not Start</span>
            <span v-else class="colBlue">Settled</span>
            <!-- <span v-else-if="inSuccess == 0" class="colorFail">settled</span> -->
          </p>
          <p class="fontSize-14 margin-top margin-bottom-sm">
            Please go to the new network to check the wallet balance
          </p>
          <p class="flexCont addition">
            <span>Chain name</span>
            <span> SSC</span>
          </p>
          <div class="flexCont">
            <span>RPC URL</span>
            <div>
              <p>https://data-seed-pressc-1.sinso.io/</p>
              <p>https://data-seed-pressc-2.sinso.io</p>
              <p>https://data-seed-pressc-3.sinso.io</p>
            </div>
          </div>
          <p class="flexCont addition">
            <span>Chain ID</span>
            <span>8845</span>
          </p>
          <p class="flexCont">
            <span>Currency Symbol</span>
            <span>SIN</span>
          </p>
          <p class="flexCont addition">
            <span>Blockchain browser</span>
            <span>https://testssc.sinso.io/</span>
          </p>
          <div class="flex justify-end margin-tb-xl">
            <el-button
              type="primary"
              class="buttWid"
              round
              @click="isSettlement = false"
              >Return
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog
      title="Tips"
      :visible.sync="settleStatus"
      :width="inSuccess == 1 ? '530px' : '430px'"
      center
      :show-close="false"
    >
      <div v-if="inSuccess == 2" class="flex flex-direction align-center">
        <p>Your node settlement information is being</p>
        <p>executed, please be patient</p>
        <i class="el-icon-loading fontSize-32 colorLoading margin-top"></i>
      </div>
      <div v-if="inSuccess == 0">
        <p icon="el-icon-circle-close fontSize-14">
          <i class="el-icon-error fontSize-16 colorFail"></i>Your node reward
          settlement failed, please try again！
        </p>
        <el-button
          class="marlrAuto disBlock margin-top"
          type="primary"
          @click="settleStatus = false"
          >Confirm
        </el-button>
      </div>
      <div v-if="inSuccess == 1">
        <div class="text-center lin-height-2">
          <p>Your node reward has been settled successfully！</p>
          <p>Please go to the corresponding network to check the wallet</p>
          <p>balance.</p>
        </div>
        <div class="padding-lr margin-tb-sm">
          <el-table :data="tableData" border :show-header="false">
            <el-table-column prop="date" align="center"></el-table-column>
            <el-table-column prop="name" align="center"></el-table-column>
          </el-table>
        </div>

        <el-button
          class="marlrAuto disBlock"
          type="primary"
          @click="settleStatus = false"
          >Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Web3 from 'web3'
import TopBar from '../components/topBar'

export default {
  data() {
    return {
      textText: '',
      settleStatus: false, // el-dialog
      inSuccess: 0, // 1 suress 2 loading...   0 error
      isSettlement: false, // 是否是结算完成后的状态
      isChoise: 0, // Query button  0 null  1 Can settle   2 Settled
      isTus: false, // no data
      targetWeb3: '', //{}
      sourceWeb: '', //{}
      minerDetail: '', //{}
      tableData: [
        {
          date: 'Chain name',
          name: 'SSC',
        },
        {
          date: 'RPC URL',
          name: 'https://data-seed-pressc-2.sinso.io',
        },
        {
          date: 'Chain ID',
          name: '8845',
        },
        {
          date: 'Currency Symbol',
          name: 'SIN',
        },
        {
          date: 'Blockchain browser',
          name: 'https://testssc.sinso.io/',
        },
      ],
    }
  },
  components: { TopBar },
  methods: {
    async openDialog() {
      let encodeAbi = this.getOldInstance().methods.confirmProfits().encodeABI()
      const transactionParameters = {
        to: process.env.VUE_APP_CONFIRM_CONTRACT_ADDRESS,
        from: this.textText,
        data: encodeAbi,
      }
      let txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
      console.log(txHash)
      this.settleStatus = true
      this.inSuccess = 2
      this.isChoise = 2
      this.times = setInterval(async () => {
        this.fitsInfo = await this.getNewInstance()
          .methods.profitInfo(this.textText)
          .call()
        if (this.fitsInfo.state == 3) {
          this.inSuccess = 1
          clearInterval(this.times)
        } else if (this.fitsInfo.state > 3) {
          this.inSuccess = 0
          clearInterval(this.times)
        }
      }, 3000)
    },
    getOldInstance() {
      if (!this.mineOldInstance) {
        let sourceWeb3 = this.sourceWeb3
        this.mineOldInstance = new sourceWeb3.eth.Contract(
          JSON.parse(process.env.VUE_APP_CONFIRM_CONTRACT_ABI),
          process.env.VUE_APP_CONFIRM_CONTRACT_ADDRESS
        )
      }
      return this.mineOldInstance
    },
    getNewInstance() {
      if (!this.mineNewInstance) {
        let targetWeb3 = this.targetWeb3
        this.mineNewInstance = new targetWeb3.eth.Contract(
          JSON.parse(process.env.VUE_APP_CLAIM_CONTRACT_ABI),
          process.env.VUE_APP_CLAIM_CONTRACT_ADDRESS
        )
      }
      return this.mineNewInstance
    },
    async getProinfo() {
      this.clear()
      this.textText = await this.getAccount()
      let proInfo = await this.getOldInstance()
        .methods.profitInfo(this.textText)
        .call()
      this.updateMinerInfo(this.textText)
      let poolStatus = await this.getPoolStatus()
      if (poolStatus) {
        this.isChoise = 0
      } else {
        if (proInfo.state <= 1) {
          this.isChoise = 1
        } else if (proInfo.state == 3) {
          this.isChoise = 2

          this.inSuccess = 1
        } else if ([2, 4].includes(proInfo.state)) {
          this.isChoise = 0
        }
      }
    },
    clear() {
      this.isTus = false
      this.isChoise = 0
      this.textText = ''
      this.minerDetail = ''
      this.isSettlement = false
    },
    async updateMinerInfo(account) {
      let minerInfo = await this.getMineInstance()
        .methods.getMinerInfo(account)
        .call()
      let totalNums = this.jiaNumber(
        this.numberHandle(minerInfo[2]),
        this.numberHandle(minerInfo[3])
      )
      this.minerDetail = {
        address: account,
        deposits: minerInfo[2],
        totalAwards: minerInfo[3],
        withdrawnAwards: minerInfo[4],
        lockedAwards: minerInfo[5],
        cashableAwards: minerInfo[6],
        totalNums,
      }
    },
    getMineInstance() {
      if (!this.mineInstance) {
        let web3 = this.targetWeb3
        this.mineInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_NEW_MINE_CONTRACT_ABI),
          process.env.VUE_APP_NEW_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    async getAccount() {
      let accountList = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accountList[0]
    },
    getPoolExpireInstance() {
      if (!this.poolExpireInstance) {
        let web3 = this.sourceWeb3
        this.poolExpireInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_OLD_POOL_ABI),
          process.env.VUE_APP_OLD_POOL_CONTRACT_ADDRESS
        )
      }
      return this.poolExpireInstance
    },
    async getPoolStatus() {
      let poolStatus = await this.getPoolExpireInstance()
        .methods.getStatus(0)
        .call()
      return poolStatus
    },
  },
  watch: {
    settleStatus(val) {
      if (!val) {
        this.getProinfo()
        clearInterval(this.times)
      }
    },
    textText(val) {
      if (!val) {
        this.isSettlement = false
      }
    },
  },
  created() {
    let sourceWeb3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_SOURCE_CHAIN_URL)
    )
    this.sourceWeb3 = sourceWeb3

    let targetWeb3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_TARGET_CHAIN_URL)
    )
    this.targetWeb3 = targetWeb3
  },
  mounted() {
    if (window.textText) {
      this.getProinfo()
    }
  },
}
</script>

<style scoped>
.paddingDioText {
  padding: 17px 0;
}

.colorLoading {
  color: #00abeb;
}

.colorFail {
  color: #fb2745;
}

.colorText {
  color: #092530;
}

.lineHeight {
  line-height: 2;
}

.dataIcon {
  width: 18px;
  height: 16px;
  margin-right: 6px;
}

/* .el-button--primary {
    background-color: #00abeb;
    border-color: #00abeb;
  } */
.flexCont {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 20px;
  background-color: #ecf2f4;
}

.addition {
  background-color: #f3f5f8;
}

.colBlue {
  color: #1bbe7f;
}
</style>
