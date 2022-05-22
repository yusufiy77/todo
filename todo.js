//gertting allrequired elements
const inputBox = document.querySelector(".inputFild input");
const addBtn = document.querySelector(".inputFild button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup =  ()=>{
	let userData = inputBox.value; //getting user entered value
	if(userData.trim() != 0){ //if user value aren't only spaces
		addBtn.classList.add("active"); //active the add button
  	}else{
  		addBtn.classList.remove("active"); //unactive the add button
  	}
}

showTasks(); //calling showTasks function

// if user click on the add button 
addBtn.onclick = ()=>{
	let userData = inputBox.value; //getting user entered value
	let getLocalStorage = localStorage.getItem("New Todo"); //getting locastorage
	if(getLocalStorage == null){ //if localStorage is null
		listArr = []; //creating bland arry
	}else{
		listArr = JSON.parse(getLocalStorage); //trasforming json string info a js object
	}
	listArr.push(userData); //pushing or adding user data
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //trasforming js object info a lson string
	showTasks(); //calling showTasks function
}
 
//funcntion to add task inside ul
function showTasks(){
	let getLocalStorage = localStorage.getItem("New Todo"); //getting locastorage
	if(getLocalStorage == null){ //if localStorage is null
		listArr = []; //creating bland arry
	}else{
		listArr = JSON.parse(getLocalStorage); //trasforming json string info a js object
	}
	const pendingNumb = document.querySelector(".pendingNumb");
	pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
	if(listArr.length > 0){ //if array is reater than 0
		deleteAllBtn.classList.add("active"); //active the clearall button
	}else{
		deleteAllBtn.classList.remove("active"); //unactive the clearall button
	}
	let newLiTag = '';
	listArr.forEach((element, index) => {
		newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
	});
	todoList.innerHTML = newLiTag; //adding new li tag inside ul tag 
	inputBox.value = ""; 
} 
 
//delete ask funnctio
function deleteTask(index){
	let getLocalStorage = localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); //delete or remove the particular indexed li
	// after remove the li again updata the local storage
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //trasforming js object info a lson string
	showTasks(); //calling showTasks function
}
 

 //delete all tasks function
deleteAllBtn.onclick = ()=>{
	listArr = []; //empty an  array
	// after delete all tasks again updata the local storage
	localStorage.setItem("New Todo", JSON.stringify(listArr)); //trasforming js object info a lson string
	showTasks(); //calling showTasks function
}