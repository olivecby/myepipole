
  var container, stats;
  var camera, scene, raycaster, renderer;

  var mouse = new THREE.Vector2(), INTERSECTED;
  var radius = 100, theta = 0;

  var notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

  init();
  animate();

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
    container.appendChild( info );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    var geometry = createGeometry();

    for ( var i = 0; i < 1000; i ++ ) {

      var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;

      scene.add( object );

    }

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  }

  function play() {
      var synth = new Tone.Synth({
        "oscillator" : {
          "type" : "amtriangle",
          "harmonicity" : 0.5,
          "modulationType" : "sine"
        },
        "envelope" : {
          "attackCurve" : 'exponential',
          "attack" : 0.05,
          "decay" : 0.2,
          "sustain" : 0.2,
          "release" : 1.5,
        },
        "portamento" : 0.05
      }).toMaster();
      var num = Math.floor(Math.random() * 7)
      synth.triggerAttackRelease(notes[num], 1 );
}

  function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

  }

  function render() {

    theta += 0.1;

    camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
    camera.lookAt( scene.position );

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {

      if ( INTERSECTED != intersects[ 0 ].object ) {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );
        play();
      }

    } else {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = null;

    }

    renderer.render( scene, camera );

  }

  function createGeometry() {
    var x = 0, y = 0;

    var heartShape = new THREE.Shape();

    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    var geometry = new THREE.ShapeGeometry( heartShape );

    return geometry;
  }
