
   
    <!-- Home Page Paragraph -->
   <div class="jumbotron">
      <div class="container">
        <p class="home-text text-left">Rocky Coast Builders, Inc. is a family run business that has been serving Southern California 
for more than 25 years with over $250 million in successful construction projects. We pride 
ourselves on a reputation built through our core values; which are to provide quality work, 
ensure employee safety, provide excellent service, build successful and lasting relationships, 
pursue growth and learning, and continue to be passionate in the work we perform.</p>

      <p class="home-text text-left">In an ever changing world, our values remain constant.  Constantly striving to provide quality work, excelent
      	 service, building successful relationships, pursuing growth and learning, and continuing to be passionate
      	 and determined in the work we do
      	</p>       
      </div>
    </div>
    

      <!-- slider section -->
  <div class="jumbotron">
    <div class="container">



<div id="home-carousel" class="carousel slide" data-ride="carousel">
 
   <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#home-carousel" data-slide-to="0" class="active"></li>
 
  </ol>
  <!-- Wrapper for slides -->
  <div class="carousel-inner ">
    <div class="item active"> 
        <ul class="list-inline">
 		 <li class="imgLiquidFill imgLiquid" ><img src="img/home/concrete/1commons.jpg"  alt='Concrete' /></li>
 		 <li class="imgLiquidFill imgLiquid"><img src="img/home/framing/1city.jpg"  alt='framing' /></li>
 		 <li class="imgLiquidFill imgLiquid" ><img src="img/home/fibercementsiding/1mesa.jpg" alt="FiberCement"/></li>
		</ul>
    </div><!-- item  -->
    
    <div class="item">
        <ul class="list-inline">
 		<li class="imgLiquidFill imgLiquid" ><img src="img/home/concrete/2galbraith.jpg" alt="Concrete"/></li>
 		<li class="imgLiquidFill imgLiquid" ><img src="img/home/framing/2palermo.jpg" alt="framing"/></li>
 		<li class="imgLiquidFill imgLiquid" ><img src="img/home/fibercementsiding/1mid.jpg" alt="FiberCement"/></li>
		</ul>
    </div><!-- item  -->
      
    <div class="item">
        <ul class="list-inline">
 		 <li class="imgLiquidFill imgLiquid" ><img src="img/home/concrete/7tahquitz.jpg"alt="Concrete"/></li>
 		 <li class="imgLiquidFill imgLiquid" ><img src="img/home/framing/2scripps.jpg" alt="Framing"/></li>
 		 <li class="imgLiquidFill imgLiquid" ><img src="img/home/fibercementsiding/4.jpg" alt="FiberCement"/></li>
		</ul>
    </div><!-- item  -->
          <div class="item">
        <ul class="list-inline">
 		<li class="imgLiquidFill imgLiquid" ><img src="img/home/framing/5enc.jpg" alt="Framing"/></li>
 		<li class="imgLiquidFill imgLiquid" ><img src="img/home/fibercementsiding/DSC01289.jpg" alt="FiberCement"/></li>
		</ul>
      </div><!-- item  -->
  </div><!-- carousel inner  --->
   
    <!-- Controls -->
  <a class="left carousel-control" href="#home-carousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" href="#home-carousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
  
</div><!-- home-carousel-->

	   
   </div> <!-- /container -->
  </div><!-- jumbotron -->


   <!-- News Banner -->
   <div class="jumbotron">
      <div class="container">
       
      <?php echo $this->element('awardsBanner', array('nodes'=>$nodes)); ?>
      </div>
    </div>



   <?php $this->start('bottomscript');

	
		//echo $this->Html->script('rocky');


$this->end();

?>
