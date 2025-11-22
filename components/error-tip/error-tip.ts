Component({
  properties: {
    visible: { type: Boolean, value: false },
    title: String,
    message: String
  },
  methods: {
    onRetry() {
      this.triggerEvent('retry');
    }
  }
});
