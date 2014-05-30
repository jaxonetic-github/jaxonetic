<?php

App::uses('CakeEmail', 'Network/Email');
App::uses('AppController', 'Controller');


/**
 * Contacts Controller
 *
 * @category Controller
 * @package  Croogo.Contacts.Controller
 * @version  1.0
 * @author   Fahad Ibnay Heylaal <contact@fahad19.com>
 * @license  http://www.opensource.org/licenses/mit-license.php The MIT License
 * @link     http://www.croogo.org
 */
class JaxcontactController extends AppController {

var $layout = 'twoDLayout';
  public $helpers = array('Html');
/**
 * Controller name
 *
 * @var string
 * @access public
 */
	
/**
 * Models used by the Controller
 *
 * @var array
 * @access public
 */
	public $uses = array('Contacts.Contact', 'Contacts.Message');

  public function index($noLayout = null){
      if($noLayout){
          $this->layout = "interactiveInnerPage";
      }       
  }



  public function save(){
     debug($this->request->data['Message']);
      $this->log($this->request->data['Message']);
        if (!empty($this->request->data) ) {
            $this->request->data['contact_id'] = 1;
            $this->request->data['title'] = htmlspecialchars($this->request->data['Message']['title']);
            $this->request->data['name'] = htmlspecialchars($this->request->data['Message']['name']);
            $this->request->data['phone'] = htmlspecialchars($this->request->data['Message']['phone']);
            $this->request->data['email'] = htmlspecialchars($this->request->data['Message']['email']);
            $this->request->data['address'] = htmlspecialchars($this->request->data['Message']['address']);
            $this->request->data['body'] = htmlspecialchars($this->request->data['Message']['body']);
           // $continue = $this->_validation($continue, $contact);
           // $continue = $this->_spam_protection($continue, $contact);
            //$continue = $this->_captcha($continue, $contact);
           // $continue = $this->_send_email( $message);
//CakeEmail::deliver('jaxonetic@gmail.com', 'Subject', 'Message', array('from' => 'me@example.com'),true);
           //if ($continue === true) {
            $siteEmail = Configure::read('Site.email');
            $siteTitle = Configure::read('Site.title');
            
              
            $email = new CakeEmail('gmail');
            $email->from(array( $this->request->data['email'] => 'Jaxonetic Website User'))
            ->subject(__d('croogo', '[%s] %s', $siteTitle,  $this->request->data['title']))
            ->to(array($siteEmail => $siteTitle)); //<- From Site panel in CMS Admin
            $email->sender('jaxonetic@builder.com', 'Web Application Emailer');
           
            
            try {
                    $email->send($this->request->data['body'] );
            } catch (SocketException $e) {
                $this->log(sprintf('Error sending contact notification: %s', $e->getMessage()));
     
            }
            //Save message in system regardless of email success
            if ($this->Message->save($this->request->data)) {
                $this->Session->setFlash(__d('croogo', 'Your message has been received.'));
           
            unset($this->request->data['Message']);

               
              }
           }
       // }
          return $this->redirect(array('action' => 'index'));
  }





}
