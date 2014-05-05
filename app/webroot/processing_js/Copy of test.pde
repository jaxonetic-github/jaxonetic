/* @pjs preload="processing_js/swallow.png,processing_js/bird-mask.png,processing_js/gluttony.png,processing_js/overkill.png, processing_js/pumpkin-mask.png, processing_js/puppet.png"; */
/******************   Global Constants   ****************/
//offset values for positioning board...
var HORIZONTAL_OFFSET = 5;
var VERTICAL_OFFSET = 20;

//dimensions  --4 now the board will be square.
//var screenWidth = 400;
//var screenHeight = 20;

var PATH_WIDTH=38; //a nice even convenient minimum space between parallel walls
var numEnemies = 4;
var GRIDSIZE = 10; 

//pellots
var pellotInnerColor = color(200, 220, 32);
var ENEMY_VALUE = 10;
var PELLOT_VALUE = 1;
var POWERPELLOT_VALUE = 5;
var INITIAL_NUM_OF_PELLOTS = 95;
var INVINCIBILITY_TIME = 20;
var MAX_LEVEL = 2;
var DIRECTIONS = ["up", "down","left","right"];

//menu
var MENU_BUTTON_X = 127;
var MENU_BUTTON_HEIGHT = 28;

var JAXMAN_INITIAL_X = 4;
var JAXMAN_INITIAL_Y = 8;

var isPlaying = false; //start the game paused
var paused    = false; //user has paused game by requesting menu with a click
var touchedAnEnemy = false;
var jaxWorld = null;
var infoMenuMode = false;

var JAXMAN_IMAGE = "processing_js/puppet.png";
var ENEMY_ONE_IMAGE = "processing_js/bird-mask.png";	
var ENEMY_TWO_IMAGE = "processing_js/gluttony.png";
var ENEMY_THREE_IMAGE = "processing_js/overkill.png";
var ENEMY_FOUR_IMAGE = "processing_js/pumpkin-mask.png";
Var ENEMY_SCARED_IMAGE = "processing_js/swallow.png";

/*
 * //Unsure the importance of encapsulation with Processing.js
 *   Unsure if Processing.js handles method overloading well
 */
 
 /* 
 * Parent object holds coords and an image
 *
 * x,y  : coordinates
 * img  : Image object returned from a getImage call;
 */
class JaxEntity{

  int x;
  int y;
  PImage img;
  
  
  JaxEntity(int x, int y, img){
	  this.setPosition(x,y);
	  this.img  = img;
  }
  
 void drawJaxEntity(){
      image(this.img, PATH_WIDTH*this.x, VERTICAL_OFFSET + PATH_WIDTH*this.y, PATH_WIDTH, PATH_WIDTH);
 }
  
/* Position Setters
 * Ensure Entity doesn't go out of bands.
 * In the future, will change to go through tunnels
 */
 void setPosition(x,y) {
    return this.setX(x) &&  this.setY(y);
 }

 void setX(int x) {
    var success = false;
     if(x< 0){
      this.x = 0;
     } else if(x>= GRIDSIZE){
                 this.x = GRIDSIZE-1;
             }else{
                 this.x=x;
                 success = true;
             }
             return success;
}
 
 void setY(int y) {
    var success = false;
    if(y< 0){
      this.y = 0;
     } else if(y>= GRIDSIZE){
                 this.y = GRIDSIZE-1;
             }else{
                 this.y=y;
                 success = true ;
             }
    return success;
}
  
}//class

 
//-----------  JaxMan

class JaxMan extends JaxEntity{
  int invincibility;
  JaxMan (int x, int y){
     super(x,y,loadImage(JAXMAN_IMAGE));
     this.invincibility = 0;
  }

 }//Jaxman
 
 
/**-------  JaxEnemy
 */
