<?php $this->Html->scriptStart(array('inline' => false)); ?>
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

var scene    = new THREE.Scene();


function init(){}
// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
container.append(renderer.domElement);

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
var sphere = new THREE.Mesh(
        new THREE.SphereGeometry( radius,  segments, rings),
        sphereMaterial);

// add the sphere to the scene
scene.add(sphere);
//---------------Lights------------------------>
// create a point light
var pointLight =new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

var geometry = new THREE.BoxGeometry(15,10,10);
 var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
var cube = new THREE.Mesh( geometry, material ); scene.add( cube ); 

// add to the scene
scene.add(pointLight);

cube.position.x=100;
scene.add(cube);

//>>z>>Events
//>>z-->>thanks>>view-source:http://stemkoski.github.io/Three.js/Mouse-Click.html
//>>z->>Mouse Events
function onDocumentMouseDown( event ) 
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();
    
    console.log("Click.");
    
    // 
    console.log("Click."+mouse.x+","+mouse.y);
    
    // find intersections


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
  
 

 