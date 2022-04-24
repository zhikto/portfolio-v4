<template>
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
        <a :href="profile.twitterLink" target="_blank">{{ profile.twitter }}</a>
      </li>
      <li>
        <p>INSTAGRAM</p>
        <a :href="profile.instagramLink" target="_blank">{{ profile.instagram }}</a>
      </li>
      <li>
        <p>CONTACT</p>
        <a :href="'mailto:' + profile.contact">{{ profile.contact }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";

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

@media screen and (max-width: 800px) {
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
</style>