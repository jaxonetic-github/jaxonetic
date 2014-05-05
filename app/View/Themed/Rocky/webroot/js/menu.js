/**
 * @author Alonzo
 */
jQuery(function($) {

  $(document).on('mouseleave', '.rocky-menuitem-header', function() {


$(document).on('hidden.bs.show','#top-navbar-collapse', function () {
  alert("collapsed  -- hidden");
})



   //if the company dropdown is open, close it
  if( $(".rockynav-company").hasClass("open") ){
  	//hide/lse the dropdown
	 $(".rocky-menuitem-header").find('.dropdown-toggle').dropdown('toggle');
	 
	 //if you don't blur the dropdown, the bootstrap css won't remove the hightlight
	 $(".rocky-menuitem-header").find('.dropdown-toggle').blur().val('');
  } 
  
  })




	$(document).on('click', '.rocky-menuitem', function() {
		
		
  // 	$('.rocky-menuitem').removeClass('active-mainnav-item');
   
		//get the list of classes for this element
		var classList = $(this).attr('class').split(/\s+/);

		//go through them(should only be about 2-3) and find the one that starts with rockynav-
		$(classList).each(function(index) {
			
			//I want the text after [rockynav-]
			if (classList[index].substring(0, 9) === 'rockynav-') {
				console.log(classList[index].substring(9));

				
				//keeping track of the active menuitem as we navigate pages
				$.cookie('active-mainnav-item', classList[index].substring(9));
			}
		});
		
		$(this).addClass('active-mainnav-item');

		
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

  