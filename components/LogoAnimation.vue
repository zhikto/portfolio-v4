<template>
  <div class="animation-container">
    <div class="anim" ref="lavContainer"></div>
  </div>
</template>

<script>
import lottie from "lottie-web";
import animationData from "@/assets/animation/taito-logo-motion.json";

export default {
  mounted() {
    this.logoAnim();
  },
  methods: {
    logoAnim() {
      var anim = lottie.loadAnimation({
        container: this.$refs.lavContainer,
        renderer: "svg",
        loop: 1,
        autoplay: true,
        animationData,
      });
    },
  },
};
</script>

<style lang="scss">
.animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  padding: 22px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 800px) {
  .animation-container {
    margin-top: 24px;
    width: 48px;
    padding: 12px;
  }
}
</style>
