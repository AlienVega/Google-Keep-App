// elements

// nots container
const notesContainer=document.querySelector("#notes-container");
// add note ınput
const noteInput=document.querySelector("#note-content");
// add note button
const addNoteBtn=document.querySelector(".add-note");

// events
// show element local storage

function showNotes(){
    cleanNotes();
    getNotes().forEach(note => {
        const notElement=createNote(note.id,note.content,note.fixed)
        notesContainer.appendChild(notElement);
    });
}

function cleanNotes(){
    notesContainer.replaceChildren([])
}

function addNote(){
    // for localstorage
    const notes=getNotes();

    const noteObject={
        id:generateId(),
        content:noteInput.value,
        fixed:false,
    };
    // return create elements
   const notElement=createNote(noteObject.id,noteObject.content)
    //  add elements to container
   notesContainer.appendChild(notElement)
//    push local storage
    notes.push(noteObject)

    // save localstorage
    noteInput.value="";
    saveNotes(notes)
}

function createNote(id,content,fixed){
    const element=document.createElement("div");
    element.classList.add("note");
    const textarea=document.createElement("textarea");
    textarea.value=content;

    textarea.placeholder="lorem asd";
    element.appendChild(textarea);

    const piIcon=document.createElement("i");
    piIcon.classList.add(...["bi","bi-pin"]);

    element.appendChild(piIcon)

    const deleteIcon=document.createElement("i");
    deleteIcon.classList.add(...["bi","bi-x-lg"]);

    element.appendChild(deleteIcon)

    const dublicateIcon=document.createElement("i");
    dublicateIcon.classList.add(...["bi","bi-file-earmark-plus"]);

    element.appendChild(dublicateIcon)

    if(fixed){
        element.classList.add("fixed");
    }
    

    element.querySelector(".bi-pin").addEventListener("click",()=> {
        toggleFixNote(id);
        
    });

    element.querySelector(".bi-x-lg").addEventListener("click",()=> {
        deleteNote(id,element);
    });

    element.querySelector(".bi-file-earmark-plus").addEventListener("click",()=> {
        copyNote(id);
    });

    return element;   
}

function toggleFixNote(id){
    const notes=getNotes()
    const targetNote = notes.find(note => note.id === id);
    targetNote.fixed= !targetNote.fixed;

    saveNotes(notes)
    showNotes()

}

function deleteNote(id,element){
    const notes= getNotes().filter((note)=>note.id !==id);

    saveNotes(notes);
    notesContainer.removeChild(element)
}

function copyNote(id){
    const notes=getNotes();
    const targetNote=notes.filter((note)=> note.id ===id)[0];

    const noteObject={
        id:generateId(),
        content:targetNote.content,
        fixed:false,
    };

    const noteElement=createNote(
        noteObject.id,
        noteObject.content,
        noteObject.fixed,
    )
    notesContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes)
}

// get localstorage
function getNotes(){
    const notes=JSON.parse(localStorage.getItem("notes") || "[]")
    const orderNotes=notes.sort((a,b)=>(a.fixed > b.fixed ? -1 : 1));
    
    return orderNotes;
}

// localstorage save
function saveNotes(notes){
    localStorage.setItem("notes",JSON.stringify(notes))
}

// generate random ıd
function generateId(){
   return Math.floor(Math.random()*5000)
}

//  add button click event and new create note object
addNoteBtn.addEventListener("click" , ()=>addNote());
showNotes()
