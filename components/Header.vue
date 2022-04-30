<template>
  <!--ヘッダー-->
  <div v-bind:class="[isActive ? 'active' : '']" class="header">
    <!--ロゴ-->
    <LogoAnimation />
    <div
      v-on:click="
        stateProfile();
        back();
        watcherActive();
        profileVisible();
      "
      v-bind:class="{ profilestate: isProfile, workstate: isWork }"
      class="menu"
    >
      <div class="el-container">
        <span></span>
        <span></span>
      </div>
    </div>
    <ProfileContainer />
  </div>
</template>

<script>
import anime from "animejs";

export default {
  data() {
    return {
      isActive: false,
      isProfile: false,
      isWork: false,
    };
  },
  watch: {
    $route: function (to, from) {
      if (to.path !== from.path) {
        this.stateWork();
      }
    },
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
    stateProfile() {
      if (this.$route.path == "/") {
        this.isProfile = !this.isProfile;
      }
    },
    stateWork() {
      if (this.$route.path != "/") {
        this.isWork = true;
      } else if (this.$route.path == "/") {
        this.isWork = false;
      }
    },
    back() {
      if (this.$route.path != "/") {
        this.$router.go(-1);
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
  height: 100%;

  border-right: 1px solid $white;

  z-index: 999;

  background-color: $black;

  transition: all 800ms 0s cubic-bezier(0.86, 0, 0.07, 1);

  will-change: min-width;
  transform: translate3d(0,0,0);

  .main-logo {
    position: absolute;
    top: 0;
    left: 0;

    margin-top: 40px;
  }
}

.header.active {
  min-width: calc(100vw - 88px);

  .profile-container {
    display: flex;
  }
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.el-container,
span {
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

.el-container {
  position: relative;
  width: 24px;
  height: 16px;
  background: none;
  border: none;
  appearance: none;
  cursor: pointer;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
  }

  span:nth-of-type(1) {
    top: 0;
  }
  span:nth-of-type(2) {
    bottom: 0;
  }
}

.menu.profilestate {
  .el-container {
    span:nth-of-type(1) {
      transform: translateY(7px) rotate(-45deg);
    }
    span:nth-of-type(2) {
      transform: translateY(-7px) rotate(45deg);
    }
  }
}

.menu.workstate {
  .el-container {
    span:nth-of-type(1),
    span:nth-of-type(2) {
      width: 22px;
    }
    span:nth-of-type(1) {
      transform: translateY(1px) rotate(-35deg);
    }
    span:nth-of-type(2) {
      transform: translateY(-1px) rotate(35deg);
    }
  }
}

.menu:hover {
  .el-container {
    transform: scale(0.9);
    transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
  }
}

.menu:active {
  .el-container {
    transform: scale(0.8);
    transition: all 0.1s cubic-bezier(0.86, 0, 0.07, 1);
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

  .menu {
    width: 48px;
  }

  .el-container {
    width: 18px;
    height: 12px;

    span {
      height: 1.5px;
    }
  }

  .menu.profilestate {
    .el-container {
      span:nth-of-type(1) {
        transform: translateY(5.2px) rotate(-45deg);
      }
      span:nth-of-type(2) {
        transform: translateY(-5.2px) rotate(45deg);
      }
    }
  }

  .menu.workstate {
    .el-container {
      span:nth-of-type(1),
      span:nth-of-type(2) {
        width: 15px;
      }
      span:nth-of-type(1) {
        transform: translateY(1.2px) rotate(-35deg);
      }
      span:nth-of-type(2) {
        transform: translateY(-1.2px) rotate(35deg);
      }
    }
  }

  .menu:hover {
    .el-container {
      transform: scale(1);
      transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  .menu:active {
    .el-container {
      transform: scale(1);
      transition: all 0.1s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
}
</style>