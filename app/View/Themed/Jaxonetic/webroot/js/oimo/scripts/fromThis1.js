/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/
jQuery(function($) {
// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
    var ORIGIN_POSITION = new THREE.Vector3(0,0,0);
    var SCENE_CONTAINER_INITIAL_POSITION = new THREE.Vector3(0,0,1000);
    var GRID_DOT_SIZE= .4;
// standard global variables
var container,camera, rendererCSS, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var iFrameTargetList = [],sceneTargetList=[], graphPlaneTargetList=[];
var mouse = new THREE.Vector3(0,0,.5)
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
var graphOriginPosition;

//SCENE CONTAINER POSITIONS
	// Cube as a matrix

	var r = Math.PI / 2;
	
	var browserCubePos,	cubeRot,graphingPos, brickCubePosition;	


    
var textureCamera;
var welcomeTxt;
var welcomeTextContainer;
var graphingTextContainer;
// intermediate scene for reflecting the reflection
var screenScene, screenCamera, firstRenderTarget, finalRenderTarget;
var inBrowsingScene;

//the plane that holds my picture
var  planeMesh;
var frontPlaneMaterial 
var xyPlaneMesh;
var tube;
var pageHtmlObjCount;
var frameObjects = [];

init();
animate();

 showWelcomeTween();
 
// FUNCTIONS 		
function init() 
{

	pageHtmlObjCount = 0;
	
	//main scene
	scene = new THREE.Scene();
	
	//Containers for Scene groupings
	brickSceneContainer = new THREE.Object3D();
	browsingSceneContainer = new THREE.Object3D();
	graphingSceneContainer = new THREE.Object3D();
	
	cameraTunnelGroup = new THREE.Object3D();
	
	// CAMERA
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	var VIEW_ANGLE = 70, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 15000;
	
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	projector = new THREE.Projector();
	scene.add(camera);
	//cameraTunnelGroup.add(camera);
	
	initRenderers();
 	controls = new THREE.OrbitControls( camera, renderer.domElement );

	
	browsingSceneContainer =createInternetBrowsingScene(true);
	//brickSceneContainer = createBrickScene();
    sceneTargetList.push(browsingSceneContainer);
  //  sceneTargetList.push(brickSceneContainer);
	//browsingSceneContainer.add(camera);
    //graphingSceneContainer.add(camera);
    scene.add(browsingSceneContainer);

   // scene.add(brickSceneContainer);
    
    //camera.position.set(0, 0, 107);

 	var axes = new THREE.AxisHelper(5000);   
      axes.position = ORIGIN_POSITION;
     scene.add(axes);
      
	drawTunnel();
    scene.add( cameraTunnelGroup );
    scene.add(camera);

    	cameraTunnelGroup.traverse(hideChildren);
    	
		// EVENTS
		THREEx.WindowResize(renderer, camera);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mousedown', onDocumentMouseDown, false);
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
// ## Tweens
// ## =========================


function cameraResetTween(){
	

    var cameraPosition = { x : camera.position.x, y:camera.position.y, z:camera.position.z, rx:camera.rotation.x, ry:camera.rotation.y,rz:camera.rotation.z};
    var cameraTargetPosition = { x : SCENE_CONTAINER_INITIAL_POSITION.x, y:SCENE_CONTAINER_INITIAL_POSITION.y, z:1400, rx:0, ry:0,rz:0};
  		console.log(cameraPosition);
			console.log(cameraTargetPosition); 
   
    var resetTween	= new TWEEN.Tween(cameraPosition);
		resetTween.to(cameraTargetPosition, 5000)
		.delay(1000)
		.easing(TWEEN.Easing.Linear.None)
		.onUpdate(function(){
	
		camera.position.x = cameraPosition.x;
		camera.position.y = cameraPosition.y;
		camera.position.z = cameraPosition.z;
	
        camera.lookAt(ORIGIN_POSITION);
	}).onComplete(function(){
		console.log("camera moved to...");
		console.log(camera.position);
	});
	
	resetTween.start();
	
}

function graphingIntroTween(){
		var graphingTextPosition = { x : graphingTextContainer.position.x, y:graphingTextContainer.position.y, z:graphingTextContainer.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0};
    var graphingTextTargetPosition = { x :-300, y:"+1000", z:500, rx:0, ry:Math.PI/8,rz:0,browsingSceneContainerRotY:Math.PI / 1000  };
	
	
	var graphingTextTween	= new TWEEN.Tween(graphingTextPosition);
		graphingTextTween.to(graphingTextTargetPosition, 3000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){

		graphingTextContainer.position.x =graphingTextPosition.x;
		graphingTextContainer.position.y = graphingTextPosition.y;
		graphingTextContainer.position.z = graphingTextPosition.z;
		graphingTextContainer.rotation.y = graphingTextPosition.ry;
		
	}).onComplete(function(){
		console.log("graphing text group moved to...");
		console.log(graphingTextContainer.position);
	
	});
	
	// start the first
	graphingTextTween.start();

}


function showGraphingTextTween(){
		var graphingTextPosition = { x : graphingTextContainer.position.x, y:graphingTextContainer.position.y, z:graphingTextContainer.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0};
    var graphingTextTargetPosition = { x :-300, y:200, z:500, rx:0, ry:Math.PI/8,rz:0,browsingSceneContainerRotY:Math.PI / 1000  };
	
	
	var graphingTextTween	= new TWEEN.Tween(graphingTextPosition);
		graphingTextTween.to(graphingTextTargetPosition, 3000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){

		graphingTextContainer.position.x =graphingTextPosition.x;
		graphingTextContainer.position.y = graphingTextPosition.y;
		graphingTextContainer.position.z = graphingTextPosition.z;
		graphingTextContainer.rotation.y = graphingTextPosition.ry;
		
	}).onComplete(function(){
		console.log("graphing text group moved to...");
		console.log(graphingTextContainer.position);
	
	});
	
	// start the first
	graphingTextTween.start();

}

function fadeObjectTween(material, targetOpacity){
		var meshOpacity =  {opacity :material.opacity};	
	
	var meshTween	= new TWEEN.Tween(meshOpacity);
		meshTween.to({ opacity: targetOpacity }, 3000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){

		material.opacity = meshOpacity.opacity;
		
	}).onComplete(function(){
		console.log("graphing text group moved to...");
		//console.log(graphingTextContainer.position);
	
	});
	
	// start the first
	meshTween.start();

}

