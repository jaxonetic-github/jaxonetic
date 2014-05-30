/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/
jQuery(function($) {
// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
    var ORIGIN_POSITION = new THREE.Vector3(0,0,0);
// standard global variables
var container,camera, rendererCSS, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var iFrameTargetList = [],mouse = { x: 0, y: 0 };
var sceneTargetList=[];
var scene, browsingCssScene;

var cameraTunnelGroup;
var tunnel;
var light1;
var light2;
var light3;

var projector;

// SKYBOX/FOG textures
var imagePrefix = "/jaxonetic/theme/jaxonetic/img/dawnmountain-";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".png";
var brickImage = "/jaxonetic/theme/jaxonetic/img/brick.png";
var waterTextureImage = "/jaxonetic/theme/jaxonetic/img/textures/water.jpg";
//
    var gridYZ, gridXZ ,gridXY;
var texture;    
var dflt_texture5;
var dflt_texture4;
var dflt_texture3;
var dflt_texture2;
var dflt_texture1;
var dflt_texture0;

 var boid, boids,birds, bird;

// custom global variables
var sphereMenu;
var areBirdsActive;
var cube;
var DFLT_CUBE_SIZE = 800;
var DFLT_PAGE_HEIGHT =700;

// Scene containers info
var brickSceneContainer;
var graphingSceneContainer, browsingSceneContainer; 
var graphingSceneSky, browsingSceneSky;
var browsingSceneCenter;
var graphingSceneCenter;
var brickSceneCenter;

//SCENE CONTAINER POSITIONS
	// Cube as a matrix

	var r = Math.PI / 2;
	
	var browserCubePos,	cubeRot,graphingPos, brickCubePosition;	
	var xOffset_InternetBrowsingScene = 0;
    var zOffset_InternetBrowsingScene = 1000;
    
  	var xOffset_BrickScene = 0;
	var zOffset_BrickScene = 2000;

  	var zOffset_InternetGraphingScene = 0;
    var xOffset_InternetGraphingScene = 0;
    
var textureCamera;
var welcomeTxt;
var welcomeTextContainer;
// intermediate scene for reflecting the reflection
var screenScene, screenCamera, firstRenderTarget, finalRenderTarget;
var inBrowsingScene;
var  planeMesh;
var tube;
var pageHtmlObjCount;
var frameObjects = [];

init();
animate();
//setupTween(camera.position,camera.rotation,browsingSceneCenter, camera );
 showWelcomeTween();
// FUNCTIONS 		
function init() 
{
	inBrowsingScene = false;
	pageHtmlObjCount = 0;
	projector = new THREE.Projector();
	
	
	
	//main scene
	scene = new THREE.Scene();
	brickSceneContainer = new THREE.Object3D();
	browsingSceneContainer = new THREE.Object3D();
	graphingSceneContainer = new THREE.Object3D();
	cameraTunnelGroup = new THREE.Object3D();
	// CAMERA
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	var VIEW_ANGLE = 40, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 15000;
	
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	//camera.position.set((xOffset_InternetBrowsingScene+xOffset_InternetGraphingScene)/2,0,zOffset_InternetBrowsingScene+4200);
	//cameraTunnelGroup.add(camera);
	
	//scene.add(camera);
	
		// renderers
	if ( Detector.webgl ){
		renderer = new THREE.WebGLRenderer( {antialias:true} );
		//renderer.setClearColor( 0x000000, 1 );
	}else{
		Detector.addGetWebGLMessage();
				return true;
	}
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	initCSSRenderers();
 	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxDistance = DFLT_CUBE_SIZE/2
	controls.maxPolarAngle = Math.PI/2;
	controls.minPolarAngle = Math.PI/4;
	//camera.lookAt(browsingSceneCenter);
	//graphingSceneContainer = createGraphingScene();
	browsingSceneContainer =createInternetBrowsingScene();
	//brickSceneContainer = createBrickScene();
    sceneTargetList.push(browsingSceneContainer);
  //  sceneTargetList.push(brickSceneContainer);
browsingSceneContainer.add(camera);
    scene.add(browsingSceneContainer);
   // scene.add(brickSceneContainer);
    
    //camera.position.set(0, 0, 107);

 	var axes = new THREE.AxisHelper(5000);   
      axes.position = ORIGIN_POSITION;
     scene.add(axes);
      
	drawTunnel();
    scene.add( cameraTunnelGroup );
    
   //browsingSceneContainer.position.z+=500;
    	cameraTunnelGroup.traverse(hideChildren);
    	
		// EVENTS
		THREEx.WindowResize(renderer, camera);
		// when window resizes, also resize this renderer

	//	document.addEventListener('mousedown', onDocumentMouseDown, false);
	console.log("initialized");
}
function hideChildren(obj){
	obj.visible=false;
}
function showChildren(obj){
	obj.visible=true;
}
		function drawTunnel(){	
			light1	= new THREE.DirectionalLight( 0xff8000, 1.5 );
			light2	= new THREE.PointLight( 0x44FFAA, 15, 25 );
			light3	= new THREE.PointLight( 0xff4400, 20, 30 );
			
			
			//scene.add( light3 );
			//cameraTunnelGroup.add(light3);
			//scene.fog	= new THREE.FogExp2( 0x222222, 0.15 );

			// here you add your objects
			// - you will most likely replace this part by your own
			var geometry	= new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
			texture		= THREE.ImageUtils.loadTexture( waterTextureImage);
			texture.wrapT	= THREE.RepeatWrapping;

			var material	= new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : texture,side: THREE.BackSide});
			tunnel	= new THREE.Mesh( geometry, material );
			tunnel.rotation.x	= Math.PI/2;
			//mesh.position.z+=100;
			tunnel.flipSided	= true;
			positionTunnel();

				cameraTunnelGroup.add(tunnel);
					cameraTunnelGroup.add(light1);
					cameraTunnelGroup.add(light2);
			cameraTunnelGroup.add(light3);
		}

