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
        echo $this->Html->meta('description',    'Construction, Rocky Coast Builders');
        echo $this->Html->meta('author',    'Alonzo Jackson');
        
       
            echo $this->fetch(
        'meta');
      
        echo $this->Html->script('jquery-2.0.2.min');
               echo $this->Html->css("bootstrap");
       
           echo $this->Html->css("jax" );
        echo $this->fetch('script');
        
//echo $this->Html->tag('script', '', array('src' => 'theme/Jaxonetic/fonts/helvetiker_bold.typeface.js'));

        ?>
        
        <script src='theme/Jaxonetic/fonts/helvetiker_regular.typeface.js'></script>
        
        <!--   //zo-> dom2PDf doesn't seem to reading  my jax.css so hacking for now  -->
   <style>
    #contact-info li { list-style-type: none;}  
   </style>
</head>
<body>
  
<div id="wrapper">      
       <div id="flashMessages" class="container rocky-center-aligned">
           <?php echo $this->Session->flash(); ?></p>
       </div>
            
<div id="content">
    <?php echo $this->fetch('content'); ?>
   </div>
    
        
        
</div>

</body>
</html>
