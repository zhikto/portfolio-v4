<template>
  <div class="base-container">
    <Header />
    <div class="container">
      <div class="detail-container">
        <!--作品画像ギャラリー-->
        <div class="work-image-gallery">
          <div class="image-list">
            <div class="image-container">
              <img :src="work.thumbnail.url" alt="" />
            </div>
          </div>
        </div>
        <!--作品説明-->
        <div class="work-about">
          <div class="work-title section">
            <h1>{{ work.title }}</h1>
            <h2>{{ work.subTitle }}</h2>
            <p>{{ work.workTag }}</p>
          </div>
          <ul class="work-info section">
            <li v-show="work.overview">
              <p>概要</p>
              <p>{{ work.overview }}</p>
            </li>
            <li v-show="work.theme">
              <p>テーマ</p>
              <p>{{ work.theme }}</p>
            </li>
            <li v-show="work.role">
              <p>担当</p>
              <p>{{ work.role }}</p>
            </li>
            <li v-show="work.period">
              <p>期間</p>
              <p>{{ work.period }}</p>
            </li>
          </ul>
          <div class="description section" v-html="work.text"></div>
          <div class="copyright">©TAITO HASEGAWA</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms, params }) {
    const work = await $microcms.get({
      endpoint: `work/${params.id}`,
    });
    return {
      work,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/style/global.scss";

.detail-container {
  min-width: calc(100vw - 88px);
  height: 100vh;
  overflow-y: hidden;

  padding-left: 2px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px;

  overflow-x: hidden;

  background-color: $white;

  .work-image-gallery {
    width: 100%;
    overflow-y: scroll;
    background-color: $black;

    .image-list {
      background-color: $white;

      .image-container {
        padding-bottom: 2px;

        img {
          width: 100%;
        }
      }
    }
  }

  .work-image-gallery::-webkit-scrollbar {
    display: none;
  }

  .work-about {
    width: 100%;
    overflow-y: scroll;
    padding: 80px 40px;
    background-color: $black;
    color: $white;

    .section {
      margin-bottom: 64px;
    }

    .work-title {
      h1 {
        font-size: 40px;
        font-weight: normal;
        margin-bottom: 16px;
      }

      h2 {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 16px;
      }

      p {
        font-size: 14px;
        font-weight: normal;
      }
    }

    .work-info {
      padding: 0;

      li {
        width: 240px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 16px;
        }
      }

      :last-child {
        margin-bottom: 0;
      }
    }

    .description {
      h1 {
        font-size: 14px !important;
        font-weight: normal !important;
        margin-bottom: 24px !important;
      }

      h2 {
        font-size: 14px !important;
        font-weight: normal !important;
        margin-bottom: 24px !important;
      }

      p {
        font-size: 16px !important;
        font-weight: normal !important;
        line-height: 150% !important;
        margin-bottom: 24px !important;
      }

      a {
        font-size: 16px !important;
        font-weight: normal !important;
        color: $accent;
        margin-bottom: 24px !important;
      }

      img {
        display: block !important;
        max-width: 100% !important;
      }
    }

    .copyright {
      display: block;
      width: 100%;
      text-align: right;
      font-size: 12px;
    }
  }

  .work-about::-webkit-scrollbar {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .detail-container {
    min-width: calc(100vw - 48px);
    height: 100vh;
    overflow-y: scroll;

    padding-left: 1px;

    display: block;

    overflow-x: hidden;

    .work-image-gallery {
      width: 100%;
      overflow-y: initial;

      .image-list {
        .image-container {
          padding-bottom: 1px;
        }

        .image-container:not(:last-child) {
          display: none;
        }
      }
    }

    .work-about {
      width: 100%;
      overflow-y: initial;
      padding: 40px 24px;

      .copyright {
        display: block;
        width: 100%;
        font-size: 8px;
      }
    }
  }
}
</style>