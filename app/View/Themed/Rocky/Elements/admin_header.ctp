<header class="navbar  navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
             
            <div class="nav-collapse " style="height: 0px; ">

                <?php if ($this->Session->read('Auth.User.id')): ?>
                <ul class=" pull-right list-inline">
                    <li>
                        <p>
                            <?php echo __d('croogo', "You are logged in as: %s", $this->Session->read('Auth.User.username')); ?>
                        </p>
                    </li>
                    <li>
                        <?php echo $this->Html->link(__d('croogo', "Log out"), array('plugin' => 'users', 'controller' => 'users', 'action' => 'logout')); ?>
                    </li>
                </ul>
                <?php endif; ?>
            </div>
        </div>
    </div>
</header>