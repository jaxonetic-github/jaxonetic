<?php
/**
 * Short description for file.
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different urls to chosen controllers and their actions (functions).
 *
 * PHP versions 4 and 5
 *
 * CakePHP(tm) :  Rapid Development Framework (http://www.cakephp.org)
 * Copyright 2005-2008, Cake Software Foundation, Inc. (http://www.cakefoundation.org)
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright     Copyright 2005-2008, Cake Software Foundation, Inc. (http://www.cakefoundation.org)
 * @link          http://www.cakefoundation.org/projects/info/cakephp CakePHP(tm) Project
 * @package       cake
 * @subpackage    cake.app.config
 * @since         CakePHP(tm) v 0.2.9
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @license       http://www.opensource.org/licenses/mit-license.php The MIT License
 */
App::uses('CroogoRouter', 'Croogo.Lib');
Router::connect('/', array('controller' => 'pages', 'action' => 'index'));
Router::connect('/aboutme', array('controller' => 'pages', 'action' => 'aboutme'));
Router::connect('/projects', array('controller' => 'projects', 'action' => 'index'));
Router::connect('/jaxman', array('controller' => 'projects', 'action' => 'jaxman'));
Router::connect('/resume', array('controller' => 'pages', 'action' => 'resume'));
Router::connect('/resume_as_pdf', array('controller' => 'pages', 'action' => 'resumeAsPdf'));

CakePlugin::routes();
Router::parseExtensions('json', 'rss', 'pdf');
CroogoRouter::localize();
require CAKE . 'Config' . DS . 'routes.php';
