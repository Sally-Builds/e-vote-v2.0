<template>
  <div v-if="loaded" class="text-center">
    <span class="text-h6" style="color: #34495e;">Election starts: {{ display_days }}d : {{ display_hours }}h : {{ display_minutes }}m :
    {{ display_seconds }}s</span>
  </div>
</template>

<script>
export default {
  // props: ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'],
  props: {
    end: Object,
    start: Date,
  },
  data() {
    return {
      display_days: 0,
      display_hours: 0,
      display_minutes: 0,
      display_seconds: 0,
      loaded: false,
    }
  },
  computed: {
    seconds() {
      return 1000
    },
    minutes() {
      return this.seconds * 60
    },
    hours() {
      return this.minutes * 60
    },
    days() {
      return this.hours * 24
    },
    endTime() {
      return new Date(
        this.end.year,
        this.end.month,
        this.end.date,
        this.end.hour,
        this.end.minute,
        this.end.second,
        this.end.millisecond
      )
    },
    startTime() {
      return new Date(this.start)
    },
  },
  mounted() {
    // this.showRemaining(this.startTime, this.endTime)
    this.showRemaining()
  },
  methods: {
    formatNum(num) {
      return num < 10 ? '0' + num : num
    },
    showRemaining() {
      const timer = setInterval(() => {
        // const start = new Date()
        const distance = this.endTime.getTime() - this.startTime.getTime()
        if (distance < 0) {
          this.$emit('ended')
          clearInterval(timer)
          return
        }
        const days = Math.floor(distance / this.days)
        const hours = Math.floor((distance % this.days) / this.hours)
        const minutes = Math.floor((distance % this.hours) / this.minutes)
        const seconds = Math.floor((distance % this.minutes) / this.seconds)
        this.display_minutes = this.formatNum(minutes)
        this.display_seconds = this.formatNum(seconds)
        this.display_hours = this.formatNum(hours)
        this.display_days = this.formatNum(days)
        this.loaded = true
      }, 1000)
    },
  },
}
</script>