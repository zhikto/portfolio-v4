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
  width: 560px;
  height: 100vh;

  img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    object-fit: cover;
  }
}

@media screen and (max-width: 800px) {
  .profile-image {
    width: 100%;
  }
}
</style>