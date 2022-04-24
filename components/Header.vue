<template>
  <!--ヘッダー-->
  <div
    v-on:click="$route.path == '/' ? (isActive = !isActive) : ''"
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
    <div class="clock">{{ time }}</div>
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
      time: "00:00",
    };
  },
  mounted: function () {
    let timerID = setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime: function () {
      let current_date = new Date();
      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ":" +
        this.zeroPadding(current_date.getMinutes(), 2);
    },
    zeroPadding: function (num, len) {
      let zero = "";

      for (var i = 0; i < len; i++) {
        zero += "0";
      }

      return (zero + num).slice(-len);
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

  transition: all 300ms 0s ease;

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

  .clock {
    width: 88px;

    margin-bottom: 40px;

    position: absolute;
    bottom: 0;

    font-size: 16px;
    color: $white;
    text-align: center;
    line-height: 100%;
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

    .clock {
      width: 48px;

      margin-bottom: 24px;

      font-size: 10px;
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