function positionTunnel(){
			tunnel.position.set(camera.position.x, camera.position.y, camera.position.z);
		    light1.position.set( camera.position.x-1, camera.position.y+1, camera.position.z-7 ).normalize();
			light2.position.set( camera.position.x, camera.position.y-3, camera.position.z-7  );
			light3.position.set( camera.position.x+3, camera.position.x+3, camera.position.z-7  );
}


// ## =========================

// ## Tween.js Setup (Start here)

// ## =========================

function printObjectCoordinates(obj){
		if(!obj || obj===undefined){obj = camera;}
	console.log(obj.position);

		console.log(obj.rotation);
}


function showWelcomeTween(){
	var welcomTextPlanePosition = { x : welcomeTextContainer.position.x, y:welcomeTextContainer.position.y, z:welcomeTextContainer.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0};
    var welcomTextTargetPosition = { x : "-700", y:"-10", z:"-1500", rx:0, ry:Math.PI/8,rz:0,browsingSceneContainerRotY:Math.PI / 1000  };
     	var planePosition = { x : planeMesh.position.x, y:planeMesh.position.y, z:planeMesh.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0, cameraZ:camera.position.z  };
    var planeTargetPosition = { x : "+100", y:0, z:"-1300", rx:0, ry:-Math.PI/4,rz:0,browsingSceneContainerRotY:Math.PI / 4,cameraZ:"+200"  };
   

    console.log("showWelcomeTween");
      console.log(planePosition);  
    console.log(welcomTextPlanePosition);
     console.log(welcomTextTargetPosition);

	
var pushObjectOutTween	= new TWEEN.Tween(planePosition);
		pushObjectOutTween.to(planeTargetPosition, 5000)
		.delay(3000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(function(){
		//console.log(welcomTextPlanePosition);
		//	console.log(welcomTextPlanePosition.z);
		planeMesh.position.x = planePosition.x;
		planeMesh.position.y = planePosition.y;
		planeMesh.position.z = planePosition.z;
		planeMesh.rotation.ry = planePosition.ry;
		planeMesh.position.rz = planePosition.rz;
		//browsingSceneContainer.rotation.y = planePosition.browsingSceneContainerRotY;
		camera.position.z = planePosition.cameraZ;
		//controls.rotateLeft(welcomTextPlanePosition.browsingSceneContainerRotY);
		//objectToUpdate.rotation.z = rotation.z;
		//objectToUpdate.rotation.y = rotation.y;
		//objectToUpdate.rotation.x = rotation.x;
		
		
	}).onComplete(function(){
		console.log("planeMesh moved to...");
		console.log(planeMesh.position);
	});
	
	var welcomeTween	= new TWEEN.Tween(welcomTextPlanePosition);
		welcomeTween.to(welcomTextTargetPosition, 5000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){
		//console.log(welcomTextPlanePosition);
		//	console.log(welcomTextPlanePosition.z);
		//printObjectCoordinates();
		//angle += Math.PI / 180;
		//welcomeTxt.rotation.z+=Math.PI / 1800;
		//controls.center = camera.center;
		//controls.rotateLeft(Math.PI/50);
		welcomeTextContainer.position.x =welcomTextPlanePosition.x;
		welcomeTextContainer.position.y = welcomTextPlanePosition.y;
		welcomeTextContainer.position.z = welcomTextPlanePosition.z;
		welcomeTextContainer.rotation.y = welcomTextPlanePosition.ry;
		//controls.rotateLeft(welcomTextPlanePosition.browsingSceneContainerRotY);
		//objectToUpdate.rotation.z = rotation.z;
		//objectToUpdate.rotation.y = rotation.y;
		//objectToUpdate.rotation.x = rotation.x;
		
		
	}).onComplete(function(){
		console.log("welcome text group moved to...");
		console.log(welcomeTextContainer.position);
	
	});
	


	console.log("welcome text group starting at...");
	console.log(welcomeTextContainer.position);
	console.log(welcomTextTargetPosition);
	console.log(welcomTextPlanePosition);
	 console.log(welcomeTxt.position);
	// start the first
	pushObjectOutTween.start();
	welcomeTween.start();	
}

