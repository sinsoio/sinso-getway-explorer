import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      textText: '',
    }
  },
  computed: {},
  methods: {
    numberHandle(amount) {
      return new BigNumber(amount).div(new BigNumber(10).pow(18)).toFixed(8)
    },
    checkMetaMaskExtension() {
      if (!window.ethereum) {
        this.$message.error(
          'Please install the MetaMask wallet plug-in and try again!'
        )
      }
    },
    accountAuthorization() {
      window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts) => {
          this.textText = accounts[0]
          window.textText = this.textText
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.')
          } else {
            this.$message.error('Account authorization failed!')
          }
        })
    },
    rowClass() {
      return 'background: #ECF2F4;'
    },
    //
    goLink() {
      window.location.href = 'https://www.whitelist.vip'
    },
    goBacks() {
      window.location.href = 'https://docs.whitelist.vip'
    },
  },
  created() {},
  mounted() {},
}
