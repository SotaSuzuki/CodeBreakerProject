let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;

function guess() {
  let input = document.getElementById('user-guess');

  if (answer === '' || attempt === '') {
    setHiddenFields();
  }
  if (!validateInput(input.value)) {
    input.select();
    return false;
  }
  attempt++;

  if (getResults(input)) {
    setMessage('You win! :)');
    showAnswer(true);
    showReply();
    return;
  }
  if (attempt > 10) {
    setMessage('You lose.');
    showAnswer(false);
    showReply();
    return;
  }
  setMessage('Incorrect, try again.');
  input.value = '';
  input.focus();
  return;
}


function setHiddenFields () {
  attempt = 0;
  answer = Math.floor(Math.random() * 9999).toString();
  while (answer.length < 4) {
    answer = '0' + answer;
  }
  console.log(answer);
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
    if (inputValue[j] === answer[j]) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
      correctCount++;
    } else if (answer.indexOf(inputValue[j]) > -1) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  html += '</span></div>';
  document.getElementById('results').innerHTML += html;
  if (correctCount === 4) {
    return true;
  }
  return false;
}


function showAnswer (userWin) {
  let answerElm = document.getElementById('code');
  answerElm.innerHTML = `<strong>${answer}</strong>`;
  if (userWin) {
    answerElm.classList.add('success');
  } else {
    answerElm.classList.add('failure');
  }
}


function showReply () {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
