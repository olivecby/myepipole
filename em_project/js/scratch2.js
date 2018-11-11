var scene = new THREE.Scene();

//parameters: field of view, aspect ratio, near and far clipping plane
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// //render or animate loop
// function animate() {
// 	requestAnimationFrame( animate );
//
//   //run every frame (normally 60 times per second)
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//
// 	renderer.render( scene, camera );
// }
renderer.render( scene, camera);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
//animate();