class JaxEnemy extends JaxEntity{
  boolean isScared;
  PImage  scaredImage;
  boolean goRandom;
  
     
 JaxEnemy(int x, int y, PImage img){
  super( x,y,img);

    this.isScared = false;
    this.scaredImage = loadImage(ENEMY_SCARED_IMAGE);
    this.goRandom = true; 
  }

/**
 * over-writing JaxEntity.draw
 */ 
 void drawJaxEntity(boolean invincibility) {
     
  if(this.isScared ){//if enemy is scared then 
      if(invincibility<=INVINCIBILITY_TIME/2){
          //if jaxman's invincibility is dwindling, alternate
          if(invincibility%2===0){
            image(this.scaredImage, PATH_WIDTH*this.x,
             VERTICAL_OFFSET + PATH_WIDTH*this.y, PATH_WIDTH, PATH_WIDTH );
          }else{
              image(this.img, PATH_WIDTH*this.x,
              VERTICAL_OFFSET +PATH_WIDTH*this.y, PATH_WIDTH, PATH_WIDTH);
          }

      }else{//if still early in jaxman's invincibility just show scared image
                   image(this.scaredImage, PATH_WIDTH*this.x,
                        VERTICAL_OFFSET + PATH_WIDTH*this.y, PATH_WIDTH, PATH_WIDTH );
      }
  }else{
    image(this.img, PATH_WIDTH*this.x, VERTICAL_OFFSET +PATH_WIDTH*this.y,
                                PATH_WIDTH, PATH_WIDTH);
    }
 }//drawJaxEntity
 
}//JaxEnemy
 
 
 
 /** JaxLocation:  Every Grid item holds, at least, an object of this 
 *                class and possibly other things.
 *
 *
 */
 
class JaxLocation extends JaxEntity{
   
    boolean hasNorthWall;
    boolean hasSouthWall;
    boolean hasEastWall;
    boolean hasWestWall;

    JaxEntity internalObject;
    
 JaxLocation (JaxEntity internalObject, int x, int y,
 	boolean northWall, boolean southWall, boolean eastWall, boolean westWall){
 	super(null,x,y);
    this.hasNorthWall = northWall;
    this.hasSouthWall = southWall;
    this.hasEastWall  = eastWall ;
    this.hasWestWall  = westWall;
    this.internalObject = internalObject;
 }
 
  void setWalls(boolean northWall, boolean southWall, boolean eastWall,boolean westWall){
    this.hasNorthWall = northWall;
    this.hasSouthWall = southWall;
    this.hasEastWall  = eastWall ;
    this.hasWestWall  = westWall;
  }

   void drawJaxEntity(){

     if(this.internalObject !==null)
     {
        this.internalObject.drawJaxEntity();
     }
     
     //draw Walls regardless of internalObject
     strokeWeight(1);
     if(this.hasNorthWall)
     { 
        //drawNorthWall
       line(this.x*PATH_WIDTH,this.y*PATH_WIDTH+PATH_WIDTH/2,
             this.x *PATH_WIDTH+ PATH_WIDTH,  this.y*PATH_WIDTH+PATH_WIDTH/2);
     }
     if(this.hasSouthWall)
     {
        //drawSouthWall
       
        line(this.x*PATH_WIDTH,this.y*PATH_WIDTH+PATH_WIDTH*1.5,
             this.x*PATH_WIDTH +PATH_WIDTH,  this.y*PATH_WIDTH+PATH_WIDTH*1.5);
     }
     if(this.hasEastWall){
         //drawEastWall
        // stroke(5, 0, 0);
         line( this.x*PATH_WIDTH +PATH_WIDTH, this.y*PATH_WIDTH+VERTICAL_OFFSET,
                            this.x*PATH_WIDTH +PATH_WIDTH, 
                            this.y*PATH_WIDTH+PATH_WIDTH+VERTICAL_OFFSET);
     }
     if(this.hasWestWall){
         //drawWestWall
          line( this.x*PATH_WIDTH, this.y*PATH_WIDTH+VERTICAL_OFFSET, 
                    this.x*PATH_WIDTH, this.y*PATH_WIDTH+PATH_WIDTH+VERTICAL_OFFSET);
     }
  }//drawJaxEntity
}//JaxLocation


//-----------------------  PELLOT 

class JaxPellot extends JaxEntity{
 	int value;

	JaxPellot(int column, int row, int value){
	    super(column, row, null);
	    this.value = value;
	}

 void drawJaxEntity(){
    stroke(0, 0, 0);
    strokeWeight(5);

    point(PATH_WIDTH * this.column+PATH_WIDTH/2,
            VERTICAL_OFFSET+this.row*PATH_WIDTH+PATH_WIDTH/2 );
 }
}



