<template>
  <div class="container">
    <WorkContainer v-if="$route.path == '/'" :work="work" />
    <DetailContainer v-else :work="work" />
  </div>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.container {
  min-width: calc(100vw - 88px);
  height: 100vh;
  overflow-y: scroll;
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
