class CurrentFilters {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('current-filters', {
      props: ['filters'],
      template: `
        <ul class="current-filters">
          <li v-for="filter in filters" :data-value="filter.value" @click="onFilterClick">
            {{filter.label}}
            <span class="lnr lnr-cross-circle"></span>
          </li>
        </ul>
      `,
      methods: {
        onFilterClick(e) {
          const removeFilterVal = e.currentTarget.getAttribute('data-value');
          this.$emit('filter-removed', removeFilterVal);
        }
      }
    });
  }
}