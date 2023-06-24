document.addEventListener("DOMContentLoaded", function() {
  var todoList = document.getElementById("todoList");
  var newItemInput = document.getElementById("newItemInput");
  var addButton = document.getElementById("addButton");

  addButton.addEventListener("click", addItem);
  newItemInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      addItem();
    }
  });

  function addItem() {
    var newItemText = newItemInput.value.trim();
    if (newItemText !== "") {
      var newItem = createNewItem(newItemText);
      todoList.appendChild(newItem);
      newItemInput.value = "";
      saveItems();
    }
  }

  function createNewItem(itemText, isChecked) {
    var listItem = document.createElement("li");
    var itemCheckbox = document.createElement("input");
    itemCheckbox.type = "checkbox";
    itemCheckbox.checked = isChecked || false;

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = itemText;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
      listItem.remove();
      saveItems();
    });

    listItem.appendChild(itemCheckbox);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);

    itemCheckbox.addEventListener("change", function() {
      listItem.classList.toggle("done", itemCheckbox.checked);
      saveItems();
    });

    return listItem;
  }

  function toggleEditState(listItem, editInput) {
    var isEditing = listItem.classList.toggle("editing");

    if (isEditing) {
      editInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          toggleEditState(listItem, editInput);
          saveItems();
        }
      });
      editInput.focus();
    } else {
      saveItems();
    }
  }

  function saveItems() {
    var items = [];
    var listItems = todoList.getElementsByTagName("li");
    for (var i = 0; i < listItems.length; i++) {
      var listItem = listItems[i];
      var itemCheckbox = listItem.getElementsByTagName("input")[0];
      var itemText = listItem.getElementsByClassName("edit-input")[0].value.trim();
      var isChecked = itemCheckbox.checked;
      items.push({ text: itemText, checked: isChecked });
    }
    localStorage.setItem("todoItems", JSON.stringify(items));
  }

  function loadItems() {
    var savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
      var items = JSON.parse(savedItems);
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var newItem = createNewItem(item.text, item.checked);
        todoList.appendChild(newItem);
      }
    }
  }

  loadItems();
});
