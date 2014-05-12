/**
 * @author Alonzo
 */
jQuery(function($) {



  $(document).on('mouseleave', '.rocky-menuitem-header', function() {});


$(document).on('hidden.bs.show','#top-navbar-collapse', function () {
  alert("collapsed  -- hidden");
});
 
 
 $('body').on({
'mousewheel': function(e) {
	
    if (!$("#threeCanvas").hasClass('isRunning')) return;
    e.preventDefault();
    e.stopPropagation();
    }
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

  