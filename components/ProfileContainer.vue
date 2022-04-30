<template>
  <div class="profile-container">
    <ProfileImage />
    <Profile />
  </div>
</template>

<script>
</script>

<style lang="scss">
@import "assets/style/global.scss";

.profile-container {
  display: flex;
  align-items: center;
  margin-left: 88px;
  width: auto;
  height: 100%;
  overflow-y: scroll;
  will-change: opacity;
  transform: translate3d(0,0,0);
}

.profile-container::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .profile-container {
    display: block;
    padding-top: 80px;
    padding-bottom: 120px;
    margin-left: 48px;
  }
}
</style>