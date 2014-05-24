// Cube using three.js r.64 CSS3DRenderer

var renderer, scene, camera, controls;

init();
animate();

function init() {

	// info
	info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.innerHTML = 'Drag mouse to rotate camera; scroll to zoom';
	document.body.appendChild( info );

	// renderer
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	document.body.appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();
	
	// camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 200, 100, 250 );
	
	// controls
	controls = new THREE.TrackballControls( camera );
	
	// params
	var r = Math.PI / 2;
	var d = 50;
	var pos = [ [ d, 0, 0 ], [ -d, 0, 0 ], [ 0, d, 0 ], [ 0, -d, 0 ], [ 0, 0, d ], [ 0, 0, -d ] ];
	var rot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];

	// cube
	var cube = new THREE.Object3D();
	
	var object = new THREE.CSS3DObject( canvasTextToImgTexture );
		object.position.fromArray( pos[ 0 ] );
		object.rotation.fromArray( rot[ 0 ] );
		cube.add( object );
	// sides
	for ( var i = 1; i < 6; i ++ ) {

		var element = document.createElement( 'div' );
		element.style.width = '100px';
		element.style.height = '100px';
		element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();
		element.style.opacity = '0.50';

		object = new THREE.CSS3DObject( element );
		object.position.fromArray( pos[ i ] );
		object.rotation.fromArray( rot[ i ] );
		cube.add( object );

	}
scene.add( cube );
//camera.lookAt(cube.position);
}


function canvasTextToImgTexture(){
	
//create image
var text = "Hello World"
var bitmap = document.createElement('canvas');
var g = bitmap.getContext('2d');
bitmap.width = 100;
bitmap.height = 100;

g.font = 'Bold 100px Arial';
g.fillStyle = 'black';
g.fillText(text, 0, 200);

// canvas contents will be used for a texture
//var texture = new THREE.Texture(bitmap)
//texture.needsUpdate = true;

// material
//var material = new THREE.MeshLambertMaterial({map: texture});
return bitmap;
}

function animate() {
console.log("animate");
	requestAnimationFrame( animate );
    
	controls.update();

	renderer.render( scene, camera );

}
