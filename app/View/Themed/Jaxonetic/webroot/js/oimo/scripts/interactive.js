/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN
	var SCREEN_WIDTH,	 SCREEN_HEIGHT ;
var GRID_DOT_SIZE= .4;
// standard global variables
var container, scene,cssScene, camera, rendererCSS, cameraControls, skyBoxControls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var targetList = [],mouse = { x: 0, y: 0 };
var projector;


 var boid, boids,birds, bird;

// custom global variables
var sphereMenu;
var areBirdsActive;
var skyBox;
var planeMesh;

var introPanelReceded, introCameraUpdated, introCameraTurned;

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

init();
initBoidsAndBirds();
animate();

// FUNCTIONS 		
function init() 
{
dflt_texture5 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[5] + imageSuffix  );
dflt_texture4 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[4] + imageSuffix  );
dflt_texture3 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[3] + imageSuffix  );
dflt_texture2 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[2] + imageSuffix  );
dflt_texture1 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[1] + imageSuffix  );
dflt_texture0 =  THREE.ImageUtils.loadTexture(imagePrefix + directions[0] + imageSuffix  );

	introCameraTurned = false;
	introCameraUpdated = false;
	introPanelReceded = false;
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
	camera.position.set(0,0,100);
	//camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'threeCanvas' );
	container.appendChild( renderer.domElement );
	//console.log($(container).css("height"));
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	 cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	 
  //    cameraControls.addEventListener( 'change', render );
  // window.addEventListener( 'change', render, false );
   
   
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.5, side: THREE.DoubleSide });
	var planeWidth = 10;
    var planeHeight = 10;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	 planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.x += planeWidth/2;
	planeMesh.position.y += planeHeight/2;
	//planeMesh.position.z += .01;
	planeMesh.name="xyPlane";
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	targetList.push(planeMesh);
   console.log("length:planemesh>>"+targetList.length);
   
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -100.5;
	floor.rotation.x = Math.PI / 2;
	//scene.add(floor);
	
setSkyDome();
   showXYZPlane();

    
   
/**       // direction (normalized), origin, length, color(hex)
    var origin_of_rightarrow = new THREE.Vector3(2, 4,-5);
    
    //var terminus  = new THREE.Vector3(1,1,1);
    var direction_of_rightarrow = new THREE.Vector3().subVectors(sphereMenu.position , origin_of_rightarrow).normalize();
    var rightarrow = new THREE.ArrowHelper(direction_of_rightarrow, origin_of_rightarrow, 5, 0x884400);
    scene.add(rightarrow);

	*/
	//setSkyBox( 4000, 4000, -4500 );
	//skyBoxControls = new THREE.OrbitControls( skyBox, renderer.domElement );
	//skyBoxControls.addEventListener( 'change', render );
	      
	sphereMenu = addSphere(5, 32, 16,0,0,0);

    //add sphereMenu to list of event targets
    targetList.push(sphereMenu);
    
console.log("length:>>"+targetList.length);
        // when the mouse down, 
          document.addEventListener( 'mousedown', onDocumentMouseDown, false );
          document.addEventListener( 'mousemove', onDocumentMouseMove, false );
     //    document.addEventListener( 'scroll', onDocumentScroll, false );
      //   document.addEventListener( 'mouseleave', pauseAnimation, false );
         
            
   }   
   

     
    ///////////
    // Show Grid
    // default shows a 20x20 grid
    ///////////     
         function showXZGrid(){
    gridXZ = new THREE.GridHelper(10, 1);
    gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
    gridXZ.position.set( 10,0,10 );
    scene.add(gridXZ);
    for(var i=0; i<=10; i++){
    //	sayAt("XZ green", 0,-20,0,-Math.PI/2,0,0, 0x006600);
    }
    sayAt("XZ green", 0,-20,0,-Math.PI/2,0,0, 0x006600);
   }
 
      function showXYGrid(){
   gridXY = new THREE.GridHelper(10, 1);
    gridXY.position.set( 10,10,0 );
    gridXY.rotation.x = Math.PI/2;
    gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
    scene.add(gridXY);
    
    for(var i=0; i<=10; i++){
   		sayAt(i, i,-2,0,0,0,0,0xaaaaaa );
    }  
     sayAt("XY blue", 0,-20,0,0,0,0,0x000066 );
    //  targetList.push(gridXY);
   }
        function showYZGrid(){
   gridYZ = new THREE.GridHelper(10, 1);
    gridYZ.position.set( 0,10,10 );
    gridYZ.rotation.z = Math.PI/2;
    gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
    scene.add(gridYZ);
    
     sayAt("YZ marroon", 0,-20,0,0,Math.PI/2,0, 0x660000);
   }  
   
     function showXYZPlane(){
   var axes = new THREE.AxisHelper(100);
    axes.position.set(0,0,0);
   //scene.add(axes);
   

  //showXZGrid();
showXYGrid();
 	
//showYZGrid();



  }
