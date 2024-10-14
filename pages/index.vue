<template>
  <div class="container">
    <!--作品一覧-->
    <div class="work-container">
      <nuxt-link v-for="work in work.contents" :key="work.id" :to="{ path: `/work/${work.id}` }" class="work-thumbnail">
        <!--作品画像-->
        <div class="work-image">
          <nuxt-img 
            :src="work.thumbnail.url" 
            alt="work.title"
            class="work-image"
            sizes="sm:480px md:800px lg:1024px"
            fit="cover"
            loading="lazy"
            format="webp"
            quality="80"
          />
        </div>
        <!--作品名・制作年-->
        <div class="work-info">
          <div class="info-text">
            <p>{{ work.workTag }}</p>
            <p>{{ work.period }}</p>
          </div>
          <p>{{ work.title }}</p>
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
    const work = await $microcms.get({
      endpoint: "work",
      queries: {
        limit: 100,
      },
    });
    return {
      work: work,
    };
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

.work-container {
  display: flex;
  flex-wrap: wrap;
  gap: 64px 40px;
  justify-content: center;

  padding: 64px;

  overflow-x: hidden;

  background-color: $background;

  .work-thumbnail {
    width: 480px;
    text-decoration: none;

    .work-info {
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
          font-size: 12px;
          margin: 16px 0;
        }
      }

      p {
        line-height: 100%;
        font-size: 20px;
      }
    }

    .work-image {
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

  .work-thumbnail:hover {
    .work-image {
      img {
        transform: scale(1.1);
        transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .work-container {
    padding: 24px 40px 120px 40px;
    gap: 32px;

    .work-thumbnail {
      .work-info {
        .info-text {
          p {
            font-size: 10px;
            margin: 12px 0;
          }
        }

        p {
          font-size: 16px;
        }
      }

      .work-image {
        border-radius: 6px;
      }
    }
  }
}
</style>