
const SetBudget = document.querySelector('#setBudget');
const Budget = document.querySelector('#Budget');
const CheckEXP = document.querySelector('#checkEXP');
const BalanceAmount = document.querySelector('#totalblance');
let TotalEXP = document.querySelector('#totalExpense');


let TBudget = 0;
let prevExpense = 0;
SetBudget.addEventListener('click', () => {
    const TotalBudget = document.querySelector('#totalBudget');
    if (parseInt(TotalBudget.value)) {
        Budget.innerHTML = parseInt(TotalBudget.value);
        TBudget = parseInt(TotalBudget.value);
    }
});

let CheckExpName = document.querySelector('#exp');
let CheckExpAmount = document.querySelector('#amount');

if (!CheckExpName.value && !CheckExpAmount.value){

    CheckEXP.addEventListener('click', () => {

        let expense = parseInt(CheckExpAmount.value);
        if (expense > (TBudget - prevExpense)) {
            alert('Please Enter Correct Value');
        }

        else if (CheckExpName.value && CheckExpAmount.value) {
            prevExpense += expense;
            TotalEXP.innerHTML = prevExpense;
            BalanceAmount.innerHTML = TBudget - prevExpense;
            component(CheckExpName, CheckExpAmount);
            saveData()
        }
    });
} 


function component(CheckExpName, CheckExpAmount) {
    const listElem = document.createElement('li');
    const spanEXPName = document.createElement('span');
    const spanEXPAmount = document.createElement('span');
    const edit = document.createElement('div');
    const editIMG = document.createElement('img');
    const trashIMG = document.createElement('img');

    editIMG.src = 'edit.svg';
    trashIMG.src = 'delete.svg';
    editIMG.className = 'editIcon';
    trashIMG.className = 'delete';


    spanEXPName.classList.add('expenseName');
    spanEXPName.innerText = CheckExpName.value;
    spanEXPAmount.classList.add('expenseAmount');
    spanEXPAmount.innerText = CheckExpAmount.value;

    edit.classList.add('edit');

    listElem.appendChild(spanEXPName);
    listElem.appendChild(spanEXPAmount);

    edit.appendChild(editIMG);
    edit.appendChild(trashIMG);
    listElem.appendChild(edit);

    document.querySelector('.List-Container').appendChild(listElem);

    const deleteIcon = document.querySelectorAll('.delete');
    const editIcon = document.querySelectorAll('.editIcon');

    deleteIcon.forEach((item)=>{
        item.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            const listItem = item.closest('li');
            deleteItem(listItem);
            e.target.parentNode.parentNode.remove();
        });
    });
    editIcon.forEach((item)=>{
        item.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            const listItem = item.closest('li');
            editItem(listItem);
            e.target.parentNode.parentNode.remove();
        });
    });
}

function deleteItem(listItem) {
        const expAmount = listItem.querySelector('.expenseAmount').innerText;
        const currentBalance = document.querySelector('#totalblance').innerText;

        prevExpense -= parseInt(expAmount);

        TotalEXP.innerHTML = Math.abs(prevExpense);
        BalanceAmount.innerHTML = parseInt(currentBalance) + parseInt(expAmount);
}

function editItem(listItem){
    const listName = listItem.querySelector('.expenseName');
    const listAmount = listItem.querySelector('.expenseAmount');
    const currentBalance = document.querySelector('#totalblance').innerText;

    prevExpense -= parseInt(listAmount.innerText);
    TotalEXP.innerHTML = Math.abs(prevExpense);
    BalanceAmount.innerHTML = parseInt(currentBalance) + parseInt(listAmount.innerText);

    CheckExpName.value = listName.innerText;
    CheckExpAmount.value = listAmount.innerText;
}