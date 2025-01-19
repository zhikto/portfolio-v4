<template>
  <div class="diary-container">
    <!-- 日記の表示 -->
    <div class="diary-about">
      <div class="diary-top-image">
        <nuxt-img :src="diary.thumbnail.url" alt="diary.title" class="diary-top-image"
          sizes="sm:480px md:800px lg:1024px" fit="cover" loading="lazy" format="webp" quality="80" />
      </div>
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
  margin-bottom: 40px;
  width: 100%;
  aspect-ratio: 11 / 7;
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
      line-height: 1em;
      letter-spacing: -0.03em;
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
      font-size: 32px;
      font-weight: 600;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      margin: 80px 0 16px 0;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      margin: 40px 0 12px 0;
    }

    h3 {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      margin: 40px 0 12px 0;
    }

    p {
      font-size: 16px;
      line-height: 200%;
      margin: 24px 0 12px 0;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      text-align: justify;
    }

    ul {
      font-size: 16px;
      line-height: 200%;
      margin: 24px 0 12px 0;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      text-align: justify;
      padding-inline-start: 28px;
    }

    ol {
      font-size: 16px;
      line-height: 200%;
      margin: 24px 0 12px 0;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      text-align: justify;
      padding-inline-start: 28px;
    }

    hr {
      margin: 24px 0 12px;
    }

    blockquote {
      padding: 0 16px;
      margin: 16px 0;
      border-left: 2px solid #aaa;

      p {
        font-size: 14px;
        line-height: 200%;
        letter-spacing: 0.015rem;
        font-feature-settings: "palt";
        text-align: justify;
      }
    }

    a {
      font-size: 16px;
      color: $orange;
      letter-spacing: 0.015rem;
      font-feature-settings: "palt";
      margin: 24px 0 12px 0;
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      padding: 4px 0;
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
    grid-gap: 40px;

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
        font-size: 24px;
        margin: 40px 0 12px 0;
      }

      h2 {
        font-size: 20px;
        margin: 32px 0 8px 0;
      }

      h3 {
        font-size: 16px;
        margin: 32px 0 8px 0;
      }

      p {
        font-size: 14px;
        margin: 16px 0 4px 0;
      }

      ul {
        font-size: 14px;
        margin: 16px 0 4px 0;
        padding-inline-start: 24px;
      }

      ol {
        font-size: 14px;
        margin: 16px 0 4px 0;
        padding-inline-start: 24px;
      }

      blockquote {
        padding: 0 14px;
        margin: 14px 0;
        border-left: 2px solid #aaa;

        p {
          font-size: 12px;
        }
      }

      hr {
        margin: 16px 0 4px;
      }

      a {
        font-size: 14px;
        margin: 16px 0 4px 0;
      }
    }

    .copyright {
      font-size: 9px;
    }
  }
}
</style>
