$( document ).ready(function() {
  console.log( "ready!" );

  setTimeout(function(){
    $(".redirect").css({"opacity": 1})
  }, 3000);


  var canvas = document.querySelector("#scene");
  ctx = canvas.getContext("2d"),
  canvas2 = $("#scene"),
  particles = [],
  amount = 0,
  mouse = {x:0,y:0},
  radius = 1;
  var distmod = 1.02;
  var m = 2;
  var grav = 50;

  var colors = ["#000"]//["#f8b195","#f67280", "#c06c84","#6c5b7b", "#8E2800"];
  var text = $( "#copy" ).val()

  var copy =  $( "#copy" );// document.querySelector("#copy");


  var ww = copy.width()//window.innerWidth/2;
  var wh = copy.height()//window.innerHeight/2;

  function getBaseLog(x, y) {
      return Math.log(y) / Math.log(x);
    }


  function Particle(x,y){

      var angle = Math.random()//*Math.PI
      //angle = (x < ww/2) ? angle + Math.PI/2 : angle - Math.PI/2;
      var section = Math.random()

      if (section<0.6){
        angle = (x < ww/2) ? angle*Math.PI*0.7 + Math.PI*0.65 : angle*Math.PI*0.7 - Math.PI*0.35;
      } else if (section<0.8){
        angle = angle*Math.PI*0.3 + Math.PI*0.35;
      } else{
        angle = angle*Math.PI*0.3 - Math.PI*0.65;
      }


      var range = 0.4*wh*(1-Math.log(Math.random()*20)/(Math.log(20)*10))

      this.x =  Math.cos(angle)*range + 0.5*ww//Math.random()*ww;
      this.y =  Math.sin(angle)*range + 0.5*wh//Math.random()*wh;

      this.dest = {
          x : x,
          y: y
      };
      this.r =  Math.random()*0.4 + 0.25;

      this.vx = 0;//(Math.random()-0.5)*20;
      this.vy = 0;//(Math.random()-0.5)*20;
      this.accX = 0;
      this.accY = 0;
      this.friction = Math.random()*0.05 + 0.93;

      this.color = colors[0]//Math.floor(Math.random()*6)];
  }

  Particle.prototype.render = function() {
      this.accX = (this.dest.x - this.x)/1000;
      this.accY = (this.dest.y - this.y)/1000;
      //this.vx += this.accX;
      //this.vy += this.accY;

      var a = Math.atan2(this.dest.y - this.y, this.dest.x - this.x);
        this.vx += Math.cos(a)*0.00005*(1.4*ww);
        this.vy += Math.sin(a)*0.00005*(1.4*ww);
      if (Math.abs(this.x - this.dest.x) + Math.abs(this.y - this.dest.y) < 0.1){
        this.vx *= 1.5;
        this.vy *= 1.5;
      }


      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
      ctx.fill();

      var a = this.dest.x - mouse.x;
      var b = this.dest.y - mouse.y;

      var a2 = this.x - mouse.x;
      var b2 = this.y - mouse.y;

      var distance = Math.sqrt( a*a + b*b );
      var distance2 = Math.sqrt( a2*a2 + b2*b2 );
      if(distance<(radius*70)&&distance2<(radius*70)){
          // this.accX = -(this.x - mouse.x)/30;
          // this.accY = (this.y - mouse.y)/30;
          // this.vx += this.accX;
          // this.vy += this.accY;
          var tan = Math.atan2(mouse.y - this.y, mouse.x - this.x);
          var d = distance*distmod;
          var vel = Math.min(grav/d*d, m);
          this.vx += Math.cos(tan)*vel/8;
          this.vy += -Math.sin(tan)*vel/8;
      }
  }

  function onMouseMove(e){
      mouse.x = e.clientX - canvas.offsetLeft;
      mouse.y = e.clientY - canvas.offsetTop;
  }

  function onTouchMove(e){
      if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
  }
  }

  function onTouchEnd(e){
      mouse.x = -9999;
      mouse.y = -9999;
  }

  function initScene(){
      ww = canvas.width = canvas.offsetWidth;//canvas2.width();
      wh = canvas.height = canvas.offsetHeight;//canvas2.height();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = ww*0.07+"px 'Montserrat', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(text, ww/2, wh/2);

      var data  = ctx.getImageData(0, 0, ww, wh).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";


      var chance = 0.83 + (0.1 - 0.1*1450/ww)
      console.log(chance);

      particles = [];
      for(var i=0;i<ww;i+=1){//Math.round(ww/375)){
          for(var j=0;j<wh;j+=1){//Math.round(ww/375)){
              if(data[ ((i + j*ww)*4) + 3] > 100){
                  if (Math.random()>chance){
                      particles.push(new Particle(i,j));
                  }
              }
          }
      }
      amount = particles.length;

  }

/*	function onMouseClick(){
radius++;
if(radius ===5){
    radius = 0;
}
}*/

  function render(a) {
      requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < amount; i++) {
          particles[i].render();
      }
  };

//	copy.addEventListener("keyup", initScene);
	window.addEventListener("resize", initScene);

  window.addEventListener("mousemove", onMouseMove);
  initScene();

  requestAnimationFrame(render);


//window.addEventListener("touchmove", onTouchMove);
//	window.addEventListener("click", onMouseClick);
//	window.addEventListener("touchend", onTouchEnd);
});
