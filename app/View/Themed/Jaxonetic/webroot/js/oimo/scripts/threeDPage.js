/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
 
// standard global variables
var container,camera, rendererCSS, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var iFrameTargetList = [],mouse = { x: 0, y: 0 };

var scene, browsingCssScene;
var graphingSceneContainer, browsingSceneContainer; 
var graphingSceneSky, browsingSceneSky;
var browsingSceneCenter;
var graphingSceneCenter;

var projector;

// SKYBOX/FOG
var imagePrefix = "/jaxonetic/theme/jaxonetic/img/dawnmountain-";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".png";
var brickImage = "/jaxonetic/theme/jaxonetic/img/brick.png";

//
    var gridYZ, gridXZ ,gridXY;
    
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
var DFLT_PAGE_HEIGHT =1000;


//SCENE CONTAINER POSITIONS
	// Cube as a matrix
	var r = Math.PI / 2;
	var d = 0;
	var cubePos,	cubeRot,graphingPos;	
	var zOffset_InternetBrowsingScene = 1000;
    var xOffset_InternetBrowsingScene = 2000;
    
  	var zOffset_InternetGraphingScene = 1000;
    var xOffset_InternetGraphingScene = 5000;

var textureCamera;

// intermediate scene for reflecting the reflection
var screenScene, screenCamera, firstRenderTarget, finalRenderTarget;

var tube;
var pageHtmlObjCount;
var frameObjects = [];

init();
animate();


// FUNCTIONS 		
function init() 
{
	
	pageHtmlObjCount = 0;
	projector = new THREE.Projector();
	
	//main scene
	scene = new THREE.Scene();
	browsingSceneContainer = new THREE.Object3D();
	graphingSceneContainer = new THREE.Object3D();

	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
	
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(xOffset_InternetBrowsingScene,0,zOffset_InternetBrowsingScene+4200);
	
	scene.add(camera);
	
		// renderers
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	initCSSRenderers();
 	
 	//controls
 	controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.minDistance =-700;
	//controls.maxDistance =7000;
	
	browsingSceneContainer = createInternetBrowsingScene(browsingSceneContainer);
	graphingSceneContainer = createGraphingScene();
	
	showXYZPlane();
    
    scene.add(browsingSceneContainer);
    scene.add(graphingSceneContainer);
    
		// EVENTS
		THREEx.WindowResize(renderer, camera);
			// when window resizes, also resize this renderer
		THREEx.WindowResize(rendererCSS, camera);
		document.addEventListener('mousedown', onDocumentMouseDown, false);
}


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
		renderer.domElement.style.zIndex   = 1;
		rendererCSS.domElement.appendChild( renderer.domElement );
		
	}
	
 function createGraphingScene(){
 	graphingSceneCenter = new THREE.Vector3(xOffset_InternetGraphingScene, 0,zOffset_InternetGraphingScene);
 	graphingScene = new THREE.Object3D();
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
 	var skyPosition = new THREE.Vector3( xOffset_InternetGraphingScene, 0, zOffset_InternetGraphingScene );
	 	
 		// create a new scene to hold CSS

 	graphingPos = [ [ xOffset_InternetGraphingScene-d, 0, zOffset_InternetGraphingScene ], [ xOffset_InternetGraphingScene+d, 0, zOffset_InternetGraphingScene ], [ xOffset_InternetGraphingScene, d, zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, -d, zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, 0, d+zOffset_InternetBrowsingScene ], [ xOffset_InternetGraphingScene, 0, zOffset_InternetBrowsingScene-d  ] ];
	
	graphingSceneSky = createSkyBox(brickImage, skyGeometry, skyPosition );
	graphingScene.add(graphingSceneSky);
			 	
	var axes = new THREE.AxisHelper(1500);
   	axes.position = graphingSceneCenter;
    graphingScene.add(axes);
    console.log("graphing scene added?");
    return graphingScene;
}	
	
	///////
 	//Internet Browsing Scene
 	//   -- returns a THREE.Object3D representation of browsing section
 	///////
 function createInternetBrowsingScene(){
 	browsingSceneCenter = new THREE.Vector3(xOffset_InternetBrowsingScene, 0,zOffset_InternetBrowsingScene);

 	// create a new scene to hold CSS
	browsingScene = new THREE.Object3D();
 	cubePos = [ [ xOffset_InternetBrowsingScene-d, 0, zOffset_InternetBrowsingScene ], [ xOffset_InternetBrowsingScene+d, 0, zOffset_InternetBrowsingScene ], [ xOffset_InternetBrowsingScene, d, zOffset_InternetBrowsingScene ], [ xOffset_InternetBrowsingScene, -d, zOffset_InternetBrowsingScene ], [ xOffset_InternetBrowsingScene, 0, d+zOffset_InternetBrowsingScene ], [ xOffset_InternetBrowsingScene, 0, zOffset_InternetBrowsingScene-d  ] ];
	cubeRot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];	
		
	var skyGeometry = new THREE.Vector3(DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
	var skyPosition = new THREE.Vector3( xOffset_InternetBrowsingScene, 0, zOffset_InternetBrowsingScene );
	browsingSceneSky = createSkyBox(brickImage, skyGeometry,skyPosition);
	browsingScene.add(browsingSceneSky);
	 sayAt("Everything is still in an infancy stage.  Come back often... 05/22",
	  browsingSceneCenter.x-30,DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  0,0,0, 0x666006,70,10);
	  sayAt("Browse the Internet",
	  browsingSceneCenter.x,-DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  0,0,0, 0x666006,70,10);
	  
	addPageToContainer(browsingScene,"/jaxonetic/aboutme",1);
	addPageToContainer(browsingScene,"/jaxonetic/contactme",0);
	addPageToContainer(browsingScene,"/jaxonetic/projects",5);

 //controls.center =new THREE.Vector3(xOffset_InternetBrowsingScene, 0,zOffset_InternetBrowsingScene-200);
	
	var axes = new THREE.AxisHelper(1500);
    axes.position = browsingSceneCenter;
    browsingScene.add(axes);
   
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
}

