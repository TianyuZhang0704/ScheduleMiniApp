// components/scheduleCourseList/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    courseItem: {
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
    onAdd: function() {
      this.triggerEvent('onAdd', {
        name: this.properties.courseItem.name,
        code: this.properties.courseItem.code,
        section: this.properties.courseItem.section
      })
    }
  }
})
