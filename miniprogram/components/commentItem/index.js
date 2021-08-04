// components/commentItem/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    commentItem: {
      type: Object,
      value: {}
    },
    myId: {
      type: String,
      value: ''
    },
    showReply: {
      type: Boolean,
      value: false
    },
    hasBorder: {
      type: Boolean,
      value: true
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onClickReply: function() {
      this.triggerEvent("clickReply", {
        id: this.properties.commentItem._id
      })
    }
  }
})
