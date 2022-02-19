const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')
const small = document.querySelector('small')
const li = document.querySelector('.list-group-item')

const addTodo = inputValue => {
    if(inputValue.length) {
        todosContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
                <span data-span="${inputValue}">${inputValue}</span>
                <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
            </li>
        `
        event.target.reset()
    }
}

//Função para adicionar um novo li na tela
formAddTodo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim()
    addTodo(inputValue)
})

//Função para remover uma todo 
const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

    if (clickedElement.dataset.trash) {
        todo.remove()
    }

}

//Função para marcar como concluída
const completedTodo = clickedElement => {
    const spanDataValue = clickedElement.dataset.span
    const todo = document.querySelector(`[data-todo="${spanDataValue}"]`)

    if (clickedElement.dataset.span) {
       todo.classList.toggle('completed')
    }
}

//Lógica para remover e marcar como concluída o li da tela
todosContainer.addEventListener('click', event => {
    const clickedElement = event.target
    completedTodo(clickedElement)
    removeTodo(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
        .filter(todo => {
            const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
            return returnMatchedTodos ? matchedTodos : !matchedTodos 
        })

const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todo => {
        todo.classList.remove(classToRemove)
        todo.classList.add(classToAdd)
    })
}

//A função que gera um array com as li que ñ correspondem ao valor do input escondendo-o
const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex') 
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

//Lógica para buscar ToDo`s
inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    const todos = Array.from(todosContainer.children) 

    hideTodos(todos, inputValue)
    showTodos(todos, inputValue)
})