function showWelcomeTween(){
	var welcomTextPlanePosition = { x : welcomeTextContainer.position.x, y:welcomeTextContainer.position.y, z:welcomeTextContainer.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0};
    var welcomTextTargetPosition = { x :-300, y:20, z:300, rx:0, ry:Math.PI/8,rz:0,browsingSceneContainerRotY:Math.PI / 1000  };
     	var planePosition = { x : planeMesh.position.x, y:planeMesh.position.y, z:planeMesh.position.z, rx:0, ry:0,rz:0, browsingSceneContainerRotY:0, cameraZ:camera.position.z  };
    var planeTargetPosition = { x : 50, y:0, z:SCENE_CONTAINER_INITIAL_POSITION.z-200, rx:0, ry:-Math.PI/4,rz:0,browsingSceneContainerRotY:Math.PI / 4,cameraZ:"+200"  };
   

    console.log("showWelcomeTween");
      console.log(planePosition);  
    console.log(welcomTextPlanePosition);
     console.log(welcomTextTargetPosition);

	
var pushObjectOutTween	= new TWEEN.Tween(planePosition);
		pushObjectOutTween.to(planeTargetPosition, 5000)
		.delay(1000)
		.easing(TWEEN.Easing.Cubic.InOut)
		.onUpdate(function(){
		//console.log(welcomTextPlanePosition);
		//	console.log(welcomTextPlanePosition.z);
		planeMesh.position.x = planePosition.x;
		planeMesh.position.y = planePosition.y;
		planeMesh.position.z = planePosition.z;
		//planeMesh.rotation.ry = planePosition.ry;
		//planeMesh.position.rz = planePosition.rz;
		//browsingSceneContainer.rotation.y = planePosition.browsingSceneContainerRotY;
		camera.position.z = planePosition.cameraZ;

	}).onComplete(function(){
		console.log("planeMesh moved to...");
		console.log(planeMesh.position);
	});
	
	var welcomeTween	= new TWEEN.Tween(welcomTextPlanePosition);
		welcomeTween.to(welcomTextTargetPosition, 5000)
		.delay(0)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function(){

		welcomeTextContainer.position.x =welcomTextPlanePosition.x;
		welcomeTextContainer.position.y = welcomTextPlanePosition.y;
		welcomeTextContainer.position.z = welcomTextPlanePosition.z;
		welcomeTextContainer.rotation.y = welcomTextPlanePosition.ry;
		
	}).onComplete(function(){
		console.log("welcome text group moved to...");
		console.log(welcomeTextContainer.position);
	
	});
	
	// start the first
	pushObjectOutTween.start();
	welcomeTween.start();	
}


