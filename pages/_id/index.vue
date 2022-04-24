<template>
  <div class="base-container">
    <Header :profile="profile" />
    <Container :work="work" />
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms, params }) {
    const work = await $microcms.get({
      endpoint: `work/${params.id}`,
    });
    const profile = await $microcms.get({
      endpoint: "profile",
    });
    return {
      work,
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