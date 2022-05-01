<template>
  <div class="profile">
    <div class="name section">
      <h1>長谷川 泰斗</h1>
      <h2>TAITO HASEGAWA</h2>
    </div>
    <div class="career section">
      <p>1998 / 茨城県生まれ</p>
      <p>2019 \ 茨城工業高等専門学校 電子制御工学科 卒業</p>
      <p>2019 / 筑波大学 芸術専門学群 情報・プロダクトデザイン領域</p>
    </div>
    <div class="field section">
      <p>PRODUCT / UIUX / GRAPHIC / PLANNING</p>
    </div>
    <ul class="link section">
      <li>
        <p>TWITTER</p>
        <a href="https://twitter.com/taito_hasegawa" target="_blank"
          >@taito_hasegawa</a
        >
      </li>
      <li>
        <p>INSTAGRAM</p>
        <a href="https://www.instagram.com/taito_hasegawa/" target="_blank"
          >@taito_hasegawa</a
        >
      </li>
      <li>
        <p>CONTACT</p>
        <a href="mailto:hello@taito-hasegawa.com">hello@taito-hasegawa.com</a>
      </li>
    </ul>
    <div class="version-text section">
      <div>
        <p>PORTFOLIO</p>
        <p>VER</p>
        <p>4.0.1</p>
      </div>
      <div>
        <p>DESIGN</p>
        <p>AND</p>
        <p>DEVELOP</p>
      </div>
      <div>
        <p>BY</p>
        <p>TAITO HASEGAWA</p>
        <p>2022</p>
      </div>
    </div>
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

  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;

  position: relative;

  .section {
    margin-bottom: 64px;
    line-height: 100%;
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
      margin-bottom: 8px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      margin-bottom: 24px;
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

  .link.section {
    margin-bottom: 0;
  }
}

.version-text {
  width: auto;
  height: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 24px;

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
      color: $white;
    }
  }
}

@media screen and (max-width: 800px) {
  .profile {
    padding: 72px 12px 0 0;
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
}
</style>