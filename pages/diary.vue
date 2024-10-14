<template>
  <div class="container">
    <!--作品一覧-->
    <div class="diary-container">
      <nuxt-link v-for="diary in diary.contents" :key="diary.id" :to="{ path: `/diary/${diary.id}` }"
        class="diary-thumbnail">
        <!--作品画像-->
        <div class="diary-image">
          <nuxt-img 
            :src="diary.thumbnail.url" 
            alt="diary.title"
            class="diary-image"
            sizes="sm:480px md:800px lg:1024px"
            fit="cover"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </div>
        <!--作品名・制作年-->
        <div class="diary-info">
          <div class="info-text">
            <p>{{ formatDate(diary.date) }}</p>
          </div>
          <p>{{ diary.title }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  layout: "default",
  head() {
    return {
      titleTemplate: null,
      title: "TAITO HASEGAWA",
    };
  },
  async asyncData({ $microcms }) {
    const diary = await $microcms.get({
      endpoint: "diary",
      queries: {
        limit: 100,
      },
    });
    return {
      diary: diary,
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
  },
  mounted() {
    /*
    anime({
      targets: ".work-image",
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutQuart",
      delay: anime.stagger(150),
    });
    */
    this.$adobeFonts(document);
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.diary-container {
  display: flex;
  flex-wrap: wrap;
  gap: 64px 40px;
  justify-content: center;

  padding: 64px;

  overflow-x: hidden;

  background-color: $background;

  .diary-thumbnail {
    width: 480px;
    text-decoration: none;

    .diary-info {
      /*
      position: absolute;
      bottom: 0;
      left: 0;
      */

      color: $black;

      z-index: 100;

      width: 100%;

      .info-text {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;

        p {
          line-height: 100%;
          font-size: 14px;
          margin: 16px 0;
        }
      }

      p {
        line-height: 100%;
        font-size: 24px;
      }
    }

    .diary-image {
      /*
      position: absolute;
      top: 0;
      left: 0;
      */
      will-change: opacity;
      transform: translate3d(0, 0, 0);
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s;
        transform: scale(1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
      }
    }
  }

  .diary-thumbnail:hover {
    .diary-image {
      img {
        transform: scale(1.1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .diary-container {
    padding: 24px 40px 120px 40px;
    gap: 40px;

    .diary-thumbnail {
      width: 480px;
      text-decoration: none;

      .diary-info {

        /*
      position: absolute;
      bottom: 0;
      left: 0;
      */
        .info-text {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;

          p {
            font-size: 12px;
            margin: 12px 0;
          }
        }

        p {
          font-size: 20px;
        }
      }

      .diary-image {
        /*
      position: absolute;
      top: 0;
      left: 0;
      */
        will-change: opacity;
        transform: translate3d(0, 0, 0);
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.3s;
          transform: scale(1);
          transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
        }
      }
    }
  }
}
</style>