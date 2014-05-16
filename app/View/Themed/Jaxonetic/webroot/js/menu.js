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
		
		// $("#content").addClass("animated  rotateOut");
	//   33333333333
//	   console.log("starting");
		 
	  
	  //  $("#content").addClass("animated rotateIn");
	   // $(".bottom-content").removeClass('bottom-content');
	   
	});
	
	
	$(document).on('click', '.jax-menuitem', function() {
		
  // 	$('.rocky-menuitem').removeClass('active-mainnav-item');
   
		//get the list of classes for this element
		var classList = $(this).attr('class').split(/\s+/);

		//go through them(should only be about 2-3) and find the one that starts with rockynav-
		$(classList).each(function(index) {
			console.log(classList[index].substring(0, 6));
			//I want the text after [rockynav-]
			if (classList[index].substring(0, 6) === 'jaxnav-') {
				console.log(classList[index].substring(6));

				
				//keeping track of the active menuitem as we navigate pages
				$.cookie('active-mainnav-item', classList[index].substring(6));
				$("#content").load(classList[index].substring(6));
			}
		});
		
		$(this).addClass('active-mainnav-item');
 

       	
		//$("#threeCanvas").removeClass('isRunning');
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

  