// ## =========================
// ## Tween.js Setup (End here)
// ## =========================

	function initRenderers(){
		// renderers
	if ( Detector.webgl ){
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	}else{
		Detector.addGetWebGLMessage();
				return true;
	}
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	
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
		//set to -1 to make iframes visible.
		renderer.domElement.style.zIndex   = 1;
		rendererCSS.domElement.appendChild( renderer.domElement );
		THREEx.WindowResize(rendererCSS, camera);
	}
	//////////////
//----------- Brick Scene Functions	
///////////////
 function createBrickScene(){
 	var brickSceneCenter = SCENE_CONTAINER_INITIAL_POSITION.clone;
 	brickScene = new THREE.Object3D();
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
 	var skyPosition = new THREE.Vector3( 0, 0, 0 );
	 	
 		// create a new scene to hold CSS

 	brickCubePosition = [ [ brickSceneCenter-d, 0, zOffset_BrickScene ], [ xOffset_BrickScene+d, 0, zOffset_BrickScene ], [ xOffset_BrickScene, d, SCENE_CONTAINER_INITIAL_POSITION.z ], [ xOffset_BrickScene, -d, SCENE_CONTAINER_INITIAL_POSITION.z ], [ xOffset_BrickScene, 0, d+SCENE_CONTAINER_INITIAL_POSITION.z ], [ xOffset_BrickScene, 0, SCENE_CONTAINER_INITIAL_POSITION.z-d  ] ];
	
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
 	var d = 500;
 	var graphingSceneCenter = SCENE_CONTAINER_INITIAL_POSITION.clone();
 	console.log("material");
 	console.log(graphingSceneCenter);
 	graphingScene = new THREE.Object3D();
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*3, DFLT_CUBE_SIZE*3, DFLT_CUBE_SIZE*3 );
 	var skyPosition = new THREE.Vector3( SCENE_CONTAINER_INITIAL_POSITION.x, 0, SCENE_CONTAINER_INITIAL_POSITION.z );
	 	
 		// create a new scene to hold CSS

 	graphingPos = [ [ SCENE_CONTAINER_INITIAL_POSITION.x-d, 0, SCENE_CONTAINER_INITIAL_POSITION.z ], [ SCENE_CONTAINER_INITIAL_POSITION.x+d, 0, SCENE_CONTAINER_INITIAL_POSITION.z ], [ SCENE_CONTAINER_INITIAL_POSITION.x, d, SCENE_CONTAINER_INITIAL_POSITION.z ], [ SCENE_CONTAINER_INITIAL_POSITION.x, -d, SCENE_CONTAINER_INITIAL_POSITION.z ], [ SCENE_CONTAINER_INITIAL_POSITION.x, 0, d+SCENE_CONTAINER_INITIAL_POSITION.z ], [ SCENE_CONTAINER_INITIAL_POSITION.x, 0, SCENE_CONTAINER_INITIAL_POSITION.z-d  ] ];
	
	var materialArray = [];
	for (var i = 0; i < 6; i++){
		var material = new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( brickImage ),
				side: THREE.BackSide
		});
			materialArray.push( material);
}
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );

	graphingSceneSky = createSkyBox(brickImage, skyGeometry, skyPosition,skyMaterial );
	//graphingScene.add(graphingSceneSky);
