<template>
  <picture class="profile-image">
    <source :srcset="profile.profileImage.url + '?fm=webp'" type="image/webp" />
    <img :src="profile.profileImage.url">
  </picture>
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