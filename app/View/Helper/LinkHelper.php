<?php /* /app/View/Helper/LinkHelper.php */
App::uses('AppHelper', 'View/Helper');

class LinkHelper extends AppHelper {
    
    public function removeNonAlphaNumerics($href){
        return  preg_replace('/[^a-zA-Z0-9]/', '', $href);       
    }
    
    /*
     * Creates a special href for the ScrollSpy nav.  Created to make it easier to 
     * handle the possiblity of projects in the same location.  It also removes non-alphanumeric
     * characters
     * 
     * $project : model represented as an array
     * $category: the project's category
     */
    public function getLocationByCategoryHrefLink($project, $category) {
       $href = $project['location'] . $category . $project['id'];
     //  debug($href);
       //removes non-alphanumeric chars
       
       
       return  $this->removeNonAlphaNumerics($href);
    }
}

?>