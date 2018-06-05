class MapPopup {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('map-popup', {
      props: [
        'post', 
        'medalIcon',
        'map',
        'selectedMarker',
        'toShowInfo'
      ],
      data() {
        return {
          infoBox: null,
        }
      },
      template: `
        <div class="map-infobox" v-if="post">
          <div class="photo">
            <img :src="post.photo" />
            <div class="info">
              <h4>{{getName}}</h4>
              <h5 class="position">{{post.position}}</h5>
              <h5>{{post.company}}</h5>
            </div>
          </div>
          <div class="medal">
            <div class="membership">
              <img :src="medalIcon" />
              RIA Member: Advisor
            </div>
            <div class="social" v-if="post.social">
              <a v-if="post.social.linkedin" :href="post.social.linkedin" target="_blank">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div class="contact">
            <div class="left">
              <a :href="getPhone" v-if="post.contact.phone">
                <span class="lnr lnr-telephone"></span>
                <span class="label">Phone</span>
              </a>
              <a :href="getEmail">
                <span class="lnr lnr-envelope"></span>
                <span class="label">Email</span>
              </a>
              <a :href="post.website" v-if="post.website" target="_blank">
                <span class="lnr lnr-network"></span>
                <span class="label">Website</span>
              </a>
              <a :href="getDirectionUrl" target="_blank">
                <span class="lnr lnr-location"></span>
                <span class="label">Directions</span>
              </a>
            </div>
            <a class="right" :href="post.link">
              <span class="lnr lnr-arrow-right"></span>
              <span class="label">Bio</span>
            </a>
          </div>
          <button class="close" @click="hideInfoBox">
            <span class="lnr lnr-cross2"></span>
          </button>
        </div>
      `,
      computed: {
        getName() {
          if (this.post.nominals) {
            return `${this.post.name}, ${this.post.nominals}`;
          } else {
            return this.post.name;
          }
        },
        getPhone() {
          return `tel:${this.post.contact.phone}`;
        },
        getEmail() {
          return `mailto:${this.post.contact.email}`;
        },
        getDirectionUrl() {
          return `https://www.google.com/maps/place/${this.post.location.address}`;
        }
      },
      methods: {
        hideInfoBox() {
          this.infoBox.hide();
          this.$emit('infoClosed');
        }
      },
      updated() {
        const pos = this.selectedMarker.getPosition();
        if (this.infoBox) {
          this.infoBox.update(pos, this.$el);
        } else {
          this.infoBox = new InfoBox({
            position: pos,
            content: this.$el,
            map: this.map
          });
        }
        this.map.panTo(pos);
      },
      watch: {
        toShowInfo(val) {
          if (val) {
            this.infoBox.update(this.selectedMarker.getPosition(), this.$el);
          }
        }
      },
    });
  }
}