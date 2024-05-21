<template>
  <div class="container">
    <div class="profile-container">
      <picture class="profile-image">
        <source :srcset="profile.profileImage.url + '?fm=webp'" type="image/webp" />
        <img :src="profile.profileImage.url" />
      </picture>
      <div class="profile">
        <div class="name section">
          <h1>{{ profile.name }}</h1>
          <h2>{{ profile.nameEn }}</h2>
        </div>
        <div class="intro section">
          <p>{{ profile.intro }}</p>
        </div>
        <div class="field section">
          <p>{{ profile.field }}</p>
        </div>
        <div class="career section" v-html="profile.career"></div>
        <div class="version section">
          <div>
            <p>PORTFOLIO</p>
            <p>VER</p>
            <p>{{ profile.version }}</p>
          </div>
          <div>
            <p>DESIGN</p>
            <p>AND</p>
            <p>DEVELOP</p>
          </div>
          <div>
            <p>BY</p>
            <p>TAITO HASEGAWA</p>
            <p>2024</p>
          </div>
        </div>
      </div>
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
    const profile = await $microcms.get({
      endpoint: "profile",
      queries: {
        limit: 100,
      },
    });
    return {
      profile: profile,
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

.profile-image {
  width: 560px;
  height: 100vh;

  img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    object-fit: cover;
  }
}

.profile {
  padding: 120px 40px;
  width: 100%;
  color: $black;

  height: 100vh;

  position: relative;
  overflow-y: scroll;

  .section {
    margin-bottom: 64px;
    font-weight: normal;
    will-change: opacity, transform;
    transform: translate3d(0, 0, 0);
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .name {
    h1 {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: normal;
    }

    h2 {
      font-size: 14px;
      font-weight: normal;
    }
  }

  .career {
    h5 {
      font-size: 12px;
      line-height: 100%;
      margin-bottom: 8px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 240%;
      margin-bottom: 64px;
      font-weight: normal;

      a {
        text-decoration: none;
        color: $orange;
      }
    }
  }

  .intro {
    p {
      font-size: 14px;
      line-height: 160%;
      font-weight: normal;
    }
  }

  .field {
    p {
      font-size: 14px;
      line-height: 100%;
      font-weight: normal;
    }
  }

  .version {
    width: auto;
    height: auto;
    padding-top: 80px;

    div {
      display: flex;
      width: 128px;
      justify-content: space-between;

      p {
        font-family: ocr-b-std, monospace;
        font-weight: 400;
        font-style: normal;
        font-size: 10px;
        line-height: 100%;
        letter-spacing: -0.08rem;
        font-feature-settings: "palt";
        color: $black;
      }
    }
  }
}

.profile-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  will-change: opacity;
  transform: translate3d(0, 0, 0);
}

.profile::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .profile {
    padding: 72px 24px 120px !important;
    width: 100%;
    justify-content: flex-start;

    .section {
      margin-bottom: 40px;
    }

    .name {
      h1 {
        font-size: 14px;
        margin-bottom: 8px;
      }

      h2 {
        font-size: 10px;
      }
    }

    .career {
      h5 {
        font-size: 8px;
        margin-bottom: 4px;
      }

      p {
        font-size: 10px;
        margin-bottom: 16px;
      }
    }

    .field {
      p {
        font-size: 10px;
      }
    }

    .link {
      li {
        height: 32px;

        p {
          font-size: 10px;
        }

        a {
          font-size: 10px;
        }
      }
    }
  }

  .version-text {
    position: initial;
    bottom: 0;
    right: 0;
    padding: 0;
    margin-top: 80px;

    div {
      display: flex;
      width: 128px;
      justify-content: space-between;
      transform-origin: center left;
      transform: scale(0.7);

      p {
        font-size: 9px;
      }
    }
  }

  .profile-container {
    display: block;
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 0;
  }

  .profile-image {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;

    img {
      width: 100%;
      height: 100%;
      filter: grayscale(100%);
      object-fit: cover;
    }
  }

  .profile {
    padding: 120px 40px;
    width: 100%;
    height: auto;

    .section {
      margin-bottom: 40px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .name {
      h1 {
        font-size: 20px;
        margin-bottom: 12px;
      }

      h2 {
        font-size: 12px;
      }
    }

    .career {
      h5 {
        font-size: 12px;
        line-height: 100%;
        margin-bottom: 8px;
        font-weight: normal;
      }

      p {
        font-size: 14px;
        line-height: 200%;
        margin-bottom: 64px;
        font-weight: normal;

        a {
          text-decoration: none;
          color: $orange;
        }
      }
    }

    .intro {
      p {
        font-size: 14px;
        line-height: 160%;
        font-weight: normal;
      }
    }

    .field {
      p {
        font-size: 14px;
        line-height: 100%;
        font-weight: normal;
      }
    }

    .version {
      width: auto;
      height: auto;
      padding-top: 80px;

      div {
        display: flex;
        width: 128px;
        justify-content: space-between;

        p {
          font-family: ocr-b-std, monospace;
          font-weight: 400;
          font-style: normal;
          font-size: 10px;
          line-height: 100%;
          letter-spacing: -0.08rem;
          font-feature-settings: "palt";
          color: $black;
        }
      }
    }
  }
}
</style>