const itemInput = document.getElementById('itemInput');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submitBtn');
const alert = document.querySelector('.alert');
const clearAllItems = document.querySelector('.clearAllItems');
const itemList = document.querySelector('.itemList');
const options = document.querySelector('.options');

// Edit opcije - njih koristimo u editItem funkciji
let editElement;
let editId = "";
let editFlag = false; // bit ce true kada budemo u stanju editiranja

// kada kliknemo submit button, dodajemo novi item u listu
form.addEventListener('submit', addItemToList);
// obrisi sve iteme iz liste
clearAllItems.addEventListener('click', clearItemsFromList);

function addItemToList(e){
    e.preventDefault();
    const value = itemInput.value; //dohvaca vrijednost iz inputa(klasa itemInput) i to se sprema u varijablu value
    const id = new Date().getTime.toString(); // za specijalni id
    // ako upisujemo u input
    if(value && !editFlag) {
        // createListItem(id, value);
        const element = document.createElement("article");
        element.classList.add("gameItem");
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
        <p class="item">${value}</p>
            <div class="edit_trashButtons">
                <button type="button" class="editButton"><i class="fas fa-edit"></i></button>
                <button type="button" class="deleteButton"><i class="fas fa-trash"></i></button>
            </div>
        `;
        const deleteBtn = element.querySelector('.deleteButton'); // ide element jer ih vise nema u htmlu pa ne moze ici document
        const editBtn = element.querySelector('.editButton'); // ide element jer ih vise nema u htmlu pa ne moze ici document
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        options.style.display = 'block';
        itemList.appendChild(element);
        displayAlert('Game is added!', 'success');
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('Value is changed!', 'success');
        setBackToDefault();
    } else {
        displayAlert('Please enter value!', 'danger');
    }
}

function deleteItem(e){
    const item = e.currentTarget.parentElement.parentElement;
    const id = item.dataset.id;
    itemList.removeChild(item);
    displayAlert('This game is successfully deleted!', 'success');
    if (itemList.children.length === 0){
        options.style.display = 'none';
    }
}

function editItem(e){
    const item = e.currentTarget.parentElement.parentElement; // isto kao i u deleteItem funkciji, zelimo editirati samo jedan item (koji odaberemo)
    editElement = e.currentTarget.parentElement.previousElementSibling; // dohvacamo sibling sto je <p> jer zelimo editirati naziv kada kliknemo edit btn
    itemInput.value = editElement.innerHTML; // u inputu se ispisuje ono sto smo upisali kada kliknemo na edit btn
    editFlag = true;
    editId = item.dataset.id;
    submitBtn.textContent = "Editing...";
}

function setBackToDefault(){ // vraca sve na default
    itemInput.value = ''; // kada dodamo neki item, naziv tog itema se brise iz inputa i input se vraca na default (sa placeholderom)
    editFlag = false;
    editId = '';
    submitBtn.textContent = "Submit";
}

function displayAlert (message, action){ // prikaz success ili danger klase, ovisno o akciji
    value = itemInput.value;
    alert.textContent = message;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1800);
}

function clearItemsFromList(){ // brisanje svih itema iz liste
    const items = document.querySelectorAll('.gameItem');
    if(items.length > 0){
        items.forEach(function(item){
            itemList.removeChild(item);
        });
    }
    options.style.display = 'none'; // da makne option button-e
    displayAlert('All games are removed!', 'danger');
    setBackToDefault();
}