/**
 * Keeping this here for reference
 */
function setupTween(startPos,startRot, targetPos, objectToUpdate)
{
	console.log(startPos);
	console.log(startRot);
	console.log(targetPos);
	console.log(objectToUpdate);
		//start position will be the camera position.
	 var position = objectToUpdate.position;
	 var rotation = { x : startRot.x, y: startRot.y, z:startRot.z+r/4 };
	var toBrowsingSceneCenter = { x : browsingSceneCenter.x, y: browsingSceneCenter.y, z:(zOffset_InternetBrowsingScene-300) };
	var toBrowsingSceneCenterRotation = { x : 0, y: 0, z:2*r };	
	var duration = 4000; //ms
	var tiltRotation;
	var angle, angleend;
	// 
	var update	= function(){
	//	console.log("Update");
		objectToUpdate.position.x = position.x;
		objectToUpdate.position.y = position.y;
		objectToUpdate.position.z = position.z;
		camera.lookAt(browsingSceneCenter);
	
	}
	var tiltUpdate = function(){
	//	console.log("tiltUpdate::");
		//	console.log(this.angle);
		//printObjectCoordinates();
		//angle += Math.PI / 180;
		//objectToUpdate.rotation.y=angle*Math.PI / 180;
		//controls.center = camera.center;
		//controls.rotateLeft(Math.PI/50);
		//objectToUpdate.rotation.z = rotation.z;
		//objectToUpdate.rotation.y = rotation.y;
		//objectToUpdate.rotation.x = rotation.x;
		
		
	}
	var tiltComplete	= function(){
		//if(controls)	controls.enabled = true;
		console.log("Tilt complete");
		printObjectCoordinates();
		//camera.rotation.y = this
			     	//controls
 		//controls = new THREE.OrbitControls( camera, renderer.domElement );
 		//controls.center = welcomeTxt.position;
 	
		//controls.minDistance =-700;
		//controls.maxDistance =400;
			
	}	
	var reActivateControls	= function(){
		//if(controls)	controls.enabled = true;
		console.log("Tween complete");
		
		//if(controls) 	controls.center =browsingSceneCenter;
			//camera.rotation.y = r;
		inBrowsingScene = true;
		// build the tween to go backward
		// tiltRotation =camera.rotation;
		console.log(camera.rotation.x);
		console.log(camera.rotation.y);
		console.log(camera.rotation.z);
		//camera.lookAt(welcomeTxt.position);
		console.log("angle"+angle);
		
	
		
			     	//controls
 		//controls = new THREE.OrbitControls( camera, renderer.domElement );
 		//controls.center = camera.position;
 	
		//controls.minDistance =-700;
		//controls.maxDistance =400;
			
	}	
	
	// remove previous tweens if needed
	//TWEEN.removeAll();

	// convert the string from dat-gui into tween.js functions 
	var easing	= TWEEN.Easing.Sinusoidal.InOut;
	angle={ x : 0, y: 0, z:0 };
		angleend = { x : 0, y: 0, z:10 };
	// build the tween to go ahead
	var tweenHead	= new TWEEN.Tween(position)
		.to(toBrowsingSceneCenter, duration)
		.delay(0)
		.easing(easing)
		.onUpdate(update)
		.onComplete(reActivateControls);
	
	var tweenTilt	= new TWEEN.Tween(angle)
		.to(angleend, 5000)
		.delay(0)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(function(){
		//console.log("tiltUpdate::");
			//console.log(angle);
		//printObjectCoordinates();
		//angle += Math.PI / 180;
		welcomeTxt.rotation.z+=Math.PI / 1800;
		//controls.center = camera.center;
		//controls.rotateLeft(Math.PI/50);
		//objectToUpdate.rotation.z = rotation.z;
		//objectToUpdate.rotation.y = rotation.y;
		//objectToUpdate.rotation.x = rotation.x;
		
		
	}).onComplete(tiltComplete);
	//	tweenTilt.start();

	// after tweenHead do tweenBack
	tweenHead.chain(tweenTilt);

	console.log(objectToUpdate.position);
	console.log(position.z);
	// start the first
	tweenHead.start();
}

