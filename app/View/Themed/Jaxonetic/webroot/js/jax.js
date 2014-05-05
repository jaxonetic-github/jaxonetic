/**
 * @author Alonzo
 */
jQuery(function($) {
      $(".imgLiquidFill").imgLiquid({
        fill: true,
      });  
      
     	$(window).on('resize', function() {
			$(body).css("height", 100%);
			$("#wrapper").css("height", 100%);
		});
});

  