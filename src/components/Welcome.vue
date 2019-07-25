<template>
  <div class="hello">
    <img src="../../static/imgs/logo.jpeg">
    <h1>{{ msg }}</h1>
    <h2>{{ author }}</h2>
    <el-button class="el-button" type="success" plain icon="el-icon-video-play" @click="toGame">开始游戏</el-button>
    <el-button class="el-button" type="primary" plain icon="el-icon-search" @click="toGuide">查看指引</el-button>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: '欢迎使用期货交易游戏',
      author: '中金所实习生小组 --- 说不对就不队'
    }
  },
  methods: {
    toGame: function () {
      this.$router.push('/gameCenter');
    },
    toGuide: function () {
      this.$router.push('/guidePage')
    },
  },
  mounted: function () {
      this.$store.commit('clearData');
      this.$store.commit('clearGameLog');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .el-button{
    margin: 20px;
  }
</style>
