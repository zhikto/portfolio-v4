<template>
  <div class="profile-image">
    <img :src="profile.profileImage.url" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
.profile-image {
  width: 50%;

  img {
    width: 100%;
    filter: grayscale(100%);
  }
}

@media screen and (max-width: 800px) {
  .profile-image {
    width: 100%;
  }
}
</style>