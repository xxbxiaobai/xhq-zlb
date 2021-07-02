<template>
  <div id="container">
    <iframe :src="url">
      <p>Your browser does not support iframes.</p>
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
        url:''
    };
  },
  created(){
      this.url = this.$route.query.url
  }
};
</script>


<style scoped lang="less">
#container {
  iframe {
    height: 100vh;
    width: 100vw;
    border: 0;
  }
}
</style>