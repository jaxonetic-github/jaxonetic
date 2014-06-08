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
		echo $this->Html->css("animate");//quick animations
		echo $this->Html->css("jax" );//general site css
        
        echo $this->Html->css("pace" );//page loading css
            echo $this->fetch(
        'meta');
		echo $this->fetch('css');
		echo $this->Html->script('jquery-2.0.2.min');

         
 //menu active/inactive javascript

                //  echo $this->Html->script('cannon');
           // echo $this->Html->script('PointerLockControls');

		echo $this->fetch('script');
        
//echo $this->Html->tag('script', '', array('src' => 'theme/Jaxonetic/fonts/helvetiker_bold.typeface.js'));

		?>

</head>
<body >
    <div id="tres-d-topnav">
     <?php echo $this->element('tresdnav'); ?>
           
    </div>


            <div id="flashMessages" class="container">
                <?php echo $this->Session->flash(); ?></p>
              </div>
            <?php echo $this->fetch('content'); ?>  
            
 
       
       
<?php           

    echo $this->fetch('scriptBottom'); ?>


	
</body>
</html>
