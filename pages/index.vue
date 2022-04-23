<template>
  <div class="base-container">
    <!--ヘッダー-->
    <div class="header">
      <!--ロゴ-->
      <img
        class="main-logo PC"
        src="@/assets/icon/icon-taito-88.svg"
        alt="logo"
      />
      <img
        class="main-logo SP"
        src="@/assets/icon/icon-taito-48.svg"
        alt="logo"
      />
      <div class="back" v-show="$route.path != '/'" @click="$router.go(-1)">
        <img class="PC" src="@/assets/icon/icon-arrow-88.svg" alt="arrow" />
        <img class="SP" src="@/assets/icon/icon-arrow-48.svg" alt="arrow" />
      </div>
      <div class="clock">12:24</div>
      <div class="profile-container">
        <div class="profile-image">
          <img :src="profile.profileImage.url" alt="" />
        </div>
        <div class="profile">
          <div class="name section">
            <h1>{{ profile.name }}</h1>
            <h2>{{ profile.nameEn }}</h2>
          </div>
          <div class="career section" v-html="profile.career"></div>
          <div class="field section">
            <p>{{ profile.field }}</p>
          </div>
          <ul class="link section">
            <li>
              <p>TWITTER</p>
              <a :href="profile.twitterLink">{{ profile.twitter }}</a>
            </li>
            <li>
              <p>INSTAGRAM</p>
              <a :href="profile.instagramLink">{{ profile.instagram }}</a>
            </li>
            <li>
              <p>CONTACT</p>
              <a :href="profile.contact">{{ profile.contact }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
            <p class="work-title">{{ work.title }}</p>
            <p class="work-date">{{ work.period }}</p>
          </div>
          <!--作品画像-->
          <div class="work-image">
            <img :src="work.thumbnail.url" alt="" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms }) {
    const work = await $microcms.get({
      endpoint: "work",
    });
    const profile = await $microcms.get({
      endpoint: "profile",
    });
    return {
      work,
      profile,
    };
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
@import "assets/style/reset.css";

.base-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.container {
  min-width: calc(100vw - 88px);
  height: 100vh;
  overflow-y: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

.header {
  width: 88px;
  min-width: 88px;
  height: 100vh;

  z-index: 999;

  cursor: pointer;

  background-color: $black;

  transition: all 300ms 0s ease;

  .main-logo {
    position: absolute;
    top: 0;
    left: 0;

    margin-top: 40px;
  }

  .back {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .clock {
    width: 88px;

    margin-bottom: 40px;

    position: absolute;
    bottom: 0;

    font-size: 16px;
    color: $white;
    text-align: center;
    line-height: 100%;
  }
}

.header:active {
  min-width: calc(100vw - 88px);

  .profile-container {
    display: flex;
  }
}

.profile-container {
  display: none;
  align-items: center;
  margin-left: 88px;
  width: auto;
  height: 100vh;

  .profile-image {
    width: 50%;

    img {
      width: 100%;
      filter: grayscale(100%);
    }
  }

  .profile {
    padding: 0 40px 0 40px;
    width: 50%;
    color: $white;

    .section {
      margin-bottom: 40px;
      line-height: 100%;
      font-weight: normal;
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
        margin-bottom: 4px;
        font-weight: normal;
      }

      p {
        font-size: 14px;
        margin-bottom: 16px;
        font-weight: normal;
      }
    }

    .field {
      p {
        font-size: 14px;
        font-weight: normal;
      }
    }

    .link {
      list-style: none;
      padding: 0;

      li {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-size: 14px;
          font-weight: normal;
        }

        a {
          font-size: 14px;
          color: $accent;
          text-decoration: none;
        }
      }
    }
  }
}

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
  .container {
    min-width: calc(100vw - 48px);
  }

  .header {
    width: 48px;
    min-width: 48px;

    .main-logo {
      margin-top: 24px;
    }

    .clock {
      width: 48px;

      margin-bottom: 24px;

      font-size: 10px;
    }
  }

  .header:active {
    min-width: calc(100vw - 48px);

    .profile-container {
      display: block;
    }
  }

  .profile-container {
    padding-top: 80px;
    margin-left: 48px;

    .profile-image {
      width: 100%;
    }

    .profile {
      padding: 72px 12px 0 12px;
      width: 100%;

      .section {
        margin-bottom: 32px;
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
  }

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