// ## =========================
// ## Tween.js Setup (End here)
// ## =========================

	function initCSSRenderers(){
	
			// create a renderer for CSS
		rendererCSS	= new THREE.CSS3DRenderer();
		rendererCSS.setSize( window.innerWidth, window.innerHeight );
		rendererCSS.domElement.style.position = 'absolute';
		rendererCSS.domElement.style.top	  = 0;
		rendererCSS.domElement.style.margin	  = 0;
		rendererCSS.domElement.style.padding  = 0;
		container.appendChild( rendererCSS.domElement );
	
	
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top      = 0;
		// make sure original renderer appears on top of CSS renderer
		renderer.domElement.style.zIndex   = -1;
		rendererCSS.domElement.appendChild( renderer.domElement );
		THREEx.WindowResize(rendererCSS, camera);
	}
	//////////////
//----------- Graphing Scene Functions	
///////////////
 function createBrickScene(){
 	brickSceneCenter = new THREE.Vector3(xOffset_BrickScene, 0,zOffset_BrickScene);
 	brickScene = new THREE.Object3D();
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
 	var skyPosition = new THREE.Vector3( 0, 0, 0 );
	 	
 		// create a new scene to hold CSS

 	brickCubePosition = [ [ xOffset_BrickScene-d, 0, zOffset_BrickScene ], [ xOffset_BrickScene+d, 0, zOffset_BrickScene ], [ xOffset_BrickScene, d, zOffset_InternetBrowsingScene ], [ xOffset_BrickScene, -d, zOffset_InternetBrowsingScene ], [ xOffset_BrickScene, 0, d+zOffset_InternetBrowsingScene ], [ xOffset_BrickScene, 0, zOffset_InternetBrowsingScene-d  ] ];
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( brickImage ),
				side: THREE.FrontSide
			}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );

	brickSceneSky = createSkyBox(brickImage, skyGeometry, skyPosition,skyMaterial );
	brickScene.add(brickSceneSky);

	

	var axes = new THREE.AxisHelper(DFLT_CUBE_SIZE/2);
   	axes.position = brickSceneCenter;
    brickScene.add(axes);
    console.log("brick scene created?");
    return brickScene;
}	

//////////////
//----------- Graphing Scene Functions	
///////////////
 function createGraphingScene(){
 	graphingSceneCenter = new THREE.Vector3(xOffset_InternetGraphingScene, 0,zOffset_InternetGraphingScene);
 	graphingScene = new THREE.Object3D();
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
 	var skyPosition = new THREE.Vector3( xOffset_InternetGraphingScene, 0, zOffset_InternetGraphingScene );
	 	
 		// create a new scene to hold CSS

 	graphingPos = [ [ xOffset_InternetGraphingScene-d, 0, zOffset_InternetGraphingScene ], [ xOffset_InternetGraphingScene+d, 0, zOffset_InternetGraphingScene ], [ xOffset_InternetGraphingScene, d, zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, -d, zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, 0, d+zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, 0, zOffset_InternetBrowsingScene-d  ] ];
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( brickImage ),
				side: THREE.DoubleSide
			}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );

	graphingSceneSky = createSkyBox(brickImage, skyGeometry, skyPosition,skyMaterial );
	graphingScene.add(graphingSceneSky);

		showXYZPlane(graphingScene,graphingSceneCenter,100);

	var axes = new THREE.AxisHelper(1500);
   	axes.position = graphingSceneCenter;
    graphingScene.add(axes);
    console.log("graphing scene added?");
    return graphingScene;
}	
	
	////////////
	// addSphere 
	////////////
