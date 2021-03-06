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
var targetList = [],mouse = { x: 0, y: 0 };

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



function init() {
pageHtmlObjCount = 0;
	projector = new THREE.Projector();
	// SCENE
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

	// scene
	scene = new THREE.Scene();
	browsingCssScene = new THREE.Scene();

	// camera
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 75, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
	
	
	// renderer
		if ( Detector.webgl )
			renderer = new THREE.WebGLRenderer( {antialias:true} );
		else
			renderer = new THREE.CanvasRenderer(); 
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	//container = document.getElementById( 'threeCanvas' );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0,0,zOffset-400);
	
	scene.add(camera);
	//camera.lookAt(browsingSceneCenter);
	// controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
		initCSSRenderers();
	// params

   controls.center =new THREE.Vector3(xOffset, 0,zOffset-200);
    
 	 cubePos = [ [ xOffset-d, 0, zOffset ], [ xOffset+d, 0, zOffset ], [ xOffset, 0, d+zOffset ], [ xOffset, 0, zOffset-d  ], [ xOffset, d, zOffset ], [ xOffset, -d, zOffset ] ];
	 cubeRot = [ [ 0, r, 0 ], [ 0, -r, 0 ], [ 0, 2*r, 0 ], [ 0, 0, 0 ] , [ -r, 0, 0 ], [ r, 0, 0 ]];	

 
	// cube
	var cube = new THREE.Object3D();
	
 sayAt("Browse the Internet",
	  browsingSceneCenter.x,-DFLT_CUBE_SIZE*1.5,browsingSceneCenter.z,
	  0,0,0, 0x666006,70,10);
	
		   var axes = new THREE.AxisHelper(2000);
    axes.position = browsingSceneCenter;
   scene.add(axes);
   
   	showXYZPlane();
	
 // setSkyBox( DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1, DFLT_CUBE_SIZE*2.1 );
      showPageOnCube(cube,"/jaxonetic/aboutme",0);
   showPageOnCube(cube,"/jaxonetic/projects",1);
    showPageOnCube(cube,"/jaxonetic/contactme",2);
  	browsingCssScene.add( cube );

camera.lookAt(cube.position);
}



	function initCSSRenderers(){
	
			// create a renderer for CSS
		rendererCSS	= new THREE.CSS3DRenderer();
		rendererCSS.setSize( window.innerWidth, window.innerHeight );
		rendererCSS.domElement.style.position = 'absolute';
		rendererCSS.domElement.style.top	  = 0;
		rendererCSS.domElement.style.margin	  = 0;
		rendererCSS.domElement.style.padding  = 0;
		document.body.appendChild( rendererCSS.domElement );
	
	
		renderer.domElement.style.position = 'absolute';
		renderer.domElement.style.top      = 0;
		// make sure original renderer appears on top of CSS renderer
		renderer.domElement.style.zIndex   = -1;
		rendererCSS.domElement.appendChild( renderer.domElement );
		
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
	function showPageOnCube(cube, url, cubeSide){
		var planeWidth = DFLT_CUBE_SIZE;
    var planeHeight = DFLT_PAGE_HEIGHT;
	
	// create a new scene to hold CSS
	// cssScene = new THREE.Scene();
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
	cssObject.rotation.fromArray( cubeRot[ 2 ] );

	cube.add(cssObject);
	//frameObjects.push(cssObject);
	
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
    //  targetList.push(gridXY);
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


		function setSkyDome(){
			//scene.fog = new THREE.Fog( 0xffffff, 320, 2000 );
			
				// LIGHTS
			// lights

				var light, materials;

				scene.add( new THREE.AmbientLight( 0x666666 ) );

				light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
				light.position.set( xOffset+50, 200, zOffset+100 );
				//light.position.multiplyScalar( 1.3 );

				light.castShadow = true;
				//light.shadowCameraVisible = true;

				light.shadowMapWidth = 2048;
				light.shadowMapHeight = 2048;

				var d = 100;

				light.shadowCameraLeft = -d;
				light.shadowCameraRight = d;
				light.shadowCameraTop = d;
				light.shadowCameraBottom = -d;

				light.shadowCameraFar = 1000;
				light.shadowDarkness = 0.5;

				scene.add( light );

				light = new THREE.DirectionalLight( 0x3dff0c, 0.35 );
				light.position.set( xOffset, -1, zOffset );

				scene.add( light );


				var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.475 );
				directionalLight.position.set( 100+xOffset, 800, zOffset-100 );
				//scene.add( directionalLight );


				var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.25 );
				hemiLight.color.setHSL( 0.6, 1, 0.75 );
				hemiLight.groundColor.setHSL( 0.1, 0.8, 0.7 );
				hemiLight.position.set( 100+xOffset, 500, zOffset-100 );
		//	scene.add( hemiLight );

			
				// SKYDOME

				var vertexShader = document.getElementById( 'vertexShader' ).textContent;
				var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
				var uniforms = {
					topColor: 	 { type: "c", value: new THREE.Color( 0x0077ff ) },
					bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
					offset:		 { type: "f", value: 400 },
					exponent:	 { type: "f", value: 0.6 }
				}
				uniforms.topColor.value.copy( hemiLight.color );

				//scene.fog.color.copy( uniforms.bottomColor.value );

				var skyGeo = new THREE.SphereGeometry( 1000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.FrontSide } );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				sky.position.set(camera.position);
				scene.add( sky );
				
					// ground

				var initColor = new THREE.Color( 0x497f13 );
				var initTexture = THREE.ImageUtils.generateDataTexture( 1, 1, initColor );

				var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: initTexture } );

				var groundTexture = THREE.ImageUtils.loadTexture( "/jaxonetic/theme/jaxonetic/img/textures/terrain/grasslight-big.jpg", undefined, function() { groundMaterial.map = groundTexture } );
				groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
				groundTexture.repeat.set( 25, 25 );
				groundTexture.anisotropy = 16;

				var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1500, 1500 ), groundMaterial );
				mesh.position.set( xOffset, -550, zOffset );	
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

			}
			
			
	function setSkyBox(x,y,z){
	
		var skyGeometry = new THREE.CubeGeometry( x, y, z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( brickImage ),
				side: THREE.DoubleSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		skyBox.position = browsingSceneCenter;
		scene.add( skyBox );
		console.log("skybox added");
	}
	


        function onDocumentMouseDown(event) {

            //event.preventDefault();
			
            var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects(targetList);

//console.log(intersects);
            if (intersects.length > 0) {
             //   intersects[ 0 ].object.material.transparent = true;
             //   intersects[ 0 ].object.material.opacity = 0.1;

                var points = [];
                var origin = raycaster.ray.origin.clone();
                console.log(origin);
                points.push(browsingSceneCenter);
                points.push(intersects[0].point);

                var mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 1});
                var tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points), 60, 10);
				console.log(frameObjects[pageHtmlObjCount-1].name);
				if(frameObjects[pageHtmlObjCount-1].name === "htmlFrame0"){
					console.log(frameObjects[pageHtmlObjCount-1].name);
					$(frameObjects[pageHtmlObjCount-1].element).focus()
				}
				controls.center =intersects[0].point;
                if (tube) scene.remove(tube);

          
                    tube = new THREE.Mesh(tubeGeometry, mat);
                    scene.add(tube);
          



            }
        }

