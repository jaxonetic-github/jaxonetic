
<!--<div id="home">
    <div class="">
        My Site.
    </div>
    <div class="">
        My Playground.
    </div>
    <div class="">
        My Rules.
    </div>


    <?php $this -> start('bottomscript');

    $this -> end();
    ?>
</div>
-->
<!-- ---------------- Glow Shader Code ------------------------ -->
<script id="vertexShader" type="x-shader/x-vertex">
uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
    vec3 vNormel = normalize( normalMatrix * viewVector );
    intensity = pow( c - dot(vNormal, vNormel), p );
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
</script>

<!-- fragment shader a.k.a. pixel shader -->
<script id="fragmentShader" type="x-shader/x-vertex"> 
uniform vec3 glowColor;
varying float intensity;
void main() 
{
    vec3 glow = glowColor * intensity;
    gl_FragColor = vec4( glow, 1.0 );
}
</script>
<!-- ----------------------------------------------------------- -->
        <script type="x-shader/x-fragment" id="fragmentShaderDepth">

            uniform sampler2D texture;
            varying vec2 vUV;

            vec4 pack_depth( const in float depth ) {

                const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );
                const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );
                vec4 res = fract( depth * bit_shift );
                res -= res.xxyz * bit_mask;
                return res;

            }

            void main() {

                vec4 pixel = texture2D( texture, vUV );

                if ( pixel.a < 0.5 ) discard;

                gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );

            }
        </script>

        <script type="x-shader/x-vertex" id="vertexShaderDepth">

            varying vec2 vUV;

            void main() {

                vUV = 0.75 * uv;

                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                gl_Position = projectionMatrix * mvPosition;

            }

        </script>
<!------------------------------------------------------->
<!--<div id="info">Simple Cloth Simulation<br/>
            Verlet integration with Constrains relaxation<br/>
            Toggle: <a onclick="rotate = !rotate;">Camera</a> |
            <a onclick="wind = !wind;">Wind</a> |
            <a onclick="sphere.visible = !sphere.visible;">Ball</a> |
            <a onclick="togglePins();">Pins</a>
        </div>
-->
   <div id="threeCanvas" class=""  /></div>


    <?php

     echo $this->Html->script('bootstrap.min', array('block' => 'scriptBottom'));
                  //   echo $this->Html->script('oimo/three');
                   echo $this->Html->script('threejs/three.min');
                   echo $this->Html->script('fonts/helvetiker_regular.typeface');
         echo $this->Html->script('fonts/helvetiker_bold.typeface');
                echo $this->Html->script('oimo/Detector', array('block' => 'scriptBottom'));
                       echo $this->Html->script('oimo/THREEx.WindowResize', array('block' => 'scriptBottom'));
                                echo $this->Html->script('oimo/THREEx.KeyboardState.js', array('block' => 'scriptBottom'));
                     echo $this->Html->script('oimo/SubdivisionModifier', array('block' => 'scriptBottom'));
                       echo $this->Html->script('oimo/FresnelShader', array('block' => 'scriptBottom'));
         
                   echo $this->Html->script('oimo/OrbitControls', array('block' => 'scriptBottom'));
echo $this->Html->script('threejs/controls/TrackballControls', array('block' => 'scriptBottom'));
      
      

        //echo $this->Html->script('oimo/DAT.GUI.min', array('block' => 'scriptBottom'));
         echo $this->Html->script('threejs/RequestAnimationFrame', array('block' => 'scriptBottom'));
                  echo $this->Html->script('threejs/controls/DragPanControls', array('block' => 'scriptBottom'));
         echo $this->Html->script('threejs/CSS3DRenderer', array('block' => 'scriptBottom')); //gist:9620459
                  echo $this->Html->script('tween.min', array('block' => 'scriptBottom'));
                echo $this->Html->script('parser', array('block' => 'scriptBottom'));
//            echo $this->Html->script('../obj/Bird', array('block' => 'scriptBottom'));
  //           echo $this->Html->script('../obj/Cloth', array('block' => 'scriptBottom'));
             echo $this->Html->script('oimo/scripts/threeDPage', array('block' => 'scriptBottom'));
            
             


    ?>