function showArrowFromOriginTo(endPoint){
    // direction (normalized), origin, length, color(hex)
    var origin = new THREE.Vector3(0,0,0);
   //console.log( Math.sMath.pow(endPoint.x,2)+ Math.pow(endPoint.y,2));
    var direction = new THREE.Vector3().subVectors(endPoint , origin).normalize();
    var arrow = new THREE.ArrowHelper(direction, origin,Math.sqrt ( Math.pow(endPoint.x,2)+ Math.pow(endPoint.y,2)), 0x884400);
    scene.add(arrow);
}

    ///////////
    // ADD  TEXT
    ///////////
    function sayAt(text, leftRatio, top, depth, xRotation, yRotation, zRotation, frontColor){
    	
	if ( frontColor === undefined ) {
		frontColor = 0x028482;
	}
	

        // add 3D text
    var materialFront = new THREE.MeshBasicMaterial( { color: frontColor } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x889898 } );
    var materialArray = [ materialFront, materialSide ];
    var textGeom = new THREE.TextGeometry( text, 
    {
        size: 1, height: .2, curveSegments: 33,
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
    
	var moonTexture = THREE.ImageUtils.loadTexture( '/jaxonetic/theme/jaxonetic/img/ball.png' );
	var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
    var moon = new THREE.Mesh(sphereGeom, moonMaterial);
	moon.position.set(positionX, positionY, positionZ);
    scene.add(moon);
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


		function setSkyDome(){
			scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );
			
				// LIGHTS

				var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.475 );
				directionalLight.position.set( 100, 100, -100 );
				scene.add( directionalLight );


				var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.25 );
				hemiLight.color.setHSL( 0.6, 1, 0.75 );
				hemiLight.groundColor.setHSL( 0.1, 0.8, 0.7 );
				hemiLight.position.y = 500;
				scene.add( hemiLight );

			
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

				scene.fog.color.copy( uniforms.bottomColor.value );

				var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
				var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

				var sky = new THREE.Mesh( skyGeo, skyMat );
				scene.add( sky );
			}
			
	function setSkyBox(x,y,z){
	
		var skyGeometry = new THREE.BoxGeometry( x, y, z );	//originally THREE.CubeGeometry( 1000, 1000, -350 );
		
		var materialArray = [];
		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( brickImage ),
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


		function underConstruction(){
	sayAt("Under Major Construction, obviously.", 1000 , 900, 2000,0, Math.PI,0 );
 sayAt("To navigate, drag your mouse and use your mousewheel.", 1400 , 700, 2000,0, Math.PI ,0);


}
var ctr = 0;
var revolutions = 0;
		var imagePrefix = "/jaxonetic/theme/jaxonetic/img/dawnmountain-";
		var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];



function initialWhitePanelMovement(){
	if( planeMesh.position.z>-2380){
	//	console.log(planeMesh.position);
		planeMesh.position.z-=10;
			
	}else
	{
		scene.remove(planeMesh);
		introPanelReceded = true;
	}
}

function isRunning(){	
	//console.log($("#threeCanvas").hasClass('isRunning'));

	return $("#threeCanvas").hasClass('isRunning');
}

