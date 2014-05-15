<div id="contact-form-holder" class="jax-innerpage-pane">
	<div class="jax-center-aligned">
		<div class="contact-body">
			<p>
				If you have a cool idea for this site, or you have a comment,  or you want to hire me, you are on the right page!
			</p>
		</div>

		<h3>Contact Me:</h3>
		<div class="contact-form center-block">
			<?php
            echo $this -> Form -> create('Message', array('url' => array( 'controller' => 'jaxcontact', 'action' => 'save' ) ));
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