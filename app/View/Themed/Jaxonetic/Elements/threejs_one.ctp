
<?php echo $this->Html->scriptStart(array('inline' => false)); ?>
jQuery(function($) {
    //>>zo
    //http://aerotwist.com/tutorials/getting-started-with-three-js/
    //starting point from---|||ˆˆˆbut now I to put text. so moving on...
    //-->going to-->stemkoski.github.io/Three.js/Mouse-Click.html
    
// set the scene size
var WIDTH = 400;
var  HEIGHT = 400;

// set some camera attributes
var VIEW_ANGLE = 45;
var  ASPECT = WIDTH / HEIGHT;
var  NEAR = 0.1;
var  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var container = $('#threeCanvas');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera   =  new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
var sphere;
var scene;
var geometry;
var material;
var cube;

function init(){
    scene    = new THREE.Scene();
    geometry = new THREE.CubeGeometry(1,1,1);
     material = new THREE.MeshBasicMaterial({color: 0x00ff00}); 
     cube = new THREE.Mesh(geometry, material); 
     
    //-----------------Sphere 
// set up the sphere vars
var radius = 60;
var    segments = 16;
var    rings = 16;

// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });
    
// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
 sphere= new THREE.Mesh(
        new THREE.SphereGeometry( radius,  segments, rings),
        sphereMaterial);



// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
container.append(renderer.domElement);
     //---------------Lights------------------------>
// create a point light
var pointLight =new THREE.PointLight(0xFFFFFF);


// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
// add the sphere to the scene
scene.add(sphere);

// add the camera to the scene
scene.add(camera);
// add to the scene
scene.add(pointLight);

cube.position.x=100;
scene.add(cube);

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
   //  scene.add(skyBox);
    
    // fog must be added to scene before first render
    scene.fog = new THREE.FogExp2( 0x000000, 0.00025 );
   
    ///////////
    // FLOOR //
    ///////////
    
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    //var floorTexture = new THREE.ImageUtils.loadTexture( '/jaxonetic/img/brick.png' );
  

}

init();

//>>z>>Events
//>>z->>Mouse Events

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) 
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();
    
    console.log("Click.");
    
    
    ////////////
    // CUSTOM //
    ////////////
    
    // add 3D text
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
    var textGeom = new THREE.TextGeometry( "Hello, World!", 
    {
        size: 20, height: 1, curveSegments: 3,
        font: "helvetiker", style: "normal",
        bevelThickness: .5, bevelSize: 1, bevelEnabled: true,
        material: 0, extrudeMaterial: 1
    });
    // font: helvetiker, gentilis, droid sans, droid serif, optimer
    // weight: normal, bold
    
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var textMesh = new THREE.Mesh(textGeom, textMaterial );
    
    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
    
    textMesh.position.set( -0.5 * textWidth, 50, 100 );
    textMesh.rotation.x = -Math.PI / 4;
    scene.add(textMesh);

}

function render() {
     requestAnimationFrame(render);
     cube.rotation.x += 0.1; 
     
     cube.rotation.y += 0.1;
     
     sphere.rotation.x += 0.1; 
     sphere.rotation.y += 0.1;
     
     //cube.position.y+=2;
     renderer.render(scene, camera);
      }
       render();
});
<?php $this->Html->scriptEnd(); ?>



        <div id="threeCanvas" class="center-block"  /></div>
  
 

 