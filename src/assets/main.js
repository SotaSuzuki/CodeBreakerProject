let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
  let input = document.getElementById('user-guess');

  if (answer.value === '' || attempt.value === '') {
    setHiddenFields();
  }
  if (!validateInput(input.value)) {
    input.select();
    return false;
  }
  attempt.value++;

  if (getResults(input)) {
    setMessage('You win! :)');
    showAnswer(true);
    showReplay();
    return;
  }
  if (attempt.value > 10) {
    setMessage('You lose.');
    showAnswer(false);
    showReplay();
    return;
  }
  setMessage('Incorrect, try again.');
  input.value = '';
  input.focus();
  return;
}


function setHiddenFields () {
  attempt.value = 0;
  answer.value = Math.floor(Math.random() * 10000).toString();
  while (answer.value.length < 4) {
    answer.value = '0' + answer.value;
  }
}


function setMessage (message) {
  document.getElementById('message').innerHTML = message;
}


function validateInput (input) {
  if (input.length === 4) {
    return true;
  }
  setMessage('Guesses must be exactly 4 characters long.');
  return false;
}


function getResults (input) {
  let correctCount = 0;
  let html = '';
  let inputValue = input.value;

  html += '<div class="row"><span class="col-md-6">' + inputValue + '</span><span class="col-md-6">';
  for (let j = 0, y = inputValue.length; j < y; j++) {
    if (inputValue[j] === answer.value[j]) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
      correctCount++;
    } else if (answer.value.indexOf(inputValue[j]) > -1) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  html += '</span></div>';
  document.getElementById('results').innerHTML += html;
  if (correctCount === inputValue.length) {
    return true;
  } else {
    return false;
  }
}


function showAnswer (userWin) {
  let answerElm = document.getElementById('code');
  answerElm.innerHTML = `<strong>${answer.value}</strong>`;
  if (userWin) {
    answerElm.classList.add('success');
  } else {
    answerElm.classList.add('failure');
  }
}


function showReplay () {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
