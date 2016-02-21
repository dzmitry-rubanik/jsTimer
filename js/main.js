 function Clock() {
     this.area = document.getElementById('clock');
     this.audio = new Audio();
     this.minutesInput = document.getElementById('minutes');
     this.secondsInput = document.getElementById('seconds');
 }

 Clock.prototype.render = function() {
     var min ,
         sec ;

     if( this.seconds == 0 ){
         min = --this.minutes;
         this.seconds = 59;
         sec = this.seconds;
     }else{
         sec = --this.seconds;
         min = this.minutes;
     }

     min = this.addZero(min);
     sec = this.addZero(sec);

     var output = min + ":" + sec;

     if (this.minutes == 0 && this.seconds == 0) {
         this.area.textContent = output;
         this.stop();
         this.playAudio();
         } else {
             this.area.textContent  = output;
         }
 };

 Clock.prototype.loadInputsVal = function(){
     this.minutes = this.minutesInput.value;
     this.seconds = this.secondsInput.value;
 };

 Clock.prototype.checkInputsValue = function(){
     var flag = false;
     if(this.minutesInput.value != '0' || this.secondsInput.value != '0') flag = true;

     if(this.minutesInput.value == ""){
         flag = false;
         this.minutesInput.style.backgroundColor= "#F7BCBC";
     }else this.minutesInput.style.backgroundColor= "#FFF";

     if(this.secondsInput.value == ""){
         this.secondsInput.style.backgroundColor= "#F7BCBC";
         flag = false;
     }else this.secondsInput.style.backgroundColor= "#FFF";
     return flag;
 };

 Clock.prototype.stop = function() {
     this.area.style.backgroundColor = "#CC6666";
     clearInterval(this.timer);
     this.stopPlayAudio();
 };

 Clock.prototype.reset = function() {
     this.area.style.backgroundColor = "#555555";
     clearInterval(this.timer);
     this.area.textContent = '00 : 00';
     this.minutesInput.value = '0';
     this.secondsInput.value = '0';
     this.minutesInput.style.backgroundColor= "#FFF";
     this.secondsInput.style.backgroundColor= "#FFF";
     this.stopPlayAudio();
 };

 Clock.prototype.start = function() {
     if(this.checkInputsValue()) {
         this.loadInputsVal();
         if (this.minutes >= 0 && this.seconds >= 0) {
             this.stop();
             this.area.style.backgroundColor = "#55AA7D";
             var self = this;
             this.timer = setInterval(function () {
                 self.render();
             }, 1000);
         }
     }
 };

 Clock.prototype.playAudio = function(){
     this.audio.src = 'run.mp3';
     this.audio.autoplay = true;
 };

 Clock.prototype.stopPlayAudio = function(){
     this.audio.pause();
 };

 Clock.prototype.changeClockOnChangeInput = function (){
     this.loadInputsVal();
     var min = this.addZero(this.minutes);
     var sec = this.addZero(this.seconds);
     this.area.textContent = min + " : " + sec;
 };

 Clock.prototype.addZero = function (number) {
    if(number < 10) {
        return "0" + number;
    } else return number;
 };

 //Clock.prototype.checkInputs = function

 var clock = new Clock();

 start.onclick = function(){
     clock.start();
 };

 reset.onclick = function(){
     clock.reset();
 };

 minutes.oninput = function(){
     clock.changeClockOnChangeInput();
 };

 seconds.oninput = function(){
     clock.changeClockOnChangeInput();
 };