function addSphere(radius, geometryY, geometryZ,positionX, positionY, positionZ, showCoords){
	if(showCoords===undefined){
		showCoords = false;	
	}
	if(showCoords){
		sayAt("("+positionX.toFixed(2)+","+  positionY.toFixed(2)+") ", positionX, positionY+radius, positionZ, 0, 0, 0, 0xaaaa66 );
	}
	
	console.log(positionX+" "+positionY +" "+ positionZ);
	var sphereGeom = new THREE.SphereGeometry(radius, geometryY, geometryZ);
    
	var moonTexture = THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/textures/sprites/ball.png' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
	moon.position.set(positionX, positionY, positionZ);
    graphingSceneContainer.add(moon);
        moon.name="moon"+targetList.length;
    /**
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
	
	var cubeGeom = new THREE.BoxGeometry(150,150,150,2,2,2);
	var crateTexture = THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/crate.png' );
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
	*/
	return moon;
}


//-----------End Graphing Functions

	///////
 	//Internet Browsing Scene
 	//   -- returns a THREE.Object3D representation of browsing section
 	///////
 function createInternetBrowsingScene(){
 	var d = 500;  //an  offset which adjusts the distance between iFrames
 	browsingSceneCenter = new THREE.Vector3(xOffset_InternetBrowsingScene, 0,zOffset_InternetBrowsingScene);
 	console.log(browsingSceneCenter);
    camera.position = browsingSceneCenter;
    camera.position.z+=200; 
    //camera.lookAt(browsingSceneCenter);
   //  if(controls) controls.center.set(xOffset_InternetBrowsingScene,0,zOffset_InternetBrowsingScene) ;
     //console.log(controls.center);
   // if(controls) controls.center = browsingSceneCenter.add(new THREE.Vector3(400, 0,0));
 	//controls.center = new THREE.Vector3(0,0,0);
 	// create a new scene to hold CSS
	browsingScene = new THREE.Object3D();
	 browsingScene.position = browsingSceneCenter;
 	browserCubePos = [ [ browsingSceneCenter.x-d, browsingSceneCenter.y, browsingSceneCenter.z ], [ browsingSceneCenter.x+d, browsingSceneCenter.y, browsingSceneCenter.z ], [ browsingSceneCenter.x, browsingSceneCenter.y+d, browsingSceneCenter.z ], [ browsingSceneCenter.x, browsingSceneCenter.y-d, browsingSceneCenter.z ], [ browsingSceneCenter.x, 0, d+browsingSceneCenter.z ], [ browsingSceneCenter.x, 0, browsingSceneCenter.z-d  ] ];
	//controls.center.fromArray(browsingSceneCenter);
	cubeRot = [ [ 0, r, 0 ]/*left facing right*/, [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];	
	var xyPlaneToZpos = 5;  // front facing side
	var YZPlaneToXpos = 0;  //left facing right
	var YZPlaneToXneg = 1;  //right facing left
	var zxPlanetoYneg = 3;  //top facing down
	var zxPlanetoYpos = 2;  //bottom facing up
	
	console.log(browserCubePos);     

	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
		 
	var materialArray = [];
	for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix  ),
				side: THREE.DoubleSide
			}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyPosition = new THREE.Vector3( browsingSceneCenter.x, 0, browsingSceneCenter.z );
	browsingSceneSky = createSkyBox(brickImage, skyGeometry,skyPosition,skyMaterial);
	//browsingScene.add(browsingSceneSky);
	welcomeTextContainer = new THREE.Object3D();
	var textAlignment = DFLT_CUBE_SIZE/(-2);
	var phraseRotation = new THREE.Vector3(0, 0,0);
	
	 sayAt("Everything is still in an infancy stage.  Come back often... 05/22",
	  browsingSceneCenter.x-30,DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  phraseRotation, 0x666006,70,10);
	  sayAt("Browse the Internet",
	  browsingSceneCenter.x,-DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  phraseRotation, 0x666006,70,10);
	 
	 
	 //Writing on the back wall
	  phraseRotation.set(-1*Math.PI/10,2*(-0),0);
	  console.log(phraseRotation);
	  welcomeTxt = sayAt("Welcome to my playground.  ",
	  browsingSceneCenter.x,browsingSceneCenter.y+250,0,
	  phraseRotation, 0x666006,25,1); 	  
	  welcomeTextContainer.add(welcomeTxt);
	  
	  welcomeTextContainer.add(sayAt("Hopefully you will enjoy ",
	  browsingSceneCenter.x, browsingSceneCenter.y+200,0,
	  phraseRotation, 0x666006,25,2)); 	 
	 
	 welcomeTextContainer.add(	  sayAt("interacting with this site. ",
	  browsingSceneCenter.x,browsingSceneCenter.y+150,0,
	  phraseRotation, 0x666006,25,3)); 	 
	 
	  	  
	  welcomeTextContainer.add(sayAt("as much as I enjoy building it.",
	  browsingSceneCenter.x,browsingSceneCenter.y+100,0,
	  phraseRotation, 0x666006,25,4)); 	
	  
	  	//  sayAt("but there will b",browsingSceneCenter.x+textAlignment,50,browsingSceneCenter.z,  phraseRotation, 0x666006,25,5); 
	  	  
	  	  var texture = new THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/me.png' );
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: .9,transparent:true, side: THREE.DoubleSide ,map:texture});
	
	var planeWidth = DFLT_CUBE_SIZE;
    var planeHeight = DFLT_PAGE_HEIGHT-100;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight,DFLT_CUBE_SIZE);
	 planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	//planeMesh.overdraw = true;
	planeMesh.position.fromArray( browserCubePos[ 5 ]);
	planeMesh.rotation.fromArray( cubeRot[ 5 ] );
	//planeMesh.rotation.y = Math.PI/7;
	//planeMesh.rotation.z = Math.PI;
	console.log(planeMesh.position);
	//planeMesh.position.x+=15;
	// add it to the standard (WebGL) scene
	planeMesh.name = "jax2d";
	browsingScene.add(planeMesh);
	browsingScene.add(welcomeTextContainer);
	addPageToContainer(browsingScene,"/jaxonetic/Pages/aboutme/nolayout",1);
	addPageToContainer(browsingScene,"/jaxonetic/Jaxcontact/index/nolayout",3);
	addPageToContainer(browsingScene,"/jaxonetic/Projects/index/nolayout",0);
	//addPageToContainer(browsingScene,"http://www.gatech.edu",5);
 
