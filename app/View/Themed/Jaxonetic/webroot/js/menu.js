/**
 * @author Alonzo
 */
jQuery(function($) {


    //  window.addEventListener( 'resize', onWindowResize, false );
            

     	 function onWindowResize() {
     		console.log("resizing");
			$(".background-2d").css("height", "100%");
			$("#wrapper").css("height", "100%");
		};
		
		$(window).on("resize",onWindowResize);
 


$(document).on('hidden.bs.show','#top-navbar-collapse', function () {
  alert("collapsed  -- hidden");
});
$('#content').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', bringCanvasToFront);

function bringCanvasToFront(){
	 $(".canvas-container").css('z-index', 1);
}
	$(document).on('click', '#start-animation', function() {
		 $("#content").addClass("animated  rotateOut");
	//   
	   console.log("starting");
	   
	   $("#threeCanvas").addClass('isRunning');
	  
	  //  $("#content").addClass("animated rotateIn");
	   // $(".bottom-content").removeClass('bottom-content');
	   
	});
	
	
	$(document).on('click', '.jax-menuitem', function() {
		
		

		$("#threeCanvas").css('z-index', -1);
       //	$("#threeCanvas").fadeOut();
       	
		$("#threeCanvas").removeClass('isRunning');
	}); 


/************  first load checks   **********/
      var navitem = $.cookie('active-mainnav-item');
      //change this 
      if(!navitem)
      {
      	$.cookie('active-mainnav-item', 'home');
      	navitem="home";
      }
      /*******************/
      //set active Nav item based on cookie indicator
      	if(navitem==="home")
      	{
      		 $('.rockynav-home').addClass('active-mainnav-item');
      	} else
      	  if(navitem==="projects")
      	  {
      		 $('.rockynav-projects').addClass('active-mainnav-item');
      	  } else
      	  if(navitem==="news")
      	  {
      		 $('.rockynav-news').addClass('active-mainnav-item');
      	  } else
      	  if(navitem==="message")
      	  {
      		 $('.rockynav-message').addClass('active-mainnav-item');
      	  } else
      	  if(navitem==="company")
      	  {
      		 $('.rockynav-company').addClass('active-mainnav-item');
      	  }
      
});

  