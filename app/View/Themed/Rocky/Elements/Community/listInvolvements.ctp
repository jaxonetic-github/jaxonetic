<h1>Community Involvements</h1>
<div id="community-box" class="container rocky-center-aligned">

    <?php
    
     foreach ($notices as $details): ?>
   
      <ul id="" class="list-inline home-news-banneritems">
         <li class="img-cell rocky-thumb"><div class="thumbnail">
             <?php  echo $this -> Html -> image(".." . DS . $details['CommunityInvolvement']['main_image_path'], array('alt' => '*', 'class' => 'rocky-img-responsive', 'full_base' => true)); ?>

             </div>
         </li>
         <?php if($isAdmin){ ?>
             <li class="text-cell description-box"> <p class=""><?php echo $details['CommunityInvolvement']['description']; ?></p> </li>
         <?php } ?>
       </ul>
    
   
    <?php endforeach; ?>
    <?php unset($details); ?>
</div>

<?php if($isAdmin){
            echo $this->Html->link('Add Another Activity', array('controller' => 'CommunityInvolvements', 'action' => 'add')); 
      } ?>