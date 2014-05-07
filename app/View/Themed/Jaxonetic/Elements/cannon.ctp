
<?php echo $this->Html->scriptStart(array('inline' => false)); ?>
jQuery(function($) {
  
  
  
//////////  
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
//var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var projector, ray;

// custom global variables
var cube, sphere;
// initialization
init();

// animation loop / game loop
animate();

///////////////
// FUNCTIONS //
///////////////
            
function init() 
{
    ///////////
    // SCENE //
    ///////////
    scene = new THREE.Scene();
console.log("aqui");
    ////////////
    // CAMERA //
    ////////////
    
    // set the view size in pixels (custom or according to window size)
     var SCREEN_WIDTH = 500, SCREEN_HEIGHT = 500;
    //var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;   
    // camera attributes
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
    // set up camera
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    // add the camera to the scene
    scene.add(camera);
    // the camera defaults to position (0,0,0)
    //  so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
    camera.position.set(0,0,200);
//    camera.lookAt(scene.position);  
    
    //////////////
    // RENDERER //
    //////////////
    
    // create and start the renderer; choose antialias setting.
  //  if ( Detector.webgl )
  //      renderer = new THREE.WebGLRenderer( {antialias:true} );
  //  else
        renderer = new THREE.CanvasRenderer(); 
    
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    // attach div element to variable to contain the renderer
    container = document.getElementById( 'threeCanvas' );
    // alternatively: to create the div at runtime, use:
    //   container = document.createElement( 'div' );
    //    document.body.appendChild( container );
    
    // attach renderer to the container div
    container.appendChild( renderer.domElement );
    
    ////////////
    // EVENTS //
    ////////////

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
    // toggle full-screen on given key press
    //THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    
    
    
    //////////////
    // GEOMETRY //
    //////////////
        
    // most objects displayed are a "mesh":
    //  a collection of points ("geometry") and
    //  a set of surface parameters ("material")    

    // Sphere parameters: radius, segments along width, segments along height
    var sphereGeometry = new THREE.SphereGeometry( 10, 32, 16 ); 
    // use a "lambert" material rather than "basic" for realistic lighting.
    //   (don't forget to add (at least one) light!)
    var sphereMaterial = new THREE.MeshLambertMaterial( {color: 0x8888ff} ); 
     sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, -5);
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
    cube.position.set(0, 0, 10);
    scene.add( cube );      

    
    //////////////
    // CONTROLS //
    //////////////

    // move mouse and: left   click to rotate, 
    //                 middle click to zoom, 
    //                 right  click to pan
   // controls = new THREE.OrbitControls( camera, renderer.domElement );
    var axes = new THREE.AxisHelper(100);
    axes.position.set(0,0,0);
   scene.add(axes);
   

    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
    gridXZ.position.set( 100,0,100 );
    scene.add(gridXZ);
    
    var gridXY = new THREE.GridHelper(100, 10);
    gridXY.position.set( 100,100,0 );
    gridXY.rotation.x = Math.PI/2;
    gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
    scene.add(gridXY);

    var gridYZ = new THREE.GridHelper(100, 10);
    gridYZ.position.set( 0,100,100 );
    gridYZ.rotation.z = Math.PI/2;
    gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
    scene.add(gridYZ);
    
    // direction (normalized), origin, length, color(hex)
    var origin = new THREE.Vector3(50,100,50);
    //var terminus  = new THREE.Vector3(75,75,75);
    var direction = new THREE.Vector3().subVectors(sphere.position , origin).normalize();
    var arrow = new THREE.ArrowHelper(direction, origin, 80, 0x884400);
    scene.add(arrow);
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
    ///////////
    // FLOOR //
    ///////////
    
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
   
    
    
    /////////
    // SKY //
    /////////
    
    // recommend either a skybox or fog effect (can't use both at the same time) 
    // without one of these, the scene's background color is determined by webpage background

    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    // scene.add(skyBox);
    
    // fog must be added to scene before first render
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
}

function animate() 
{
    requestAnimationFrame( animate );
    render();       
  // update();
}

  
  function resetMouseDetectors(){
      

        mouse_vector = new THREE.Vector3();
 ray = new THREE.Ray( camera.position, new THREE.Vector3(0,0,0) );

  }
      function render() {
  
          renderer.render( scene, camera );
  
      }
      
        window.addEventListener("click",function(event){ 
     //       event.preventDefault();
            resetMouseDetectors();

                 // console.log("scene position="+scene.position);
                  projector = new THREE.Projector();

 //     console.log("body position"+body.position);
      console.log("camera position"+camera.position);
      
            console.log("("+event.clientX+","+event.clientY+")");
               var vector = new THREE.Vector3(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );
var intersects = [];

//var mouseX = ;

//var mouseY = ;

//here is our THREE vector and we will pass it to the projector

 mouse_vector.set( ( ( event.clientX / window.innerWidth )*2-1),
  ((-1)*( event.clientY / window.innerHeight ) * 2 + 1),
   1 );



console.log(mouse_vector);
//the final step of the transformation process, basically this method call

//creates a point in 3d space independent of the camera where the mouse click

//occurred, this does change the mouse_vector object

projector.unprojectVector( mouse_vector, camera );

var ray =new  THREE.Raycaster( camera.position,  mouse_vector,0.1,5000);

intersects = ray.intersectObject( sphere );

console.log(intersects)
  if( intersects.length ) {

       

        alert( "hit" );

       

    }

            });
});
<?php $this->Html->scriptEnd(); ?>



        <div id="threeCanvas" class="center-block"  /></div>
  
 

 