const mainArray = ["url(חנוכיה.png)", "url(כד.png)", "url(נר.png)", "url(סביבון.png)", "url(סופגניה.png)"];
let arrayAfterShuffling = shuffle(mainArray.concat(mainArray));
let board = document.getElementsByClassName("board")[0]
function createCard(num) {
  for (i = 0; i <= num; i++) {
    let card = document.createElement("div") //מוסיף div
    card.classList.add("card") // מכניס class="card" לתוך הדיב
    card.value = arrayAfterShuffling[i]
    board.appendChild(card)
    card.onclick = frontCard
  }
}
createCard(9)

function shuffle(shuffleArr) {
  for (i = 0; i < shuffleArr.length * 2; i++) {
    let random1 = Math.floor(Math.random() * shuffleArr.length)
    let random2 = Math.floor(Math.random() * shuffleArr.length)
    let temp = shuffleArr[random1]
    shuffleArr[random1] = shuffleArr[random2]
    shuffleArr[random2] = temp
  }
  return shuffleArr
}

function frontCard(e) {
  e.target.classList.toggle("frontCard");
  if (e.target.style.background == e.target.value) {
    e.target.style.background = "url(כרטיס.png)";
    console.log(e.target.value);
  }
  else {
    e.target.style.background = e.target.value;
    console.log(e.target.value);
  }
  openingTwoCards(tor, e)
}


let tor = []
function openingTwoCards(arrElement, e) {
  arrElement.push(e.target.style.background);
  console.log(arrElement);
  if (arrElement.length == 2) {
    if (arrElement.slice(-2)[0] === arrElement.slice(-2)[1]) {
      ifCouple(arrElement)
    }
    else {
      ifNOTCouple(arrElement)
    }
    resetArray(arrElement);
    console.log(arrElement);
  }
  checkWin()
}

function resetArray(arr) {
  arr.splice(0, arr.length);
}

function ifCouple(arrElement) {
  console.log("❤️");
  const cardElements = document.querySelectorAll('.frontCard');
  cardElements.forEach((cardElement) => {
    cardElement.classList.add("finding");
    cardElement.classList.remove("frontCard");
  })
  console.log(arrElement[0], arrElement[1],);
}

function ifNOTCouple(arrElement) {
  setTimeout(function () {
    const cardElements = document.querySelectorAll('.frontCard');
    cardElements.forEach((cardElement) => {
      cardElement.classList.remove("frontCard");
      cardElement.style.background = "";
      console.log("😒");
      console.log(arrElement);
    })
  }, 1500)
}

function checkWin() {
  if (document.getElementsByClassName('finding').length == 10) {
    document.getElementById("myElement").style.display = "block";
  }
}

function restart() {
  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach((cardElement) => {
    cardElement.classList.remove("finding");
    cardElement.classList.remove("frontCard");
    cardElement.style.background = ""
  })
  document.getElementById("myElement").style.display = "none"
  document.getElementById("Element").style.display = "none"
  countdown(2)
}

function countdown(minutes) {
  let seconds = minutes * 60;
  const endTime = new Date().getTime() + seconds * 1000;
  const interval = setInterval(() => {
    const remainingTime = Math.round((endTime - new Date().getTime()) / 1000);
    let time = document.getElementById("time")
    time.innerText = `הזמן שנותר: ${remainingTime} שניות`;
    if (remainingTime <= 0) {
      clearInterval(interval);
      document.getElementById("Element").style.display = "block";
    }
  }, 1000);
}

countdown(2);