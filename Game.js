const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const families = ['clubs', 'diamonds', 'hearts', 'spades']
var Num_Cards = 0;
var Cards = [];
var pairing = [];
var paired = [];
var Num_paired = paired.length;
var diff = [];
var firstclick=[];


function shuffle (src){
  const copy = [...src];

  const length = copy.length;
  for(let i = 0; i < length; i++){
    const x = copy[i];
    const y = Math.floor(Math.random()*length);
    const z = copy[y];
    copy[i] = z;
    copy[y] = x;
  }

  if(typeof src === 'string'){
    return copy.join('');
  }

  return copy;
}

function CardPick(Num_Cards){
  var shuf_ranks = [];
  var shuf_families = [];
  for(let i = 0; i < Num_Cards; i = i + 2){
    shuf_ranks = shuffle(ranks);
    shuf_families = shuffle(families);
    var index1 = [shuf_ranks[0], shuf_families[0]];
    Cards[i] = index1.join(' ');
    Cards[i+1] = index1.join(' ');
  }
};

function GameStart(){

  if(document.title === "Easy"){
    Num_Cards = 4;
  }else if(document.title === "Normal"){
    Num_Cards = 8;
  }else if(document.title === "Hard"){
    Num_Cards = 16;
  }else{
    alert("Wrong Page!")
    document.write("<a href=\"index.html\">Back to Home Page</a>")
  }

  CardPick(Num_Cards);
  var html = [];
  var Game_Cards = shuffle(Cards);

  for(let i = 0; i < Game_Cards.length; i++){
    var index2 = Game_Cards[i].split(' ');
    html.push("<div class=\"card flipped\">");
    html.push("<div class=\"card__inner\">");
    html.push("<div class=\"card__front\">");
    html.push("<div class=\"number "+index2[1]+"\">"+index2[0]+"</div>");
    html.push("<div class=\"suit\"><img src=\"images/"+index2[1]+".png\"></div>");
    html.push("<div class=\"number "+index2[1]+"\">"+index2[0]+"</div>");
    html.push("</div>");
    html.push("<div class=\"card__back\"><p hidden>|"+Game_Cards[i]+"|</p></div>");
    html.push("</div>");
    html.push("</div>");
  }

  var Allcards = html.join('');
  document.getElementById("deck").innerHTML += Allcards;

  document.getElementById("deck").addEventListener('click', function(e){

    var info = e.target.innerHTML;
    var clicked = info.split(/[||]/)[1];

    if(clicked != null){
        pairing.push(clicked);
    }

    if(pairing.length === 2){
        document.getElementById("deck").classList.toggle("unclickable")
        setTimeout(() => {
            document.getElementById("deck").classList.toggle("unclickable")
        }, 1500);
        if(pairing[0] === pairing[1]){
            Num_paired+=2;
            paired.push(pairing[0]);
            paired.push(pairing[1]);
            pairing = [];
            firstclick = [];
            if(Num_paired === Num_Cards){
                setTimeout(() => {
                    alert("You win!!!")
                    document.onload(location.replace("index.html"))
                }, 1000);
            }
        }else{
            setTimeout(() => {
                firstclick.toggle("flipped");
                e.target.closest(".card").classList.toggle("flipped");
                pairing = [];
            }, 1000);
        }
    }else{
        if(e.target.classList != "deck"){
            firstclick = e.target.closest(".card").classList;
        }
    }

    if(e.target != null&&e.target.closest(".card") != null&&e.target.closest(".card").classList != null
        && e.target.closest(".card").classList != "card"){
        e.target.closest(".card").classList.toggle("flipped")
    }

  })

}