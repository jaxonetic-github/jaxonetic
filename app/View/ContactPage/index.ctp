<div id="contact-form-holder" class="container">
	<div class="rocky-center-aligned">
		<div class="contact-body">
			<p>
				For estimating questions,please contact Doug Ladderbush at dl@rcbcorp.com
			</p>
		</div>

		<h2>Contact Us:</h2>
		<div class="contact-form center-block">
			<?php
            echo $this -> Form -> create('Message', array('url' => array( 'controller' => 'contactpage', 'action' => 'save' ) ));
            echo $this -> Form -> input('Message.name', array('label' => __d('croogo', 'Your name')));
            echo $this -> Form -> input('Message.email', array('label' => __d('croogo', 'Your email')));
            echo $this -> Form -> input('Message.phone', array('label' => __d('croogo', 'Phone')));
            echo $this -> Form -> input('Message.address', array('label' => __d('croogo', 'Your Address')));
            echo $this -> Form -> input('Message.title', array('label' => __d('croogo', 'Subject')));            
            echo $this -> Form -> input('Message.body', array('label' => __d('croogo', 'Message')));

            echo $this -> Form -> end(__d('croogo', 'Send'));
			?>
		</div>
	</div>
</div>