//alert("wrong");
// VFW
// Term 1305
// Banchop Ben Kangdouangnhot
// Project 4

// Wait until DOM is ready
window.addEventListener( "DOMContentLoaded", function() {

// getElementById function
function main ( clear ) {
	var teams = document.getElementById( clear );
	return teams;
}

// Create drop down elements from js
function dropDownList ( ) {
	var formTag = document.getElementsByTagName("form");  //form tags are an array
	selector = main('mStuff');
	makeSelection = document.createElement('select');
	makeSelection.setAttribute("id", "group");   // used for idGetter function
		for ( var i = 0, j= addStuff.length; i<j; i++) {
	 	var makeOpt = document.createElement('option');
	 	var opt = addStuff[i];
	 	makeOpt.setAttribute("value", opt);
	 	makeOpt.innerHTML = opt;
	 	makeSelection.appendChild(makeOpt);
	 }
	    selector.appendChild(makeSelection);
}

// Find values of selected radio buttons
function getRadios() {
	var setRadios = document.forms[0].any;
	for ( var i=0; i<setRadios.length; i++) {
		if(setRadios[i].checked) {
			seasonValue = setRadios[i].value;
		}
	 }
} 
 
function toggle( togg ) {
	 switch(togg) {
	 	case "on" :
	 		main("saveValues").style.display = "none";
	 		main("forms").style.display = "none";
	 		main('Info').style.display ="none";
	 		main('clearData').style.display ="none";
	 		main('back').style.display = "inline";	
	 		main('h2').style.display = "none";
	 		main('h1').style.display = "none";
	 	break;

	 	case "off" :
	 		main("forms").style.display = "block";
	 		main('Info').style.display ="none";
	 		main('clearData').style.display ="none";
	 		main('saveValues').style.display = "block";
	 		main('items').style.display="none";
	 		
	 	break;
	 		default:
	 			return false;
	 }

}

// get random number
function storeLocalData( key ) {  // passing in "edit" item from tutorial 3.6
	// if there is no key, this means this is a brand new item and need a new key.
	if(!key){
		var getId = Math.floor(Math.random()*100000001);
	}else{
		//Set the id to the existing key we're editing so that it will save over the old data.
		// Get all form fields values and store into object.
		// Object properties contains array with the form label and input value.
	        // Same key that was passed along from save data button
	       // then go to validate function and then pass here to storeLocalData function.
	getId = key;
			
}
	getRadios();

	var it 	= {};
		it.sport	= ["Sports ",			 main("sport").value];
		it.tname	= ["Team Name ",		 main("tname").value];
		it.name		= ["Name",		         main("name").value];
		it.group 	= ["More Stuff ", 		 main('group').value];  
		it.aDate	= ["Date ", 			 main("aDate").value];
		it.range	= ["Tickets Desired ",	 main("range").value];
		//it.season	= ["Season ", 			 seasonValue];          
		it.payments	= ["Payments ", 		 main("payments").value];	
		it.concerns = ["Concerns",	         main("concerns").value];

	// save data to local storage! use Stringify to convert our object to a string
	localStorage.setItem( getId, JSON.stringify(it) );
	alert("Data has been saved!");
}

// write data from local storage to browser
function getData () {
	
	toggle("on");
		
	if( localStorage.length === 0 ) {
		alert("Nothing to show and default info will be added");
		fillData();
		
		} 
		
		var make = document.createElement("div");
		make.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		make.appendChild(makeList);		
		document.body.appendChild(make);
		main('items').style.display="block";	

		// looking in local storage
		for(var i=0, j=localStorage.length; i<j; i++) {
		var makeli = document.createElement("ul");		
		var linksLi = document.createElement("ul");  //creating another list item for week 3		
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var object = JSON.parse(value); // convert local storage string back to object
		var makeSubList = document.createElement("li");
		makeli.appendChild(makeSubList);
		
		
		getImages(object.group[1], makeSubList); // Project 4 images
		
		
		for ( var m in object ) {
			var makeSubLi = document.createElement("li");
			makeSubList.appendChild(makeSubLi);
			var optSub = object[m][0]+": "+object[m][1];
			makeSubLi.innerHTML = optSub;
			makeSubList.appendChild(linksLi); //append dynamically week 3

			}
		// Create our edit and delete button/link for each item in local storage week3	
		 makeItemLinks(localStorage.key(i), linksLi); 
	}// the makeItemLinks(localStorage.key[i],linksLi); threw me for a curve!!!! had [i], instead of (i)!!!
	
}

// Getting images from right category being display, project 4
function getImages(dropDownList, makeSubList){
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImage = document.createElement('img');
	var setSource = newImage.setAttribute("src", "../images/"+ dropDownList + ".png" );
	imageLi.appendChild(newImage);
	
}

	
// make item links functions for local data
// Create the edit and delete links for each stored data item when display.
function makeItemLinks( key, linksLi ){
//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;   // this is the same thing, in editItem function
	var editText = "Edit Here";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	// add line break via JS
	var breakTag = document.createElement("br");
	linksLi.appendChild(breakTag);

	var deleteLink = document.createElement("a");
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Info";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);

}

function deleteItem () {
	var askConfirm = confirm("are you sure want to delete info?");
	if(askConfirm){
		localStorage.removeItem(this.key);
		window.location.reload();
	}else{
		alert("Nothing has been change");
	}
}

function editItem() {
// get item from local storage.
	var value = localStorage.getItem(this.key);
	var it = JSON.parse(value);
	
	// show form
	toggle("off");
	
	//populate the form fields with current local storage values.
    main('sport').value = it.sport[1];
	main('tname').value = it.tname[1];
	main('name').value  = it.name[1];
	main('group').value = it.group[1];
	main('aDate').value = it.aDate[1]; 
	main('range').value = it.range[1];  
	main("payments").value = it.payments[1];
	main("concerns").value = it.concerns[1];  
	
	// Remove the initial listener from the input save button.
	saveButton.removeEventListener("click", storeLocalData);
	//change submit button value to edit button
    main("saveValues").value = "Edit Info";
	// key value used in this function as a property of the editSubmit even
	var editSubmit = main("saveValues");  
	editSubmit.addEventListener("click", validateForm);
	editSubmit.key = this.key; // enabling submit key
	
}

function clearLocalData () {
	var youSure = confirm("You sure you want to delete?");
		 if(youSure) {  
		 	if( localStorage.length === 0){
				alert("Local storage is empty")
			}else{   
				localStorage.clear();
				alert("All data has been deleted!");
				window.location.reload();
				//return false;
			}
	} 

}

function validateForm( eventData ) {
// Define the elements we want to check
	
	errorMsg.style.border = "";	
	var getSport 	   = main("sport");
	var getTname  	   = main("tname");	
	var getName	       = main("name");
	var getRange	   = main("range");
			
	// reset error messages from reprinting in form edit
	errorMsg.innerHTML = " ";	
	getSport.style.border = "1px solid black";
	getTname.style.border = "1px solid black";
	getName.style.border = "1px solid black";
		
	// Get error message
	var messageArray = [ ];
	// validation
	if (getSport.value === ""){
	var sportError = "Please choose a sport...";
	errorMsg.style.color = "red";
	errorMsg.style.fontSize = "14px";
	getSport.style.border = "1px solid red";
	messageArray.push(sportError);
	}
		
	if (getTname.value === "") {
		var tNameError = "Please enter a team name...";
		errorMsg.style.color = "red";
		getTname.style.border = "1px solid red";
		messageArray.push(tNameError);
	}
	
	if (getName.value === "") {
		var nameError = "Please enter your name...";
		errorMsg.style.color = "red";
		getName.style.border = "1px solid red";
		messageArray.push(nameError);
	}

	if(messageArray.length >= 1){
		for(var i=0, j=messageArray.length; i<j; i++){
			var text = document.createElement("div");
			text.innerHTML = messageArray[i];
			errorMsg.appendChild(text);
		}
		eventData.preventDefault();
     	return false;
 	}else{
 	   // if good, data is finally save // this key was passed through "save" as a property
	    storeLocalData(this.key);  //adding key to edit a certain file
	
  	}
}  

	// range slider
	var sliderRange = document.getElementById("range");
	var sliderDisplay = document.getElementById("tickets");

sliderRange.onchange = function(){
   	sliderDisplay.value = sliderRange.value;
} 


function fillData(){
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}

}

	// Variable defaults drop down menu
	var addStuff = [ "Tickets", "Souvenirs", "Apparels" ],
	seasonValue,
	errorMsg = main("errors");

	dropDownList();

 	// Set Links and Submit Click Events	
	var displayData = main("Info");
	displayData.addEventListener("click", getData );

	var clearLink = main("clearData");
	clearLink.addEventListener("click", clearLocalData);
	
	
	var saveButton = main("saveValues");
	saveButton.addEventListener("click",  validateForm);

});
