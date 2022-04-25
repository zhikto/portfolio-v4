<template>
  <picture class="profile-image">
    <img src="@/assets/img/profile.jpg" />
  </picture>
</template>

<script>
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