function update()
{
	

	if(cameraControls )
		cameraControls.update();
		/*
	if(moonGlow !== undefined){	
		moonGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, moonGlow.position );
	}
	if(crateGlow !== undefined){
	crateGlow.material.uniforms.viewVector.value = 
		new THREE.Vector3().subVectors( camera.position, crateGlow.position );
	}
	*/
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
	if(isRunning()){
	//	console.log("render white pane moving ::>>"+isRunning());
	   // if(!introPanelReceded)initialWhitePanelMovement();
	  // cameraRotateZ();
	 // cameraControls.rotateRight(Math.PI/36);

	    if(!introCameraUpdated){
	    //	console.log("camera updating");
	    	cameraZoomZ();
	    
	//    if(introCameraUpdated){
	//        cameraControls.rotateRight(.001);
	  //  }
	   }
	renderer.render( scene, camera );
//	rendererCSS.render( cssScene, camera );
	}
}


 
function cameraZoomZ(){
	//console.log("1.");	console.log(camera.position);

	if( camera.position.z >=4000){
		var distance = new THREE.Vector3(0, 0, -10); 
		
		cameraControls.pan(distance)
		//skyBoxControls.rotateRight(Math.PI/5);
	//console.log("2.");
	//console.log(camera.position);


	if(camera.position.z>6700){
		skyBox.material.materials[5].map =  dflt_texture5;
	//	cameraControls.rotateRight(Math.PI/5);
	}else
		if(camera.position.z>6500){
		skyBox.material.materials[4].map =  dflt_texture4;
		//	skyBoxControls.rotateLeft(Math.PI/5);
		//skyBox.rotation.y+=Math.PI/5;
	//	cameraControls.rotateRight(Math.PI/5);
	}else
	if(camera.position.z>6300){
		skyBox.material.materials[3].map =  dflt_texture3;
	//	cameraControls.rotateRight(Math.PI/5);
	}else
		if(camera.position.z>6100){
		skyBox.material.materials[2].map =  dflt_texture2;
	//	cameraControls.rotateRight(Math.PI/5);
	}else
		if(camera.position.z>5900){
		skyBox.material.materials[1].map =  dflt_texture1;
	//	cameraControls.rotateRight(Math.PI/5);
	}
	else
	if(camera.position.z>5700){
		skyBox.material.materials[0].map =  dflt_texture0;
	//	cameraControls.rotateRight(Math.PI/70);
	}
	
	//camera.position.z-=15;
	}else{
		
//console.log(camera.position);
		introCameraUpdated = true;
		//console.log(cameraControls.object.rotation);
		//cameraControls.center = new THREE.Vector3 (0,0,3000);
		underConstruction();
		//camera.lookAt(0,50,6900);
		//camera.rotation.x = -Math.PI/2;
		//skybox.rotation.z+=Math.PI/2;
		
	}
	
	if( camera.position.z >=200){

	//	cameraControls.rotateRight(Math.PI/70);
	}
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
           
        /*   
 function onDocumentScroll() {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
       console.log("bottom!");
      
       container.style.zIndex =1;
		 if (!isRunning())
		 {
		 
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

*/
  
  function pauseAnimation(){
  	
  //	console.log("mouse left...pausing");
 	$("#threeCanvas").removeClass('isRunning')
  }
     
     
  /*
   * Start after page loads
   */      
  $(window).bind("load", function() {
  	 $("#threeCanvas").addClass('isRunning');
     initBoidsAndBirds();
});         
           
function onDocumentMouseDown( event ) 
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
     event.preventDefault();
    
   // console.log("Click.");
    
    // update the mouse variable
    mouse.x = ( event.clientX / SCREEN_WIDTH ) * 2 - 1;
    mouse.y = - ( event.clientY / SCREEN_HEIGHT ) * 2 + 1;
    
   	 
    // find intersections

    // create a Ray with origin at the mouse position
    //   and direction into the scene (camera direction)
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
  //  console.log(vector.normalize());
    projector.unprojectVector( vector, camera );
     //console.log(vector);
     console.log(camera.position);
     vectorsub = vector.sub( camera.position );
     var direction = vectorsub.normalize();//direction from camera to click position
	var distance = - camera.position.z / direction.z;

	var pos = camera.position.clone().add( direction.multiplyScalar( distance ) );
	console.log(pos);
	//console.log(pos.normalize());
    var ray = new THREE.Raycaster( camera.position, pos );
    //scene.add(ray);
	console.log( ray );
    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( targetList );
    //mouse.x = (event.clientX - (window.innerWidth*0.5))-(container.width*0.5);
    //console.log(mouse.x + "," + mouse.y+"-----");
    showArrowFromOriginTo(pos);
    
   targetList.push( addSphere(GRID_DOT_SIZE, 32, 16,pos.x,pos.y,0, true));
   // console.log( sphereMenu.position);
    console.log(targetList.length);
    // if there is one (or more) intersections
    if ( intersects.length > 0 )
    {
    	//console.log(intersects[0]);
        console.log("Hit @ "/* + toString( intersects[0].point ) */);
        //console.log(areBirdsActive);
 		//$("#threeCanvas").removeClass('isRunning');
 		// $("body, html").animate({ scrollTop: 0 }, 600);
        if(!areBirdsActive)
		        {
		        	console.log("Birds");
		        	//boids=[];
		       		
		       	//	areBirdsActive =true;
		       	}
       	
       			//change geometry of skybox 
       	
   
      //  $(".bird-canvas").load("jaxonetic/jaxblog");
//$("#content").load("jaxblog");
   //  scene.remove(sphereMenu);
    }
    
 
}
