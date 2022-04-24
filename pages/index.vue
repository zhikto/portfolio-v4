<template>
  <div class="base-container">
    <Header :profile="profile" />
    <Container :work="work" />
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms }) {
    const work = await $microcms.get({
      endpoint: "work",
    });
    const profile = await $microcms.get({
      endpoint: "profile",
    });
    return {
      work: work,
      profile: profile,
    };
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.base-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
}
</style>