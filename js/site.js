$(document).ready(function() {
  $('#add-task').on('click', function() {
    // Call the add task function with the value of the input and the target list
    addTask($('#task-description-input').val(), 'task-list')

    // Clear the contents of the input
    $('#task-description-input').val('')
  })
  $(document).on('click', '.check-task', function(){
    var parentID = $(this).parent()[0].id
    toggleCheckTask(parentID)
  })
  $(document).on('click', '.remove-task', function(){
    var parentID = $(this).parent()[0].id
    removeTask(parentID)
  })
});

function toggleCheckTask(taskID, listID) {
  // Takes a task id (html id) and toggles the checked off status of the task (checkbox, crossout), adjusting the html accordingly.
  if ($("#" + taskID + " i.check-task-icon").html() === 'check_box_outline_blank') {
    $("#" + taskID + " i.check-task-icon").html('check_box_outline')
    $("#" + taskID + " .task-description").css('text-decoration', 'line-through')
  } else {
    $("#" + taskID + " i.check-task-icon").html('check_box_outline_blank')
    $("#" + taskID + " .task-description").css('text-decoration', 'none')
  }

}

function removeTask(taskID, listID) {
  // Takes a task id and removes that task, adjusting the html accordingly.
  $('#' + taskID).remove()
}

function addTask(taskDescription, listID) {
  // Takes a task description and creates a new task at the top of the list. Generates a unique id, and inserts the task.
  if (taskDescription === '') {
    alert('No task description entered')
    return false
  }

  // Generate ID
  var taskID = Date.now()

  // Build the html to be inserted
  var taskHTML = '<div class="task" id="' + taskID + '"> <span class="check-task"> <i class="material-icons check-task-icon">check_box_outline_blank</i> </span> <p class="task-description">' + taskDescription + '</p> <span class="remove-task"> <i class="material-icons remove-task-icon">close</i> </span> </div>'

  // Insert the generated HTML into the specified list
  $('#' + listID).append(taskHTML)
}