//-----------------------------  Power Pellot

class JaxPowerPellot extends JaxPellot {
   
   JaxPowerPellot(column, row,value){
    super(column,row,value);   
   }

   void drawJaxEntity(){
      stroke(pellotInnerColor);
      strokeWeight(20);
      
      point( PATH_WIDTH * this.column + PATH_WIDTH/2,
            VERTICAL_OFFSET+ this.row * PATH_WIDTH+PATH_WIDTH/2);
   }
   
}


//----------------JaxWorld

class JaxWorld {

	JaxLocation[]  gridMap;
	int score = 0;
	int pellotCounter;
	JaxEnemy[] enemies;
	boolean isGameOver;
	int level;
	int kmanLivesRemaining;
	boolean ghostCanGoThroughWalls;
	
	JaxWorld(){
	    this.gridMap = new JaxLocation[GRIDSIZE];
	    this.score = 0;
	    this.pellotCounter = INITIAL_NUM_OF_PELLOTS;//92 normal pellots + 4 power pellots. from zero not 1
	    this.enemies = new JaxEnemy[4];
	    this.isGameOver = false;
	    this.level = 0;
	    this.kmanLivesRemaining = 2; //add lives functionality later
	    this.click = false;
	    this.ghostCanGoThroughWalls = false;
	    this.setup();
    }
    
    
/* 
 * Sort of a Brute force way to set up the World.
 *
 */
  void  initNormalPellots(){
  for(var column=0; column<GRIDSIZE ; column+=1)
  {
    this.gridMap[column] = new JaxLocation[GRIDSIZE];
   
    for(var row = 0; row<GRIDSIZE; row+=1){
        var nWall= false;
        var sWall= false;
        var eWall= false;
        var wWall = false;
        
        if(column===0){//far left
         wWall= true;
        }
        if(column===(GRIDSIZE-1))//far right
        {
            eWall= true;
        }
        if(row === 0){//top
            nWall = true;
        }
       
        if(row === 9){//far bottom
            sWall = true;
        }
     this.gridMap[column][row] = new JaxLocation(new JaxPellot(column, row ,PELLOT_VALUE), column,row,nWall, sWall,eWall,wWall);
    }
  }    

//remove the 4 pellots in the middle of the enemies home...no use feeding the enemy:-)
this.gridMap[4][4].internalObject = null;
this.gridMap[4][5].internalObject = null;
this.gridMap[5][4].internalObject = null;
this.gridMap[5][5].internalObject = null;
}//initnormal pellots

/*
 * Add Power pellots to the four corners
 *
 */
  void initPowerPellots(){
    this.gridMap[0][0] = new JaxLocation( new JaxPowerPellot(0,0,POWERPELLOT_VALUE),
                                                        0,0,true, false,false,true);
    this.gridMap[0][9] = new JaxLocation(new JaxPowerPellot(0,9,POWERPELLOT_VALUE),
                                                       0,9, false, true,false,true);
    this.gridMap[9][0] = new JaxLocation(new JaxPowerPellot(9,0,POWERPELLOT_VALUE),
                                                       9,0, true, false,true,false);
    this.gridMap[9][9] = new JaxLocation(new JaxPowerPellot(9,9,POWERPELLOT_VALUE),
                                                      9,9,  false, true,true,false);
   }

	void  initEnemies(){
	  var enemy1 = new  JaxEnemy(4,5, loadImage(ENEMY_ONE_IMAGE));
	  var enemy2 = new  JaxEnemy(5,5,loadImage(ENEMY_TWO_IMAGE));
	  var enemy3 = new  JaxEnemy(4,4,loadImage(ENEMY_THREE_IMAGE));
	  var enemy4 = new  JaxEnemy(5,4,loadImage(ENEMY_FOUR_IMAGE));
	
	  this.enemies = [enemy1,enemy2,enemy3,enemy4];
	}
    
    
    
