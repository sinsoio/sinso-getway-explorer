<template>
  <div>
    <div class="tabBars">
      <div class="flex align-center justify-between marlrAuto widthCont">
        <div class="flex align-center">
          <img
            class="pointer logoImgs"
            src="../assets/imgs/img-logo.png"
            @click="goHome('index')"
          />
          <p
            class="margin-left-sm margin-right-xl colo999 fontBlod fontSize-16"
          >
            Test Network
          </p>
        </div>

        <el-button
          type="text"
          class="fontsix"
          :class="$route.name == 'index' ? 'ColoTexts' : 'texts'"
          @click="goHome('index')"
          >Overview</el-button
        >
        <el-button
          type="text"
          class="fontsix"
          @click="goHome('node')"
          :class="$route.name == 'node' ? 'ColoTexts' : 'texts'"
          >Node</el-button
        >
        <el-button
          class="fontsix"
          type="text"
          @click="goHome('faucet')"
          :class="$route.name == 'faucet' ? 'ColoTexts' : 'texts'"
          >Faucet</el-button
        ><el-button class="texts fontsix" type="text" @click="goBacks"
          >Docs</el-button
        >
        <div class="flex align-center">
          <div
            class="flex align-center justify-around pointer margin-right-xs souCont"
          ></div>
          <div v-if="!textText">
            <el-button round type="primary" @click="connectCli"
              >connect metamask</el-button
            >
          </div>
          <el-select
            class="radios"
            v-model="valVal"
            @change="seleChange"
            v-else
            style="width: 160px"
          >
            <el-option
              v-for="item in ['logout']"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- tankuang -->
    <!-- <el-dialog title="Tips" :visible.sync="isFrame" width="500px" center>
      <div class="text-center fontBlod margin-tb-sm">
        {{ textText }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isFrame = false">confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import Web3 from 'web3'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      valVal: '',
      isFrame: false,
    }
  },
  watch: {
    textText(val) {
      if (val) {
        this.valVal = val.slice(0, 5) + '......' + val.slice(37, 43)
      } else {
        this.valVal = ''
      }
    },
  },
  computed: {},
  methods: {
    goHome(item) {
      if (this.$route.name !== item) {
        this.$router.replace({ name: item })
      }
    },

    connectCli() {
      let { name } = this.$route
      if (name == 'node') {
        this.$emit('onneCli')
      }
      this.logs()

      this.checkChain()
    },

    seleChange(e) {
      if (e == 'logout') {
        this.textText = ''
        window.textText = ''
        this.$emit('clearCl')
      }
    },
    checkMetaMaskExtension() {
      if (!window.ethereum) {
        this.$message.error(
          'Please install the MetaMask wallet plug-in and try again!'
        )
      }
    },
    async accountAuthorization() {
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
      } catch (err) {
        console.log(err)
        this.$message.error('Account authorization failed!')
      }
    },
    addChain() {
      let defaultChainJSON = JSON.parse(process.env.VUE_APP_DEFAULT_CHAIN)
      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: defaultChainJSON,
        })
        .then(() => {
          this.watchToken()
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('Failed to add a default network to MetaMask!')
        })
    },
    async watchToken() {
      try {
        let defaultTokenJSON = JSON.parse(process.env.VUE_APP_DEFAULT_TOKEN)
        console.log(defaultTokenJSON)
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: defaultTokenJSON,
        })
      } catch (err) {
        console.log(err)
        this.$message.error('Failed to add a default token to default network!')
      }
    },
    switchChain() {
      let defaultChainId = Web3.utils.numberToHex(
        process.env.VUE_APP_DEFAULT_CHAIN_ID
      )
      window.ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: defaultChainId }],
        })
        .then(() => {
          this.watchToken()
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 4902) {
            this.addChain()
          }
        })
    },
    async checkChain() {
      this.checkMetaMaskExtension()
      this.accountAuthorization()
      this.switchChain()
    },
  },
  created() {},
  mounted() {
    let that = this
    this.textText = window.textText
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        let account = accounts[0]
        window.textText = account
        that.textText = account
        that.$emit('onneCli')
      })
    }
  },
}
</script>
<style scoped>
.tabBars {
  height: 76px;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  background-color: #ffffff;
  overflow-x: hidden;
}
.logoImgs {
  width: 84px;
}
.souCont {
  width: 400px;
  height: 76px;
  /* background-color: #ecf2f4;
  color: #7d8087; */
}
.souImg {
  width: 24px;
}
.fontsix {
  transition: all 0.3s;
  font-weight: 300;
  font-size: 16px;
}
.tabBars .ColoTexts {
  color: #409eff;
  transform: scale(1);
  font-weight: bold;
}
.tabBars .texts {
  color: #999999;
  transform: scale(0.8);
}
/* ::v-deep .el-button {
 
} */
::v-deep .souCont .el-form-item {
  margin-bottom: 0px;
}
::v-deep .radios .el-input__inner {
  border-radius: 40px;
}
::v-deep .inputRad .el-input__inner {
  border-radius: 40px;
  padding-right: 80px;
}
::v-deep .inputRad .orig {
  border-radius: 40px;
}
::v-deep .inputRad .el-input__suffix {
  right: 0px;
}
</style>
