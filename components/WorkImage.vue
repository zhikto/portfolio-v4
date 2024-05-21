<template>
  <div>
    <picture class="work-image" v-show="$route.path == '/'">
      <source :srcset="work.thumbnail.url + '?fm=webp'" type="image/webp" />
      <img :src="work.thumbnail.url" />
    </picture>
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