   void initWalls(){
       //left side
    this.gridMap[0][3].setWalls(true, false, true, true);
    this.gridMap[0][6].setWalls(false, true, true, true);
    this.gridMap[1][3].setWalls(false, true, false, true);
    this.gridMap[1][6].setWalls(true, false, false, true);
    
    //right side
    this.gridMap[8][3].setWalls(false, true, true, false);
    this.gridMap[8][6].setWalls(true, false, true, false); 
    this.gridMap[9][3].setWalls(true, false, true, true);
    this.gridMap[9][6].setWalls(false, true, true, true);
    
    //bottom
    this.gridMap[4][8].setWalls(true, false, false, true);
    this.gridMap[5][8].setWalls(true, false, true, false); 
    
    //top
    this.gridMap[4][1].setWalls(false, true, true, false);
    this.gridMap[5][1].setWalls(false, true, false, true); 
    
    //nw corner
    this.gridMap[2][1].setWalls(false, false, true, false);
    this.gridMap[2][2].setWalls(false, true, true, true); 
    
    //ne corner
    this.gridMap[7][1].setWalls(false, false, false, true);
    this.gridMap[7][2].setWalls(false, true, true, true); 
    
    //sw corner
    this.gridMap[2][8].setWalls(false, false, true, false);
    this.gridMap[2][7].setWalls(false, true, true, true); 
    
    //se corner
    this.gridMap[7][8].setWalls(false, false, false, true);
    this.gridMap[7][7].setWalls(false, true, true, true); 
    
    //enemy house
    this.gridMap[4][4].setWalls(false, false, false, true);
    this.gridMap[4][5].setWalls(false, true, false, true); 
    this.gridMap[5][4].setWalls(false, false, true, false);
    this.gridMap[5][5].setWalls(false, true, true, false); 
}
 
 
 

  void setup (){
    /*
     * the order is important because of the brute force way
     * I am initializing the grid.  If order is not respected
     */
    this.initNormalPellots();
    this.initPowerPellots();
    this.initEnemies();
    
    this.jaxMan   = new JaxMan(JAXMAN_INITIAL_X,JAXMAN_INITIAL_Y);
    this.gridMap[this.jaxMan.x][this.jaxMan.y] =new JaxLocation(new JaxMan(JAXMAN_INITIAL_X,JAXMAN_INITIAL_Y),
                            this.jaxMan.x,this.jaxMan.y, false, false,false,false);
   
    this.score = 0;
    
    this.isGameOver = false;
    this.level = 0;
    this.kmanLivesRemaining = 2; //add lives functionality later

    this.ghostCanGoThroughWalls = (this.level>0);
    this.initWalls();
}

  void prepareNextLevel(){
    /*
     * the order is important because of the brute force way
     * I am initializing the grid.  If order is not respected
     */
    this.initNormalPellots();
    this.initPowerPellots();
    this.initEnemies();
    
    this.jaxMan   = new JaxMan(JAXMAN_INITIAL_X,JAXMAN_INITIAL_Y);
    this.gridMap[this.jaxMan.x][this.jaxMan.y] =new JaxLocation(new JaxMan(JAXMAN_INITIAL_X,JAXMAN_INITIAL_Y),
                            this.jaxMan.x,this.jaxMan.y, false, false,false,false);
   
    this.pellotCounter = INITIAL_NUM_OF_PELLOTS;
    this.isGameOver = false;
    this.level +=1 ;
   
    this.initWalls();
};

	void rePositionJaxman(){
	    this.gridMap[this.jaxMan.x][this.jaxMan.y].internalObject = null;
	    this.jaxMan   = new JaxMan(JAXMAN_INITIAL_X,JAXMAN_INITIAL_Y);
	    this.gridMap[JAXMAN_INITIAL_X][JAXMAN_INITIAL_Y].internalObject = this.jaxMan; 
	}
 
    
/*
 *  Go through each object in the grid and print its drawJaxEntity() method.
 *
 */
  void drawJaxWorld(){
     
     for(var enemyIdx = 0; enemyIdx <this.enemies.length; enemyIdx+=1){
         if(this.jaxMan.invincibility>0){
            this.enemies[enemyIdx].isScared =true;
         }
         else{
              this.enemies[enemyIdx].isScared =false;
         }
        
        this.enemies[enemyIdx].drawJaxEntity(this.jaxMan.invincibility);  
     }
    
    for(var column=0; column<GRIDSIZE ; column+=1)
        {
           // var spacing = pathWidth * column;
            for(var row = 0; row<GRIDSIZE; row+=1){
                 this.gridMap[column][row].drawJaxEntity();
            }
        }

 //draw enemy house  --this is different from a wall,
 //I'm just adding some spice to the barriers of the house created in initWalls.
    noFill();
    strokeWeight(2);
    rect(PATH_WIDTH*4,VERTICAL_OFFSET+PATH_WIDTH*4,PATH_WIDTH*2,PATH_WIDTH*2);
   
    //Jaxman's invincability counter
     if(this.jaxMan.invincibility>0){
         this.jaxMan.invincibility-=1;
     }
     
}//drawJaxWorld
    
    
 
