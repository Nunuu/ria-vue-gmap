class InfoBox extends google.maps.OverlayView {

  constructor(args) {
    super();
    
    this.position = args.position;
    this.map = args.map;
    
    const pixelOffset = document.createElement('div');
    pixelOffset.classList.add('infobox-bubble-anchor');
    pixelOffset.appendChild(args.content);

    this.anchor = document.createElement('div');
    this.anchor.classList.add('infobox-tip-anchor');
    this.anchor.appendChild(pixelOffset);

    // Stops clicks, etc., from bubbling up to the map
    this.stopEventPropagation();

    this.setMap(this.map);
  }

  onAdd() {
    this.getPanes().floatPane.appendChild(this.anchor);
  }

  draw() {
    const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
    // Hide the popup when it is far out of view.
    const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.anchor.style.left = divPosition.x + 'px';
      this.anchor.style.top = divPosition.y + 10 + 'px';
    }
    if (this.anchor.style.display !== display) {
      this.anchor.style.display = display;
    }
  }

  onRemove() {
    if (this.anchor.parentElement) {
      this.anchor.parentElement.removeChild(this.anchor);
    }
  }

  stopEventPropagation() {
    var anchor = this.anchor;
    anchor.style.cursor = 'auto';

    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown'].forEach(function(event) {
      anchor.addEventListener(event, function(e) {
        e.stopPropagation();
      });
    });
  }

  update(position, content) {
    if (this.position === position) {
      this.show();
      return;
    }
    this.hide();
    this.position = position;
    this.draw();
    this.show();
  }

  hide() {
    if (this.anchor) {
      this.anchor.style.visibility = 'hidden';
    }
  }

  show() {
    if (this.anchor) {
      this.anchor.style.visibility = 'visible';
    }
  }

  /*toggle() {
    if (this.anchor) {
      if (this.anchor.style.visibility === 'hidden') {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  toggleDOM() {
    if (this.getMap()) {
      this.setMap(null);
    } else {
      this.setMap(this.map);
    }
  }*/

}