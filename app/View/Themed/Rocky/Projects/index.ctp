<?php



$this->start('sidebar');
     echo $this -> element('project_sidenav', array( "projectsByCategory" => $projects) ); 
$this->end();

$this->start('details');

     echo $this -> element('projectDetails', array("projectsByCategory" => $projects) ); 
$this->end();

?>