 /*
  * the difference between move() and eat() is that eat actually removes
  * an object that it passes over.
  */
  void eat( JaxEntiry jaxObject, int destX, int destY){
    // debug(jaxObject +"eat "+ destX + " "+ destY);
    var previousX = jaxObject.x;
    var previousY = jaxObject.y;
         //update JaxMan internal position
        if(jaxObject.setPosition(destX,destY)){
         //update JaxMan world/map position
        this.gridMap[destX][destY].internalObject = jaxObject;
        // remove footprint
        this.gridMap[previousX][previousY].internalObject = null;
        }
        
 }
   
       
/*
 * moves  Ghosts and Food.  Allows them to float over instead of eat remove objects
 */
  boolean move(JaxEntity jaxObject, int destX, int destY){
       
         //update JaxObject internal position
        return jaxObject.setPosition(destX,destY);
            //if destX or dest Y > gridSize setPosition will adjust 
            // the points so that the entity stays in bounds.  Therefore
            // from here on out use the jaxObjects position instead of destXY.
            //Otherwise you'll have arrayIndexOutOfBounds              
 } 
   
  boolean canMoveEast(int x, int y){
     return (!this.gridMap[x][y].hasEastWall && 
        !this.gridMap[x+1][y].hasWestWall);
 }
 
  boolean canMoveWest(int x, int y){
     return (!this.gridMap[x][y].hasWestWall && 
        !this.gridMap[x-1][y].hasEastWall);
 }

  boolean canMoveNorth(int x, int y){
     return (!this.gridMap[x][y].hasNorthWall && 
        !this.gridMap[x][y-1].hasSouthWall);
 }
 