function update()
{
	controls.update();
}
        
function render() 
{
	rendererCSS.render( browsingCssScene, camera );
	renderer.render( scene, camera );	
}

	/////////////
	//-- Create a Mesh and add it to webgl/canvas renderer.  Then create an iFrame 
	//   and place it in the same position and rotation as a side of the polygon (for now a cube )menu
	/////////////
	function addPageToContainer(sceneContainer,url, cubeSide){
	
	var texture = new THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/textures/terrain/grasslight-big.jpg' );
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: .1, side: THREE.DoubleSide });
	
	var planeWidth = DFLT_CUBE_SIZE;
    var planeHeight = DFLT_PAGE_HEIGHT;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight,DFLT_CUBE_SIZE);
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	//planeMesh.overdraw = true;
	planeMesh.position.fromArray( cubePos[ cubeSide ]);
	planeMesh.rotation.fromArray( cubeRot[ cubeSide ] );
	
	//planeMesh.position.x+=15;
	// add it to the standard (WebGL) scene
	planeMesh.name = "htmlFrame"+ (pageHtmlObjCount);
	pageHtmlObjCount+=1;

	sceneContainer.add(planeMesh);
	
	//make this plane selectable
	iFrameTargetList.push(planeMesh);
	// create a new scene to hold CSS
	if(!browsingCssScene)
		browsingCssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= url;
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
	cssObject.position.fromArray( cubePos[ cubeSide ] );
	cssObject.rotation.fromArray( cubeRot[ cubeSide ] );

	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	browsingCssScene.add(cssObject);
	frameObjects.push(cssObject);
	
	}

      
    ///////////
    // Show Grid
    // default shows a 20x20 grid
    ///////////     
         function showXZGrid(size){
    gridXZ = new THREE.GridHelper(size, 10);
    //gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
    gridXZ.color1=new THREE.Color(0x006600) ;
    gridXZ.position.set( size,0,size );
    scene.add(gridXZ);
    for(var i=0; i<=size; i++){
    //	sayAt("XZ green", 0,-20,0,-Math.PI/2,0,0, 0x006600);
    }
    sayAt("XZ green", 0,-20,0,-Math.PI/2,0,0, 0x006600);
   }
 
      function showXYGrid(size){
   gridXY = new THREE.GridHelper(size, 10);
    gridXY.position.set( size,size,0 );
    gridXY.rotation.x = Math.PI/2;
   // gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
    scene.add(gridXY);
    
    for(var i=0; i<=size; i++){
   		sayAt(i, i,-2,0,0,0,0,0xaaaaaa );
    }  
     sayAt("XY blue", 0,-20,0,0,0,0,0x000066 );
    //  iFrameTargetList.push(gridXY);
   }
        function showYZGrid(size){
   gridYZ = new THREE.GridHelper(size, 10);
    gridYZ.position.set( 0,size,size );
    gridYZ.rotation.z = Math.PI/2;
 //   gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
    scene.add(gridYZ);
    
     sayAt("YZ marroon", 0,-20,0,0,Math.PI/2,0, 0x660000);
   }  
   
     function showXYZPlane(){
   var axes = new THREE.AxisHelper(10000);
    axes.position.set(0,0,0);
   //scene.add(axes);
   

  showXZGrid(100);
showXYGrid(100);
 	
showYZGrid(100);



  }


///////////
    // ADD  TEXT
    ///////////
    function sayAt(text, leftRatio, top, depth, xRotation, yRotation, zRotation, frontColor,fontSize, fontHeight){
    	
	if ( frontColor === undefined ) {
		frontColor = 0x028482;
	}
	

        // add 3D text
    var materialFront = new THREE.MeshBasicMaterial( { color: frontColor } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x889898 } );
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
    textMesh.rotation.x = xRotation;
    textMesh.rotation.y = yRotation;
    textMesh.rotation.z = zRotation;
    
    scene.add(textMesh);
    // done adding Text
    
    }


	
	function createSkyBox(textureImage, geometry, position){
	
		var skyGeometry = new THREE.CubeGeometry( geometry.x, geometry.y, geometry.z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( textureImage ),
				side: THREE.DoubleSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		skyBox.position.set( position.x, position.y, position.z );
		
		return skyBox;
	}
	


    function onDocumentMouseDown(event) {

			
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects(iFrameTargetList);

//console.log(intersects);
            if (intersects.length > 0) {
             //   intersects[ 0 ].object.material.transparent = true;
             //   intersects[ 0 ].object.material.opacity = 0.1;

/**    Pointer
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

				//controls.center =intersects[0].point;
                */

         		renderer.domElement.style.zIndex   = -1;
                    
            }else{//if not an iframeClick, ensure renderer is on top of cssRenderer
            			renderer.domElement.style.zIndex   = 1;
            }
        }