// params
	var r = Math.PI / 2;
	var d = 50;
	var pos = [ [ d, 0, 0 ], [ -d, 0, 0 ], [ 0, d, 0 ], [ 0, -d, 0 ], [ 0, 0, d ], [ 0, 0, -d ] ];
	var rot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];

	// cube
	var cube = new THREE.Object3D();
	scene.add( cube );

	// sides
	for ( var i = 0; i < 6; i ++ ) {

		var element = document.createElement( 'div' );
		element.style.width = '100px';
		element.style.height = '100px';
		element.style.background = new THREE.Color( Math.random() * 0xffffff ).getStyle();
		element.style.opacity = '0.50';

		var object = new THREE.CSS3DObject( element );
		object.position.fromArray( pos[ i ] );
		object.rotation.fromArray( rot[ i ] );
		cube.add( object );

	}

	// create a new scene to hold CSS
	if(!browsingCssScene)
		browsingCssScene = new THREE.Scene();
	//	browsingCssScene.add(cube);


 //controls.center =new THREE.Vector3(xOffset_InternetBrowsingScene, 0,zOffset_InternetBrowsingScene-200);
	
	var axis = new THREE.AxisHelper(DFLT_CUBE_SIZE/4);
    
    browsingScene.add(axis);
    axis.position = new THREE.Vector3(0, 0,zOffset_InternetBrowsingScene);
    if(controls){
    	controls.center = axis.position;
    }
  //camera.lookAt(axes);
  

 //welcomeTextContainer.position.set(0,0,0);
 console.log(browserCubePos);
 console.log(welcomeTxt.position);
    return browsingScene;
}	

///////////
//Animation and Renderering
///////
function animate() 
{
    requestAnimationFrame( animate );
    
	render();		
	update();
	positionTunnel();
	TWEEN.update();
}

function update()
{
	if(controls){ 
		controls.update();
	}
}
        
