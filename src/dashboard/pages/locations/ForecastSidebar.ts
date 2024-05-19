import { defineComponent } from 'vue';
import weatherIconMixin from './weatherIconMixin';


export default defineComponent({
  mixins: [weatherIconMixin],
  props: {
    location: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showSidebar: this.show
    }
  },
  watch: {
    show: function(newVal) {
      this.showSidebar = newVal;
    },
    showSidebar: function(newVal) {
      if (!newVal) {
        this.$emit('close');
      }
    }
  },
  methods: {
    close() {
        this.$emit('close');
    },
    getDayOfWeek(dateString: string) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    },
  },  
});
