class MapContainer {
  constructor() {
    this.init();
  }

  init() {
    Vue.component('map-container', {
      props: ['posts'],
      data() {
        return {
          mapViewDiv: null,
          map: null,
          markers: [],
          mapIcon: '',
          mapIconCurrent: '',
          bounds: null,
          selectedPost: null,
          selectedMarker: null,
          medalIcon: '',
          toShowInfo: true,
        }
      },
      template: `
        <div>
          <div class="map-container">Loading Map...</div>
          <div id="zoom-controls">
            <button @click="zoomIn">
              <span class="lnr lnr-zoom-in"></span>
            </button>
            <button @click="zoomOut">
              <span class="lnr lnr-zoom-out"></span>
            </button>
          </div>
          <map-popup 
            :post="selectedPost" 
            :map="map"
            :selectedMarker="selectedMarker"
            :toShowInfo="toShowInfo"
            :medalIcon="medalIcon"
            @infoClosed="onInfoClosed"></map-popup>
        </div>
      `,
      mounted() {
        this.mapViewDiv = document.getElementById('map-view');
        this.mapIcon = this.mapViewDiv.getAttribute('data-map-icon');
        this.mapIconCurrent = this.mapViewDiv.getAttribute('data-map-icon-current');
        this.medalIcon = this.mapViewDiv.getAttribute('data-medal-icon');

        this.initMap();

        if (this.posts) {
          this.addMarkers();
        }
      },
      watch: {
        posts(newPosts) {
          if (this.posts) {
            this.markers.forEach((marker, index) => {
              marker.setMap(null);
            });
            this.markers = [];
          }
          this.addMarkers();
        }
      },
      methods: {
        initMap() {
          // init the map
          const mapContainer = this.mapViewDiv.getElementsByClassName('map-container')[0];
          const mapOptions = {
            zoom: 14,
            draggable: true,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(mapContainer, mapOptions);
          
          // style the map
          const styledMap = new google.maps.StyledMapType(mapStyle, {
            name: 'Styled Map'
          });
          this.map.mapTypes.set('map_style', styledMap);
          this.map.setMapTypeId('map_style');

          // add custom zoom buttons
          const zoomControlDiv = document.getElementById('zoom-controls');
          this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
        },
        addMarkers() {
          // add markers
          this.bounds = new google.maps.LatLngBounds();
          this.posts.forEach((post) => {
            const position = new google.maps.LatLng(post.location.latitude, post.location.longitude);
            const marker = new google.maps.Marker({
              position, 
              map: this.map,
              icon: this.mapIcon
            });
            this.markers.push(marker);
            this.map.fitBounds(this.bounds.extend(position), 50);
          });

          // init marker events
          this.markers.forEach((marker, index) => {
            marker.addListener('click', (e) => {
              marker.setIcon(this.mapIconCurrent);
              if (this.selectedMarker !== marker) {
                this.markers.map((mappedMarker) => {
                  if (mappedMarker !== marker) {
                    mappedMarker.setIcon(this.mapIcon);
                  }
                });
                this.selectedMarker = marker;
                this.selectedPost = this.posts[index];
                // console.log(this.selectedPost);
              }
              this.toShowInfo = true;
            });
          });
        },
        zoomIn() {
          this.map.setZoom(this.map.getZoom() + 1);
        },
        zoomOut() {
          this.map.setZoom(this.map.getZoom() - 1);
        },
        onInfoClosed() {
          this.selectedMarker.setIcon(this.mapIcon);
          this.toShowInfo = false;
        }
      }
    });
  }
}