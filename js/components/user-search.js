class UserSearch {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('user-search', {
      template: `
        <div class="search-form">
          <input placeholder="Search by name" @input="onInput" />
          <button class="white search" type="button">
            <span class="lnr lnr-magnifier"></span>
          </button>
        </div>
      `,
      methods: {
        onInput(e) {
          this.$emit('term-change', e.target.value.toLowerCase());
        }
      }
    });
  }
}