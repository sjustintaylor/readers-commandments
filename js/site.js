$(document).ready(function() {
  loadList()

  $('.task-controls input').val('')
  $('.task-controls button').on('click', function() {
    var taskID = generateID()
    addTask($('.task-controls input').val(), taskID)
    $('.task-controls input').val('')


    // All the hammer events need to be moved out of this function, and added to a function that also processes the tasks loaded in by loadList
    $('#' + taskID).hammer().bind("swipeleft swiperight", function(ev) {
      $('#' + taskID).fadeOut("fast", function(){
        removeTask(taskID)
      })
      // removeTask(taskID)

    });
    $('#' + taskID).hammer().bind("tap press", function(ev) {
      toggleTask(taskID)
    });
  })
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
  localStorage.setItem('listID', listID)
}

function addTask(taskDescription, taskID) {
  if (taskDescription == '') {
    alert("no task entered, crapsack")
  } else {
    $("main").append('<p class="task" id="' + taskID + '">' + taskDescription + '</p>')
    appendID(taskID)
    saveList()
  }
}

function generateID() {
  return Date.now()
}

function removeTask(taskID) {
  $("#" + taskID).remove()
}

function toggleTask(taskID) {
  // Use a switch statement to check the current status. Then invert it.
  // Checked is just struck through text
  console.log($("#" + taskID).css("text-decoration"))
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
}

function clearList() {
  localStorage.setItem('list', '')
  $("main").html('')
}
