/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
 
// standard global variables
var container, scene,browsingCssScene, camera, rendererCSS, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var iFrameTargetList = [],mouse = { x: 0, y: 0 };

var projector;

var brickImage = "/jaxonetic/theme/jaxonetic/img/brick.png";

 var boid, boids,birds, bird;

// custom global variables
var sphereMenu;
var areBirdsActive;
var cube;
var DFLT_CUBE_SIZE = 800;
var DFLT_PAGE_HEIGHT =1000;

 var gridYZ, gridXZ ,gridXY;	

	// Cube as a matrix
	var r = Math.PI / 2;
	var d = DFLT_CUBE_SIZE;
	var cubePos,	cubeRot;	
	var zOffset = 600;
    var xOffset = 600;
var textureCamera;

// intermediate scene for reflecting the reflection
var screenScene, screenCamera, firstRenderTarget, finalRenderTarget;
var browsingSceneCenter = new THREE.Vector3(xOffset, 0,zOffset);
var tube;
var pageHtmlObjCount;
var frameObjects = [];

init();
animate();


// FUNCTIONS 		
function init() 
{
	initBrowserScene();
}

function initBrowserScene() 
{	
	pageHtmlObjCount = 0;
	projector = new THREE.Projector();
	
	//main scene
	scene = new THREE.Scene();
	
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
	
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(xOffset,0,zOffset+4200);
	
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
	
	initInternetBrowsingScene();
	//showXYZPlane();

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
	 	///////
 	//Internet Browsing Scene
 	///////
 	
 function initInternetBrowsingScene(){
 	// create a new scene to hold CSS
	browsingCssScene = new THREE.Scene();
 	cubePos = [ [ xOffset-d, 0, zOffset ], [ xOffset+d, 0, zOffset ], [ xOffset, d, zOffset ], [ xOffset, -d, zOffset ], [ xOffset, 0, d+zOffset ], [ xOffset, 0, zOffset-d  ] ];
	cubeRot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ -r, 0, 0 ], [ r, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];	
		

	setSkyBox(brickImage, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
	
	 sayAt("Everything is still in an infancy stage.  Come back often... 05/22",
	  browsingSceneCenter.x-30,DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  0,0,0, 0x666006,70,10);
	  sayAt("Browse the Internet",
	  browsingSceneCenter.x,-DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  0,0,0, 0x666006,70,10);
	  
	showPageOnCube("/jaxonetic/aboutme",1);
	showPageOnCube("/jaxonetic/contactme",0);
	showPageOnCube("/jaxonetic/projects",5);

 	controls.center =new THREE.Vector3(xOffset, 0,zOffset-200);
	
	var axes = new THREE.AxisHelper(1500);
    axes.position = controls.center;
    scene.add(axes);
   
    camera.lookAt(axes);
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
	function showPageOnCube(url, cubeSide){
	
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

	console.log(pageHtmlObjCount);
	scene.add(planeMesh);
	
	//make this plane selectable
	iFrameTargetList.push(planeMesh);
	
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


	
	function setSkyBox(textureImage, x,y,z){
	
		var skyGeometry = new THREE.CubeGeometry( x, y, z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( textureImage ),
				side: THREE.DoubleSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		skyBox.position.set( xOffset, -0, zOffset );
		scene.add( skyBox );
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

