<template>
  <div class="detail-container">
    <!-- 作品説明または日記の表示 -->
    <div class="work-about">
      <div class="work-title section">
        <h1>{{ work.title }}</h1>
        <h2>{{ work.subTitle }}</h2>
        <p>{{ work.tag }}</p>
      </div>
      <ul class="work-info section">
        <li v-if="work.overview">
          <p>概要</p>
          <p>{{ work.overview }}</p>
        </li>
        <li v-if="work.theme">
          <p>テーマ</p>
          <p>{{ work.theme }}</p>
        </li>
        <li v-if="work.role">
          <p>担当</p>
          <p>{{ work.role }}</p>
        </li>
        <li v-if="work.period">
          <p>期間</p>
          <p>{{ work.period }}</p>
        </li>
      </ul>
      <div class="description section" v-html="work.text"></div>
      <div class="copyright">{{ work.copyright }}</div>
    </div>
    <!-- 画像ギャラリー -->
    <div class="work-image-gallery" :class="{ expanded: isGalleryExpanded }">
      <div class="image-list">
        <picture class="image-container">
          <source :srcset="work.thumbnail.url + '?fm=webp'" type="image/webp" />
          <img :src="work.thumbnail.url" />
        </picture>
        <picture v-for="(image, index) in work.workImage" :key="index" class="image-container">
          <source :srcset="image.Image.url + '?fm=webp'" type="image/webp" />
          <img :src="image.Image.url" />
        </picture>
      </div>
    </div>
    <div :class="['toggle-button', { 'expanded': isGalleryExpanded }]" @click="toggleGallery">
      <div class="toggle-circle"></div>
      <p class="toggle-name">GALLERY</p>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  props: {
    work: Object
  },
  mounted() {
    this.$adobeFonts(document);

    anime
      .timeline({
        easing: "easeInOutQuint",
      })
      .add({
        targets: ".section",
        opacity: [0, 1],
        duration: 800,
        translateY: [50, 0],
        delay: anime.stagger(100),
      })
      .add(
        {
          targets: ".image-container",
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(100),
        },
        "-=800"
      );
  },
  data() {
    const url = "https://taito-hasegawa.com" + `${this.$route.path}`;
    return {
      meta: {
        type: "article",
        url: url,
      },
      isGalleryExpanded: false,
    };
  },
  methods: {
    toggleGallery() {
      this.isGalleryExpanded = !this.isGalleryExpanded;
      if (this.isGalleryExpanded) {
        anime({
          targets: ".expanded .image-container",
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(100),
        });
      }
    }
  },
  head() {
    return {
      title: this.work ? this.work.title : '',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.work ? this.work.subTitle : '',
        },
        { hid: "og:type", property: "og:type", content: this.meta.type },
        { hid: "og:title", property: "og:title", content: this.work ? this.work.title : '' },
        {
          hid: "og:description",
          property: "og:description",
          content: this.work ? this.work.subTitle : '',
        },
        { hid: "og:url", property: "og:url", content: this.meta.url },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";

.work-image-gallery {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background-color: $background;

  .image-list {
    background-color: $background;

    .image-container {
      border-bottom: 1px solid $white;
      will-change: transform, opacity;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;

      &:last-child {
        border-bottom: 0;
      }

      img {
        width: 100%;
      }
    }
  }

  &.expanded .image-list .image-container {
    display: block !important;
  }
}

.work-image-gallery::-webkit-scrollbar {
  display: none;
}

.work-about {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  padding: 80px 40px;
  background-color: $background;
  color: $black;

  .section {
    margin-bottom: 64px;
    will-change: transform, opacity;
  }

  .work-title {
    h1 {
      font-size: 40px;
      margin-bottom: 16px;
    }

    h2 {
      font-size: 16px;
      margin-bottom: 16px;
    }

    p {
      font-size: 14px;
    }
  }

  .work-info {
    padding: 0;

    li {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 14px;
      }
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  .description {
    h1 {
      font-size: 14px;
      margin-bottom: 24px;
    }

    h2 {
      font-size: 14px;
      margin-bottom: 24px;
    }

    p {
      font-size: 16px;
      line-height: 175%;
      margin-bottom: 48px;
      letter-spacing: 0.02rem;
      font-feature-settings: "palt";
      text-align: justify;
    }

    a {
      font-size: 16px;
      color: $orange;
      margin-bottom: 24px;
    }

    img {
      display: block;
      max-width: 100%;
    }

    iframe {
      aspect-ratio: 16 / 9;
      width: 100%;
      max-width: 100%;
      height: 100%;
      display: block;
    }
  }

  .copyright {
    display: block;
    width: 100%;
    font-family: ocr-b-std, monospace;
    font-weight: 400;
    font-style: normal;
    text-align: right;
    font-size: 10px;
    line-height: 100%;
    letter-spacing: -0.08rem;
    font-feature-settings: "palt";
  }
}

.work-about::-webkit-scrollbar {
  display: none;
}

.toggle-button {
  display: none;
}

@media screen and (max-width: 800px) {
  .work-image-gallery {
    width: 100%;
    height: auto;
    overflow-y: initial;

    .image-list {
      .image-container:not(:first-child) {
        display: none;
      }
    }
  }

  .work-about {
    width: 100%;
    height: auto;
    overflow-y: initial;
    padding: 40px 24px;

    .work-title {
      h1 {
        font-size: 20px;
        margin-bottom: 12px;
      }

      h2 {
        font-size: 12px;
        margin-bottom: 12px;
      }

      p {
        font-size: 8px;
      }
    }

    .work-info {
      li {
        width: 100%;
        margin-bottom: 8px;

        p {
          font-size: 10px;
        }
      }
    }

    .description {
      h1 {
        font-size: 12px;
        margin-bottom: 24px;
      }

      h2 {
        font-size: 12px;
        margin-bottom: 24px;
      }

      p {
        font-size: 14px;
        margin-bottom: 40px;
      }

      a {
        font-size: 14px;
        margin-bottom: 40px;
      }
    }

    .copyright {
      font-size: 9px;
    }
  }

  .toggle-button {
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 107px;
    height: 40px;
    margin: 16px;
    background: $white;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;

    .toggle-circle {
      width: 32px;
      height: 32px;
      background: $blue;
      border-radius: 50%;
      position: absolute;
      top: 4px;
      left: 4px;
      transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    }

    .toggle-name {
      font-size: 10px;
      color: $blue;
      line-height: 40px; /* Central alignment vertically */
      text-align: center; /* Central alignment horizontally */
      position: absolute;
      top: 0;
      right: 18px;
      transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  .toggle-button.expanded {
    background: $blue;

    .toggle-circle {
      background: $white;
      left: calc(100% - 36px);
    }

    .toggle-name {
      color: $white;
      right: calc(100% - 60px);
    }
  }
}
</style>