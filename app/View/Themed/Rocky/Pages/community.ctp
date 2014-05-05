
<div class="container">
    <?php echo $this->element('Community/listInvolvements', array('notices'=>$notices, 'isAdmin'=>$isAdmin)); ?>
    <p class="margined-paragraph">Rocky Coast Builders Inc, also sponsors each year local girls
         and boys youth Soccer, Baseball, Pop Warner Football and Cheer.</p>
    <?php echo $this->element('Community/Logos/listCommunityLogos', array('logos'=>$logos, 'isAdmin'=>$isAdmin)); ?>
</div>