graphingTextContainer = new THREE.Object3D();
	graphingTextContainer.position = new THREE.Vector3(-900, 200, -2000 );
	
	var phraseRotation = new THREE.Vector3(0, 0,0);
	

	  sayAt("Browse the Internet",
	  SCENE_CONTAINER_INITIAL_POSITION.x,-DFLT_CUBE_SIZE*1.5,SCENE_CONTAINER_INITIAL_POSITION.z,
	  phraseRotation, 0x666006,70,10);
	 
	 
	 //Writing on the back wall
	 // phraseRotation.set(-1*Math.PI/10,2*(-0),0);
	  console.log(phraseRotation);
	   graphingTextContainer.add(sayAt("Plotting Practice:",
	  SCENE_CONTAINER_INITIAL_POSITION.x,SCENE_CONTAINER_INITIAL_POSITION.y+250,0,
	  phraseRotation, 0x666006,25,1));	  
	 
	  
	  graphingTextContainer.add(sayAt("There is a ton of math",
	  SCENE_CONTAINER_INITIAL_POSITION.x, SCENE_CONTAINER_INITIAL_POSITION.y+200,0,
	  phraseRotation, 0x666006,25,2)); 	 
	 
	 graphingTextContainer.add(	  sayAt("involved in the 3d on this site. ",
	  SCENE_CONTAINER_INITIAL_POSITION.x,SCENE_CONTAINER_INITIAL_POSITION.y+150,0,
	  phraseRotation, 0x666006,25,3)); 	 
	 
	  	  
	  graphingTextContainer.add(sayAt("This is/will be my sketch pad",
	  SCENE_CONTAINER_INITIAL_POSITION.x,SCENE_CONTAINER_INITIAL_POSITION.y+100,0,
	  phraseRotation, 0x666006,25,4)); 	
	  
	  graphingSceneContainer.add(graphingTextContainer);
	  //fadeObjectTween(graphingTextContainer,1);
	  showGraphingTextTween();
	  
		//showXYZPlane(graphingScene,graphingSceneCenter,100);

	
    console.log("graphing scene added?");
    return graphingScene;
}	
	

//-----------End Graphing Functions

	///////
 	//Internet Browsing Scene
 	//   -- returns a THREE.Object3D representation of browsing section
 	///////
 function createInternetBrowsingScene(setupControlLimits){
 	var d = 380;  //an  offset which adjusts the distance between iFrames
 	browsingSceneCenter = SCENE_CONTAINER_INITIAL_POSITION.clone();
 	

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
	welcomeTextContainer.position = new THREE.Vector3(-900, 200, -2000 );
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
	frontPlaneMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: .9,transparent:true, side: THREE.DoubleSide ,map:texture});
	
	var planeWidth = DFLT_CUBE_SIZE;
    var planeHeight = DFLT_PAGE_HEIGHT-100;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight,DFLT_CUBE_SIZE);
	 planeMesh= new THREE.Mesh( planeGeometry, frontPlaneMaterial );
	//planeMesh.overdraw = true;
	//graphPlaneTargetList.push(planeMesh);
	planeMesh.position.fromArray( browserCubePos[ 5 ]);
	planeMesh.rotation.fromArray( cubeRot[ 5 ] );
	//planeMesh.rotation.y = Math.PI/7;
	//planeMesh.rotation.z = Math.PI;
	console.log(planeMesh.position);
	//planeMesh.position.x+=15;
	// add it to the standard (WebGL) scene
	planeMesh.name = "jax2d";
	scene.add(planeMesh);
	scene.add(welcomeTextContainer);
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
	//scene.add( cube );

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


 //controls.center =new THREE.Vector3(SCENE_CONTAINER_INITIAL_POSITION.x, 0,SCENE_CONTAINER_INITIAL_POSITION.z-200);
	/*
	var axis = new THREE.AxisHelper(DFLT_CUBE_SIZE/4);
	axis.name = "brickscene.axis";
    browsingScene.add(axis);
    axis.position = new THREE.Vector3(0, 0,SCENE_CONTAINER_INITIAL_POSITION.z);
    axis.visible = false;
    */
    if(controls){
    	controls.center = new THREE.Vector3(0, 0,browsingSceneCenter.z-200);;
    }

 if(setupControlLimits)
 {
 	setupBrowsingControlLimits(browsingSceneCenter);
 }
    return browsingScene;
}	

