var current_note=null;
var startat=0
var score=0

var myScale = [48, 49, 50, 51, 52, 53, 54]; //MIDI notes
var synth=null
function setup() {
  background(220);

  createCanvas(800, 450);
    template_draw();
  current_note=round(random(15));
  draw_button();
      textSize(32);
      fill(0, 102, 20);
  text('Score : '+score, 330, 30);
  draw_note(current_note)
  
  
  startat=millis();
  synth = new Tone.Synth().toMaster();
  Tone.Transport.start();
}

function template_draw() {
  for (let i=50;i<251;i+=50)
    line(0, i+100, width, i+100);
}

function draw_note(newnote) {
  fill(0);
  circle(width/2,50+25*newnote,50)
  strokeWeight(4);
  line(width/2+25,50+25*newnote,width/2+25,50+25*newnote-75)
    if (newnote>13) 
      line(width/2-40,400,width/2+40,400)
    if (newnote<1) 
      line(width/2-40,50,width/2+40,50)
    if (newnote<3) 
      line(width/2-40,100,width/2+40,100)
  
  //play sound
    
    var pos = newnote;
    var frequency = Tone.Frequency(55-newnote, "midi");
  if (synth)
    synth.triggerAttackRelease(frequency, 0.1);
}

function draw_button() {
  note = ["do","ré","mi","fa","sol","la","si"]
  for (let i=0;i<note.length;i+=1) {
    button = createButton(note[i]);
    button.position(width/2-note.length*50+i*100, 450);
    button.style('font-size:30px');
    button.size(90,60);
    button.mousePressed(() => {check_result(i) });
  }
}

function check_result(note) {
  currenttime=millis()
  console.log("=>"+(note%7)+" "+current_note+" "+(7*(1-int((current_note-1)/7))))
  if (note%7+current_note+7*(1-int((current_note-1)/7))==14)
    {
      textSize(32);
      fill(0, 102, 20);
      text('Gagné', width/2-50, height/2);
      score=score+10;
    }
  else
    {
      textSize(32);
      fill(200, 102, 100);
      text('Perdu', width/2-50, height/2);
      if (score>0)
        score=score-10;
    }
  
    //console.log("Perdu en "+round((currenttime-startat)/1000,2))
  sleep(2000).then(() => { setup() })
}

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function draw() {

}
