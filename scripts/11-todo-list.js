const todoList = [];

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const inputDateElement = document.querySelector('.js-name-date');

    //todoList.push(inputElement.value);
    todoList.push({
        name:inputElement.value,
        dueDate:inputDateElement.value});
    console.log(todoList);
    inputElement.value = '';
    renderTotoList();
}

function renderTotoList() {

    if(Array.isArray(todoList)){
        let todo = '';
        for(let i=0; i<todoList.length; i++){
            const html = `   
                <div>${todoList[i].name}</div>
                <div>${todoList[i].dueDate}</div>
                <button class="delete-button" onclick="deleteRow(${i})">Delete</button>
            `;
            todo += html;
        }
        document.querySelector('.loops').innerHTML = todo;
    }

}
function deleteRow(i) {
    todoList.splice(i,1);
    renderTotoList();
}