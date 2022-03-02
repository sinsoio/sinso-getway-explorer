<template>
  <div>
    <TopBar />
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
              Settlement time 2022.03.01 00:00 to 2022.03.31 24:00
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
          <el-button @click="openDialog" type="primary" round
            >Settle accounts</el-button
          >
          <el-button type="primary" round>Inquire</el-button>
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
            >Return</el-button
          >
        </div>
      </div>
    </div>
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
          >Confirm</el-button
        >
      </div>
      <div v-if="inSuccess == 1">
        <div class="text-center lin-height-2">
          <p>Your node reward has been settled successfully！</p>
          <p>Please go to the corresponding network to check the wallet</p>
          <p>balance.</p>
        </div>
        <div class="padding-lr margin-tb-sm">
          <el-table :data="tableData" border :show-header="false">
            <el-table-column prop="date" align="center"> </el-table-column>
            <el-table-column prop="name" align="center"> </el-table-column>
          </el-table>
        </div>

        <el-button class="marlrAuto disBlock" type="primary"
          >Copy network information</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopBar from '../components/topBar'

export default {
  data() {
    return {
      settleStatus: false, //弹框
      inSuccess: 0, //1是成功 2加载中 0失败
      isSettlement: true, // 是否是结算完成后的状态
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
    openDialog() {
      this.settleStatus = true
    },
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
.el-button--primary {
  background-color: #00abeb;
  border-color: #00abeb;
}
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
