<template>
  <div
    v-on:click="stateProfile(), back()"
    v-bind:class="{ profilestate: isProfile, workstate: isWork }"
    class="menu"
  >
    <div class="el-container">
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-container,
span {
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

.el-container {
  position: relative;
  width: 28px;
  height: 18px;
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
      transform: translateY(8px) rotate(-45deg);
    }
    span:nth-of-type(2) {
      transform: translateY(-8px) rotate(45deg);
    }
  }
}

.menu.workstate {
  .el-container {
    span:nth-of-type(1),
    span:nth-of-type(2) {
      width: 24px;
    }
    span:nth-of-type(1) {
      transform: rotate(-42deg);
    }
    span:nth-of-type(2) {
      transform: rotate(42deg);
    }
  }
}

@media screen and (max-width: 800px) {
  .menu {
    width: 48px;
    height: 100vh;
  }

  .el-container {
    width: 20px;
    height: 14px;

    span {
      height: 1px;
    }
  }

  .menu.profilestate {
    .el-container {
      span:nth-of-type(1) {
        transform: translateY(6.5px) rotate(-45deg);
      }
      span:nth-of-type(2) {
        transform: translateY(-6.5px) rotate(45deg);
      }
    }
  }

  .menu.workstate {
    .el-container {
      span:nth-of-type(1),
      span:nth-of-type(2) {
        width: 16px;
      }
      span:nth-of-type(1) {
        transform: translateY(1px) rotate(-42deg);
      }
      span:nth-of-type(2) {
        transform: translateY(-1px) rotate(42deg);
      }
    }
  }
}
</style>