function render() 
{
			// move the texture to give the illusion of moving thru the tunnel
			texture.offset.y	+= 0.008;
			texture.offset.y	%= 1;
			texture.needsUpdate	= true;

			// move the camera back and forth
			var seconds		= Date.now() / 1000;
			var radius		= 0.70;
			var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
			angle	= (seconds*Math.PI)/4;
			//camera.position.x	+= Math.cos(angle - Math.PI/2) * radius;
			//camera.position.y	+= Math.sin(angle - Math.PI/2) * radius;
			// camera.rotation.z	= angle;
			//mesh.position =  camera.position;
			//mesh.rotation =  camera.rotation;
			//mesh.rotation.x	+= Math.PI/2;
			//if(brickSceneContainer) {brickSceneContainer.rotation.y+=.542; console.log(brickSceneContainer.rotation.y);}
			//cameraTunnelGroup.position = camera.position;;
	 rendererCSS.render( browsingCssScene, camera );
	renderer.render( scene, camera );	
}

	/////////////
	//-- Create a Mesh and add it to webgl/canvas renderer.  Then create an iFrame 
	//   and place it in the same position and rotation as a side of the polygon (for now a cube )menu
	/////////////
	function addPageToContainer(sceneContainer,url, cubeSide){
	var r = Math.PI / 2;
	var d = 700;
 	var z = DFLT_PAGE_HEIGHT+500;
	var pos = [ [ browsingSceneCenter.x-d, browsingSceneCenter.y, 2*browsingSceneCenter.z-z ], [ browsingSceneCenter.x+d , browsingSceneCenter.y, 2*browsingSceneCenter.z-z ], [ browsingSceneCenter.x, browsingSceneCenter.y+d,2*browsingSceneCenter.z-z ], [ browsingSceneCenter.x, browsingSceneCenter.y-d, 2*browsingSceneCenter.z-z], [ browsingSceneCenter.x, browsingSceneCenter.y, 2*browsingSceneCenter.z+d ], [ browsingSceneCenter.x, browsingSceneCenter.y, 2*browsingSceneCenter.z-d ] ];
	var rot = [ [ 0, r/2, 0 ]/*left facing right*/, [ 0, -r/2, 0 ]/*top>bottom*/, [ -r, 0, 0 ], [-r/2, 0, 0 ]/*bottom->up*/, [ 0, 0, 0 ]/*back facing front*/, [ 0, 0, 0 ] ];
	//var pos = [ [ -d, 0, -z ], [ d+ DFLT_CUBE_SIZE/3 , 0, -z ], [ 0, d,-z ], [ 0, -d, -z], [ 0, 0, d ], [ 0, 0, -d ] ];
	var xyPlaneToZpos = 5;  // front facing side
	var YZPlaneToXpos = 0;  //left facing right
	var YZPlaneToXneg = 1;  //right facing left
	var zxPlanetoYneg = 3;  //top facing down
	var zxPlanetoYpos = 2;  //bottom facing up
	
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: .1, side: THREE.FrontSide });
	var planeWidth = 600;
    var planeHeight = DFLT_CUBE_SIZE;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var framePlaneMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	framePlaneMesh.position = pos[cubeSide];
	framePlaneMesh.rotation = rot[cubeSide];
	//framePlaneMesh.position.y -= planeHeight/2;
	// add it to the standard (WebGL) scene
	sceneContainer.add(framePlaneMesh);


	// create a new scene to hold CSS
	if(!browsingCssScene)
		browsingCssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe');
	// webpage to be loaded into iframe
	element.src	= url;
	// width of iframe in pixels
	var elementWidth = planeWidth;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with framePlaneMesh position/rotation 
	cssObject.position.fromArray( pos[ cubeSide ] );
	cssObject.rotation.fromArray( rot[ cubeSide ] );
	// resize cssObject to same size as framePlaneMesh (plus a border)
	var percentBorder = 0; //0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	browsingCssScene.add(cssObject);
	frameObjects.push(cssObject);
	
	}

      
    ///////////
    // Show Grid
    // default shows a 20x20 grid
    ///////////     
   function showXZGrid(container,position, size){
     var phraseRotation = new THREE.Vector3(-Math.PI/2,0,0);
    gridXZ = new THREE.GridHelper(size, 10);
    gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
    gridXZ.color1=new THREE.Color(0x006600) ;
    gridXZ.position.set( size,0,size );
    container.add(gridXZ);
    for(var i=0; i<=size; i++){
    //	sayAt("XZ green", 0,-20,0,phraseRotation, 0x006600);
    }
    sayAt("XZ green", 0,-20,0,-Math.PI/2,0,0, 0x006600);
   }
 
      function showXYGrid(container,position, size){
      	var phraseRotation = new THREE.Vector3(0, 0,0);
    gridXY = new THREE.GridHelper(size, 10);
    gridXY.position.set( position.x+size,position.y+size,position.z );
    gridXY.rotation.x = Math.PI/2;
    gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
    container.add(gridXY);
    
    for(var i=0; i<=size; i++){
   		sayAt(i, i,-2,0,phraseRotation,0xaaaaaa );
    }  
     sayAt("XY blue", 0,-20,0,phraseRotation,0x000066 );
    //  iFrameTargetList.push(gridXY);
   }
        function showYZGrid(container,position,size){
        	var phraseRotation = new THREE.Vector3(0,Math.PI/2,0);
   gridYZ = new THREE.GridHelper(size, 10);
    gridYZ.position.set( 0,size,size );
    gridYZ.rotation.z = Math.PI/2;
    gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
    container.add(gridYZ);
    
     sayAt("YZ marroon", 0,-20,0,phraseRotation, 0x660000);
   }  
   
   function showXYZPlane(container,position, size){
      var axes = new THREE.AxisHelper(10000);
      
      axes.position = position;
      container.add(axes);
     //  showXZGrid(position, 100);
      showXYGrid(position, 100);
    //showYZGrid(position, 100);



  }