function setupBrowsingControlLimits(browsingCenter){
	//controls.maxDistance = DFLT_CUBE_SIZE/2
	controls.maxPolarAngle = Math.PI/2;
	controls.minPolarAngle = Math.PI/4;
	   camera.position = browsingCenter;
    camera.position.z+=800; 
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


/////////////////////////////// Add Assets (i.e. sphere, htmlpage)


	////////////
	// addSphere 
	////////////
function addSphere(radius, geometryY, geometryZ,positionX, positionY, positionZ, showCoords){
	 var phraseRotation = new THREE.Vector3(0,0,0);
	if(showCoords===undefined){
		showCoords = false;	
	}
	if(showCoords){
		sayAt("("+positionX.toFixed(2)+","+  positionY.toFixed(2)+") ", positionX, positionY+radius, positionZ, phraseRotation, 0xaaaa66,5,2 );
	}
	//console.log(positionX+" "+positionY +" "+ positionZ);
	var sphereGeom = new THREE.SphereGeometry(radius, geometryY, geometryZ);
    
	var moonTexture = THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/textures/sprites/ball.png' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
	moon.position.set(positionX.toFixed(2), positionY.toFixed(2), positionZ.toFixed(2));
    scene.add(moon);
        moon.name="moon"+positionX+"_"+positionX;
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



	/////////////
	//-- Create a Mesh and add it to webgl/canvas renderer.  Then create an iFrame 
	//   and place it in the same position and rotation as a side of the polygon (for now a cube )menu
	/////////////
	function addPageToContainer(sceneContainer,url, cubeSide){
	var r = Math.PI / 2;
	var d = 700;
 	var z = DFLT_PAGE_HEIGHT+500;
 	var sceneCenter = SCENE_CONTAINER_INITIAL_POSITION
	var pos = [ [ sceneCenter.x-d, sceneCenter.y, 2*sceneCenter.z-z ], [ sceneCenter.x+d , sceneCenter.y, 2*sceneCenter.z-z ], [ sceneCenter.x, sceneCenter.y+d,2*sceneCenter.z-z ], [ sceneCenter.x, sceneCenter.y-d, 2*sceneCenter.z-z], [ sceneCenter.x, sceneCenter.y, 2*sceneCenter.z+d ], [ sceneCenter.x, sceneCenter.y, 2*sceneCenter.z-d ] ];
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
	framePlaneMesh.position.fromArray( pos[ cubeSide ] );
	framePlaneMesh.rotation.fromArray( rot[ cubeSide ] );
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
    gridXY.name = "xy_plane";
    gridXY.position.set( position.x+size,position.y+size,position.z );
    gridXY.rotation.x = Math.PI/2;
    gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
    gridXY.material.opacity = 0.1;
    gridXY.material.transparent = true;
    var posYText = sayAt("+Y",
	  position.x-(size*1.5),position.y+size/2,position.z,
	  phraseRotation, 0x666006,50,10);
	 var posXText = sayAt("+X",
	  position.x,position.y-size,position.z,
	  phraseRotation, 0x666006,50,10);
	  
    container.add(posYText);
    container.add(gridXY);
    container.add(posXText);
    container.add(gridXY);
	fadeObjectTween(gridXY.material,1);
	fadeObjectTween(posYText.material,1);
	fadeObjectTween(posXText.material,1);
	var txtCenteringXOffset;
    for(var i=0; i<=size/10; i++){
      txtCenteringXOffset = (i<10)? -3:-4.5;
   	  var xValue = sayAt(i,
	  position.x+(i*10)+txtCenteringXOffset,position.y-10,position.z,
	  phraseRotation, 0x666006,5,2);
	  
	  container.add(xValue);
	  fadeObjectTween(xValue.material,1);
    }  
    
    var txtCenteringYOffset;
    for(var i=0; i<=size/10; i++){
      txtCenteringXOffset = (i<10)? -3:-4.5;
   	  var xValue = sayAt(i,
	  position.x-10,position.y+(i*10)+txtCenteringXOffset,position.z,
	  phraseRotation, 0x666006,5,2);
	  
	  container.add(xValue);
	  fadeObjectTween(xValue.material,1);
    }  
    return gridXY;
    

    // sayAt("XY blue", 0,-20,0,phraseRotation,0x000066 );
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
      scene.add(axes);
     //  showXZGrid(position, 100);
      showXYGrid(container,position, 100);
    //showYZGrid(position, 100);
  }

function showArrowFromOriginTo(endPoint){
    // direction (normalized), origin, length, color(hex)
    var origin =SCENE_CONTAINER_INITIAL_POSITION.clone();
   //console.log( Math.sMath.pow(endPoint.x,2)+ Math.pow(endPoint.y,2));
    var direction = new THREE.Vector3().subVectors(endPoint , origin).normalize();
    var arrow = new THREE.ArrowHelper(direction, origin,Math.sqrt ( Math.pow(endPoint.x,2)+ Math.pow(endPoint.y,2)), 0x884400);
    scene.add(arrow);
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
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xc242e3 } );
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
    textMaterial.opacity = 0.1;
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
	

function onDocumentMouseMove(event) {
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//-console.log("mouseCoords=("+event.clientX+","+event.clientY+")");
//	console.log("mouseCoords=("+mouseX+","+mouseY+")");
}

    function onDocumentMouseDown(event) {
			
			if(event.target.id === "html-browsing-menuitem"){
				
			 //toggle iframes
				if(renderer.domElement.style.zIndex=== "1"){
				//unmask iFrames
					renderer.domElement.style.zIndex   = -1;
				}else{
					renderer.domElement.style.zIndex   = 1;
				}
			}else
			if(event.target.id === "home-threed-menuitem"){
				//mask iFrames
				renderer.domElement.style.zIndex   = 1;
				cameraResetTween();	
			}else
			if(event.target.id === "graphing-menuitem"){
				//hide welcome text
				welcomeTextContainer.traverse(hideChildren);
				//construct and add graphing scene
				    graphingSceneContainer = createGraphingScene();
    				scene.add(graphingSceneContainer);
    				
    				//hide my photo material
					fadeObjectTween(frontPlaneMaterial, 0);
	
	//XY graph Origin 
	 graphOriginPosition =SCENE_CONTAINER_INITIAL_POSITION.clone();
	graphOriginPosition.z+=DFLT_CUBE_SIZE/2;
	graphOriginPosition.x-=100;
	showXYGrid(scene,graphOriginPosition, 100);
	//controls.center = graphOriginPosition;
	//controls.center.x+=0;
	//controls.center.z-= 5;
	
	//setup clickable pane 
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff });
	var planeWidth = 100;
    var planeHeight = 100;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	 xyPlaneMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	scene.add(xyPlaneMesh);
	xyPlaneMesh.position = graphOriginPosition.clone();
	//xyPlaneMesh.position.x += planeWidth/2;
	//xyPlaneMesh.position.y += planeHeight/2;
	//planeMesh.position.z += .01;
	xyPlaneMesh.name="xyPlane";
	// add it to the standard (WebGL) scene
	
	graphPlaneTargetList.push(xyPlaneMesh);
	console.log("xyPlaneMesh.position and boundingbox");
	console.log(xyPlaneMesh.position);
	console.log(xyPlaneMesh.geometry);
	scene.add(addSphere(5, 32, 16,xyPlaneMesh.position.x,xyPlaneMesh.position.y,xyPlaneMesh.position.z, true));
	camera.lookAt(graphOriginPosition);
	  }

				event.preventDefault();

				var vector = mouse.clone();
				projector.unprojectVector( vector, camera );
				 var direction =  vector.sub( camera.position ).normalize();//direction from camera to click position
				var raycaster = new THREE.Raycaster( camera.position, direction);
				
