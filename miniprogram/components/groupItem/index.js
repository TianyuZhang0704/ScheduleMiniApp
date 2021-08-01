// components/groupItem/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    groupItem: {
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
    toPost: function() {
      wx.navigateTo({
        url: `/subpages/grouppage/index?code=${this.properties.groupItem.code}&postNum=${this.properties.groupItem.postNum}`,
      })
    }
  }
})
