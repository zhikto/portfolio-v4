<template>
  <div class="base-container" :style="style">
    <Header />
    <transition name="page">
      <nuxt />
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    style: {
      "--wh": "100vh",
    },
  }),
  mounted() {
    this.$nextTick(() => {
      this.getWindowSize();
      window.addEventListener("resize", this.getWindowSize);
    });
  },
  methods: {
    getWindowSize() {
      this.style["--wh"] = `${window.innerHeight}px`;
    },
  },
};
</script>


<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.base-container {
  width: 100%;
  background-color: $background;
}

.container {
  width: 100%;
  padding-left: 80px;
  background-color: $background;
}

.container::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .container {
    width: 100%;
    padding-top: 80px;
    padding-left: 0;
    background-color: $background;
  }
}
</style>