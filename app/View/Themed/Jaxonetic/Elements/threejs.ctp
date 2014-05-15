
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
<!-- ---------------- Custom Shader Code ------------------------ -->
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



   <div id="threeCanvas" class=""  /></div>


    <?php

     echo $this->Html->script('bootstrap.min', array('block' => 'scriptBottom'));

                echo $this->Html->script('oimo/Detector', array('block' => 'scriptBottom'));
                       echo $this->Html->script('oimo/THREEx.WindowResize', array('block' => 'scriptBottom'));
                                echo $this->Html->script('oimo/THREEx.KeyboardState.js', array('block' => 'scriptBottom'));
                     echo $this->Html->script('oimo/SubdivisionModifier', array('block' => 'scriptBottom'));
                       echo $this->Html->script('oimo/FresnelShader', array('block' => 'scriptBottom'));
         
                   echo $this->Html->script('oimo/OrbitControls', array('block' => 'scriptBottom'));

      
      

        echo $this->Html->script('oimo/DAT.GUI.min', array('block' => 'scriptBottom'));

       //  echo $this->Html->script('threejs/CSS3DRenderer', array('block' => 'scriptBottom'));
            echo $this->Html->script('../obj/Bird.js', array('block' => 'scriptBottom'));
             echo $this->Html->script('oimo/scripts/interactive', array('block' => 'scriptBottom'));
            
             


    ?>