   boolean canMoveSouth(int x, int y){
 
     return (!this.gridMap[x][y].hasSouthWall && 
        !this.gridMap[x][y+1].hasNorthWall); 
 }
 
    
 int getEnemyDirection(JaxEnemy enemy, boolean isSmart){
   
    if(!isSmart){
        return floor(random() * DIRECTIONS.length );
    }else
        if(this.level === 2)
        {// smarter ghosts
        
            if(this.jaxMan.x >  enemy.x ){ //kman is east
                   return DIRECTIONS.indexOf("right");
            }
            if(this.jaxMan.y >  enemy.y ){ //kman is south
                    return DIRECTIONS.indexOf("down");
            }
            if(this.jaxMan.y <  enemy.y){ //kman is north
                    return DIRECTIONS.indexOf("up");
            }
            if(this.jaxMan.x <  enemy.x     ){ //kman is west
                    return DIRECTIONS.indexOf("left");
            }

        }//if
       // }
      
     return DIRECTIONS.indexOf("up"); 
}
    
    
    
/**
 * Handles enemy movement.  
 *
 */
  void moveEnemies(int timer){
    //before attempting to move, check to make sure that the enemy hasn't
    //found jaxman.  If he has then game is over.
    //I'm chasing a bug here where the game is not recognizing when jaxman and 
    //an enemy are passing each other.
   if(this.checkForEnemiesAt(this.jaxMan.x, this.jaxMan.y)){
       touchedAnEnemy= true;
       this.isGameOver =( this.jaxMan.kmanLivesRemaining===0);
   }else
  { 
    for(var enemyIdx = 0; enemyIdx <this.enemies.length; enemyIdx+=1){
       
       var canGoThroughWalls = ((this.level>0) && (timer%10===0));
       var smart = (this.level >1 && (timer%2===0));
       
        var direction = this.getEnemyDirection(this.enemies[enemyIdx] ,smart);
        //debug(smart +" "+canGoThroughWalls+ " "+direction);
        var tmpX = this.enemies[enemyIdx].x;
        var tmpY = this.enemies[enemyIdx].y;

        if(direction===DIRECTIONS.indexOf("up")){
            //ensure cuurent location doesn't have north wall and upper loc doesn't have 
            //south wall
          if(canGoThroughWalls||smart||  this.canMoveNorth(tmpX, tmpY)){
               if( this.move(this.enemies[enemyIdx], tmpX,tmpY-1)){
                    //if move was successful, remember move and record new move 
                   this.enemies[enemyIdx].previousDirection = this.enemies[enemyIdx].direction;
                   this.enemies[enemyIdx].direction = direction;
                }
          }            
        }else
            if(direction===DIRECTIONS.indexOf("down")){
                
                if(canGoThroughWalls||smart||  this.canMoveSouth(tmpX, tmpY) ){
                   // debug("can move south");
                
                    if(this.move(this.enemies[enemyIdx], tmpX, tmpY+1)){
    this.enemies[enemyIdx].previousDirection = this.enemies[enemyIdx].direction;
         this.enemies[enemyIdx].direction = direction;     
                    }
                else{
                    //debug("can't move");
                }
                
                }else{
                    //debug("can't move south");
                }
            }else
                if(direction===DIRECTIONS.indexOf("left")){
                   if(canGoThroughWalls|| smart|| this.canMoveWest(tmpX, tmpY) ){
                        if(this.move(this.enemies[enemyIdx], tmpX-1, tmpY)){
       this.enemies[enemyIdx].previousDirection = this.enemies[enemyIdx].direction;
                        this.enemies[enemyIdx].direction = direction;  
                        }
                   }
                }else
                    if(direction===DIRECTIONS.indexOf("right")){
                        if(canGoThroughWalls|| smart|| this.canMoveEast(tmpX,tmpY) ){
                            
                         
                               if( this.move(this.enemies[enemyIdx], tmpX+1,tmpY)){
            this.enemies[enemyIdx].previousDirection = this.enemies[enemyIdx].direction;
            this.enemies[enemyIdx].direction = direction;      
                        
                        }
                        }
                    }
    }
   }
}//moveEnemies()
    
    
/*
 *
 */
 boolean checkForEnemiesAt(int x, int y){
    
  for(var enemyIdx = 0; enemyIdx <this.enemies.length; enemyIdx+=1){
     var enemy =this.enemies[enemyIdx] ;
     if (enemy.x ===x  && enemy.y ===y){ //if the enemy is at the location,
             //debug(enemy.x +"=="+x +"<||>"+enemy.y +"=="+y);
             //jaxman is invisable and at a location of an enemy
       if (this.jaxMan.invincibility>0 ){
           
         this.enemies[enemyIdx].x = 4;
         this.enemies[enemyIdx].y = 5;
         this.score += ENEMY_VALUE;
         // skip the return true because of invincibility and check other enemies.
         continue;
        }else { 
            //enemy is here 
             return true; 
        }
       
     }//if
    
  }//for

     return false;
}//checkForEnemiesAt
    
    
    
/**
 * check if there is an object in front of JaxMan. If there is,
 * prevent him from advancing.  If it's an enemy...death.
 * returns they type of object in front or null if nothing(empty space).
 */ 
   boolean lookAhead(JaxEntity jaxObject, int destX, int destY){
     
     
if(this.checkForEnemiesAt(destX, destY)){//enemy is ahead

            this.isGameOver = this.jaxMan.kmanLivesRemaining===0;
            touchedAnEnemy = true;
            
            return false;
} 
//no "else" because it's possible that an enemy and jaxman and food and a pellot
//could be on the same location

    if(  (this.gridMap[destX][destY].internalObject instanceof JaxPellot) &&
                (jaxObject instanceof JaxMan)){ //If jaxman is about to eat a pellot
        
        this.eat(jaxObject,destX, destY);
        this.score += PELLOT_VALUE;
        this.pellotCounter-=1;
    }else
       if(  (this.gridMap[destX][destY].internalObject instanceof JaxPowerPellot) &&
                (jaxObject instanceof JaxMan)){
            this.eat(jaxObject,destX, destY);
            this.score += POWERPELLOT_VALUE;
            jaxObject.invincibility += INVINCIBILITY_TIME;
            this.pellotCounter-=1;
        }else 
            if(  (this.gridMap[destX][destY].internalObject ===null) &&
                (jaxObject instanceof JaxMan)){
                    this.eat(jaxObject,destX, destY);
                } 
                
      return null;  
 }//look ahead
 
 
}//JAXWORLD

