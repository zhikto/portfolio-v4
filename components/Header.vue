<template>
  <!--ヘッダー-->
  <div
    v-on:click="
      watcherActive();
      profileVisible();
    "
    v-bind:class="[isActive ? 'active' : '']"
    class="header"
  >
    <!--ロゴ-->
    <img
      class="main-logo PC"
      src="@/assets/icon/icon-taito-88.svg"
      alt="logo"
    />
    <img
      class="main-logo SP"
      src="@/assets/icon/icon-taito-48.svg"
      alt="logo"
    />
    <div class="back" v-show="$route.path != '/'" @click="$router.go(-1)">
      <img class="PC" src="@/assets/icon/icon-arrow-88.svg" alt="arrow" />
      <img class="SP" src="@/assets/icon/icon-arrow-48.svg" alt="arrow" />
    </div>
    <Clock />
    <ProfileContainer :profile="profile" />
  </div>
</template>

<script>
import anime from "animejs";

export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    watcherActive() {
      if (this.$route.path == "/") {
        this.isActive = !this.isActive;
      }
    },
    profileVisible() {
      if (this.isActive) {
        var tl = anime.timeline({
          easing: "easeInOutQuint",
        });
        tl.add({
          targets: ".profile-container",
          opacity: [0, 1],
          duration: 1,
        })
          .add({
            targets: ".profile-image",
            delay: 200,
            duration: 500,
            scale: [0.9, 1],
            opacity: [0, 1],
          })
          .add(
            {
              targets: ".section",
              opacity: [0, 1],
              duration: 1000,
              translateY: [100, 0],
              delay: anime.stagger(100),
            },
            "-=500"
          );
      } else {
        anime({
          targets: ".profile-container",
          opacity: [1, 0],
          duration: 300,
          easing: "easeInOutQuint",
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
.header {
  width: 88px;
  min-width: 88px;
  height: 100vh;

  z-index: 999;

  cursor: pointer;

  background-color: $black;

  transition: all 600ms 0s cubic-bezier(0.86, 0, 0.07, 1);

  .main-logo {
    position: absolute;
    top: 0;
    left: 0;

    margin-top: 40px;
  }

  .back {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }
}

.header.active {
  min-width: calc(100vw - 88px);

  .profile-container {
    display: flex;
  }
}

@media screen and (max-width: 800px) {
  .header {
    width: 48px;
    min-width: 48px;

    .main-logo {
      margin-top: 24px;
    }
  }

  .header.active {
    min-width: calc(100vw - 48px);

    .profile-container {
      display: block;
    }
  }
}
</style>