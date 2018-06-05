class Advisors extends Base {

  initElements() {
    super.initElements();

    this.header.setMenuToDark();
    this.header.hideSearch();

    this.initVue();
  }

  initVue() {
    // init vue components
    new MapContainer();
    new MapPopup();
    new CurrentFilters();
    new UserSearch();
    new NoResults();

    // init vue instance
    new Vue({
      data() {
        return { 
          allPosts: [],
          posts: [],
          isNoResults: false,
          isMapView: true,
          filters: [],
          dropdownDiv: null,
        };
      },
      created() {
        $.getJSON("/wp-json/advisors/get-all-posts", (data) => {
          this.allPosts = data;
          this.posts = data;
        })
      },
      mounted() {
        this.dropdownDiv = $('.ui.dropdown')
        this.resetDropdown();
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
        },
        filterList(e) {
          const target = e.currentTarget;
          const filterVal = target.getAttribute('data-value');
          if (filterVal != '') {
            const filteredPosts = this.allPosts.filter(post => post.province == filterVal);
            this.updatePosts(filteredPosts);
            this.filters = [{
              value: filterVal,
              label: target.getElementsByClassName('label')[0].innerText
            }];
          } else {
            this.displayAll();
          }
        },
        onFilterRemoved(filterToRemove) {
          this.displayAll();
          this.resetDropdown();
        },
        displayAll() {
          this.isNoResults = false;
          this.posts = this.allPosts;
          this.filters = [];
        },
        onTermChange(searchTerm) {
          const filteredPosts = this.allPosts.filter(post => {
            const nameOfPerson = post.name.toLowerCase();
            return nameOfPerson.indexOf(searchTerm) > -1;
          });
          this.updatePosts(filteredPosts);
        },
        resetDropdown() {
          this.dropdownDiv.dropdown('set selected', '');
        },
        updatePosts(filteredPosts) {
          this.isNoResults = (filteredPosts.length == 0);
          this.posts = filteredPosts;
        }
      }
    }).$mount('#app');
  }

  destroy(playAnimation) {
    this.header.showSearch();

    super.destroy(playAnimation);
  }

};