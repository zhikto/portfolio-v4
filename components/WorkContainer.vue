<template>
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
        <p class="work-title">{{ work.title }}</p>
        <p class="work-date">{{ work.period }}</p>
      </div>
      <!--作品画像-->
      <div class="work-image">
        <img :src="work.thumbnail.url" alt="" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.work-container {
  min-width: calc(100vw - 88px);

  padding-left: 2px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px;

  overflow-x: hidden;

  background-color: $white;

  .work-thumbnail {
    position: relative;
    width: 100%;

    .work-info {
      position: absolute;
      bottom: 0;
      left: 0;

      display: flex;
      justify-content: space-between;
      align-items: center;

      color: $white;

      z-index: 100;

      width: 100%;
      height: 64px;

      padding-left: 24px;
      padding-right: 24px;

      .work-title {
        font-size: 16px;
      }

      .work-date {
        font-size: 16px;
      }

      .work-title,
      .work-date {
        line-height: 100%;
      }
    }

    .work-image {
      position: absolute;
      top: 0;
      left: 0;

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

    .work-image:hover::after img {
      filter: grayscale(0);
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
        transition: 0.2s;
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

    padding-left: 1px;

    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1px;

    .work-thumbnail {
      .work-info {
        height: 44px;

        padding-left: 16px;
        padding-right: 16px;

        .work-title {
          font-size: 12px;
        }

        .work-date {
          font-size: 12px;
        }
      }
    }
  }
}
</style>