/**************   Top Score Board     ***********/

    void drawScoreBoard(int score, int level, kmanLivesRemaining){
       //draw info bar
	    textSize(15);
	    text("Score: " + score, 283, 15);
	    text("Level: " + (level+1), 167, 15);
	    text("Lives remaining: " + kmanLivesRemaining, 18, 15);
    }


    /*******************    Menu    *******************/

   void showMenu (gameInProgress, gameOver){

     var menuButtonBorderAngle = -10;
        fill(111, 117, 173);
        rect(50, 30, 300, 350, 30);
        strokeWeight(5);
        fill(190, 180, 194);
        //title
        textSize(30);
        text("Jax Man",129, 77 );
         
        textSize(20);
        if(gameOver){
            fill(68, 12, 87);
            text("!!! Game Over !!!",123, 124 );
        }
        
        if(gameInProgress){
            
           //button
            noFill();
            strokeWeight(1.2);
            fill(0, 0, 0);
            rect(MENU_BUTTON_X, 158, 144, MENU_BUTTON_HEIGHT, menuButtonBorderAngle);
             
             //text
             stroke(0, 0, 0);
            fill(171, 171, 108);
            text("New Game", 150, 180);
            
            //button
            noFill();
            strokeWeight(1.4);
            fill(0, 0, 0);
            rect(MENU_BUTTON_X, 212, 144, MENU_BUTTON_HEIGHT, menuButtonBorderAngle);
             
            //text
            stroke(0, 0, 0);
            fill(171, 171, 108);
            text("Resume Game", 133, 233);
           
                       //button
            noFill();
            strokeWeight(1.4);
            fill(0, 0, 0);
            rect(MENU_BUTTON_X, 268, 144, MENU_BUTTON_HEIGHT, menuButtonBorderAngle);
             
            //text
            stroke(0, 0, 0);
            fill(171, 171, 108);
            text("Instructions", 147, 289);
        }else{
            
           //button
            noFill();
            strokeWeight(1.2);
             fill(0, 0, 0);
             rect(MENU_BUTTON_X, 158, 144, MENU_BUTTON_HEIGHT, menuButtonBorderAngle);
             
             //text
             stroke(0, 0, 0);
             fill(171, 171, 108);
            text("New Game", 150, 180);
            
            //button
            noFill();
            strokeWeight(1.4);
            fill(0, 0, 0);
            rect(MENU_BUTTON_X, 212, 144, MENU_BUTTON_HEIGHT, menuButtonBorderAngle);
             
           //text   
            stroke(0, 0, 0);
             fill(171, 171, 108);
            text("Instructions", 150, 233);
          } 
       
        //footer
        textSize(10);
        fill(191, 191, 208);
        text("(A Jaxonetic Production)", 149, 364);
}
    
   void showInfo(){
     //draw border
        fill(150, 83, 201);
        rect(53, 30, 295, 350, 30);
        strokeWeight(5);
        fill(190, 180, 194);
        
        //title
        textSize(30);
        text("Instructions",121, 77 );
         
        textSize(20);
        fill(196, 181, 115);
        text("Click on the World to pause",72, 124 );
        text("and open the Main Menu.",92, 144 );
        text("Use arrow keys to navigate.",74, 170 );
        text("You have 3 lives total.",74, 200 );
        text("Touch an enemy, lose a life.", 74, 229);
              text("Eat a power pellot,",74, 256 );
        text("become invincible,", 160, 280);
        text("and eat the enemies.", 142, 300);
        text("There are three levels", 74, 330);
        text("Eat all pellots, advance a level", 74, 360);

	//sketch top  X Button
     rect(301,33, 37,32,133);

    line(314, 44, 327, 54);
    line(314, 54, 327, 44);
 }




// Setup the Processing Canvas
void setup(){
  size( 500, 500 );
  strokeWeight( 1 );
  frameRate( 5 );
}

JaxWorld jaxWorld =  new JaxWorld();

/**
 * Main draw method
 */
var draw = function() {
 
}


