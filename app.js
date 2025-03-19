let inp = document.querySelector('input');
let btn = document.querySelector('button');
let ul = document.querySelector('ul');

function addItem(taskText) {
    let item = document.createElement('li');
    item.innerText = taskText;  

    let delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add('delBtn');

    item.appendChild(delBtn);
    ul.appendChild(item);

    inp.value = ''; 

 
    delBtn.addEventListener("click", function() {
        let par = delBtn.parentElement;
        par.remove();
    });
}

btn.addEventListener('click', function() {
    if (inp.value.trim() !== '') {
        addItem(inp.value.trim());
    }
});

inp.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && inp.value.trim() !== '') {
        addItem(inp.value.trim());
    }
});

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
    let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("Heard:", transcript);

    if (transcript.startsWith('add ')) {
        let taskName = transcript.replace('add ', '').trim();
        if (taskName) {
            addItem(taskName);  
            console.log(`Added: ${taskName}`);
        }
    } 
    else if (transcript.startsWith('delete ')) {
        let itemName = transcript.replace('delete ', '').trim();
        let items = ul.querySelectorAll('li');

        let found = false;
        for (let item of items) {
            if (item.firstChild.nodeValue.trim().toLowerCase() === itemName.toLowerCase()) {
                item.remove();
                console.log(`Deleted: ${itemName}`);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log(`Item not found: ${itemName}`);
        }
    }
};


recognition.onend = function() {
    recognition.start();
};

recognition.onerror = function(event) {
    console.error('Speech recognition error', event);
    recognition.start();
};


recognition.start();
