// Wraps all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  var idArr = [];
  var tasksArr = [];
  // Code to display the current date in the header of the page.
  $("#currentDay").text(today.format("MMM D, YYYY"));
  var currentTime = parseInt(today.format("H"));
  //console.log(currentTime);
  //console.log(typeof currentTime);

  // Code that gets the id of each time-block class and pushes the value in the idArray
  $(".time-block").each(function () {
    idArr.push($(this).attr("id"));
  });
  //calls the function addStateClass with the idArray as parameter to add the respective classes and change the color of the time block divs
  addStateClass(idArr);

  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  var storedTasks = JSON.parse(localStorage.getItem("userTasks"));
  //
  if (storedTasks !== null) {
    tasksArr = storedTasks;
    //console.log(tasksArr);
    for (var i = 0; i < tasksArr.length; i++) {
      var taskText = tasksArr[i].task;
      var idTimeBlock = tasksArr[i].id;
      //sets the value of the storage task using its id to the textarea element value
      $("#" + idTimeBlock)
        .children("textarea")
        .val(taskText);
    }
  }

  // Eventlistener for click events on the save button. This code uses the id in the containing time-block as a key to save the user input in
  // local storage.
  //
  $(".time-block").on("click", ".saveBtn", handleSave);

  function handleSave(event) {
    // Prevent the default behavior
    event.preventDefault();

    var idContainer = $(this).parent().attr("id"); //id hour-n
    //console.log(idContainer);
    //console.log($(this).prev());
    var description = $(this).prev().val(); //user input

    //declaration of a new object
    var userTask = {
      id: idContainer,
      task: description,
    };
    //push object with clicked id and user input values to array taskArr
    tasksArr.push(userTask);
    //stores the array in the Local Storage with userTasks as index
    localStorage.setItem("userTasks", JSON.stringify(tasksArr));
  }

  //apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  function addStateClass(idArr) {
    var str = "";
    for (var i = 0; i < idArr.length; i++) {
      str = idArr[i];
      var matches = str.match(/(\d+)/); //Extract number from ID string
      // console.log(typeof matches[0]);
      // currentId (Number)   currentHour (string)
      //adds the class past to the id #hour-n
      if (matches[0] < currentTime) {
        $("#hour-" + matches[0]).addClass("past");
        // console.log("past");
      }
      //adds the class future to the id #hour-n
      else if (matches[0] > currentTime) {
        // console.log("future");
        $("#hour-" + matches[0]).addClass("future");
      } //adds the class present to the id #hour-n
      else {
        //console.log("present");
        $("#hour-" + matches[0]).addClass("present");
      }
    }
  }
});
