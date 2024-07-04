// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var i = 0; i < myNodelist.length; i++) {
  addCloseAndEditButtons(myNodelist[i]);
}

// Add close, edit, and save buttons to a list item
function addCloseAndEditButtons(listItem) {
  // Remove any existing buttons to avoid duplication
  removeExistingButtons(listItem);

  var spanClose = document.createElement("SPAN");
  var txtClose = document.createTextNode("\u00D7");
  spanClose.className = "close";
  spanClose.appendChild(txtClose);
  spanClose.onclick = function() {
    removeElement(this);
  };
  listItem.appendChild(spanClose);

  var spanEdit = document.createElement("SPAN");
  var txtEdit = document.createTextNode("✎");
  spanEdit.className = "editBtn";
  spanEdit.style.marginLeft = "10px";
  spanEdit.style.cursor = "pointer";
  spanEdit.appendChild(txtEdit);
  spanEdit.onclick = function() {
    editElement(this);
  };
  listItem.appendChild(spanEdit);

  var spanSave = document.createElement("SPAN");
  var txtSave = document.createTextNode("Save");
  spanSave.className = "saveBtn";
  spanSave.style.marginLeft = "10px";
  spanSave.style.cursor = "pointer";
  spanSave.style.display = "none";
  spanSave.appendChild(txtSave);
  spanSave.onclick = function() {
    saveElement(this);
  };
  listItem.appendChild(spanSave);
}

// Remove existing buttons to avoid duplication
function removeExistingButtons(listItem) {
  var existingButtons = listItem.querySelectorAll('.close, .editBtn, .saveBtn');
  for (var i = 0; i < existingButtons.length; i++) {
    listItem.removeChild(existingButtons[i]);
  }
}

// Click on a close button to hide the current list item
function removeElement(el) {
  var div = el.parentElement;
  div.style.display = "none";
}

// Click on an edit button to enable editing
function editElement(el) {
  var listItem = el.parentElement;
  var textNode = listItem.childNodes[0];
  var editBtn = listItem.querySelector('.editBtn');
  var saveBtn = listItem.querySelector('.saveBtn');

  // Hide edit button and show save button
  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";

  // Replace text with input field for editing
  var input = document.createElement("input");
  input.type = "text";
  input.value = textNode.textContent.trim();
  input.className = "editInput";
  listItem.insertBefore(input, textNode);
  textNode.style.display = "none";
}

// Click on a save button to save edited content
function saveElement(el) {
  var listItem = el.parentElement;
  var input = listItem.querySelector('.editInput');
  var textNode = listItem.childNodes[0];
  var editBtn = listItem.querySelector('.editBtn');
  var saveBtn = listItem.querySelector('.saveBtn');

  // Update text with edited value
  textNode.textContent = input.value;
  listItem.removeChild(input);
  textNode.style.display = "inline-block";

  // Show edit button and hide save button
  editBtn.style.display = "inline-block";
  saveBtn.style.display = "none";
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("กรุณากรอกข้อมูลก่อน!");
  } else {
    document.getElementById("myUL").appendChild(li);
    addCloseAndEditButtons(li);
  }

  document.getElementById("myInput").value = "";
}
