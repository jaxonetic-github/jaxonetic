/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var targetList = [],mouse = { x: 0, y: 0 };
var projector;



// custom global variables
var sphereMenu;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	projector = new THREE.Projector();
	
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,100,400);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

   //window.addEventListener( 'change', render, false );
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'theme/jaxonetic/img/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -100.5;
	floor.rotation.x = Math.PI / 2;
	//scene.add(floor);
	
	

	
	//setSkyBox();
	sphereMenu = addSphere(35, 32, 16,-50,10,-150);

    //add sphereMenu to list of event targets
    targetList.push(sphereMenu);

	console.log(sphereMenu);
        // when the mouse down, 
          document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

	////////////
	// addSphere 
	////////////
function addSphere(radius, geometryY, geometryZ,positionX, positionY, positionZ){
	console.log(positionX+" "+positionY +" "+ positionZ);
	var sphereGeom = new THREE.SphereGeometry(radius, geometryY, geometryZ);
    
	var moonTexture = THREE.ImageUtils.loadTexture( 'theme/jaxonetic/img/ball.png' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
	moon.position.set(positionX, positionY, positionZ);
    scene.add(moon);
    
	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var customMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: 
		{ 
			"c":   { type: "f", value: 1.0 },
			"p":   { type: "f", value: 1.4 },
			glowColor: { type: "c", value: new THREE.Color(0xffff00) },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.FrontSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	}   );
		
	this.moonGlow = new THREE.Mesh( sphereGeom.clone(), customMaterial.clone() );
    moonGlow.position = moon.position;
	moonGlow.scale.multiplyScalar(1.2);
	scene.add( moonGlow );
	
	var cubeGeom = new THREE.CubeGeometry(150,150,150,2,2,2);
	var crateTexture = THREE.ImageUtils.loadTexture( 'theme/jaxonetic/img/crate.png' );
	var crateMaterial = new THREE.MeshBasicMaterial( { map: crateTexture } );
    this.crate = new THREE.Mesh(cubeGeom, crateMaterial);
	crate.position.set(-150,0,-150);
   // scene.add(crate);

	var smoothCubeGeom = cubeGeom.clone();
	var modifier = new THREE.SubdivisionModifier( 2 );
	modifier.modify( smoothCubeGeom ); 

	this.crateGlow = new THREE.Mesh( smoothCubeGeom, customMaterial.clone() );
    crateGlow.position = crate.position;
	crateGlow.scale.multiplyScalar(1.5);
	//scene.add( crateGlow );
	
	return moon;
}

	function setSkyBox(){
		// SKYBOX/FOG
		var imagePrefix = "theme/jaxonetic/img/dawnmountain-";
		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		var imageSuffix = ".png";
		var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
				side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		scene.add( skyBox );
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
	moonGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, moonGlow.position );
	crateGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, crateGlow.position );
}

function render() 
{
	renderer.render( scene, camera );
}



function onDocumentMouseDown( event ) 
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();
    
    console.log("Click.");
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
  //  console.log(vector.normalize());
    projector.unprojectVector( vector, camera );
     console.log(vector);
     console.log(camera.position);
     vectorsub = vector.sub( camera.position );
     console.log( vectorsub );
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
console.log( ray );
    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( targetList );
    console.log(mouse.x + "," + mouse.y+"-----");
   // console.log( sphereMenu.position);
    //console.log();
    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
        console.log("Hit @ " + toString( intersects[0].point ) );
        // change the color of the closest face.
        intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
        intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
      //  $(".bird-canvas").load("jaxonetic/jaxblog");
$("#content").load("about");
   //  scene.remove(sphereMenu);
    }
    
    
       // direction (normalized), origin, length, color(hex)
    var origin_of_rightarrow =vector;
    
    //var terminus  = new THREE.Vector3(1,1,1);
    var direction_of_rightarrow = new THREE.Vector3().subVectors(sphereMenu.position , origin_of_rightarrow);
    var rightarrow = new THREE.ArrowHelper(direction_of_rightarrow, origin_of_rightarrow, 15, 0x884400);
    scene.add(rightarrow);
    

}
