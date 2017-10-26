// Implement new day, add item and cross out item
var list = {
  name: 'Justin',
  taskList: {
    // datestamp: [size, 'task description', check status]
    // size is the same as the section ids (big small medium)
    // check status is true or false, true is completed
  },
  // Atomic Methods listed here only operate on this object
  addToTaskList: function (datestamp, size, taskDescription) {
    // Creates a task with the specified properties and adds it to the task list

    this.saveList()
  },
  toggleTaskStatus: function (taskID) {
    // Inverts the check status property of the specified task
    this.saveList()
  },
  clearTaskList: function (transfer) {
    // Clears the task list totally, or just the tasks with check status of true, depending on the value of transfer
    this.saveList()
  },
  setName: function (name) {
    this.name = name // sanitize input?
    this.saveList()
  },
  saveList: function () {
    // Saves this object to local storage. Called at the end of an atomic method.
  }
}

$(document).ready(function() {
  $('.header-title').text('Hello ' + list.name)
  $('#add-task-big').on('click', function () {
    $('#big-drawer').slideToggle("normal");
  })
  $('#big-drawer button').on('click', function() {
    $('#big-drawer').slideToggle("normal");
    var description = $('#big-drawer input').val()
    addTask('#big-tasks', description);
    $('#big-drawer input').val('')
  })
});

function addTask(listID, taskDescription) {
  var id = Date.now();
  var task = '<div class="task-card" id="' + id + '" > <i class="material-icons task-status">check_box_outline_blank</i> <h3 class="task-title">' + taskDescription + '</h3>';
  $(listID).append(task);
  list.addToTaskList(id, list, taskDescription);
}
