class ListView {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('list-view', {
      props: ['posts'],
      template: `
        <ul>
          <li v-for="post in posts">
            <h3>{{post.name}}</h3>
            <h4>{{post.position}}</h4>
            <span class="address">{{ post.location.address }}</span>
          </li>
        </ul>
      `,
    });
  }
}