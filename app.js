let kittens = []
loadKittens()

function addKitten(event) {
  event.preventDefault()

  let form = event.target
  let name = form.name.value
  let id = generateId()
  let mood = "tolerant"
  let affection = 5

let newCat = {id: id,name: name,mood: mood,affection: affection}

let currentCat = kittens.find(kitten => kitten.name == newCat.name)

if(currentCat){
  alert("You can't have the same cat more than once")}
else{
  kittens.push(newCat)
  saveKittens()
  
  console.log(kittens)

  form.reset()
getStarted()
}
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}
function loadKittens() {
  let KittensData = JSON.parse(window.localStorage.getItem("kittens"))

  if(KittensData){
    kittens = KittensData
  }
  let num = kittens.length
  document.getElementById("num").innerHTML = num.toString()
}

function drawKittens() {

  let template = ""
  
  kittens.forEach(kitten => {


if(kitten.mood == "gone"){
  template += 
  `
  <div class="card bg-dark text-light p-2 m-2 kitten ${kitten.mood}">
  <img src="https://robohash.org/<${kitten.name}>?set=set4" alt="${kitten.name}.img" class="kitten">
 <div class="d-flex space-between text-light kitten ${kitten.mood}">
   <p>
     <span ><b>Name:</b> 
     ${kitten.name}
     </span>
   </p>
 </div>
  <div class="d-flex space-between kitten gone">
  <span><b>Gone Ran Away</b></span>
  </div>
  </div>
  `
}
else{
  template += 
  `
<div class="card bg-dark text-light p-2 m-2 kitten ${kitten.mood}">
<img src="https://robohash.org/<${kitten.name}>?set=set4" alt="${kitten.name}.img" class="kitten">
<div class="d-flex space-between text-light kitten ${kitten.mood}">
 <p>
   <span ><b>Name:</b> 
   ${kitten.name}
   </span>
 </p>
</div>
    <div class="d-flex space-between text-light">
      <p>
        <span><b>Mood:</b> 
        ${kitten.mood}
        </span>
      </p>
    </div>
    <div class="d-flex space-between text-light">
      <p>
        <span><b>Affection:</b> 
        ${kitten.affection}
        </span>
      </p>
      </div>
      <div class="d-flex space-between"> 
      <span><button class="btn-cancel m-3" type="button" onclick="pet('${kitten.id}')">Pet</button>
      </span>
      <span class=""><button class="primary-lighten" type="button" onclick="catnip('${kitten.id}')">Catnip</button>
      </span>
      </div>
  </div>
  `
}
});
document.getElementById("kittens").innerHTML = template
}

function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function pet(id) {
  let currentKitten = findKittenById(id)
  
  if(Math.random()>.7){
currentKitten.affection++
  }
  else{
    currentKitten.affection--
  }
setKittenMood(currentKitten)
  saveKittens()
}

function catnip(id) {
  let currentKitten = findKittenById(id)

  currentKitten.mood = "tolerant"
  currentKitten.affection = 5

  saveKittens()
}

function setKittenMood(kitten) {
  let km = kitten.affection

  if(km <= 0){
kitten.mood = "gone"
  }
  else if(km <= 3){
    kitten.mood = "angry"
  } 
  else if(km <= 5){
    kitten.mood = "tolerant"
  }
  else if(km > 6){
    kitten.mood = "happy"
  }
  else{
    console.log("mood error")
  }
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("kittens").classList.remove("hidden")
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function clearKittens(){
localStorage.removeItem("kittens")
location.reload()
}

drawKittens()