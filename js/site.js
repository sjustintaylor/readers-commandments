$(document).ready(function() {
  // Load the stored list, and clear the input field.
  loadList()
  $('.task-controls input').val('');

  // Set event trigger for toggling the task's status
  $('main').on('click', '.task', function(){
    toggleTask(this.getAttribute('id'))
  })
  // Set event trigger for deleting the task
  $('main').on('click', '.task > .remove', function(){
    removeTask(this.parentNode.getAttribute('id'))
  })

  // Set the event trigger for adding a new task
  $('.task-controls button').on('click', function() {
    var taskID = generateID()
    addTask($('.task-controls input').val(), taskID)
    $('.task-controls input').val('')
  })
})



function loadList() {
  // Loads the contents of the list object from localStorage.
  // Checks to see if 'list' object exists in local storage.
  //Also sets up hammer listeners for stored ids
  if (localStorage.getItem('list') == undefined || localStorage.getItem('list') == '') {
    addTask('Go on an adventure...', generateID())
  } else {
    $("main").html(localStorage.getItem('list'))
  }
}


function saveList() {
  if($("main").html() === '      '){
    localStorage.setItem('list', '')
  } else {
    localStorage.setItem('list', $("main").html())
  }
}

function addTask(taskDescription, taskID) {
  if (taskDescription == '') {
    alert("Enter a task, crapsack")
  } else {
    $("main").append('<p class="task" id="' + taskID + '">' + taskDescription + '<i class="material-icons remove">remove</i>' + '</p>')
    saveList()
  }
}

function generateID() {
  return Date.now()
}

function removeTask(taskID) {
  $("#" + taskID).remove()
  saveList()
}

function toggleTask(taskID) {
  // Use a switch statement to check the current status. Then invert it.
  // Checked is just struck through text
  switch ($('html #' + taskID).css("text-decoration")) {
    case 'none solid rgb(0, 0, 0)':
      $('#' + taskID).css("text-decoration", 'line-through');
      break;
    case 'line-through solid rgb(0, 0, 0)':
      $('#' + taskID).css("text-decoration", 'none');
      break;
    case 'none':
      $('#' + taskID).css("text-decoration", 'line-through');
      break;
    case 'line-through':
      $('#' + taskID).css("text-decoration", 'none');
      break;
  }
  saveList()
}