///////////
    // ADD  TEXT
    // --rotation a Vector3 object
    ///////////
    function sayAt(text, leftRatio, top, depth,  phraseRotation, frontColor,fontSize, fontHeight){
    	
	if ( frontColor === undefined ) {
		frontColor = 0x028482;
	}
	

        // add 3D text
    var materialFront = new THREE.MeshBasicMaterial( { color: frontColor } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x124253 } );
    var materialArray = [ materialFront, materialSide ];
    var textGeom = new THREE.TextGeometry( text, 
    {
        size: fontSize, height: fontHeight, curveSegments: 33,
        font: "helvetiker", weight: "normal", style: "normal",
        bevelThickness: 0, bevelSize: 0, bevelEnabled: false,
        material: 0, extrudeMaterial: 0
    });
    // font: helvetiker, gentilis, droid sans, droid serif, optimer
    // weight: normal, bold
    
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var textMesh = new THREE.Mesh(textGeom, textMaterial );
    
    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    
    textMesh.position.set( leftRatio , top, depth );
    textMesh.rotation.x = phraseRotation.x;
    textMesh.rotation.y = phraseRotation.y;
    textMesh.rotation.z = phraseRotation.z;
    
    //scene.add(textMesh);
    // done adding Text
    return textMesh;
    }


	
	function createSkyBox(textureImage, geometry, position,skyMaterial){
	
		var skyGeometry = new THREE.BoxGeometry( geometry.x, geometry.y, geometry.z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		;
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		skyBox.position.set( position.x, position.y, position.z );
		
		return skyBox;
	}
	


    function onDocumentMouseDown(event) {

			
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var iFrameIntersects = raycaster.intersectObjects(iFrameTargetList);
			var sceneIntersects  = raycaster.intersectObjects(sceneTargetList);
			
			//cameraTunnelGroup.traverse(showChildren);
//console.log(intersects);
            if (iFrameIntersects.length > 0) {
             //   intersects[ 0 ].object.material.transparent = true;
             //   intersects[ 0 ].object.material.opacity = 0.1;

//    Pointer
                var points = [];
                var origin = raycaster.ray.origin.clone();
                //console.log(origin);
                points.push(browsingSceneCenter);
                points.push(intersects[0].point);


                var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 1});
                var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 10);
				if (tube) scene.remove(tube);
				tube = new THREE.Mesh(tubeGeometry, mat);
                scene.add(tube);

				//
                
              controls.center = intersects[ 0 ].point;
              console.log(intersects[ 0 ].point);
               if(inBrowsingScene){
			//	         		renderer.domElement.style.zIndex   = -1;
				         		console.log("browsing");
				       //if(controls){controls.enabled = true;
            	//			console.log("disabling control");
            		//		}
				}
				else{
					console.log("tweening");
					 
				}
         		
                    
            }else{//if not an iframeClick, ensure renderer is on top of cssRenderer
            		//	renderer.domElement.style.zIndex   = 1;
            		//	if(controls){controls.enabled = true;
            		//		console.l og("enabling control");
            			//	}
            }
            
            if (sceneIntersects.length > 0) {
            	console.log(sceneIntersects.length);
            	console.log(sceneIntersects[0].point);
            	console.log("scene Selected");
            }
        }
        
   

});
