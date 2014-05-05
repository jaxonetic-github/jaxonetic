

    <div id="site-news" class="cycle-slideshow"  data-cycle-fx="fade"  data-cycle-timeout="0" data-cycle-slides="> ul" data-cycle-prev="#prev"
        data-cycle-next="#next">
 <div id="site-news-nav"> 
   <?php echo $this->Html->image('left_arrow.jpg', array('alt' => 'CakePHP', 'id'=>"prev"));?>
   <?php echo $this->Html->image('right_arrow.jpg', array('alt' => 'CakePHP', 'id'=>"next"));?>
 </div>
        <?php
    
   
     foreach ($nodes as $blogNode): 
     ?>

    <?php //echo $this->Nodes->field('body'); ?>
     <ul id="" class="list-inline home-news-banneritems">
         <li class="img-cell"><div class="thumbnail">
             <?php  echo $this -> Html -> image(".." . DS . $blogNode['Node']['image_path'], array('alt' => 'Scripps Ranch High School', 'class' => 'rocky-img-responsive', 'full_base' => true)); ?>

             </div>
         </li>
         <li class="text-cell"> <p class="news-banner-title"><?php echo $blogNode['Node']['title']; ?></p>
              <p class="news-banner-text"><?php echo $blogNode['Node']['body']; ?></p>
             
         </li>
         <li class="nav-date-cell"> <ul class="list-unstyled"><li></li>
                  <li class="bottomdate"><p class="news-banner-date-text pull-right">Wed, Nov 13, 2013</p></li>
             </ul>
         </li>
       </ul>
    
      
          <?php endforeach; ?>
    <?php unset($blogNode); ?>
           

   </div>