export default {
  data() {
    return {
      contents: '', //
      textText: '',
    }
  },
  computed: {},
  methods: {

    isSucc(funs) {
      window.ethereum
        .request({
          method: 'eth_coinbase',
        })
        .then((res) => {
          console.log(res)
          if (!res) {
            console.log('Please connect to wallet address')
          } else {
            funs()
          }
        })
    },
    // lianjie huli
    logs() {
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((res) => {
            this.$message.success('Connection succeeded')
            this.textText = res[0]
            window.textText = this.textText
          })
          .catch((err) => {
            if (err.code === 4001) {
              this.$message.success('You declined authorization')
            } else {
              console.log(err)
              this.$message.success('Please connect Wallet')
            }
            this.isFrame = true
          })
      } else {
        this.isFrame = true
        this.$message.success('Please install metamask Wallet')
      }
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
  mounted() {
    // window.ethereum
    //   .request({
    //     method: 'wallet_requestPermissions',
    //     params: [{ eth_accounts: {} }],
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    // var info = infoContract.methods(
    //   '0xd372ec1b8a64443c2ef324b4c14a84ed74971558'
    // )
    // console.log(info)
  },
}
