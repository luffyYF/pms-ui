<template>
  <div id="container">
    <script type="x-shader/x-vertex" id="vertexshader">
      attribute float scale;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = scale * ( 300.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    </script>

    <script type="x-shader/x-fragment" id="fragmentshader">
      uniform vec3 color;
      void main() {
        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        gl_FragColor = vec4( color, 1.0 );
      }
    </script>
  </div>
</template>

<script>
import Three from "three";

export default {
  data() {
    return {
      SEPARATION: 100,
      AMOUNTX: 50,
      AMOUNTY: 50,
      container: null,
      camera: null,
      scene: null,
      renderer: null,
      particles: null,
      count: 0,
      mouseX: 0,
      mouseY: 0,
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2
    };
  },
  methods: {
    init: function() {
      this.container = document.createElement("div");
      document.getElementById("container").appendChild(this.container);
      this.camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.z = 1000;
      this.scene = new Three.Scene();
      //
      var numParticles = this.AMOUNTX * this.AMOUNTY;
      var positions = new Float32Array(numParticles * 3);
      var scales = new Float32Array(numParticles);
      var i = 0,
        j = 0;
      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          positions[i] =
            ix * this.SEPARATION - this.AMOUNTX * this.SEPARATION / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] =
            iy * this.SEPARATION - this.AMOUNTY * this.SEPARATION / 2; // z
          scales[j] = 1;
          i += 3;
          j++;
        }
      }
      var geometry = new Three.BufferGeometry();
      geometry.addAttribute(
        "position",
        new Three.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("scale", new Three.BufferAttribute(scales, 1));
      var material = new Three.ShaderMaterial({
        uniforms: {
          color: { value: new Three.Color(0x097bdb) }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent
      });
      this.particles = new Three.Points(geometry, material);
      this.scene.add(this.particles);
      this.renderer = new Three.WebGLRenderer({ antialias: true,alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      document.addEventListener("mousemove", this.onDocumentMouseMove, false);
      document.addEventListener("touchstart", this.onDocumentTouchStart, false);
      document.addEventListener("touchmove", this.onDocumentTouchMove, false);

      window.addEventListener("resize", this.onWindowResize, false);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    onWindowResize: function() {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    onDocumentMouseMove: function(event) {
      this.mouseX = event.clientX - this.windowHalfX;
      this.mouseY = event.clientY - this.windowHalfY;
    },
    onDocumentTouchStart: function(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
    onDocumentTouchMove: function(event) {
      if (event.touches.length === 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - this.windowHalfX;
        this.mouseY = event.touches[0].pageY - this.windowHalfY;
      }
    },
    render: function() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      // this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;
      this.camera.position.y = 364;
      this.camera.lookAt(this.scene.position);
      var positions = this.particles.geometry.attributes.position.array;
      var scales = this.particles.geometry.attributes.scale.array;
      var i = 0,
        j = 0;
      for (var ix = 0; ix < this.AMOUNTX; ix++) {
        for (var iy = 0; iy < this.AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + this.count) * 0.3) * 50 +
            Math.sin((iy + this.count) * 0.5) * 50;
          scales[j] =
            (Math.sin((ix + this.count) * 0.3) + 1) * 8 +
            (Math.sin((iy + this.count) * 0.5) + 1) * 8;
          i += 3;
          j++;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.scale.needsUpdate = true;
      this.renderer.render(this.scene, this.camera);
      this.count += 0.1;
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style scoped>
#container {
  height: 400px;
}
</style>
