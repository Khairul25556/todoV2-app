let inp = document.querySelector('input');
let btn = document.querySelector('button');
let ul = document.querySelector('ul');

function addItem() {

    let item = document.createElement('li');
    item.innerText = inp.value;

    let delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.classList.add('delBtn');

    item.appendChild(delBtn);
    ul.appendChild(item);
    inp.value = '';

    
    delBtn.addEventListener("click", function() {
        let par = delBtn.parentElement;
        console.log(par);
        par.remove(); 
    });
}


btn.addEventListener('click', addItem);

inp.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
    let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("Heard:", transcript);

    if (transcript.startsWith('delete ')) {
        let itemName = transcript.replace('delete ', '').trim();
        
        let items = ul.querySelectorAll('li');
        for (let item of items) {
            if (item.firstChild.nodeValue.trim().toLowerCase() === itemName) {
                item.remove();
                console.log(`Deleted: ${itemName}`);
                return;
            }
        }
        console.log(`Item not found: ${itemName}`);
    }
};

recognition.start();