const mainArray = ["url(חנוכיה.png)", "url(כד.png)", "url(נר.png)", "url(סביבון.png)", "url(סופגניה.png)", "url(סופגניה2.png)", "url(חנוכיה4.png)", "url(חנוכיה2.png)", "url(חנוכיה3.png)", "url(ילדים.png)", "url(כד2.png)", "url(מטבעות.png)", "url(סביבון2.png)", "url(שיר.png)", "url(סופגניה3.png)"];
function createCard(num) {
  let arrayAfterShuffling = shuffle((mainArray.slice(0, (num / 2))).concat(shuffle(mainArray.slice(0, (num / 2)))));
  console.log(arrayAfterShuffling);
  const board = document.getElementsByClassName("board")[0];
  board.innerHTML = ''; // מוחק את כל התוכן שבתוך הלוח
  for (let i = 0; i < num; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.value = arrayAfterShuffling[i];
    board.appendChild(card);
    card.onclick = frontCard;
  }
}

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

function handleLevelChange(value) {
  if (value === "30") {
    const board = document.getElementsByClassName("board")[0];
    board.classList.toggle("board30");
    board.classList.remove("board20")
    board.classList.remove("board10")
    document.getElementById("myElement").style.display = "none"
    document.getElementById("Element").style.display = "none"
    createCard(30);
    document.getElementById("audio2").play()
    clearInterval(interval);
    countdown(60);
  }
  else if (value === "20") {
    const board = document.getElementsByClassName("board")[0];
    board.classList.toggle("board20");
    board.classList.remove("board30")
    board.classList.remove("board10")
    document.getElementById("myElement").style.display = "none"
    document.getElementById("Element").style.display = "none"
    createCard(20);
    document.getElementById("audio2").play()
    clearInterval(interval);
    countdown(60);
  }
  else if (value === "10") {
    const board = document.getElementsByClassName("board")[0];
    board.classList.toggle("board10");
    board.classList.remove("board20")
    board.classList.remove("board30")
    document.getElementById("myElement").style.display = "none"
    document.getElementById("Element").style.display = "none"
    createCard(10);
    document.getElementById("audio2").play()
    clearInterval(interval);
    countdown(60);
  }
  else {
    createCard(0);
  }
}

let tor = []

function openingTwoCards(arrElement, e) {
  arrElement.push(e.target.style.background);

  if (arrElement.length === 2) {
    if (arrElement[0] === arrElement[1]) {
      ifCouple(arrElement);
    } else {
      ifNOTCouple(arrElement);
    }
    resetArray(arrElement);
    console.log(arrElement);
  }
  if (document.getElementsByClassName('frontCard').length == 2) {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => {
      card.style.pointerEvents = "none";
    });
  }
  setTimeout(function () {
    const cards = document.getElementsByClassName('card');
    Array.from(cards).forEach(card => {
      card.style.pointerEvents = "";
    });
  }, 1700)
  checkWin();
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
  document.getElementById("audio").play()
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
  }, 1000)
}

function checkWin() {
  if (document.getElementsByClassName('finding').length == document.getElementsByClassName('card').length) {
    document.getElementById("myElement").style.display = "block";
    document.getElementById("Element").style.display = "none"
    document.getElementById("audio3").play()
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
  clearInterval(interval);
  countdown(60)
}
let interval;
function countdown(num) {
  let timerElement = document.getElementById("time")
  let timerCount = num
  interval = setInterval(() => {
    --timerCount;
    if (timerCount >= 10 && timerCount < 60) {
      timerElement.innerText = '0:' + timerCount
    }
    else if (timerCount > 0) {
      timerElement.innerText = '0:0' + timerCount
    }
    else {
      timerElement.innerText = '0:00'
      clearInterval(interval)
      document.getElementById("Element").style.display = "block";
      document.getElementById("audio2").pause()
      document.getElementById("audio4").play()
    }
  }, 1000);
}