<template>
  <div class="profile-container">
    <ProfileImage :profile="profile" />
    <Profile :profile="profile" />
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

.profile-container {
  display: none;
  align-items: center;
  margin-left: 88px;
  width: auto;
  height: 100vh;
}

@media screen and (max-width: 800px) {

  .profile-container {
    padding-top: 80px;
    margin-left: 48px;
  }
}
</style>