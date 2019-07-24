<template>
  <div class="usrOperPage">
      <div class="headerGuide">
        <h2 class="leftHead">游戏交易用户操作界面 --- {{mode}}</h2>
        <el-page-header @back="goBack" class="rightHead"></el-page-header>
      </div>
      <div class="bodyPart">
          <el-form :model="submitVal" :rules="rule" ref="transForm" class="form">
              <el-row class="row">
                    <el-col>
                        <el-form-item label="期货名称" prop="future">
                          <el-select v-model="submitVal.future" clearable>
                            <el-option
                              v-for="future in futuresOptions"
                              :key="future.id"
                              :label="future.name"
                              :value="future.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
              </el-row>
                <el-row class="row">
                  <el-col>
                      <el-form-item label="买卖方向">
                          <el-select v-model="submitVal.direction" disabled>
                            <el-option
                              v-for="direction in directionOptions"
                              :key="direction.id"
                              :label="direction.name"
                              :value="direction.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
              </el-row>
            <el-row class="row">
                <el-col>
                  <el-form-item label="交易数量" prop="orderVol">
                    <el-input v-model="submitVal.orderVol"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col>
                  <el-form-item label="交易价格" prop="orderPrice">
                    <el-input v-model="submitVal.orderPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
      </div>
      <div class="btns">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
      </div>
  </div>
</template>

<script>
    export default {
        name: "ursOperPage",
        data(){
            return  {
                mode: '',
                futuresOptions: this.$store.getters.checkFuture(),
                directionOptions: this.$store.getters.checkTransDireaction(),
                rule: {
                    future: [
                      { required: true, message: '请选择一个期货商品', trigger: 'blur' }
                    ],
                    orderVol: [
                      { required: true, message: '请选择买卖数量', trigger: 'blur'}
                    ],
                    orderPrice: [
                      { required: true, message: '请选择买卖价格', trigger: 'blur'}
                    ]
                },
                submitVal:{
                    future: '',
                    direction: '',
                    orderVol: '',
                    orderPrice: ''
                }
            }
        },
        mounted(){
            if(this.$route.params.mode === '0'){
                this.mode = '买入开仓';
                this.submitVal.direction = 0;
            }else if(this.$route.params.mode === '1'){
                this.mode = '卖出开仓';
                this.submitVal.direction = 1;
            }else if(this.$route.params.mode === '2'){
                this.mode = '买入平仓';
                this.submitVal.direction = 0;
            }else{
                this.mode = '卖出平仓';
                this.submitVal.direction = 1;
            }
        },
        methods: {
            goBack: function () {
                this.$router.replace('/gameCenter');
            },
            save: function () {
                this.$refs.transForm.validate((valid) => {
                    if(!valid){
                        this.$message({
                            type: 'error',
                            message: "请检查输入是否正确"
                        });
                    }else{
                        this.$confirm("确定提交交易申请吗？","提示",{
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }).then(() => {
                            this.$store.commit('transRequest',this.submitVal);
                            if(this.$store.getters.checkErrorMessage()){
                                this.$message({
                                  type: 'error',
                                  message: this.$store.getters.checkErrorMessage()
                                });
                                this.$store.commit('setGameLog',{time:this.$store.getters.checkCurTime(),content:'交易失败!原因:您的资金不够!'})
                            }else{
                                this.$store.commit('setGameLog',{time:this.$store.getters.checkCurTime(),content:'交易失败!原因:您的资金不够!'})
                            }
                            this.$router.push('/gameCenter');
                        })
                    }
                })
            },
            reset: function () {
                this.$refs.transForm.resetFields();
            }
        }
    }
</script>

<style scoped>
  .headerGuide{
    overflow: hidden;
    margin-bottom: 20px;
    padding: 15px;
    background: dodgerblue;
    color: white;
    border-radius: 10px;
  }
  .leftHead{
    margin: 0;
    padding: 0;
    float: left;
  }
  .rightHead{
    float:right;
    margin-top: 10px;
    margin-right: 10px;
  }
  .bodyPart{
    border: 1px solid silver;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    background: #fafafa;
  }
  .form{
    margin: auto;
  }
  .btns{
    float: right;
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>
