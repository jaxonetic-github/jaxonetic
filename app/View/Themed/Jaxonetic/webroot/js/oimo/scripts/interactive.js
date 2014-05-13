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
var skyBox;

init();
animate();

// FUNCTIONS 		
function init() 
{
	
	areBirdsActive = false;
		
	// SCENE
	scene = new THREE.Scene();
	projector = new THREE.Projector();
	
	// CAMERA
	 SCREEN_WIDTH = window.innerWidth;
	 SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,100,10000);
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
	
	

	
	setSkyBox( 4000, 4000, -4500 );
	sphereMenu = addSphere(35, 32, 16,-50,10,-150);

    //add sphereMenu to list of event targets
    targetList.push(sphereMenu);
 sayAt("Under Major Construction, obviously.", -1200 , -1400, 100, -Math.PI /10,0,Math.PI/60 );
 sayAt("Come close, drag your mouse and use your mousewheel.", -1700 , -1600, 100, -Math.PI /10,0,Math.PI/60 );
 sayAt("Come close, and try to turn around", -1700 , -1800, 100, -Math.PI /10,0,Math.PI/60 );

sayAt("Click ball to exit and scroll to the top.", -1700 , -2000, 100, -Math.PI /10,0,Math.PI/60 );

	console.log(sphereMenu);
        // when the mouse down, 
          document.addEventListener( 'mousedown', onDocumentMouseDown, false );
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
         document.addEventListener( 'scroll', onDocumentScroll, false );
         document.addEventListener( 'mouseleave', pauseAnimation, false );
         
            
   }     

    ///////////
    // ADD  TEXT
    ///////////
    function sayAt(text, leftRatio, top, depth, xRotation, yRotation, zRotation){
    	
    	
        // add 3D text
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x028482 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x889898 } );
    var materialArray = [ materialFront, materialSide ];
    var textGeom = new THREE.TextGeometry( text, 
    {
        size: 96, height: 30, curveSegments: 33,
        font: "helvetiker", weight: "normal", style: "normal",
        bevelThickness: 1, bevelSize: 1, bevelEnabled: true,
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

function pagethreeD(){
	

	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, side: THREE.DoubleSide });
	var planeWidth = 360;
    var planeHeight = 120;
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
	var elementWidth = 1024;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	console.log(element);
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = planeMesh.position;
	cssObject.rotation = planeMesh.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene.add(cssObject);
	
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
 //camera.lookAt(cssScene.position);
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top      = 0;
	// make sure original renderer appears on top of CSS renderer
	renderer.domElement.style.zIndex   = 3;
	rendererCSS.domElement.appendChild( renderer.domElement );
	
}

	function setSkyBox(x,y,z){
	
		// SKYBOX/FOG
		var imagePrefix = "theme/jaxonetic/img/dawnmountain-";
		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
		var imageSuffix = ".png";
		var skyGeometry = new THREE.CubeGeometry( x, y, z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
				//side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
		skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
		scene.add( skyBox );
	}

function initBoidsAndBirds(){
                birds = [];
                boids = [];

                for ( var i = 0; i < 200; i ++ ) {
                    /*  --> Keeping this around.  This will have them start randomly
                    boid = boids[ i ] = new Boid();
                    boid.position.x = Math.random() * 400 - 200;
                    boid.position.y = Math.random() * 400 - 200;
                    boid.position.z = Math.random() * 400 - 200;
                    
                    */
                    boid = boids[ i ] = new Boid();
                    
                    boid.position.x = -50;
                    boid.position.y = 10;
                    boid.position.z = -100;
                    boid.velocity.x = Math.random() * 2 - 1;
                    boid.velocity.y = Math.random() * 2 - 1;
                    boid.velocity.z = Math.random() * 2 - 1;
                    boid.setAvoidWalls( true );
                    boid.setWorldSize( 500, 500, 400 );

                    bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
                    bird.phase = Math.floor( Math.random() * 62.83 );
                    bird.position = boids[ i ].position;
                    scene.add( bird );


                }
}

function animate() 
{
    requestAnimationFrame( animate );
    preRenderBoids();
	render();		
	update();
}

function isRunning(){	 
	 	return $("#threeCanvas").hasClass('isRunning');
}

function update()
{
	if(controls && isRunning())
		controls.update();
	moonGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, moonGlow.position );
	crateGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, crateGlow.position );
}
    

           function preRenderBoids() {
           	/*
           	for ( var i = 0; birds && i < birds.length; i ++ ) {
           	   if(birds[i].canDeleteBird){
           			
           	   scene.remove( birds[ i ] );
           	   birds.splice(i,1);
           	   boids.splice(i,1);

           	   }

 				if(birds.length==0)
 				{
 					birds = [];
 					boids = [];
 					areBirdsActive = false;
 				//	console.log("clearing");
 				}
			}
           	*/
			if(areBirdsActive){
						
                for ( var i = 0, il = birds.length; i < il; i++ ) {

                    boid = boids[ i ];
                    boid.run( boids );

                    bird = birds[ i ];
					bird.position.z-=1;

                    color = bird.material.color;
                    color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

                    bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
                    bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

                    bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
                    bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;
					/*
					if( bird.position.z < -150)
					{	
					    birds[i].canDeleteBird = true;
					}
					*/
				}
              }else{
              	
              }
            }//preRenderBoids
            
function render() 
{
	renderer.render( scene, camera );
//	rendererCSS.render( cssScene, camera );
	
}


 


   function onDocumentMouseMove( event ) {
  
                var vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH/2, - event.clientY + SCREEN_HEIGHT/2, 0 );
			if(areBirdsActive){
                for ( var i = 0, il = boids.length; i < il; i++ ) {

                    boid = boids[ i ];

                    vector.z = boid.position.z;

                    boid.repulse( vector );

                }
             }else{
             	//
             }

           };
           
           
 function onDocumentScroll() {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
       console.log("bottom!");
       controls = new THREE.OrbitControls( camera, renderer.domElement );
       controls.addEventListener( 'change', render );
       container.style.zIndex =1;
		 if (!isRunning())
		 {
		  $("#threeCanvas").addClass('isRunning');
		 
console.log("is Running so show birds");
			if(!areBirdsActive)
		        {
		        	console.log("Birds");
		        	//boids=[];
		       		initBoidsAndBirds();
		       		areBirdsActive =true;
		       	}
       	
       	//change geometry of skybox 
       	
		 }//isRunning
   }else
   {
   	  //if()
   }
 }


  
  function pauseAnimation(){
  	
  	console.log("mouse left...pausing");
  	$("#threeCanvas").removeClass('isRunning')
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
        console.log(areBirdsActive);
 $("#threeCanvas").removeClass('isRunning');
  $("body").animate({ scrollTop: 0 }, 600);
        
   
      //  $(".bird-canvas").load("jaxonetic/jaxblog");
//$("#content").load("jaxblog");
   //  scene.remove(sphereMenu);
    }
    
 
}
