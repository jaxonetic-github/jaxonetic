
   <div  id="community-logos" class="container">

    <?php foreach ($logos as $logo): ?>
    
       <div class="logo-img-frame">
         <?php  echo $this -> Html -> image(".." . DS . $logo['CommunityLogo']['image_path'], array('alt' => '', 'class' => 'rocky-img-responsive img-circle', 'full_base' => true)); ?></dt> 
 <?php if($isAdmin) echo $this->Html->link( 'Delete', array('action' => 'delete', $logo['CommunityLogo']['id']) ) ; ?>      
       </div>
    <?php endforeach; ?>
    <?php unset($logo); ?>

</div>


<?php  if($isAdmin)  echo $this->Html->link('Add Logo',  array('controller' => 'communitylogos', 'action' => 'add')); ?>