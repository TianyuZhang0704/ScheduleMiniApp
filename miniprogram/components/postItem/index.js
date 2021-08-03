// components/postItem/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    postItem: {
      type: Object,
      value: {}
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
    goToPost: function() {
      wx.navigateTo({
        url: `/subpages/postpage/index?postId=${this.properties.postItem._id}`,
      })
    }
  }
})
