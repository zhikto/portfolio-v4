<template>
  <div class="profile">
    <div class="name section">
      <h1>長谷川 泰斗</h1>
      <h2>TAITO HASEGAWA</h2>
    </div>
    <div class="career section">
      <h5>1998 /</h5>
      <p>茨城県生まれ</p>
      <h5>2019 \</h5>
      <p>茨城工業高等専門学校 電子制御工学科 卒業</p>
      <h5>2019 /</h5>
      <p>筑波大学 芸術専門学群 情報・プロダクトデザイン領域</p>
    </div>
    <div class="field section">
      <p>PRODUCT / UIUX / GRAPHIC / PLANNING</p>
    </div>
    <ul class="link section">
      <li>
        <p>TWITTER</p>
        <a href="https://twitter.com/taito_hasegawa" target="_blank">@taito_hasegawa</a>
      </li>
      <li>
        <p>INSTAGRAM</p>
        <a href="https://www.instagram.com/taito_hasegawa/" target="_blank">@taito_hasegawa</a>
      </li>
      <li>
        <p>CONTACT</p>
        <a href="mailto:info@taito-hasegawa.com">info@taito-hasegawa.com</a>
      </li>
    </ul>
  </div>
</template>

<script>
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
    padding: 72px 12px 0 0;
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