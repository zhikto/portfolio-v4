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
  width: 100vw;
  height: var(--wh, 100vh);
  display: flex;
  overflow-x: hidden;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
}

.container {
  min-width: calc(100vw - 88px);
  height: 100%;
  overflow-y: scroll;
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
}

.container::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .container {
    min-width: calc(100vw - 48px);
  }
}
</style>