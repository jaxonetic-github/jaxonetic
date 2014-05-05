

<?php 
App::uses('Folder', 'Utility');
App::uses('File', 'Utility');

App::uses('AppModel', 'Model');
class Project extends AppModel {
    public $useTable = 'project';
  
     
     
    public $belongsTo =  array(
         'ProjectCategory' =>  array( 
                   'classname'=> 'ProjectCategory'
                   ,'foreignKey' => 'project_categories'
                  )
         );
    
 
/* Upload Directory relative to WWW_ROOT
 * @param string
 */
public $uploadDir = 'uploads';
   
   
   // ex. 'conditions' => array('Article.status !=' => 'pending'),
    public function findAll()
    {
         $projects = $this->find('all');
         
         return $projects;
    }
    
    
    
     
  /********* http://www.jamesfairhurst.co.uk/posts/view/cakephp_contact_form_with_file_uploads
  *
  * Assist upload file functionality 
  *
  **********/
  
/**

/**
 * Process the Upload
 * @param array $check: the request data  with uploaded file info
 * 
 * 
 * $check = Array
(
    [Project] => Array
        (
            [category] => 3
            [client_name] => Pac Man
            [delivery_method] => Power Pellet
            [budget] => 23k
            [title] => The Chomper
            [location] => Here
            [summary] => 
            [filename] => Array
                (
                    [name] => unitysnap.png
                    [type] => image/png
                    [tmp_name] => /private/var/folders/fz/q0bn8cq91mz20h1cys24vx4c0000gn/T/phpNqPVQG
                    [error] => 0
                    [size] => 647566
                )

        )

)
 * @return boolean
 */
public function processUpload($check=array()) {



/*
 * Getting the Project Category string.  I'm doing this, this way,  for now.  
 * 
 * Todo:find a more elegant way
 */ 
 $projCategory = ClassRegistry::init('ProjectCategory');
$proj = $projCategory-> findById( $this->data['Project']['category'] );

$categoryString = strtolower( $proj['ProjectCategory']['category']);

//the $categoryString will be used as directory so remove nonalphnumeric characters
 $categoryString = preg_replace('/[^a-zA-Z0-9]/', '', $categoryString);

    // deal with uploaded file
    if (!empty($check['filename']['tmp_name'])) {

        // check file is uploaded
        if (!is_uploaded_file($check['filename']['tmp_name'])) {
            return FALSE;
        }

        $filePath = WWW_ROOT . $this->uploadDir . DS . "projects" . DS . $categoryString ;
        
        // build full filename
        $fileNameAndPath = $filePath . DS . Inflector::slug(pathinfo($check['filename']['name'], PATHINFO_FILENAME)).'.'.pathinfo($check['filename']['name'], PATHINFO_EXTENSION);
        $fileName =  Inflector::slug(pathinfo($check['filename']['name'], PATHINFO_FILENAME)).'.'.pathinfo($check['filename']['name'], PATHINFO_EXTENSION);
        //Ensure target folder
        $folder = new Folder($filePath, true, 0777);
        $file = new File($check['filename']['tmp_name'], false);

              if($file->copy($fileNameAndPath))
              {
                  $this->data[$this->alias]['filepath'] = str_replace(DS, "/", str_replace(WWW_ROOT, "", $fileNameAndPath) );
              }
      
      //inserting the path to the image from WWW_ROOT
        $this->data['Project']['image_name'] = $this->uploadDir . DS . "projects" . DS . $categoryString . DS . $fileName ;
      
          $file->close();
       
    }

    return TRUE;
}

/**
 * Before Save Callback
 * @param array $options
 * @return boolean
 */
public function beforeSave($options = array()) {
    // a file has been uploaded so grab the filepath
    if (!empty($this->data[$this->alias]['filepath'])) {
        $this->data[$this->alias]['filename'] = $this->data[$this->alias]['filepath'];
    }
    
    return parent::beforeSave($options);
}
  /////*******************///
  
    
    
    
    /**************** http://www.jamesfairhurst.co.uk/posts/view/cakephp_contact_form_with_file_uploads
     * Validation
     * 
     *  Todo:: Hardcoded Strings !?!?!?!?!?!?!?!?!?!?!??!!??!!??!
     */
    
    public $validate = array(
        'client_name' => array(
                            'rule'    => 'notEmpty',
                            'message' => 'This field cannot be left blank'
                        ),
        'budget' => array(
                            'rule'    => 'notEmpty',
                            'message' => 'This field cannot be left blank'
                        ),
        'message'  => array(
                            'rule'    => 'notEmpty',
                            'message' => 'This field cannot be left blank'
                        ),
        'filename' => array(
            // http://book.cakephp.org/2.0/en/models/data-validation.html#Validation::uploadError
            'uploadError' => array(
                'rule' => 'uploadError',
                'message' => 'Something went wrong with the file upload',
                'required' => FALSE,
                'allowEmpty' => TRUE,
            ),
            // http://book.cakephp.org/2.0/en/models/data-validation.html#Validation::mimeType
            'mimeType' => array(
                'rule' => array('mimeType', array('image/gif','image/png','image/jpg','image/jpeg')),
                'message' => 'Invalid file type, only images allowed.',
                'required' => FALSE,
                'allowEmpty' => TRUE,
            ),
             'extension'=> array(            
                'rule'    => array(   'extension',array('gif', 'jpeg', 'png', 'jpg')),
                  'message' => 'Invalid file, only gif, jpeg, png images allowed.',
            ),
            // custom callback to deal with the file upload
            'processUpload' => array(
                'rule' => 'processUpload',
                'message' => 'Something went wrong processing your file',
                'required' => FALSE,
                'allowEmpty' => TRUE,
                'last' => TRUE,
            )
        )
    );
    
}

?>