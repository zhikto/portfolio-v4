<template>
  <div class="container">
    <!--作品一覧-->
    <div class="work-container">
      <nuxt-link
        v-for="work in work.contents"
        :key="work.id"
        :to="`/${work.id}`"
        class="work-thumbnail"
      >
        <!--作品名・制作年-->
        <div class="work-info">
          <p>{{ work.title }}</p>
          <p>{{ work.workTag }}</p>
          <p>{{ work.period }}</p>
        </div>
        <!--作品画像-->
        <WorkImage :work="work" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  layout: "default",
  async asyncData({ $microcms }) {
    const work = await $microcms.get({
      endpoint: "work",
    });
    return {
      work: work,
    };
  },
  mounted() {
    anime({
      targets: ".work-image",
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutQuart",
      delay: anime.stagger(150),
    });
    this.$adobeFonts(document);
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.work-container {
  min-width: calc(100vw - 88px);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1px;

  overflow-x: hidden;

  background-color: $white;

  .work-thumbnail {
    position: relative;
    width: 100%;
    background-color: $black;

    .work-info {
      position: absolute;
      bottom: 0;
      left: 0;

      color: $white;

      z-index: 100;

      width: 100%;

      padding: 24px;

      p {
        line-height: 100%;

        &:nth-child(1) {
          font-size: 16px;
          margin-bottom: 16px;
        }
        &:not(:nth-child(1)) {
          font-size: 10px;
        }

        &:nth-child(2) {
          margin-bottom: 4px;
        }
      }
    }

    .work-image {
      position: absolute;
      top: 0;
      left: 0;
      will-change: opacity;
      transform: translate3d(0, 0, 0);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%);
        transition: 0.3s;
      }
    }

    //画像のグラデーション用
    .work-image::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }

    //画像とグラデーションのサイズ合わせ
    .work-image,
    .work-image::after {
      width: 100%;
      height: 100%;
    }
  }

  .work-thumbnail:hover {
    .work-image {
      img {
        filter: grayscale(0);
      }
    }
  }

  .work-thumbnail::before {
    content: "";
    display: block;
    padding-top: 66.67%;
  }
}

@media screen and (max-width: 800px) {
  .work-container {
    min-width: calc(100% - 48px);
    grid-template-columns: 1fr;

    .work-thumbnail {
      .work-info {
        padding: 16px;

        p {
          &:nth-child(1) {
            font-size: 14px;
            margin-bottom: 10px;
          }

          &:nth-child(2) {
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>