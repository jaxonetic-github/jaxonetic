
<?php echo $this->Html->scriptStart(array('inline' => false)); ?>
jQuery(function($) {
  var world, mass, body, shape, timeStep=1/60,
         camera, scene, renderer, geometry, material, mesh;
  var  projector,ray,mouse_vector;
  var sphere, cube;
  var WIDTH =500;
  var HEIGHT =500;
  
      initThree();
   //   initCannon(WIDTH,HEIGHT);
      animate();
  
   function initCannon() {
          
          world = new CANNON.World();
          world.gravity.set(0,0,0);
          world.broadphase = new CANNON.NaiveBroadphase();
          world.solver.iterations = 10;
          
          shape = new CANNON.Box(new CANNON.Vec3(10,10,10));
          mass = 1;
          body = new CANNON.RigidBody(mass,shape);
          body.angularVelocity.set(0,10,0);
          body.angularDamping = 0.5;
          world.add(body);
          
      }
  

  
      function initThree(width, height) {
  console.log("init");
  // set the view size in pixels (custom or according to window size)
     var SCREEN_WIDTH = 500, SCREEN_HEIGHT = 500;
    //var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;   
    
  var VIEW_ANGLE = 45;
   var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
   var NEAR = 1;
   var FAR = 1000;
   
          scene = new THREE.Scene();
         projector = new THREE.Projector();
     //    camera = new THREE.PerspectiveCamera( 75, window.innerWidth*2 / window.innerHeight, 1, 100 );
          camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
         // camera.lookAt( scene.position );
         // console.log(camera.position);
          scene.add( camera );
  
          geometry = new THREE.CubeGeometry( 20, 20, 20 );
          material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
  
          mesh = new THREE.Mesh( geometry, material );
          mesh.useQuaternion = true;
          scene.add( mesh );
  
    //////////////
    // RENDERER //
    //////////////
  
        renderer = new THREE.CanvasRenderer(); 
    
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    
          document.getElementById("threeCanvas").appendChild( renderer.domElement );
        
        ////////////
    // EVENTS //
    ////////////

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
    
    
    
    //////////////
    // GEOMETRY //
    //////////////
        
    // most objects displayed are a "mesh":
    //  a collection of points ("geometry") and
    //  a set of surface parameters ("material")    

    // Sphere parameters: radius, segments along width, segments along height
    var sphereGeometry = new THREE.SphereGeometry( 50, 32, 16 ); 
    // use a "lambert" material rather than "basic" for realistic lighting.
    //   (don't forget to add (at least one) light!)
    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
     sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(100, 50, -50);
    scene.add(sphere);
    
    // Create an array of materials to be used in a cube, one for each side
    var cubeMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
    cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
    var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
    // Cube parameters: width (x), height (y), depth (z), 
    //        (optional) segments along x, segments along y, segments along z
    var cubeGeometry = new THREE.CubeGeometry( 10, 10, 10, 1, 1, 1 );
    // using THREE.MeshFaceMaterial() in the constructor below
    //   causes the mesh to use the materials stored in the geometry
    cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
    cube.position.set(0, 0, 0);
    scene.add( cube );  
    
    
    ///////////
    // LIGHT //
    ///////////
    
    // create a light
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    var ambientLight = new THREE.AmbientLight(0x111111);
    // scene.add(ambientLight);
        // create a set of coordinate axes to help orient user
    //    specify length in pixels in each direction
    var axes = new THREE.AxisHelper(1000);
    scene.add( axes );
  
           resetMouseDetectors();
      }
      
      function displayText(text, x, y, z){
          
      }
      
  
      function animate() {
  
          requestAnimationFrame( animate );
          displayText("Welcome, I am the Interactive.",0,0,0);
          displayText("I am a 3D blog. I am a teacher.  I am student. I am bridge",0,0,0);
          
          displayText("In the digital world, I can represent you and me.",0,0,0);
          displayText("I am neither Twitter nor Facebook nor Wikipedia nor Skype, but I can be like them or allow you to use them in very creative ways",0,0,0);
          displayText("Everything the way you want it.",0,0,0);
          displayText("I teach portuguese. Eu ensino Inglês. I can be your parter and learn a language with you.  It doesn't even have to be a spoken language.  It could be Sign Language."  ,0,0,0);
          displayText("Do you want something done?  I create websites, obviously. I create games.  I will play chess with you.  I will create a game specifically so that we can play chess online over a video feed.  I am totally customizable.",0,0,0);
          
          displayText("I want world peace. I want to be able to make a difference in people's lives.I think I do more good for people outside of the 9 to 5 prison. I think we should spend more time helping other. " ,0,0,0);
          
          displayText("Do you have a programming or website idea? Let's hash it out. If you know others, tell them about me, the Interactive!",0,0,0);
          
        //  updatePhysics();
          render();
  
      }
  
      function updatePhysics() {
          
          // Step the physics world
          world.step(timeStep);

          // Copy coordinates from Cannon.js to Three.js
          body.position.copy(mesh.position);
          body.quaternion.copy(mesh.quaternion);
  
      }
  
  function resetMouseDetectors(){
      

        mouse_vector = new THREE.Vector3();
 ray = new THREE.Ray( camera.position, new THREE.Vector3(0,0,0) );

  }
      function render() {
  
          renderer.render( scene, camera );
  
      }
      
        window.addEventListener("click",function(event){ 
            event.preventDefault();
                  console.log("scene position="+scene.position);
      console.log("world position="+world);
      console.log("body position"+body.position);
      console.log("camera position"+camera.position);
      
            console.log("("+event.clientX+","+event.clientY+")");
               var vector = new THREE.Vector3(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );
resetMouseDetectors();
var intersects = [];

//var mouseX = ;

//var mouseY = ;

//here is our THREE vector and we will pass it to the projector

 mouse_vector.set( ( ( event.clientX / window.innerWidth )*2-1),
  ((-1)*( event.clientY / window.innerHeight ) * 2 + 1),
   1 );




//the final step of the transformation process, basically this method call

//creates a point in 3d space independent of the camera where the mouse click

//occurred, this does change the mouse_vector object

projector.unprojectVector( mouse_vector, camera );
ray = new THREE.Ray( camera.position,  mouse_vector );

intersects = ray.intersectObject( body );
console.log(mouse_vector);
console.log(intersects)
  if( intersects.length ) {

       

        alert( "hit" );

       

    }

            });
});
<?php $this->Html->scriptEnd(); ?>



        <div id="threeCanvas" class="center-block"  /></div>
  
 

 