/*
    
	var distance = -camera.position.z / direction.z;
 var raycaster = new THREE.Raycaster(camera.position, direction.z);
	
	console.log(pos);
	 var raycaster = new THREE.Raycaster(camera.position, direction);
      */
			var graphPlaneIntersects =  raycaster.intersectObjects(graphPlaneTargetList);
            var iFrameIntersects = raycaster.intersectObjects(iFrameTargetList);
			var sceneIntersects  = raycaster.intersectObjects(sceneTargetList);

			//cameraTunnelGroup.traverse(showChildren);
//console.log(intersects);
			if (graphPlaneIntersects.length > 0){
				console.log("Graph Intersect");
				var pos = graphPlaneIntersects[0].point;
var points = [];
                var origin = raycaster.ray.origin.clone();
                //console.log(origin);
                //	var distance = -camera.position.z / direction.z;
			//	var pos = camera.position.clone().add( direction.multiplyScalar( distance ) );
				
                points.push(origin);
                points.push(pos);


                var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 1});
                var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 10);
				if (tube) scene.remove(tube);
				tube = new THREE.Mesh(tubeGeometry, mat);
               // scene.add(tube);
           			scene.add(addSphere(5, 32, 16,pos.x,pos.y,pos.z, true));

			}
			else
            if (iFrameIntersects.length > 0) {
             //   intersects[ 0 ].object.material.transparent = true;
             //   intersects[ 0 ].object.material.opacity = 0.1;

//    Pointer
                

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
