/**
 * @author Alonzo
 */
jQuery(function($) {
      $(".imgLiquidFill").imgLiquid({
        fill: true,
      });  
     

$('.sidenav-category').on('activate.bs.scrollspy', function () {
$(this).find(".inner-project-nav").slideDown();
$('.sidenav-category').not(".active").find('ul').slideUp();
//alert($(this).html());
  //$('.dropdown-toggle').dropdown();
})

/*
 * Open sidemenu in spyscrolled side nav
 */
$(".sidenav-category").on('click',function(){
	//checking if not already open
	if(! $(this).hasClass('active')){
		$(".sidenav-category").removeClass("active");
		$(".inner-project-nav").slideUp();
		$(this).find('ul').slideDown();
	}
	
})






});

  