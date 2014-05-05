<div id="jax-projects" class="jax-innerpage-pane">
<h3 class="jax-center-aligned">Projects</h3>

<div class="project-item"> 
<h4>... This Site:</h4><p class="left-margined-paragraph">
    This is a PHP <?php echo PHP_VERSION?> site powered by CakePHP with
     Croogo CMS v1.5.7 connected to a MySQL database. 
    It uses Twitter Bootstrap, Scss/Sass, JQuery, and simple  javascript.
    I will be adding some Three.JS animations soon. Source @Github.  
    This site is being hosted by <a href="http://www.0fees.net/hosting.php">0fees.net</a>.
</p>
</div>

<div class="project-item">    
<h4>... Khan Man:</h4>
<p class="left-margined-paragraph">
    I am a big fan of <a href="http://www.khanacadamy.org" >The Khan Acadamy</a>.  Education 
    should be free and accessible to all. They encourage developers to write games and animations
    using their adapted version of the ProcessingJS javascript Framework. For now, please
     follow the link below
    to see my live version of Pac-man called Khan-Man. Click below to see my rewrite of 
    KhanMan, surprisingly called JaxMan, uses the official Processing.js framework.</p>

<ul class="list-inline jax-center-aligned">
    <li>
        <!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#jaxManModal">
  Play Jax-Man
</button>

<!-- Modal -->
<div class="modal fade" id="jaxManModal" tabindex="-1" role="dialog" aria-labelledby="jaxManModalLabel" aria-hidden="true">
  <div class="modal-dialog">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">JaxMan</h4>
      </div>
    <div class="modal-content">
     
      <div class="modal-body">
       <?php echo $this->element('jaxman'); ?>
      </div>
     
    </div>
  </div>
</div>
    </li>
    
    <li>
        <a href="https://www.khanacademy.org/cs/khan-man/5835976181022720"
                target="_blank"><button class="btn btn-primary btn-lg"  >
  Play KhanMan at Khan Acadamy
</button></a>
       
    </li>
</ul>
</div> 
          
<div class="jax-center-aligned"><span>Coming Soon:</span></div>

<div class="project-item"> 
<h4>... OndeBus:</h4>
<p class="left-margined-paragraph"> Anyone who has ever used Brazilian public
     transportation knows that Brazil needs to organize it's bus system. There are a few attempts
     out there already but none of them offers what OndeBus offers. Stay Tuned. It will
     be written with NodeJS and Neo4j.</p>
</div>

<div class="project-item"> 
<h4>... Quebert 3D:</h4>
<p class="left-margined-paragraph"> The kid in me couldn't let Pac-Man be the only
    game. I am using the Unity3d Engine for this game. </p>
</div> 

<div class="project-item">   
<h4>... Recipe Database:</h4>
<p class="left-margined-paragraph"> I will use Grails and Neo4J for this one.</p>
</div>

</div><!-- jax-project --->