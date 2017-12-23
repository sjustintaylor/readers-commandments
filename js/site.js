$(document).ready(function() {

})

function loadList() {
  // Loads the contents of the list object from localStorage.
  // Checks to see if 'list' object exists in local storage.
  if (localStorage.getItem('list') == undefined) {
    addTask('Go on an adventure...')
  } else {
    $("main").html(localStorage.getItem('list'))
  }

}

function saveList() {
  // Because I'm a lazy fuck, this function basically saves the entire html contents of the main tag to local storage.
  localStorage.setItem('list', $("main").html())
}

function addTask(taskDescription) {
  $("main").append('<p class="task" id=""' + generateID() + '">' + taskDescription + '</p>')
  saveList()
}

function generateID() {
  return Date.now()
}

function removeTask(taskID) {
  $("#"+taskID).remove()
}

function toggleTask(taskID) {
  // Use a switch statement to check the current status. Then invert it.
  // Checked is just struck through text
  switch ($("#"+taskID).css("text-decoration")) {
    case 'none solid rgb(0, 0, 0)':
      $("#"+taskID).css("text-decoration", 'line-through');
      break;
    case 'line-through solid rgb(0, 0, 0)':
      $("#"+taskID).css("text-decoration", 'none');
      break;
    default:
      $("#"+taskID).css("text-decoration", 'underline');
  }
}
