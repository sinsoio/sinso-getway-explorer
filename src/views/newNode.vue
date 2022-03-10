<!--
* ----
* @author （cgt）
* @date 2020/7/30
-->
<template>
  <div>
    <TopBar @onneCli="connectCli" @clearCl="clear" />
    <div class="marlrAuto margin-top-xl widthCont">
      <el-table
        :header-cell-style="rowClass"
        :data="list"
        empty-text="No data"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="address"
          label="Address"
          width="240px"
          align="center"
        ></el-table-column>
        <el-table-column prop="isOnline" label="State" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isOnline">Working</el-tag>
            <el-tag type="danger" v-else>Unwork</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deposits" align="center">
          <template slot="header">
            <span>Staked</span>
            <el-tooltip
              class="item"
              effect="dark"
              content="There is no income at the node in the release of pledge"
              placement="right"
            >
              <i style="color: #00abeb" class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalAwards"
          label="Total node revenue"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="withdrawnAwards"
          label="Cashed rewards"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lockedAwards"
          label="Lock up rewards"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cashableAwards"
          label="Cashable rewards"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="Operation" align="center">
          <template slot-scope="scope">
            <el-button
              round
              type="primary"
              @click="showCli(scope.row)"
              size="small"
              >Cashout</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- tankuang -->
    <el-dialog :visible.sync="isShow" width="600px" center title="Cashout">
      <div class="flex align-center substance">
        <p>From:</p>
        <div>{{ withdrawInfo.fromAddress }}</div>
      </div>
      <div class="flex align-center substance">
        <p>To:</p>
        <div>{{ withdrawInfo.toAddress }}</div>
      </div>
      <el-form ref="addForm" :model="withdrawInfo" :rules="formRules">
        <el-form-item label="Amount:" label-width="140px" prop="amount">
          <el-input
            oninput="value = value.replace(/[^\d.]/g, '')"
            v-model="withdrawInfo.amount"
            placeholder="please"
            style="width: 300px"
          >
            <a @click="allCli" slot="suffix" class="colos pointer all">All</a>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex align-center substance">
        <p></p>
        <div class="coloCCC">
          Cashable amount：<a class="colos">{{
            withdrawInfo.viewCashableAwards
          }}</a>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </el-dialog>
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
    const checkLang = (rule, value, callback) => {
      let max = this.withdrawInfo.viewCashableAwards
      if (value.split('.').length - 1 >= 2) {
        callback(new Error('Nonstandard input'))
      } else if (parseFloat(value) > max) {
        callback(new Error('The maximum value cannot be exceeded'))
      } else if (value.substr(value.indexOf('.')).length > 9) {
        callback(new Error('The decimal point cannot exceed 8 digits'))
      } else {
        callback()
      }
    }
    return {
      web3: '',
      mineInstance: '',
      list: [],
      isShow: false,
      minerDetail: '',
      withdrawInfo: {
        fromAddress: '',
        toAddress: '',
        viewCashableAwards: '',
        cashableAwards: '',
        amount: '',
      },
      formRules: {
        amount: [
          {
            required: true,
            message: 'This item is required',
            trigger: 'blur',
          },
          {
            required: true,
            validator: checkLang,
            message: '',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  computed: {},
  methods: {
    showCli() {
      this.isShow = true
      this.withdrawInfo = {
        fromAddress: this.minerDetail.address,
        toAddress: process.env.VUE_APP_NEW_MINE_CONTRACT_ADDRESS,
        viewCashableAwards: this.numberHandle(this.minerDetail.cashableAwards),
        cashableAwards: this.minerDetail.cashableAwards,
      }
    },
    async confirm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.handleWithdraw()
        }
      })
    },
    async handleWithdraw() {
      let trxHash = await this.withdraw(
        this.withdrawInfo.fromAddress,
        this.withdrawInfo.amount
      )
      if (trxHash != '') {
        this.$message.success('Cashout successfully!！')
        let that = this
        setTimeout(function () {
          that.updateMinerInfo(that.withdrawInfo.fromAddress)
          that.isShow = false
        }, 5000)
      }
    },
    async connectCli() {
      if (!window.ethereum) {
        this.$message.error(
          'Please install the Metamask wallet plug-in and try again!'
        )
        return
      }
      let account = await this.getAccount()
      this.updateMinerInfo(account)
    },
    async updateMinerInfo(account) {
      let minerInfo = await this.getMineInstance()
        .methods.getMinerInfo(account)
        .call()
      let miner = {
        address: account,
        isOnline: minerInfo[1],
        deposits: this.numberHandle(minerInfo[2]),
        totalAwards: this.numberHandle(minerInfo[3]),
        withdrawnAwards: this.numberHandle(minerInfo[4]),
        lockedAwards: this.numberHandle(minerInfo[5]),
        cashableAwards: this.numberHandle(minerInfo[6]),
      }
      this.minerDetail = {
        address: account,
        isOnline: minerInfo[1],
        deposits: minerInfo[2],
        totalAwards: minerInfo[3],
        withdrawnAwards: minerInfo[4],
        lockedAwards: minerInfo[5],
        cashableAwards: minerInfo[6],
      }
      this.list = [miner]
    },
    numberHandle(amount) {
      return new BigNumber(amount)
        .div(new BigNumber(10).pow(18))
        .toFixed(8, BigNumber.ROUND_DOWN)
    },
    async getAccount() {
      let accountList = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accountList[0]
    },
    async withdraw(account, amount) {
      amount = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
      let encodeAbi = this.getMineInstance()
        .methods.withdraw(amount)
        .encodeABI()
      const transactionParameters = {
        to: process.env.VUE_APP_NEW_MINE_CONTRACT_ADDRESS,
        from: account,
        data: encodeAbi,
      }
      let txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
      return txHash
    },
    getMineInstance() {
      if (!this.mineInstance) {
        let web3 = this.web3
        this.mineInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_NEW_MINE_CONTRACT_ABI),
          process.env.VUE_APP_NEW_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    clear() {
      this.list = []
      this.minerDetail = {}
    },
    allCli() {
      this.$set(
        this.withdrawInfo,
        'amount',
        this.withdrawInfo.viewCashableAwards
      )
    },
  },
  created() {
    let val = true
    this.$store.commit('modifyOdd2', { val })
    let web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_TARGET_CHAIN_URL)
    )
    this.web3 = web3
  },

  mounted() {
    if (window.textText) {
      this.connectCli()
    }
  },
}
</script>
<style scoped>
.substance {
  margin-bottom: 30px;
}
.substance > p {
  width: 140px;
  padding-right: 20px;
  text-align: right;
}
::v-deep .el-form-item__label {
  padding: 0 20px 0 0;
}
/* table */
::v-deep .el-table tr {
  background-color: #f3f5f8;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid #ffffff;
}
::v-deep .el-table--border th.el-table__cell {
  border-bottom: 1px solid #ffffff;
}
.colos {
  color: #00abeb;
}
.all {
  margin-right: 8px;
}
::v-deep .el-dialog {
  border-radius: 10px;
}
::v-deep .dialog-footer .el-button {
  width: 100px;
  border-radius: 6px;
}
::v-deep .dialog-footer .el-button:first-child {
  margin-right: 20px;
}
::v-deep .dialog-footer .el-button:last-child {
  margin-left: 20px;
}
</style>
