let submitBtn = document.getElementById('submitBtn');
let inputVal = document.getElementById('inputValue');
submitBtn.addEventListener("click", (e) => {
    if (inputVal.value == "") {
        alert('Enter Text')
    } else {
        let noteList = localStorage.getItem("noteList");
        if (noteList == null) {
            noteData = [];
        } else {
            noteData = JSON.parse(noteList)
        }
        let listItem = {
            text: inputVal.value
        }
        noteData.unshift(listItem)
        localStorage.setItem("noteList", JSON.stringify(noteData));
    }

    inputVal.value = "";
    fetchData()

});

function fetchData() {
    let noteList = localStorage.getItem("noteList");
    if (noteList == null) {
        noteData = [];
    } else {
        noteData = JSON.parse(noteList)
    }
    let listRow = "";

    noteData.forEach(function(element, index) {
        listRow += `
                <div class="noteDiv"><p>${element.text}</p><div class="options"><button id ="${index}" onclick="deleteItem(this.id)"><i class="fa-solid fa-trash"></i></button><button id ="${index}" onclick="editItem(this.id)"><i class="fa-solid fa-pen-to-square"></i></button></div></div>`
    })


    let listDiv = document.getElementById('outputDiv');
    if (noteData.length != 0) {
        listDiv.innerHTML = listRow;
    } else {
        listDiv.innerHTML = "<p>No notes here, please add new.</p>"
    }

}

function deleteItem(index) {
    let confirmPopup = confirm("Do want to remove this note?")

    if (confirmPopup == true) {
        let noteList = localStorage.getItem("noteList");
        if (noteList == null) {
            noteData = [];
        } else {
            noteData = JSON.parse(noteList)
        }
        noteData.splice(index, 1);
        localStorage.setItem("noteList", JSON.stringify(noteData));
    }
    fetchData()
}


function editItem(index) {
    let noteList = localStorage.getItem("noteList");
    if (inputVal.value !== "") {
        return alert("Please clear the input field")
    }
    if (noteList == null) {
        noteData = [];
    } else {
        noteData = JSON.parse(noteList)
    }
    console.log(noteData);
    inputVal.value = noteData[index].text;
    // noteData.findIndex((element, index) => {
    // })
    noteData.splice(index, 1);
    localStorage.setItem("noteList", JSON.stringify(noteData));
    fetchData()
}
fetchData();
