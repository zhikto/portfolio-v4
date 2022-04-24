<template>
  <div class="clock">{{ time }}</div>
</template>

<script>
export default {
  data() {
    return {
      time: "00:00",
    };
  },
  mounted: function () {
    let timerID = setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime: function () {
      let current_date = new Date();
      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ":" +
        this.zeroPadding(current_date.getMinutes(), 2);
    },
    zeroPadding: function (num, len) {
      let zero = "";

      for (var i = 0; i < len; i++) {
        zero += "0";
      }

      return (zero + num).slice(-len);
    },
  },
};
</script>

<style lang="scss">
@import "assets/style/global.scss";
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

@media screen and (max-width: 800px) {
  .clock {
    width: 48px;

    margin-bottom: 24px;

    font-size: 10px;
  }
}
</style>