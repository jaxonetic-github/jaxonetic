
<!--
 * Using Bootstrap Affix to keep nav always in view.
 * Affixed scrollbar starts off with class .affix-top. After scrolling 200px the class becomes .affix
-->
<div  id="sidebar"    data-spy="affix" data-offset-top="200"   >
    
   
    <ul id="sidemenu" class="nav nav-tabs nav-stacked">
        <li id="sidebar-header"> <?php  echo $this -> Html -> image("projects/sidenav_building.png", array('alt' => '')); ?>
    <span>categories</span></li>
   

            <li class="sidenav-category"><a class="has-thick-bottom-border" data-target="#"  role="button" href='#'><?php  echo $this -> Html -> image("projects/navright_arrow.png", array('alt' => '*', 'class'=>'category-indicator')); ?>Math</a>
              <ul class="nav inner-project-nav" role="menu">

                    <li class=""><a href="#">Points</a></li>

               </ul>
              </li> 

           
   </ul><!-- the topmost nav -->
</div>
         