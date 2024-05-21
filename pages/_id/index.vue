<template>
  <div class="container">
    <component :is="componentType" :work="content" v-if="isWork && content" />
    <component :is="componentType" :diary="content" v-if="isDiary && content" />
  </div>
</template>

<script>
import anime from "animejs";
import WorkContainer from '~/components/WorkContainer.vue';
import DiaryContainer from '~/components/DiaryContainer.vue';

export default {
  layout: "default",
  async asyncData({ $microcms, params, route, error }) {
    let endpoint;
    const path = route.path;

    // デバッグのために route.path をログ出力
    console.log('Route path:', path);

    // エンドポイント判定ロジック
    if (path.startsWith('/work')) {
      endpoint = 'work';
    } else if (path.startsWith('/diary')) {
      endpoint = 'diary';
    } else {
      console.error('Unknown path:', path);
      error({ statusCode: 404, message: 'Page not found' });
      return;
    }

    // エンドポイントとIDの確認のためにログ出力
    console.log(`Fetching data from endpoint: ${endpoint}/${params.id}`);

    try {
      const content = await $microcms.get({
        endpoint: `${endpoint}/${params.id}`,
      });
      return {
        content,
        type: endpoint
      };
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}/${params.id}:`, err);
      error({ statusCode: 500, message: 'Failed to fetch data from API' });
    }
  },
  computed: {
    componentType() {
      return this.isWork ? 'WorkContainer' : 'DiaryContainer';
    },
    isWork() {
      return this.type === 'work';
    },
    isDiary() {
      return this.type === 'diary';
    }
  },
  components: {
    WorkContainer,
    DiaryContainer
  },
  data() {
    const url = "https://taito-hasegawa.com" + `${this.$route.path}`;
    return {
      content: null, // contentを初期化
      type: '', // typeを初期化
      meta: {
        type: 'article',
        url: url,
        description: '',
        title: ''
      }
    };
  },
  watch: {
    content(newContent) {
      if (newContent) {
        this.meta.title = newContent.title;
        this.meta.description = newContent.subTitle;
      }
    }
  },
  mounted() {
    this.$adobeFonts(document);

    anime
      .timeline({
        easing: "easeInOutQuint",
      })
      .add({
        targets: ".section",
        opacity: [0, 1],
        duration: 800,
        translateY: [50, 0],
        delay: anime.stagger(100),
      })
      .add(
        {
          targets: ".image-container",
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(100),
        },
        "-=800"
      );
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description,
        },
        { hid: "og:type", property: "og:type", content: this.meta.type },
        { hid: "og:title", property: "og:title", content: this.meta.title },
        {
          hid: "og:description",
          property: "og:description",
          content: this.meta.description,
        },
        { hid: "og:url", property: "og:url", content: this.meta.url },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";

.detail-container {
  min-width: calc(100vw - 88px);
  height: 100%;
  overflow-y: hidden;

  display: grid;
  grid-template-columns: 560px 1fr;
  grid-gap: 1px;

  overflow-x: hidden;

  background-color: $background;
}

@media screen and (max-width: 800px) {
  .detail-container {
    min-width: calc(100vw - 48px);
    height: auto;
    overflow-y: scroll;

    display: flex;
    flex-direction: column-reverse;
    grid-gap: 0;

    overflow-x: hidden;
  }
}
</style>