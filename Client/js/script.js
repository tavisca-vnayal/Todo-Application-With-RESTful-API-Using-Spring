function openTab(evt, tabName) 
{
    console.log(evt);
    // Declare all variables
    var i, tabcontent;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
    {
      tabcontent[i].style.display = "none";
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";    
}

var request = new XMLHttpRequest()
request.open('GET', 'http://localhost:8080/todolist', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(todoItem => {
      document.getElementById("todos").innerHTML += "<li id="+todoItem.todoItemID+" >"+
      "<div class='li'>"+
          "<span class='text'>"+
           todoItem.todoItemContent+
          "</span> "+
          "<span class='buttons'>"+
            "<span class='editButton button'>"+
              "<img src='images/edit.png' />"+
            "</span>"+
            "<span class='deleteButton button'>"+
              "<img src='images/delete.png'/>"+
            "</span>"+  
          "</span>"+ 
      "</div>"+
    "</li>";
    document.querySelectorAll(".deleteButton").forEach((element) => element.addEventListener("click", deleteTask)); 
    document.querySelectorAll(".editButton").forEach((element) => element.addEventListener("click", editTask)); 
    document.getElementById("input-text").value = "";
    })
  } else {
    const errorMessageContent = "Gah, it's not working!"
    alert(errorMessageContent);
  }
}

request.send()

var deleteTask = (event) => {
  var todoItemID = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("id")
  console.log(todoItemID)
  var request = new XMLHttpRequest();
  request.open('DELETE', 'http://localhost:8080/todolist/'+todoItemID)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement.parentElement.parentElement);
    }
    else {
      const errorMessageContent = "Gah, it's not working!"
      alert(errorMessageContent);
    }
  }
  request.send();
}

const onEdit = (event) => {
  if(event.charCode == 13 && event.target.value != "") 
  {
    var todoItemID = event.target.parentElement.parentElement.getAttribute("id")
    console.log(todoItemID)
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://localhost:8080/todolist/'+todoItemID)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        event.target.outerHTML = "<span class='text'>"+ event.target.value + "</span>";
        document.querySelectorAll(".deleteButton").forEach((element) => element.addEventListener("click", deleteTask)); 
        document.querySelectorAll(".editButton").forEach((element) => element.addEventListener("click", editTask)); 
      }
      else {
        const errorMessageContent = "Gah, it's not working!"
        alert(errorMessageContent);
      }
    }
    request.send(event.target.value);
  }  
}

const editTask = (event) => {
  var content = event.target.parentNode.parentNode.previousSibling.parentNode.firstElementChild.innerHTML
  event.target.parentNode.parentNode.previousSibling.parentNode.firstElementChild.outerHTML = `<input id='update-input' type='text' value="${content}" onkeypress='onEdit(event)'></input>`;
}

var addTask = () => {
  if(document.getElementById("input-text").value != "") {
    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open('POST', 'http://localhost:8080/todolist');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    document.getElementById("todos").innerHTML += "<li>"+
          "<div class='li'>"+
              "<span class='text'>"+
              document.getElementById("input-text").value +
              "</span> "+
              "<span class='buttons'>"+
                "<span class='editButton button'>"+
                  "<img src='images/edit.png' />"+
                "</span>"+
                "<span class='deleteButton button'>"+
                  "<img src='images/delete.png'/>"+
                "</span>"+  
              "</span>"+ 
          "</div>"+
        "</li>";
    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      if (request.status >= 200 && request.status < 400) {
        var ul = document.getElementById("todos");
        var liArray = ul.getElementsByTagName("li");
        liArray[liArray.length - 1].setAttribute("id",data.todoItemID)
      } else {
        const errorMessageContent = "Gah, it's not working!"
        alert(errorMessageContent);
      }
    }
    request.send(document.getElementById("input-text").value);
    document.querySelectorAll(".deleteButton").forEach((element) => element.addEventListener("click", deleteTask)); 
    document.querySelectorAll(".editButton").forEach((element) => element.addEventListener("click", editTask)); 
    document.getElementById("input-text").value = "";
  }
  
}
var onEnter = (event) => {
  if(event.charCode == 13) 
    addTask();
}

document.querySelectorAll(".deleteButton").forEach((element) => element.addEventListener("click", deleteTask)); 
document.querySelectorAll(".editButton").forEach((element) => element.addEventListener("click", editTask));