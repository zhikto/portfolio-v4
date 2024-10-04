<template>
  <div class="diary-container">
    <!-- 日記の表示 -->
    <div class="diary-about">
      <picture class="diary-top-image">
        <source :srcset="diary.thumbnail.url + '?fm=webp'" type="image/webp" />
        <img :src="diary.thumbnail.url" />
      </picture>
      <div class="diary-title section">
        <h1>{{ diary.title }}</h1>
        <h2>{{ formatDate(diary.date) }}</h2>
      </div>
      <div class="description section" v-html="diary.text"></div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  layout: "default",
  props: {
    diary: Object
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
  methods: {
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
  },
  data() {
    const url = "https://taito-hasegawa.com" + `${this.$route.path}`;
    return {
      meta: {
        type: "article",
        url: url,
      },
    };
  },
  head() {
    return {
      title: this.diary ? this.diary.title : '',
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.diary ? this.diary.text : '',
        },
        { hid: "og:type", property: "og:type", content: this.meta.type },
        { hid: "og:title", property: "og:title", content: this.diary ? this.diary.title : '' },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.description,
        },
        { hid: "og:url", property: "og:url", content: this.meta.url },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";

.diary-top-image {
  padding-bottom: 40px;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.diary-container {
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  display: flex;
  justify-content: center;

  overflow-x: hidden;

  background-color: $background;
}

.diary-about {
  width: 560px;
  height: auto;
  overflow-y: scroll;
  //padding: 80px 40px;
  background-color: $background;
  color: $black;

  .section {
    margin-bottom: 64px;
    will-change: transform, opacity;
  }

  .diary-title {
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

  .diary-info {
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
      line-height: 200%;
      margin: 24px 0;
      letter-spacing: 0.015rem;
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
      height: auto;
      padding: 8px 0;
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

.diary-about::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .diary-container {
    width: 100%;
    height: auto;
    overflow-y: scroll;

    display: flex;
    grid-gap: 0;

    overflow-x: hidden;
  }

  .diary-image-gallery {
    width: 100%;
    overflow-y: initial;

    .image-list {
      .image-container:not(:first-child) {
        display: none;
      }
    }
  }

  .diary-about {
    width: 100%;
    height: auto;
    overflow-y: initial;
    //padding: 40px 24px;

    .diary-title {
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

    .diary-info {
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
        margin-top: 20px;
        margin-bottom: 20px;
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
}
</style>
