<template>
  <!--ヘッダー-->
  <div :class="['header', isActive ? 'active' : '']">
    <!--ロゴ-->
    <div class="logo">
      <nuxt-link to="/">長谷川泰斗</nuxt-link>
      <p>/</p>
      <p>{{ currentPage }}</p>
    </div>
    <div @click="handleClick" :class="{ profilestate: isProfile, workstate: isWork }" class="menu-circle"
      id="menu-circle">
      <div class="orange-circle" id="orange-circle"></div>
      <div class="white-circle"></div>
      <div class="menu-container" id="menu-container">
        <nuxt-link to="/" class="menu-text" id="works">WORKS</nuxt-link>
        <nuxt-link to="/about" class="menu-text" id="about">ABOUT</nuxt-link>
        <nuxt-link to="/diary" class="menu-text" id="diary">DIARY</nuxt-link>
      </div>
    </div>
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
      isMenu: true,
      currentPage: '',
      previousWidth: 0, // 初期値を設定
    };
  },
  watch: {
    $route(to) {
      this.updateCurrentPage(to);
    }
  },
  mounted() {
    // Ensure placeText is called after the DOM is fully loaded
    this.$nextTick(() => {
      this.updateTextPositions();

      // 初期の横幅を設定
      this.previousWidth = window.innerWidth;

      // ウィンドウのリサイズイベントをリッスン
      window.addEventListener('resize', this.handleResize);
    });

    // 初回のページ読み込み時に現在のページを設定
    this.updateCurrentPage(this.$route);
  },
  beforeDestroy() {
    // コンポーネントが破棄される前にリスナーを削除
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleClick() {
      this.profileVisible();
    },
    profileVisible() {
      const menuContainer = document.getElementById("menu-container");
      if (this.isMenu) {
        const tl = anime.timeline({
          easing: "easeInOutQuint",
        });
        tl.add({
          targets: "#orange-circle",
          scale: [1, 7],
          duration: 400,
        })
          .add({
            targets: "#menu-container",
            opacity: [0, 1],
            duration: 400,
            complete: () => {
              menuContainer.style.pointerEvents = 'auto';
            }
          }, "-=200")
          .add(
            {
              targets: "#menu-circle",
              delay: 10,
              rotate: 30,
              duration: 500,
            },
            "-=500"
          );
        this.isMenu = false;
      } else {
        const tl = anime.timeline({
          easing: "easeInOutQuint",
        });
        tl.add({
          targets: "#menu-container",
          opacity: [1, 0],
          duration: 500,
          begin: () => {
            menuContainer.style.pointerEvents = 'none'; // 追加
          }
        })
          .add({
            targets: "#menu-circle",
            delay: 20,
            rotate: -30,
            duration: 500,
          }, "-=500")
          .add(
            {
              targets: "#orange-circle",
              scale: [7, 1],
              duration: 400,
            },
            "-=200"
          );
        this.isMenu = true;
      }
    },
    updateCurrentPage(route) {
      const pathMap = {
        '/about': 'ABOUT',
        '/diary': 'DIARY',
      };

      if (route.path.startsWith('/work')) {
        this.currentPage = 'WORKS';
      } else if (route.path.startsWith('/diary')) {
        this.currentPage = 'DIARY';
      } else {
        this.currentPage = pathMap[route.path] || 'WORKS';
      }
    },
    handleResize() {
      if (window.innerWidth !== this.previousWidth) {
        this.previousWidth = window.innerWidth;
        this.updateTextPositions();
      }
    },
    updateTextPositions() {
      const worksElement = document.getElementById("works");
      const aboutElement = document.getElementById("about");
      const diaryElement = document.getElementById("diary");

      if (window.innerWidth < 800) {
        placeText(worksElement, 75, 145, true);
        placeText(aboutElement, 75, 105, true);
        placeText(diaryElement, 70, 65, true);
      } else {
        placeText(worksElement, 75, -110, false);
        placeText(aboutElement, 75, -70, false);
        placeText(diaryElement, 70, -30, false);
      }
    },
  },
};

function placeText(element, r, degrees, rotate180) {
  const container = document.getElementById("menu-container");

  const theta = degrees * (Math.PI / 180);

  // Convert polar coordinates to Cartesian coordinates
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);

  // Temporarily add the element to the DOM to measure its size
  container.appendChild(element);
  const rect = element.getBoundingClientRect();
  const textWidth = rect.width;
  const textHeight = rect.height;
  container.removeChild(element);

  // Adjust the position to make the center of the text align with the angle
  element.style.left = `calc(50% + ${x}px - ${textWidth / 2}px)`;
  element.style.top = `calc(50% + ${y}px - ${textHeight / 2}px)`;

  // Rotate the element to match the angle, with an optional 180-degree rotation
  const finalRotation = rotate180 ? theta + Math.PI : theta;
  element.style.transform = `rotate(${finalRotation}rad)`;

  container.appendChild(element);
}
</script>

<style lang="scss">
@import "assets/style/global.scss";

.header {
  width: 80px;
  min-width: 80px;
  height: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 999;
  background-color: $background;
  position: fixed;
  top: 0;
  bottom: 0;
}

.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  a,
  p {
    color: $black;
    text-decoration: none;
    writing-mode: vertical-rl;
    letter-spacing: 0.1em;
  }
}

.menu-circle {
  position: relative;
  width: 40px;
  height: 40px;
  margin: 20px;

  .orange-circle {
    width: 40px;
    height: 40px;
    background-color: $orange;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .white-circle {
    width: 8px;
    height: 8px;
    background-color: $white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
  }

  .menu-container {
    position: absolute;
    pointer-events: none;
    width: 280px;
    height: 280px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;

    .menu-text {
      position: absolute;
      transform-origin: center center;
      white-space: nowrap;
      text-decoration: none;
      color: $white;
      font-size: 20px;
    }
  }
}

.menu-circle:hover {
  .white-circle {
    width: 16px;
    height: 16px;
    transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@media screen and (max-width: 800px) {
  .header {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    padding-top: 0;
    padding-left: 24px;
    justify-content: space-between;
    z-index: 999;
    background-color: $background;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .logo {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 4px;

    a,
    p {
      color: $black;
      text-decoration: none;
      writing-mode: horizontal-tb;
      letter-spacing: 0.05em;
    }
  }
}
</style>