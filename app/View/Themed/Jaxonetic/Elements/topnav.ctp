


<nav  class="navbar-fixed-top " role="navigation">
    <div class="container-fluid navbar-inverse">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle " data-toggle="collapse" data-target="#top-navbar-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
   
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="top-navbar-collapse">
    <ul class="nav   nav-pills nav-justified ">
      <li class="jax-menuitem jax-menuitem-header jaxnav-home"><?php echo $this->Html->link('home','/'); ?></li>
      <li class="jax-menuitem jaxnav-projects  jax-menuitem-header "><?php echo $this->Html->link('profile','/aboutme'); ?></li>
      <li class="jax-menuitem jaxnav-news  jax-menuitem-header "><?php echo $this->Html->link('projects','/projects'); ?></li>
    </ul>
   </div>
   
   
   </div><!--container-fluid  -->
</nav>


<?php  echo $this->Html->script("jquery.cookie", array('block' => 'scriptBottom'));
 echo $this->Html->script("menu", array('block' => 'scriptBottom')); ?>
