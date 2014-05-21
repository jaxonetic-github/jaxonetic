/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
 
// standard global variables
var container, scene,cssScene, camera, rendererCSS, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var targetList = [],mouse = { x: 0, y: 0 };
var projector;


 var boid, boids,birds, bird;

// custom global variables
var sphereMenu;
var areBirdsActive;
var cube;
var DFLT_CUBE_SIZE = 768;

	// Cube as a matrix
	var r = Math.PI / 2;
	var d = DFLT_CUBE_SIZE/2;
	var cubePos, cubeRot ;	
	
	

init();
animate();


// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 70, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,1100);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	
	
	pos = [ [ d, 0, 0 ], [ -d, 0, 0 ], [ 0, d, 0 ], [ 0, -d, 0 ], [ 0, 0, d ], [ 0, 0, -d ] ];
	rot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];	
	
	
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/textures/terrain/grasslight-big.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	//scene.add(floor);

	////////////
	// CUSTOM //
	////////////
	/**
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth = 780;
    var planeHeight = 920;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.y += planeHeight/2;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	
	// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= "http://www.gatech.edu";
	// width of iframe in pixels
	var elementWidth = DFLT_CUBE_SIZE;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = planeMesh.position;
	cssObject.rotation = planeMesh.rotation;
	
	cssScene.add(cssObject);
	*/
	
	


		// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	
	
	showPageOnCube("/jaxonetic/aboutme",1);
	showPageOnCube("/jaxonetic/contactme",2);
	showPageOnCube("/jaxonetic/projects",3);
	/////////
	// Canvas side of cube
	/////////
	// cube
	var cube = new THREE.Object3D();
	
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');
	context1.font = "Bold 20px Arial";
	context1.fillStyle = "rgba(200,197,233,.95)";
    context1.fillText('Exploring !', 75, 50);
    context1.fillText(' Possibilities!', 90, 100);
	// canvas contents will be used for a texture
	var texture1 = new THREE.Texture(canvas1) 
	texture1.needsUpdate = true;
      
    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.FrontSide } );
    material1.transparent = true;

    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
        material1
      );
	mesh1.position.set(0,0,d);
	scene.add( mesh1 );
	
//	cssScene.add(cssObject);
	
	
	//////////
	//Color each side of cube
	//////////
	// sides
	for ( var i = 2; i < 6; i ++ ) {

		var element = document.createElement( 'div' );
		//element.style.width = DFLT_CUBE_SIZE+'px';
		//element.style.height = 800+'px';
		//element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();
		element.style.opacity = '0.50';

		object = new THREE.CSS3DObject( element );
		object.position.fromArray( pos[ i ] );
		object.rotation.fromArray( rot[ i ] );
		cube.add( object );

	}
cssScene.add( cube );
	
	
	
	
	
	// create a renderer for CSS
	rendererCSS	= new THREE.CSS3DRenderer();
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position = 'absolute';
	rendererCSS.domElement.style.top	  = 0;
	rendererCSS.domElement.style.margin	  = 0;
	rendererCSS.domElement.style.padding  = 0;
	document.body.appendChild( rendererCSS.domElement );
	// when window resizes, also resize this renderer
	THREEx.WindowResize(rendererCSS, camera);

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top      = 0;
	// make sure original renderer appears on top of CSS renderer
	renderer.domElement.style.zIndex   = 0;
	rendererCSS.domElement.appendChild( renderer.domElement );
	
}

function animate() 
{
    requestAnimationFrame( animate );
    
	render();		
	update();
}

function update()
{
	controls.update();
}
        
function render() 
{
	rendererCSS.render( cssScene, camera );
	renderer.render( scene, camera );	
}



	/////////////
	//-- Create a Mesh and add it to webgl/canvas renderer.  Then create an iFrame 
	//   and place it in the same position and rotation as a side of the polygon (for now a cube )menu
	/////////////
	function showPageOnCube(url, cubeSide){
	//  	
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: .1, side: THREE.FrontSide });
	var planeWidth = DFLT_CUBE_SIZE;
    var planeHeight = DFLT_CUBE_SIZE;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position = pos[cubeSide];
	planeMesh.rotation = rot[cubeSide];
	//planeMesh.position.y -= planeHeight/2;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	
	// create a new scene to hold CSS
	// cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= "/jaxonetic/aboutme";
	// width of iframe in pixels
	var elementWidth = DFLT_CUBE_SIZE;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position.fromArray( pos[ cubeSide ] );
	cssObject.rotation.fromArray( rot[ cubeSide ] );

	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene.add(cssObject);
	
	}

 

