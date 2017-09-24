// Implement new day, add item and cross out item
var list = {
  name: 'Justin',
  taskList: {
    // datestamp: [size, 'task description', check status]
    // size is the same as the section ids (big small medium)
    // check status is true or false, true is completed
  },
  // Atomic Methods listed here only operate on this object
  addToTaskList: function (size, taskDescription) {
    // Creates a task with the specified properties and adds it to the task list
  },
  toggleTaskStatus: function (taskID) {
    // Inverts the check status property of the specified task
  },
  clearTaskList: function (transfer) {
    // Clears the task list totally, or just the tasks with check status of true, depending on the value of transfer
  },
  setName: function (name) {
    this.name = name // sanitize input?
  }
}

$(document).ready(function() {
  $('.header-title').text('Hello ' + list.name)
  $('#add-task-big').on('click', function () {
    $('#big-drawer').slideToggle("normal");
  })
});
