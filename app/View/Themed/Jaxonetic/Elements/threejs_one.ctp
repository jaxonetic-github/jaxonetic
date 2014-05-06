
<?php echo $this->Html->scriptStart(array('inline' => false)); ?>
jQuery(function($) {
    //>>zo
    //http://aerotwist.com/tutorials/getting-started-with-three-js/
    //starting point from---|||ˆˆˆbut now I to put text. so moving on...
    //-->going to-->stemkoski.github.io/Three.js/Mouse-Click.html
    
            var sphereShape, sphereBody, world, physicsMaterial, walls=[], balls=[], ballMeshes=[], boxes=[], boxMeshes=[], voxels, groundBody;

            var camera, scene, renderer;
            var geometry, material, mesh;
            var controls,time = Date.now();

            var blocker = document.getElementById( 'blocker' );
            var instructions = document.getElementById( 'instructions' );

            var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

            if ( havePointerLock ) {

                var element = document.body;

                var pointerlockchange = function ( event ) {

                    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

                        controls.enabled = true;

                        blocker.style.display = 'none';

                    } else {

                        controls.enabled = false;

                        blocker.style.display = '-webkit-box';
                        blocker.style.display = '-moz-box';
                        blocker.style.display = 'box';

                        instructions.style.display = '';

                    }

                }

                var pointerlockerror = function ( event ) {
                    instructions.style.display = '';
                }

                // Hook pointer lock state change events
                document.addEventListener( 'pointerlockchange', pointerlockchange, false );
                document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
                document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

                document.addEventListener( 'pointerlockerror', pointerlockerror, false );
                document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
                document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

                instructions.addEventListener( 'click', function ( event ) {
                    instructions.style.display = 'none';

                    // Ask the browser to lock the pointer
                    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

                    if ( /Firefox/i.test( navigator.userAgent ) ) {

                        var fullscreenchange = function ( event ) {

                            if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                                document.removeEventListener( 'fullscreenchange', fullscreenchange );
                                document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                                element.requestPointerLock();
                            }

                        }

                        document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                        document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                        element.requestFullscreen();

                    } else {

                        element.requestPointerLock();

                    }

                }, false );

            } else {

                instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

            }

            initCannon();
            init();
            animate();

            function initCannon(){
                // Setup our world
                world = new CANNON.World();
                world.quatNormalizeSkip = 0;
                world.quatNormalizeFast = false;

                var solver = new CANNON.GSSolver();

                world.defaultContactMaterial.contactEquationStiffness = 1e9;
                world.defaultContactMaterial.contactEquationRegularizationTime = 4;

                solver.iterations = 7;
                solver.tolerance = 0.1;
                var split = true;
                if(split)
                    world.solver = new CANNON.SplitSolver(solver);
                else
                    world.solver = solver;

                world.gravity.set(0,-20,0);
                world.broadphase = new CANNON.NaiveBroadphase();
                world.broadphase.useBoundingBoxes = true;

                // Create a slippery material (friction coefficient = 0.0)
                physicsMaterial = new CANNON.Material("slipperyMaterial");
                var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial,
                                                                        physicsMaterial,
                                                                        0.0, // friction coefficient
                                                                        0.3  // restitution
                                                                        );
                // We must add the contact materials to the world
                world.addContactMaterial(physicsContactMaterial);

                var nx = 50,
                    ny = 8,
                    nz = 50,
                    sx = 0.5,
                    sy = 0.5,
                    sz = 0.5;

                // Create a sphere
                var mass = 5, radius = 1.3;
                sphereShape = new CANNON.Sphere(radius);
                sphereBody = new CANNON.RigidBody(mass,sphereShape,physicsMaterial);
                sphereBody.position.set(nx*sx*0.5,ny*sy+radius*2,nz*sz*0.5);
                sphereBody.linearDamping = 0.9;
                world.add(sphereBody);

                // Create a plane
                var groundShape = new CANNON.Plane();
                groundBody = new CANNON.RigidBody(0,groundShape,physicsMaterial);
                groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
                groundBody.position.set(0,0,0);
                world.add(groundBody);

                voxels = new VoxelLandscape(world,nx,ny,nz,sx,sy,sz);

                for(var i=0;  i<nx; i++){
                    for(var j=0; j<ny; j++){
                        for(var k=0; k<nz; k++){
                            var filled = true;

                            // Insert map constructing logic here
                            if(Math.sin(i*0.1)*Math.sin(k*0.1) < j/ny*2-1)
                                filled = false;

                              voxels.setFilled(i,j,k,filled);

                        }
                    }
                }

                voxels.update();
                console.log(voxels.boxes.length+" voxel physics bodies");
            }

            function init() {

                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

                scene = new THREE.Scene();
                scene.fog = new THREE.Fog( 0x000000, 0, 500 );

                var ambient = new THREE.AmbientLight( 0x111111 );
                scene.add( ambient );

                light = new THREE.SpotLight( 0xffffff );
                light.position.set( 10, 30, 20 );
                light.target.position.set( 0, 0, 0 );
                if(true){
                    light.castShadow = true;

                    light.shadowCameraNear = 20;
                    light.shadowCameraFar = 50;//camera.far;
                    light.shadowCameraFov = 40;

                    light.shadowMapBias = 0.1;
                    light.shadowMapDarkness = 0.7;
                    light.shadowMapWidth = 2*512;
                    light.shadowMapHeight = 2*512;

                    //light.shadowCameraVisible = true;
                }
                scene.add( light );

                controls = new PointerLockControls( camera , sphereBody );
                scene.add( controls.getObject() );

                // floor
                geometry = new THREE.PlaneGeometry( 300, 300, 50, 50 );
                geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

                material = new THREE.MeshLambertMaterial( { color: 0xdddddd } );
                //THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );

                mesh = new THREE.Mesh( geometry, material );
                
                groundBody.position.copy(mesh.position);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add( mesh );

                // voxels
                for(var i=0; i<voxels.boxes.length; i++){
                    var b = voxels.boxes[i];
                    var voxelGeometry = new THREE.CubeGeometry( voxels.sx*b.nx, voxels.sy*b.ny, voxels.sz*b.nz );
                    var voxelMesh = new THREE.Mesh( voxelGeometry, material );
                    voxelMesh.castShadow = true;
                    voxelMesh.receiveShadow = true;
                    scene.add( voxelMesh );
                    boxMeshes.push( voxelMesh );
                }


                renderer = new THREE.WebGLRenderer();
                renderer.shadowMapEnabled = true;
                renderer.shadowMapSoft = true;
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor( scene.fog.color, 1 );

                document.body.appendChild( renderer.domElement );

                window.addEventListener( 'resize', onWindowResize, false );
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            var dt = 1/60;
            function animate() {
                requestAnimationFrame( animate );
                if(controls.enabled){
                    world.step(dt);

                    // Update ball positions
                    for(var i=0; i<balls.length; i++){
                        balls[i].position.copy(ballMeshes[i].position);
                        balls[i].quaternion.copy(ballMeshes[i].quaternion);
                    }

                    // Update box positions
                    for(var i=0; i<voxels.boxes.length; i++){
                        voxels.boxes[i].position.copy(boxMeshes[i].position);
                        voxels.boxes[i].quaternion.copy(boxMeshes[i].quaternion);
                    }
                }

                controls.update( Date.now() - time );
                renderer.render( scene, camera );
                time = Date.now();

            }

            var ballShape = new CANNON.Sphere(0.2);
            var ballGeometry = new THREE.SphereGeometry(ballShape.radius);
            var shootDirection = new THREE.Vector3();
            var shootVelo = 15;
            var projector = new THREE.Projector();
            function getShootDir(targetVec){
                var vector = targetVec;
                targetVec.set(0,0,1);
                projector.unprojectVector(vector, camera);
                var ray = new THREE.Ray(sphereBody.position, vector.subSelf(sphereBody.position).normalize() );
                targetVec.x = ray.direction.x;
                targetVec.y = ray.direction.y;
                targetVec.z = ray.direction.z;
            }

            window.addEventListener("click",function(e){ 
                if(controls.enabled==true){
                    var x = sphereBody.position.x;
                    var y = sphereBody.position.y;
                    var z = sphereBody.position.z;
                    var ballBody = new CANNON.RigidBody(1,ballShape);
                    var ballMesh = new THREE.Mesh( ballGeometry, material );
                    world.add(ballBody);
                    scene.add(ballMesh);
                    ballMesh.castShadow = true;
                    ballMesh.receiveShadow = true;
                    balls.push(ballBody);
                    ballMeshes.push(ballMesh);
                    getShootDir(shootDirection);
                    ballBody.velocity.set(  shootDirection.x * shootVelo,
                                            shootDirection.y * shootVelo,
                                            shootDirection.z * shootVelo);

                    // Move the ball outside the player sphere
                    x += shootDirection.x * (sphereShape.radius*1.02 + ballShape.radius);
                    y += shootDirection.y * (sphereShape.radius*1.02 + ballShape.radius);
                    z += shootDirection.z * (sphereShape.radius*1.02 + ballShape.radius);
                    ballBody.position.set(x,y,z);
                    ballMesh.position.set(x,y,z);
                    ballMesh.useQuaternion = true;
                }
            });

});
<?php $this->Html->scriptEnd(); ?>

        <div id="blocker">

            <div id="instructions">
                <span style="font-size:40px">Click to play</span>
                <br />
                (W,A,S,D = Move, SPACE = Jump, MOUSE = Look, CLICK = Shoot)
            </div>

        </div>


        <div id="threeCanvas" class="center-block"  /></div>
  
 

 