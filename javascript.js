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
    var noteChecked;

    console.log(noteText)

    var newNote = {
        noteText,
        noteDate,
        noteTime,
        noteChecked

    };

    console.log(newNote);

    createNewNote(newNote);



    currentNote.unshift(newNote);


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


    parentDiv.appendChild(createNoteDiv);
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

    var noteCheckedCheck = noteObject.noteChecked;

    if (noteCheckedCheck) {

        createNoteDiv.classList.add('noteChecked');
        createCheckBox.checked = true;

        var doneAtt = document.createElement('span');
        doneAtt.classList.add('checkedSpan');
        doneAtt.innerHTML = "Done!";

        createNoteDiv.appendChild(doneAtt);



    }

    //close button

    createButton.addEventListener('click', function(event) {

        console.log('clicked');

        var form = event.target;

        var index = Array.from(document.querySelectorAll('.note')).indexOf(event.target.parentElement.parentElement.parentElement);

        console.log(index);

        currentNote.splice(index, 1);

        form.parentElement.parentElement.parentElement.remove();

        updateBackup(currentNote);


    });

    createCheckBox.addEventListener('change', function(event) {

        var form = event.target;

        var index = Array.from(document.querySelectorAll('.note')).indexOf(form.parentElement.parentElement);
        var ifChecked = currentNote[index].noteChecked;
        console.log(ifChecked);

        if (this.checked) {


            console.log(index);


            ifChecked = true;


            updateBackup(currentNote);
            console.log(index);

            form.parentElement.parentElement.classList.add('noteChecked');



            var doneAtt = document.createElement('span');
            doneAtt.classList.add('checkedSpan');
            doneAtt.innerHTML = "Done!";



            form.parentElement.parentElement.appendChild(doneAtt);

        } else {

            form.parentElement.parentElement.classList.remove('noteChecked');
            form.parentElement.parentElement.classList.add('note');


            var doneSpan = document.querySelector('.checkedSpan');

            doneSpan.remove();

            ifChecked = false;

            updateBackup(currentNote);



        }

    });

}

// update storage

function updateBackup(noteObject) {
    localStorage.setItem('currentNote', JSON.stringify(noteObject));
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