<template>
  <a @click="phone(num)" ref="p_a">
    <slot></slot>
  </a>
</template>
<script>
/**
 * 拨打电话
 */
export default {
  props: ["num"],
  methods: {
    phone(num) {
      if (num) {
          this.$refs.p_a.href = "tel:"+num
      } else {
        this.$toast("暂无联系方式");
      }
      return false;
    }
  }
};
</script>