/**
 * @author Alonzo
 */
jQuery(function($) {
      $(".imgLiquidFill").imgLiquid({
        fill: true,
      });  
      
      window.addEventListener( 'resize', onWindowResize, false );
            

     	 function onWindowResize() {
     		console.log("resizing");
			$(body).css("height", "100%");
			$("#wrapper").css("height", 100%);
		};
});

  