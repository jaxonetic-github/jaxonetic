<!DOCTYPE html>
<html lang="en">
<head>
    <?php echo $this->Html->charset(); ?>
    <title>Jax on Et ic</title>
    <?php
        echo $this->Html->meta('icon');
        echo $this->Html->meta('viewport', 'width=device-width, initial-scale=1.0');
        echo $this->Html->meta('description',    'Construction, Rocky Coast Builders');
        echo $this->Html->meta('author',    'Alonzo Jackson');
        
        echo $this->Html->css("bootstrap");
        echo $this->Html->css("jumbotron");
        echo $this->Html->css("jax" );

            echo $this->fetch('meta');
        echo $this->fetch('css');
        echo $this->Html->script('jquery-2.0.2.min');
         echo $this->Html->script('Three');
              //    echo $this->Html->script('obj/Bird');
           // echo $this->Html->script('PointerLockControls');
         //      echo $this->Html->script('VoxelLandscape');
          echo $this->Html->script('THREEx.WindowResize');
         echo $this->Html->script('Detector');
       //   echo $this->Html->script('OrbitControls');
        echo $this->fetch('script');
        
//echo $this->Html->tag('script', '', array('src' => 'theme/Jaxonetic/fonts/helvetiker_bold.typeface.js'));
     // <script src='theme/Jaxonetic/fonts/helvetiker_regular.typeface.js'></script>
        ?>
        
  
</head>
	<body>

<?php echo $this->element('topnav'); ?>

<div id="content">
    <?php echo $this->fetch('content'); ?>
   </div>
    


	</body>
</html>
