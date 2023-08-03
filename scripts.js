let slNoCounter = 1;
let vehicleSelected = false;
let editedRowIndex = -1;

function selectVehicle(button) {
  const vehicleButtons = document.querySelectorAll('.vehicle-button');
  vehicleButtons.forEach(btn => btn.classList.remove('blink-animation'));
  button.classList.add('blink-animation');
  vehicleSelected = true;
}

function selectApp(appType) {
  document.querySelectorAll('.small-button').forEach(button => button.classList.remove('blink-animation'));
  document.querySelector(`button[data-app="${appType}"]`).classList.add('blink-animation');
}

function selectFun(funType) {
  document.querySelectorAll('.small-button').forEach(button => button.classList.remove('blink-animation'));
  document.querySelector(`button[data-fun="${funType}"]`).classList.add('blink-animation');
}

function displayData() {
  const input1Value = document.getElementById('input1').value;
  const input2Value = document.getElementById('input2').value;
  const displayElement = document.getElementById('previousEntries');
  const invalidSubmitMessage = document.getElementById('invalidSubmitMessage');

  if (!vehicleSelected) {
    invalidSubmitMessage.style.display = 'block';
    return;
  }

  invalidSubmitMessage.style.display = 'none';

  if (editedRowIndex === -1) {
    const entryRow = document.createElement('tr');
    entryRow.innerHTML = `
      <td>${slNoCounter++}</td>
      <td>${document.querySelector('.blink-animation').innerText}</td>
      <td>${input1Value}</td>
      <td>${input2Value}</td>
      <td>${getAppRank()}</td>
      <td>${getFunRank()}</td>
      <td><button class="edit-button" onclick="editRow(this)">Edit</button></td>
      <td><button class="edit-button delete-button" onclick="deleteRow(this)">Delete</button></td>
    `;

    displayElement.querySelector('table').appendChild(entryRow);
  } else {
    const rowToEdit = displayElement.querySelector('table').rows[editedRowIndex];
    rowToEdit.cells[1].innerText = document.querySelector('.blink-animation').innerText;
    rowToEdit.cells[2].innerText = input1Value;
    rowToEdit.cells[3].innerText = input2Value;
    rowToEdit.cells[4].innerText = getAppRank();
    rowToEdit.cells[5].innerText = getFunRank();
    editedRowIndex = -1;
  }

  document.getElementById('input1').value = '';
  document.getElementById('input2').value = '';
  document.querySelectorAll('.small-button').forEach(button => button.classList.remove('blink-animation'));

  displayElement.scrollTop = displayElement.scrollHeight;
}

function editRow(button) {
  const row = button.parentNode.parentNode;
  editedRowIndex = row.rowIndex;
  const vehicleType = row.cells[1].innerText;
  const bodyNo = row.cells[2].innerText;
  const defectType = row.cells[3].innerText;

  const vehicleButtons = document.querySelectorAll('.vehicle-button');
  vehicleButtons.forEach(btn => {
    if (btn.innerText === vehicleType) {
      btn.classList.add('blink-animation');
    } else {
      btn.classList.remove('blink-animation');
    }
  });

  document.getElementById('input1').value = bodyNo;
  document.getElementById('input2').value = defectType;
}

function deleteRow(button) {
  const rowToDelete = button.parentNode.parentNode;
  rowToDelete.remove();
}

function getAppRank() {
  const selectedApp = document.querySelector('.small-button[data-app].blink-animation');
  return selectedApp ? selectedApp.getAttribute('data-app') : '';
}

function getFunRank() {
  const selectedFun = document.querySelector('.small-button[data-fun].blink-animation');
  return selectedFun ? selectedFun.getAttribute('data-fun') : '';
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginContainer = document.querySelector('.login-container');
  const mainContainer = document.querySelector('.container');
  const invalidLoginMessage = document.getElementById('invalidLoginMessage');

  if (username === 'admin' && password === 'password') {
    loginContainer.style.display = 'none';
    mainContainer.style.display = 'flex';
  } else {
    invalidLoginMessage.style.display = 'block';
  }
}

function logout() {
  const loginContainer = document.querySelector('.login-container');
  const mainContainer = document.querySelector('.container');
  const invalidLoginMessage = document.getElementById('invalidLoginMessage');

  loginContainer.style.display = 'flex';
  mainContainer.style.display = 'none';
  invalidLoginMessage.style.display = 'none';
}