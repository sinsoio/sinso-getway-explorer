<!--
* faucet
* @author （cgt）
-->
<template>
  <div>
    <TopBar />

    <div class="flex align-center justify-center fauces">
      <div class="jpads">
        <h1 class="fontSize-28 margin-bottom">
          Looking for Test (TSINSO) Coins?
        </h1>
        <p class="coloCCC margin-bottom-xs">
          Fill in your test wallet address to get node pledge coins 2,00 Tsinso
        </p>
        <p class="coloCCC margin-bottom-xl">（Only open to VIP users）</p>
        <el-form>
          <el-form-item label="">
            <el-input
              v-model="address"
              placeholder="Test wallet address"
              @keyup.enter.native="doSearch"
              style="width: 700px"
            >
              <el-button
                class="orig"
                type="primary"
                slot="append"
                @click.native="doSearch"
                >Submit
              </el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="text-right pointer" @click="goLink">
          <a class="fontBlod margin-right-sm colos">If you become a VIP</a>
          <img class="rigImg" src="../assets/imgs/img-jiantou.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import TopBar from '../components/topBar'
export default {
  name: '',
  components: { TopBar },
  props: {},
  data() {
    return {
      address: '',
      web3: '',
      mineInstance: '',
      airdropInstance: '',
      newPoolInstance: '',
    }
  },
  computed: {},
  methods: {
    async doSearch() {
      if (!this.web3.utils.isAddress(this.address)) {
        this.$message.error('Address format error')
        return
      }
      if (!window.ethereum) {
        this.$message.error(
          'Please install the Metamask wallet plug-in and try again!'
        )
        return
      }
      let whiteListStatus = await this.inWhiteList(this.address)
      if (!whiteListStatus) {
        this.$message.error(
          'You have not applied to be a whitelist user,Apply for the application and try again.'
        )
        return
      }
      let airdropStatus = await this.airdropStatus(this.address)
      if (airdropStatus) {
        this.$message.error('You address is airdropped')
        return
      }
      let account = await this.getAccount()
      if (account.toLowerCase() != this.address.toLowerCase()) {
        this.$message.error(
          'The signature account does not match the account you entered, please select again'
        )
        return
      }
      let trxHash = await this.airdrop(account)
      console.log('trxHash==>' + trxHash)
      if (trxHash != ""){
        this.$message.success('Received successfully!！')
      }
    },
    async inWhiteList(address) {
      let res = await this.getNewPoolInstance()
        .methods.inList(address,3)
        .call()
        .then((res) => {
          return res
        })
      return res
    },
    async airdropStatus(address) {
      let res = await this.getAirdropInstance()
        .methods.airdropStatus(address)
        .call()
        .then((res) => {
          return res
        })
      return res
    },
    async getAccount() {
      let accountList = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accountList[0]
    },
    async airdrop(account) {
      let encodeAbi = this.getAirdropInstance()
        .methods.airdrop(account)
        .encodeABI()
      const transactionParameters = {
        to: process.env.VUE_APP_AIRDROP_CONTRACT_ADDRESS,
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
          JSON.parse(process.env.VUE_APP_MINE_CONTRACT_ABI),
          process.env.VUE_APP_MINE_CONTRACT_ADDRESS
        )
      }
      return this.mineInstance
    },
    getAirdropInstance() {
      if (!this.airdropInstance) {
        let web3 = this.web3
        this.airdropInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_AIRDROP_CONTRACT_ABI),
          process.env.VUE_APP_AIRDROP_CONTRACT_ADDRESS
        )
      }
      return this.airdropInstance
    },
    getNewPoolInstance() {
      if(!this.newPoolInstance) {
        let web3 = this.web3
        this.newPoolInstance = new web3.eth.Contract(
          JSON.parse(process.env.VUE_APP_NEW_POOL_EXPIRE_ABI),
          process.env.VUE_APP_NEW_POOL_CONTRACT_ADDRESS
        )
      }
      return this.newPoolInstance
    }
  },
  created() {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_TARGET_CHAIN_URL)
    )
    this.web3 = web3
  },
  mounted() {},
}
</script>
<style scoped>
.fauces {
  width: 100%;
  height: calc(100vh - 76px);
  background: url(../assets/imgs/img-faucet-bg.png) no-repeat;
  background-size: cover;
  /* padding-top: -100px; */
}

.colos {
  color: #00abeb;
}

.rigImg {
  width: 28px;
}

/* .jpads {
      padding-top: 50px;
    } */
</style>
