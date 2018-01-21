var backup = localStorage.getItem('currentNote');

if (backup) {
    var currentNote = JSON.parse(backup);

} else {

    var currentNote = [{
            noteText: 'The Beatles show !!',
            noteDate: '1966-08-29',
            noteTime: '14:20',
            noteChecked: true
        },
        {
            noteText: 'Make birthday pie for amme , 26 years , love cheese cackes , check about suprise flight to Thailand after July next year',
            noteDate: '2018-02-14',
            noteTime: '07:30',
            noteChecked: false

        }
    ];

}

for (var i = 0; i < currentNote.length; i++) {
    createNewNote(currentNote[i]);


}

// form load

document.querySelector('form').addEventListener('submit', function(event) {

    event.preventDefault();

    var form = event.target;

    var noteText = form.querySelector('textarea').value.trim();
    var noteDate = form.querySelector('[name="date"]').value;
    var noteTime = form.querySelector('[name="time"]').value;
    var noteChecked = false;



    var newNote = {
        noteText,
        noteDate,
        noteTime,
        noteChecked


    };

    console.log(newNote);

    createNewNote(newNote);

    currentNote.push(newNote);

    updateBackup(currentNote);

    document.querySelector('form').reset();


});

// create a new note


function createNewNote(noteObject) {


    var parentDiv = document.querySelector('#noteParent');

    var createNoteDiv = document.createElement('div');
    createNoteDiv.classList.add('note', 'run-animation');


    var createButton = document.createElement('button');
    createButton.classList.add('closeBtn');

    var createIconDiv = document.createElement('div');
    createIconDiv.classList.add('icon');
    var createLidDiv = document.createElement('div');
    createLidDiv.classList.add('lid');
    var createLidcapDiv = document.createElement('div');
    createLidcapDiv.classList.add('lidcap');
    var createBinDiv = document.createElement('div');
    createBinDiv.classList.add('bin');

    var createTextArea = document.createElement('p');
    createTextArea.classList.add('note_text', 'scroller');
    createTextArea.setAttribute("id", "style-6");
    createTextArea.innerHTML = noteObject.noteText;

    var createDateSpan = document.createElement('span');
    var createTimeSpan = document.createElement('span');
    createDateSpan.classList.add('note_date');
    createDateSpan.innerHTML = noteObject.noteDate;

    createTimeSpan.classList.add('note_time');
    createTimeSpan.innerHTML = noteObject.noteTime;

    var createCheckboxLabel = document.createElement('label');
    createCheckboxLabel.classList.add('note_label');
    createCheckboxLabel.innerHTML = "✔";

    var createCheckBox = document.createElement('input');
    createCheckBox.classList.add('note_checked');
    createCheckBox.setAttribute("type", "checkbox");
    createCheckBox.setAttribute("name", "checkbox");
    createCheckBox.checked = noteObject.noteChecked;


    parentDiv.appendChild(createNoteDiv);
    //parentDiv.insertAdjacentElement('afterbegin', createNoteDiv)
    createNoteDiv.appendChild(createButton);

    createButton.appendChild(createIconDiv);
    createIconDiv.appendChild(createLidDiv);
    createIconDiv.appendChild(createLidcapDiv);
    createIconDiv.appendChild(createBinDiv);

    createNoteDiv.appendChild(createTextArea);
    createNoteDiv.appendChild(createDateSpan);
    createNoteDiv.appendChild(createTimeSpan);

    createCheckboxLabel.appendChild(createCheckBox);
    createNoteDiv.appendChild(createCheckboxLabel);


    if (createCheckBox.checked) {

        ifCheckedIsTrue(createNoteDiv);

    }

    //close button

    createButton.addEventListener('click', function(event) {

        console.log('clicked');

        var form = event.target;

        var indexArray = Array.from(document.querySelectorAll('.note'));
        var index = indexArray.indexOf(event.target.parentElement.parentElement.parentElement);

        console.log(index);


        indexArray.splice(index, 1);

        currentNote.splice(index, 1);

        updateBackup(currentNote);

        form.parentElement.parentElement.parentElement.remove();

    });
    // checkbox
    createCheckBox.addEventListener('change', function(event) {

        var form = event.target;

        var parentNoteElement = form.parentElement.parentElement;

        var index = Array.from(document.querySelectorAll('.note')).indexOf(form.parentElement.parentElement);
        currentNote[index].noteChecked = form.checked;

        if (this.checked) {

            updateBackup(currentNote);

            ifCheckedIsTrue(parentNoteElement);

        } else {

            parentNoteElement.classList.remove('noteChecked');
            parentNoteElement.classList.add('note');

            updateBackup(currentNote);

        }
        // edit note
    });
    createTextArea.addEventListener('dblclick', function(event) {
        console.log('dblclicked');

        var form = event.target;

        form.remove();
        var createForm = document.createElement('form');
        var createTextAreaEdit = document.createElement('textarea');
        var createInputSubmit = document.createElement('input');

        createTextAreaEdit.classList.add('editNote');
        createTextAreaEdit.setAttribute('placeholder', form.innerHTML);
        createTextAreaEdit.value = form.innerHTML;

        createInputSubmit.setAttribute('type', 'submit');
        createInputSubmit.setAttribute('value', 'save');
        createInputSubmit.setAttribute('id', 'saveEditedText');


        createForm.appendChild(createTextAreaEdit);
        createForm.appendChild(createInputSubmit);
        createButton.insertAdjacentElement('afterend', createForm);

        createForm.addEventListener('submit', function(event) {

            var form = event.target;


            event.preventDefault();

            var newEditedText = form.querySelector('textarea').value.trim();

            var indexArray = Array.from(document.querySelectorAll('.note'));

            var index = indexArray.indexOf(event.target.parentElement);


            var lastModifiedSpan = document.createElement('span');
            lastModifiedSpan.classList.add('lastModifiedSpan');
            var lastModifiedText = lastModifiedSpan.innerHTML = " Last modified at " + new Date();


            console.log(index);

            currentNote[index].noteText = newEditedText;
            currentNote[index].lastModified = lastModifiedText;

            form.remove();

            createTextArea.classList.add('note_text', 'scroller');

            createTextArea.setAttribute("id", "style-6");

            createTextArea.innerHTML = newEditedText;

            //createNoteDiv.appendChild(lastModifiedSpan);

            createButton.insertAdjacentElement('afterend', createTextArea);


            console.log(newEditedText);

            updateBackup(currentNote);

        });


    });

}

// update storage

function updateBackup(noteObject) {
    localStorage.setItem('currentNote', JSON.stringify(noteObject));
}

function ifCheckedIsTrue(element) {

    element.classList.add('noteChecked');

}

function ifCheckedIsFalse(argument) {

}

// date 

var today = new Date();
var todayDay = today.getDate();
var todayMonth = today.getMonth() + 1;
var todayYear = today.getFullYear();
if (todayDay < 10) {
    todayDay = '0' + todayDay;
}
if (todayMonth < 10) {
    todayMonth = '0' + todayMonth;
}

today = todayYear + '-' + todayMonth + '-' + todayDay;
document.getElementById("dateInput").setAttribute("min", today);
document.getElementById("dateInput").setAttribute("value", today);
document.getElementById("timeInput").setAttribute("value", '08:20');