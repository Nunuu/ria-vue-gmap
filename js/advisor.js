class Advisors extends Base {

  initElements() {
    super.initElements();

    this.header.setMenuToDark();
    this.header.openSearch();

    this.initVue();
  }

  initVue() {
    // init components
    new MapContainer();
    new MapPopup();

    // init vue instance
    new Vue({
      data() {
        return { 
          posts: [],
          isMapView: true,
        };
      },
      created() {
        $.getJSON("/wp-json/advisors/get-all-posts", (data) => {
          this.posts = data;
        })
      },
      mounted() {
        $('.ui.dropdown').dropdown('set selected', '');
      },
      methods: {
        toggleView(e) {
          const $target = $(e.target);
          if ($target.hasClass('right')) {
            this.isMapView = false;
          } else {
            this.isMapView = true;
          }
          $target.removeClass('selected');
          $target.siblings().addClass('selected');
        }
      }
    }).$mount('#app');
  }

};