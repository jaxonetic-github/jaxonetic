<?php
/**
 *
 * PHP 5
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

$cakeDescription = __d('cake_dev', 'CakePHP: the rapid development php framework');
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>Jax on Et ic</title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->meta('viewport', 'width=device-width, initial-scale=1.0');
		echo $this->Html->meta('description',    'Blog, 3D Blog, Programmer');
		echo $this->Html->meta('author',    'jaxonetic');
		
        echo $this->Html->css("bootstrap");
		echo $this->Html->css("jumbotron");
		echo $this->Html->css("jax" );

            echo $this->fetch(
        'meta');
		echo $this->fetch('css');
		echo $this->Html->script('jquery-2.0.2.min');
         echo $this->Html->script('threejs/Three');
                  echo $this->Html->script('cannon');
           // echo $this->Html->script('PointerLockControls');
               echo $this->Html->script('oimo/OrbitControls');
          echo $this->Html->script('oimo/THREEx.WindowResize');
         echo $this->Html->script('oimo/Detector');
        echo $this->Html->script('oimo/FresnelShader');
         echo $this->Html->script('oimo/THREEx.KeyboardState.js');
        echo $this->Html->script('oimo/DAT.GUI.min');
         echo $this->Html->script('oimo/SubdivisionModifier');
         echo $this->Html->script('threejs/CSS3DRenderer');
		echo $this->fetch('script');
        
//echo $this->Html->tag('script', '', array('src' => 'theme/Jaxonetic/fonts/helvetiker_bold.typeface.js'));

		?>
		<script src="theme/Jaxonetic/fonts/helvetiker_bold.typeface.js"></script>
		<script src='theme/Jaxonetic/fonts/helvetiker_regular.typeface.js'></script>
</head>
<body data-spy="scroll" data-offset="0" >
    
    <?php echo $this->element('topnav'); ?>
    
        <div id="wrapper">   
            <div class="row">       
              <div id="flashMessages" class="container">
                <?php echo $this->Session->flash(); ?></p>
              </div>
              
              <div id="content"><?php echo $this->fetch('content'); ?></div>
            </div><!-- row -->
    <div class="row">
        <?php echo  $this->element("threejs"); ?> 
</div>
        </div><!--wrapper--> 

	<?php 	  echo $this->Html->script('bootstrap.min');?>
	
</body>
</html>
