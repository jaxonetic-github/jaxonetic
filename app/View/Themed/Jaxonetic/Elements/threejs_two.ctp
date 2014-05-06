
<?php echo $this->Html->scriptStart(array('inline' => false)); ?>
jQuery(function($) {
  var world, mass, body, shape, timeStep=1/60,
         camera, scene, renderer, geometry, material, mesh;
      
      initThree();
      initCannon();
      animate();
  
      function initCannon() {
          
          world = new CANNON.World();
          world.gravity.set(0,0,0);
          world.broadphase = new CANNON.NaiveBroadphase();
          world.solver.iterations = 10;
          
          shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
          mass = 1;
          body = new CANNON.RigidBody(mass,shape);
          body.angularVelocity.set(0,10,0);
          body.angularDamping = 0.5;
          world.add(body);
          
      }
  
      function initThree() {
  console.log("init");
          scene = new THREE.Scene();
  
          camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
          camera.position.z = 5;
          scene.add( camera );
  
          geometry = new THREE.CubeGeometry( 2, 2, 2 );
          material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
  
          mesh = new THREE.Mesh( geometry, material );
          mesh.useQuaternion = true;
          scene.add( mesh );
  
          renderer = new THREE.CanvasRenderer();
          renderer.setSize( window.innerWidth, window.innerHeight );
  
          document.body.appendChild( renderer.domElement );
  
      }
  
      function animate() {
  
          requestAnimationFrame( animate );
          updatePhysics();
          render();
  
      }
  
      function updatePhysics() {
          
          // Step the physics world
          world.step(timeStep);

          // Copy coordinates from Cannon.js to Three.js
          body.position.copy(mesh.position);
          body.quaternion.copy(mesh.quaternion);
  
      }
  
      function render() {
  
          renderer.render( scene, camera );
  
      }
});
<?php $this->Html->scriptEnd(); ?>



        <div id="threeCanvas" class="center-block"  /></div>
  
 

 