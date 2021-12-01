<!--
* ----
* @author （cgt）
* @date 2020/7/30
-->
<template>
  <div>
    <TopBar @searchs="searchCli" />
    <div class="marlrAuto margin-top-xl widthCont">
      <el-table :data="list" border style="width: 100%" empty-text="No data">
        <el-table-column
          prop="name"
          label="address"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="state"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="staked"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="Total node revenue"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="Cashed rewards"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="Lock-up rewards"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="Cashable rewards"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="operation" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="showCli(scope.row)" size="small"
              >cashout</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- tankuang -->
    <el-dialog :visible.sync="isShow" width="600px" center title="cashout">
      <div class="flex align-center substance">
        <p>from adress:</p>
        <div>021fe8a5d3b7***********412e612c32</div>
      </div>
      <div class="flex align-center substance">
        <p>to adress:</p>
        <div>021fe8a5d3b7***********412e612c32</div>
      </div>
      <el-form>
        <el-form-item label="amount:" label-width="140px">
          <!--  @keyup.enter.native="doSearch" -->
          <el-input
            v-model="value"
            placeholder="Test wallet address"
            style="width: 300px"
          >
            <a slot="suffix" class="colos pointer">All</a>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex align-center substance">
        <p></p>
        <div class="coloCCC">Cashable amount：<a class="colos">12013</a></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">cancel</el-button>
        <el-button type="primary" @click="againProcess">determine</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TopBar from '../components/topBar'
export default {
  name: '',
  components: { TopBar },
  props: {},
  data() {
    return {
      value: '',
      list: [],
      isShow: false,
    }
  },
  computed: {},
  methods: {
    searchCli() {},
    showCli() {
      this.isShow = true
    },
    // queding
    againProcess() {},
  },
  created() {},
  mounted() {
    console.log(window.contents)
    console.log(this.contents)
    // this.contents = window.contents
  },
}
</script>
<style scoped></style>
