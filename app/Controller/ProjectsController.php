

<?php  App::uses('AppController', 'Controller');
   
   
class ProjectsController extends AppController {
  public $uses = FALSE;
  public $helpers = array('Html', 'Link','Form', 'Session');
//  public $components = array( 'DebugKit.Toolbar' => array(/* array of settings */));


  var $layout = 'twoDLayout';
  
  public function index($noLayout = null){
      if($noLayout){
          $this->layout = "interactiveInnerPage";
      }       
  }
  
 
  public function jaxman(){}
   
  public function interactive(){
      $this->layout = "interactive";   
  } 
  
 }
?>