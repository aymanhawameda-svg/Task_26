const secretCode = Math.floor(Math.random() * 20) + 1; //
let remainingAttempts = 5;
const secretPassword = "12345678";

const codeGuessInput = document.getElementById("codeGuessInput");
const btnCheckCode = document.getElementById("btnCheckCode");
const msgTask1 = document.getElementById("msgTask1");
const attemptsText = document.getElementById("attemptsText");

const passwordInput = document.getElementById("passwordInput");
const btnCheckPassword = document.getElementById("btnCheckPassword");
const msgTask2 = document.getElementById("msgTask2");

const sequenceInput = document.getElementById("sequenceInput");
const btnStartSequence = document.getElementById("btnStartSequence");
const seqOutput = document.getElementById("seqOutput");
const msgTask3 = document.getElementById("msgTask3");

const task2Card = document.getElementById("task2");
const task3Card = document.getElementById("task3");
const winScreen = document.getElementById("winScreen");
const mainContainer = document.getElementById("mainContainer");
const statusText = document.getElementById("statusText");

function checkCode() {
  const userGuess = Number(codeGuessInput.value);

  if (!userGuess || userGuess < 1 || userGuess > 20) {
    msgTask1.textContent = "Bitte eine Zahl zwischen 1 und 20 eingeben!";
    msgTask1.className = "message error";
    return;
  }

  if (userGuess === secretCode) {
    msgTask1.textContent = "Richtig! Zugangscode geknackt.";
    msgTask1.className = "message";
    btnCheckCode.disabled = true;
    codeGuessInput.disabled = true;
    unlockTask2();
  } else {
    remainingAttempts--;
    attemptsText.textContent = remainingAttempts;

    if (remainingAttempts > 0) {
      if (userGuess < secretCode) {
        msgTask1.textContent = "Falsch! Der gesuchte Code ist GRÖSSER.";
      } else {
        msgTask1.textContent = "Falsch! Der gesuchte Code ist KLEINER.";
      }
      msgTask1.className = "message error";
    } else {
      msgTask1.textContent = "Zugriff verweigert! Keine Versuche mehr.";
      msgTask1.className = "message error";
      btnCheckCode.disabled = true;
      codeGuessInput.disabled = true;
    }
  }
}

function unlockTask2() {
  task2Card.classList.remove("locked");
  task2Card.classList.add("active");
  btnCheckPassword.disabled = false;
}

function checkPassword() {
  const inputVal = passwordInput.value;

  if (inputVal === "") {
    msgTask2.textContent = "Bitte gib ein Passwort ein!";
    msgTask2.className = "message error";
  } else if (inputVal.length < 8) {
    msgTask2.textContent = "Das Passwort muss mindestens 8 Zeichen lang sein!";
    msgTask2.className = "message error";
  } else if (inputVal === secretPassword) {
    msgTask2.textContent = "Passwort korrekt!";
    msgTask2.className = "message";
    btnCheckPassword.disabled = true;
    passwordInput.disabled = true;
    unlockTask3();
  } else {
    msgTask2.textContent = "Falsches Passwort! Zugriff verweigert.";
    msgTask2.className = "message error";
  }
}

function unlockTask3() {
  task3Card.classList.remove("locked");
  task3Card.classList.add("active");
  btnStartSequence.disabled = false;
}

function runSequence() {
  const count = Number(sequenceInput.value);

  if (!count || count < 1 || count > 10) {
    msgTask3.textContent = "Ungültige Eingabe! Bitte Zahl von 1 bis 10 wählen.";
    msgTask3.className = "message error";
    seqOutput.textContent = "";
    return;
  }

  msgTask3.textContent = "Sequenz wird ausgeführt...";
  msgTask3.className = "message";

  let resultText = "";

  for (let i = 1; i <= count; i++) {
    resultText += i + " ";
  }

  seqOutput.textContent = resultText;
  btnStartSequence.disabled = true;
  sequenceInput.disabled = true;

  finishGame();
}

function finishGame() {
  winScreen.classList.remove("hidden");
  mainContainer.classList.add("unlocked");
  statusText.textContent = "SYSTEM UNLOCKED";
  statusText.style.color = "#00ffff";
}

btnCheckCode.addEventListener("click", checkCode);
btnCheckPassword.addEventListener("click", checkPassword);
btnStartSequence.addEventListener("click", runSequence);
