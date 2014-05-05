
    <?php
    $categories = array_keys($projectsByCategory);
     foreach ($categories as $category): 
     ?>
           
               <div class="projects-detailcategory-section">
                   <div class="rocky-center-aligned">
                   <span id='<?php echo $this->Link->removeNonAlphaNumerics($category) ?>' class="category-title">Project Details </span>
                   <span class="small-category">&nbsp;(&nbsp;<?php echo $category ?>&nbsp;)&nbsp;</span>
                  </div>
                    
                    
                  <?php    foreach ($projectsByCategory[$category] as $projectDetail):  ?>
   <!--     /*
         * remove not alphanumeric characters from title and put it in the jumbotron id for bootstrap dataspy
         */
   -->
   <div class="rocky-center-aligned">
<h4 class="text-left" id="<?php echo $this->Link->getLocationByCategoryHrefLink($projectDetail,$category ); ?>"><?php  echo $projectDetail['title'] ?></h4>
   <div class="projects-actualdetail-section">
       <div class="imgLiquid imgLiquidFill detail-image">
<?php  echo $this -> Html -> image( ".." . DS . $projectDetail['image_name'], array('alt' => 'No Image Loaded','full_base' => true)); ?>
</div><dl class="dl-horizontal">
    
        <dt>Client:</dt><dd><?php echo  $projectDetail['client_name'] ?></dd>

   
       <dt> Project Delivery Method:</dt><dd> <?php echo  $projectDetail['delivery_method'] ?></dd>

    
       <dt> Project Budget:</dt><dd<?php echo  $projectDetail['budget'] ?></dd>
  
   
       <dt> Scope/Summary:</dt>
        <dd class="summary">
            <?php echo  $projectDetail['summary'] ?>
        </dd>
   
</dl>
 </div>
    </div>
                  <?php endforeach; ?>
                  <?php unset($projectDetail); ?>
</div>    <!--container-->    
     
    <?php endforeach; ?>
    <?php unset($category); ?>
           


