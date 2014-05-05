  <canvas id="myCanvas" width="578" height="200"></canvas>
  <script>
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

         var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      context.beginPath();
      context.moveTo(100, 150);
      context.lineTo(450, 50);
       context.strokeStyle = '#ff0000';
      context.stroke();
  </script>