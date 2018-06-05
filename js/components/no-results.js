class NoResults {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('no-results', {
      template: `
        <div class="no-results">
          No results were found. Please try your search again.
        </div>
      `,
    });
  }
}