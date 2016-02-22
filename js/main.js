 function Clock() {
     this.area = document.getElementById('clock');
     this.audio = new Audio();
     this.minutesInput = document.getElementById('minutes');
     this.secondsInput = document.getElementById('seconds');
     this.alert = document.createElement('div');
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
     var minutesStr = this.minutesInput.value.match(/\d/g);
     var secondsStr = this.secondsInput.value.match(/\d/g);

     if(this.minutesInput.value.match(/\D/g) !== null){
         this.minutesInput.value = "00";
         flag = false;
     }

     if(this.secondsInput.value.match(/\D/g) !== null) {
         this.secondsInput.value = "00";
         flag = false;
     }

     if (minutesStr !== null&& minutesStr.length == 2 && minutesStr[0] == "0" && minutesStr[1] == "0") {
         flag = false;
     }
     if (secondsStr !== null && secondsStr.length == 2 && secondsStr[0] == "0" && secondsStr[1] == "0") {
         flag = false;
     }

     if(this.minutesInput.value !== '00' || this.secondsInput.value !== '00') flag = true;

     if(this.minutesInput.value == ""){
         flag = false;
     }else this.minutesInput.style.backgroundColor= "#FFF";

     if(this.secondsInput.value == ""){
         flag = false;
     }else this.secondsInput.style.backgroundColor= "#FFF";

     if(this.minutesInput.value > 999){
         flag = false;
     }else if ( this.secondsInput.value > 59){
         flag = false;
     }

     if(flag == false){
        this.alert.className = "alert";
        this.alert.innerHTML = "Please enter only <strong>integer numbers</strong> in inputs. <br>For minutes values 0-999, for seconds 0-59";
        document.body.appendChild(this.alert);
     }else if(document.body.contains(this.alert))this.alert.parentNode.removeChild(this.alert);

     return flag;
 };

 Clock.prototype.stop = function() {
     this.area.style.backgroundColor = "#CC6666";
     clearInterval(this.timer);
     this.stopPlayAudio();
 };

 Clock.prototype.reset = function() {
     if(document.body.contains(this.alert))this.alert.parentNode.removeChild(this.alert);
     this.area.style.backgroundColor = "#555555";
     clearInterval(this.timer);
     this.area.textContent = '00 : 00';
     this.minutesInput.value = '00';
     this.secondsInput.value = '00';
     this.minutesInput.style.backgroundColor= "#FFF";
     this.secondsInput.style.backgroundColor= "#FFF";
     this.stopPlayAudio();
 };

 Clock.prototype.start = function() {
     if(this.checkInputsValue()) {
         this.changeClockValue();
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

 Clock.prototype.changeClockValue = function (){
     this.loadInputsVal();
     var min = this.addZero(this.minutes);
     var sec = this.addZero(this.seconds);
     this.minutesInput.value = min;
     this.secondsInput.value = sec;
     this.area.textContent = min + " : " + sec;
     this.minutesInput.style.backgroundColor= "#FFF";
     this.secondsInput.style.backgroundColor= "#FFF";
 };

 Clock.prototype.addZero = function (number) {
    var strNumber = number.toString().match(/\d/g);
    if(strNumber !== null) {
        if (strNumber.length == 1) {
            return "0" + number;
        } else if (strNumber.length == 3 && strNumber[0] == "0") {
            return strNumber[1] + strNumber[2];
        } else if(strNumber.length == 4 && strNumber[0] == "0"){
            return strNumber[1] + strNumber[2] + strNumber[3];
        }else return number;
    }
 };

 var clock = new Clock();

 start.onclick = function(){
     clock.start();
 };

 reset.onclick = function(){
     clock.reset();
 };

 minutes.oninput = function(){
     if(clock.checkInputsValue()) clock.changeClockValue();
 };

 seconds.oninput = function(){
     if(clock.checkInputsValue()) clock.changeClockValue();
 };


