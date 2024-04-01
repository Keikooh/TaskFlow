import "./style.css";
// Supports weights 100-800
import '@fontsource-variable/nunito';
import "@fortawesome/fontawesome-free/css/all.min.css";



const colors = ["#6975e3","#4dc9dc","#f46b6b","#f5c552","#31d487"];

const generateColor = () =>{
  return colors[Math.floor(Math.random() * colors.length)]
}

// Replace classes - function
(function ($) {
  $.fn.replaceClass = function (prevClass, nextClass) {
      if(this.hasClass(prevClass)){
         return this.removeClass(prevClass).addClass(nextClass);
      } else return this.addClass(prevClass).removeClass(nextClass);
  };
}(jQuery));


$(document).ready(function() {
  $('#responsible').select2();
});

$("#app").html(`
    <main class="container">
      <section class="space-between">
        <h1>Tasks</h1>
        <button id="open" class="btn shadow"><i class="fa-solid fa-plus opacity-60"></i> Add task</button>
      </section>
      <hr>
      <section class="row">
        <div class="list-container">
          <h2>To Do</h2>
          <ul id="sortable" class="s1 task-list">
            <li class="cardTask shadow">
              <div style="justify-content: space-between;">
                <span class="title" style="font-weight: bold">Do exercise</span>
                <i class="fa-regular fa-circle-xmark delete opacity-60"></i>
              </div>
              <div class="pills">
                <span style="background-color: ${generateColor()}">buy</span>
                <span style="background-color: ${generateColor()}">shop</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="opacity:0.4; font-size: 15px; font-weight:bold">29/03/2024</span>
                <ul style="margin-right:5px ;display:flex">
            <li class="member member-icon"><span class="member-span" style="background-color: ${generateColor()}">M</span></li>
          </ul>
        </div>
      </li>
          </ul>
        </div>
        <div class="list-container">
          <h2>In Process</h2>
          <ul id="sortable2" class="s1 task-list">
          </ul>
        </div>
        <div class="list-container">
          <h2>Done</h2>
          <ul id="sortable3" class="s1 task-list">
          </ul>
        </div>
      </section>
    </main>
    
    <section class="container add-section">
      <h1>Add a new task</h1>

      <hr>

      <div class="task-details">
        <div class="form-section-line">
          <label style="margin-right: 10px">Responsible:</label>
          <select id="responsible" name="responsible" multiple required>
            <option value="Me">Me</option>
          </select>
        </div>

        <div class="form-section-line">
          <label>Deadline:</label>
          <input type="date" id="date" required/>
        </div>

        <div class="form-section">
          <label>Description</label>
          <input id="description" class="myinput" placeholder="Description..." required/>
        </div>

        <div class="form-section">
          <label>Tags</label>
          <input id="tags" placeholder="Example shop,study,mind " required/>
        </div>
    
        
        <div class="half-divided">
          <button id="cancel" class="btn-outlined shadow">Cancel</button>
          <button id="add" class="btn shadow">Save</button>
        </div>
      </div>
    </section>`);

// Sorteable lists
$("#sortable, #sortable2, #sortable3").sortable({
  connectWith: ".s1",
  placeholder: "sortable-placeholder",
  start: function () {
    //alert("Estás utilizando Drag and Drop");
  },
  stop: function () {
    //alert("Terminando de reorganizar");
  },
});

$(document).on("click", "#open", function () {
  $(".add-section").addClass("open");
 
});

$(document).on("click", "#cancel", function(){
  $(".add-section").removeClass("open");
})

// Add a member
$(document).on("click", "#addMember", function(){
  const name = $("#memberName").val();
  $("#responsible").append(`<option value="${name}">${name}</option>`)

  $("#memberName").val("");
  $("#members").append(`
    <li class="member member-icon">
      <span class="member-span" style="background-color: ${generateColor()}">${name[0]}</span>
    </li>
  `);
})


$(document).on("click", "#openAddMember", function(){
  $(this).replaceClass("fa-plus","fa-xmark");
  const addMemberSection = $("#addMemberSection")
  addMemberSection.replaceClass("hidden","space-between");

})

// Add a new task
$(document).on("click", "#add", function () {
  const description = $("#description").val();
  const date = $("#date").val();
  const tagsList = $("#tags").val().split(",");
  const responsibles = $("#responsible").val();

  $("#sortable").append(`
      <li class="cardTask shadow">
        <div style="justify-content: space-between;">
          <span class="title" style="font-weight: bold"> ${description}</span>
          <i class="fa-regular fa-circle-xmark delete opacity-60"></i>
        </div>
        <div class="pills">
          ${
            tagsList.map( (tag) => (
              `<span style="background-color: ${generateColor()}">${tag}</span>`
            )).join('')
          }
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="opacity:0.4; font-size: 15px; font-weight:bold">${date}</span>
          <ul style="margin-right:5px ;display:flex">
            ${
              responsibles.map((responsible) => {
                return `<li class="member member-icon"><span class="member-span" style="background-color: ${generateColor()}">${responsible[0]}</span></li>`
              }).join('')
            }
          </ul>
        </div>
      </li>`);
  
    $(".add-section").removeClass("open");

    $("#description").val("");
    $("#date").val("");
    $("#tags").val("");
    $("#responsible").val("");
});

// Delete task
$("#app").on("click", ".delete", function () {
  $(this).parent().parent().remove();
});



// Complete task
$("#app").on("click", ".complete", function () {
  $(this).toggleClass("completed");
 
});

// Edit task
$("#app").on("dblclick", ".cardTask", function () {
  $(".add-section").addClass("open");
 
});
