
<!--
 * Using Bootstrap Affix to keep nav always in view.
 * Affixed scrollbar starts off with class .affix-top. After scrolling 200px the class becomes .affix
-->
<div  id="sidebar"    data-spy="affix" data-offset-top="200"   >
    
   
    <ul id="projects-sidemenu" class="nav nav-tabs nav-stacked">
        <li id="sidebar-header"> <?php  echo $this -> Html -> image("projects/sidenav_building.png", array('alt' => '')); ?>
    <span>Projects</span></li>
    <?php
    $categories = array_keys($projectsByCategory);

     foreach ($categories as $category): 
           
     ?>
            <li class="sidenav-category"><a class="has-thick-bottom-border" data-target="#"  role="button" href='#<?php echo $this->Link->removeNonAlphaNumerics($category) ?>'><?php  echo $this -> Html -> image("projects/navright_arrow.png", array('alt' => '*', 'class'=>'category-indicator')); ?><?php echo $category ?></a>
              <ul class="nav inner-project-nav" role="menu">
                  <?php    foreach ($projectsByCategory[$category] as $key => $projectDetail):
                  
                    ?>
                    <li class=""><a href="#<?php echo $this->Link->getLocationByCategoryHrefLink($projectDetail,$category ); ?>"><?php echo $projectDetail['location'] ?></a></li>
                  <?php endforeach; ?>
                  <?php unset($projectDetail); ?>
               </ul>
              </li> 
    <?php endforeach; ?>
    <?php unset($category); ?>
           
    <li id="sidenav-footer" class="imgLiquid imgLiquidFill" ><div id="footer-img-overlay"></div><?php  echo $this->Html->image("projects/logo_projects.png", array('alt' => 'Rocky Coast Builders, Inc.', 'class'=>'rocky-img-responsive')); ?></li>
   </ul><!-- the topmost nav -->
</div>
         