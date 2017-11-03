// Needs persistent storage added in. An array or object with array and functions.
var list = {}
$(document).ready(function() {
  // Load the list from localStorage
  loadList()

  $('#add-task').on('click', function() {
    // Call the add task function with the value of the input and the target list
    addTask($('#task-description-input').val(), 'task-list')

    // Clear the contents of the input
    $('#task-description-input').val('')
    // Save the list to localStorage
    saveList(list)
  })
  $(document).on('click', '.check-task', function() {
    toggleStatus($(this).parent()[0].id)
    // Save the list to localStorage
    saveList(list)
  })
  $(document).on('click', '.remove-task', function() {
    removeTask($(this).parent()[0].id)
    // Save the list to localStorage
    saveList(list)
  })
})

function saveList(todoList){
  // select the ids from the html code, save them individually to localStorage
  localStorage.clear()

  for (var listItem in list) {
    if (typeof (list[listItem]) !== "function") {
      var value = list[listItem][0] + '|' + String(list[listItem][1])
      localStorage.setItem(listItem, value)
    }
  }
}

function loadList() {
  // Load the local storage list into a local list object
  // #rewrite
  // Check localStorage for an existing list, exit if nothing found.
  // If a list exists, call addTask for each item.

  // var tempList = {}
  // for (var i = 0; i < localStorage.length; i++) {
  //   var key = localStorage.key(i)
  //   var value = localStorage.getItem(key).split('|')
  //   tempList[key] = value
  // }
  // localStorage.clear()
  //
  // // Doesn't deal with check status.
  // for (var listItem in tempList) {
  //   var id = Date.now()
  //   console.log(tempList[listItem][0])
  //   addTask(tempList[listItem][0], id)
  //   if (tempList[listItem][1] === true) {
  //     toggleStatus(id)
  //   }
  // }
}

function toggleStatus(taskID) {
  // Takes a task id (html id) and toggles the checked off status of the task (checkbox, crossout), adjusting the html accordingly.

  // true = crossed off, false = unchecked
  if ($("#" + taskID + " i.check-task-icon").html() === 'check_box_outline_blank') {
    $("#" + taskID + " i.check-task-icon").html('check_box_outline')
    $("#" + taskID + " .task-description").css('text-decoration', 'line-through')
    // #rewrite this
    updateList(taskID, undefined, true)
  } else {
    $("#" + taskID + " i.check-task-icon").html('check_box_outline_blank')
    $("#" + taskID + " .task-description").css('text-decoration', 'none')
    // #rewrite this
    updateList(taskID, undefined, false)
  }

}

function removeTask(taskID) {
  // Takes a task id and removes that task, adjusting the html accordingly.
  $('#' + taskID).remove()
  delete list[taskID]

}

function addTask (taskID, taskDescription, taskStatus) {
  // Takes a task description and creates a new task at the top of the list. Generates a unique id, and inserts the task.
  if (taskDescription === '') {
    alert('No task description entered')
    return false
  }

  // Generate ID
  if (taskID === undefined) {
    var taskID = Date.now()
  }

  // Update the list object
  updateList(taskID, taskDescription, taskStatus)

  // Build the html to be inserted
  var taskHTML = '<div class="task" id="' + taskID + '"> <span class="check-task"> <i class="material-icons check-task-icon">check_box_outline_blank</i> </span> <p class="task-description">' + taskDescription + '</p> <span class="remove-task"> <i class="material-icons remove-task-icon">close</i> </span> </div>'

  // Insert the generated HTML into the specified list
  $('#task-list').append(taskHTML)

  // Process the task status. Probably need to rewrite this so it happens before inserting the html. Do that by modifying the way taskHTML is constructed
  if (taskStatus === true) {
    toggleStatus(taskID)
  }
}

function updateList (taskID, taskDescription, taskStatus) {
  if (list[taskID] === undefined) {
    list[taskID] = [taskDescription, taskStatus]
  }
  if (taskDescription !== undefined) {
    list[taskID][0] = taskDescription
  }
  if (taskStatus !== undefined) {
    list[taskID][1] = taskStatus
  }
}
