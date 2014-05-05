

<?php
 echo $this->Html->script("jquery.cookie");
 
 //menu active/inactive javascript
 echo $this->Html->script('menu');
 
?>


<nav  class="rocky<?php
if (! $_COOKIE["active-mainnav-item"]=="projects" )
 echo "-projects-" ;
 
  ?>topnav navbar navbar-default" role="navigation">
    <div class="container-fluid">
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
      <li class="rocky-menuitem rocky-menuitem-header rockynav-home"><?php echo $this->Html->link('home','/'); ?></li>
      <li class="rocky-menuitem-header dropdown rockynav-company">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">company <b class="caret"></b></a>
        <ul class="dropdown-menu" role="menu">
          <li class="rocky-menuitem rockynav-aboutus"><?php echo $this->Html->link('about us','/aboutus'); ?></li>
          <li class="rocky-menuitem rockynav-awards"><?php echo $this->Html->link('awards','/awards'); ?></li>
          <li class="rocky-menuitem rockynav-news"><?php echo $this->Html->link('safety','/safety'); ?></li>
          <li class="rocky-menuitem rockynav-community"><?php echo $this->Html->link('community','/community'); ?></li>
          <li class="rocky-menuitem rockynav-testimonials"><?php echo $this->Html->link('testimonials','/testimonials'); ?></li>
        </ul>
      </li>
      <li class="rocky-menuitem rockynav-projects  rocky-menuitem-header "><?php echo $this->Html->link('projects','/projects'); ?></li>
      <li class="rocky-menuitem rockynav-news  rocky-menuitem-header "><?php echo $this->Html->link('news','/blog'); ?></li>
      <li class="rocky-menuitem rockynav-message   rocky-menuitem-header "><?php echo $this->Html->link('contact us','/contactPage'); ?></li>
    </ul>
   </div>
   
   
   </div><!--container-fluid  -->
</nav>