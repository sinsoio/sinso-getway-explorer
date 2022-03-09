<template>
  <div>
    <TopBar @onneCli="getProinfo" @clearCl="clear" />
    <div class="settle">
      <div class="backCCC">
        <div class="minCont marlrAuto padding-tb-xl" v-if="isSettlement">
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
      <div
        class="minCont marlrAuto margin-top-xl fontSize-12"
        v-if="isSettlement"
      >
        <p class="flexCont">
          <span>Node Adress</span>
          <span>0x36b37Ab158973C70A89c30fb4FfFF447717973C4</span>
        </p>
        <p class="flexCont addition">
          <span>Staked</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont">
          <span>Total Node Revenue</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont addition">
          <span>Lock-up Rewards</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont">
          <span>Cashable Rewards</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont addition">
          <span>Cashed Rewards</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont">
          <span>Total settlement</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
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
          <el-button class="buttWid" type="primary" round>Inquire</el-button>
        </div>
      </div>
      <div class="minCont marlrAuto margin-top-xl fontSize-12" v-else>
        <p class="flexCont">
          <span>Node Adress</span>
          <span>0x36b37Ab158973C70A89c30fb4FfFF447717973C4</span>
        </p>
        <p class="flexCont addition">
          <span>Total settlement</span>
          <span> <span class="margin-right">200</span>TSINSO</span>
        </p>
        <p class="flexCont margin-bottom">
          <span>State</span>
          <span :class="1 == 1 ? 'colorFail' : 'colBlue'">settled</span>
        </p>
        <p class="fontSize-14 margin-top margin-bottom-sm">
          Please go to the new network to check the wallet balance
        </p>
        <p class="flexCont addition">
          <span>Chain name</span>
          <span> TestSsc</span>
        </p>
        <p class="flexCont">
          <span>RPC URL</span>
          <span></span>
        </p>
        <p class="flexCont addition">
          <span>Chain ID</span>
          <span> </span>
        </p>
        <p class="flexCont">
          <span>Currency Symbol</span>
          <span>SIN</span>
        </p>
        <p class="flexCont addition">
          <span>Blockchain browser</span>
          <span> </span>
        </p>
        <div class="flex justify-end margin-tb-xl">
          <el-button
            type="primary"
            class="buttWid"
            round
            @click="$router.go(-1)"
            >Return
          </el-button>
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

        <el-button class="marlrAuto disBlock" type="primary"
          >Copy network information
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
      settleStatus: false, //弹框
      inSuccess: 0, //1是成功 2加载中 0失败
      isSettlement: true, // 是否是结算完成后的状态
      isChoise: 0, // 0loading  1 Can settle   2 Settled
      targetWeb3: '',
      sourceWeb: '',
      tableData: [
        {
          date: 'Chain name',
          name: 'TestSsc',
        },
        {
          date: 'RPC URL',
          name: '',
        },
        {
          date: 'Chain ID',
          name: '',
        },
        {
          date: 'Currency Symbol',
          name: 'SIN',
        },
        {
          date: 'Blockchain browser',
          name: '',
        },
      ],
    }
  },
  components: { TopBar },
  methods: {
    async openDialog() {
      await this.getOldInstance()
        .methods.confirmProfits()
        .call({ from: this.textText }, function (error, result) {
          console.log(error, result)
        })
      this.settleStatus = true
      this.inSuccess = 2
      this.times = setInterval(() => {
        this.fitsInfo = this.getNewInstance()
          .methods.profitInfo(this.textText)
          .call()
        if (this.fitsInfo.state == 3) {
          this.inSuccess = 1
          clearInterval(this.times)
        } else if (this.fitsInfo.state > 3) {
          this.inSuccess = 0
          clearInterval(this.times)
        }
        console.log(this.times)
      }, 3000)
    },
    getOldInstance() {
      if (!this.mineOldInstance) {
        let sourceWeb3 = this.sourceWeb3
        this.mineOldInstance = new sourceWeb3.eth.Contract(
          JSON.parse(process.env.VUE_APP_PROFITCONFIRM_ABI),
          process.env.VUE_APP_MINE_CONFIRMCONTRACT_ADDRESS
        )
      }
      return this.mineOldInstance
    },
    getNewInstance() {
      if (!this.mineNewInstance) {
        let targetWeb3 = this.targetWeb3
        this.mineNewInstance = new targetWeb3.eth.Contract(
          JSON.parse(process.env.VUE_APP_PROFITCLAIM_ABI),
          process.env.VUE_APP_MINE_CLAIMCONTRACT_ADDRESS
        )
      }
      return this.mineNewInstance
    },
    async getProinfo() {
      this.textText = await this.getAccount()
      console.log(this.textText)
      console.log(await this.getOldInstance())
      console.log(await this.getOldInstance().methods)
      let proInfo = await this.getOldInstance()
        .methods.profitInfo(this.textText)
        .call()
      if (proInfo.state <= 1) {
        this.isChoise = 1
      } else if (proInfo.state == 3) {
        this.isChoise = 2
      }
      console.log(proInfo)
    },
    clear() {
      this.textText = ''
    },
    async getAccount() {
      let accountList = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accountList[0]
    },
  },
  watch: {
    settleStatus(val) {
      if (!val) {
        clearInterval(this.times)
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
