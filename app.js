const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  if (inputValue.length) {
    todosContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span data-span="${inputValue}">${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </li>
      `
      event.target.reset()
  }
}

const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
  
  if (clickedElement.dataset.trash) {
    todo.remove()
  }
}

const completedTodo = clickedElement => {
  const spanDataValue = clickedElement.dataset.span
  const todo = document.querySelector(`[data-todo="${spanDataValue}"]`)
  
  if (clickedElement.dataset.span) {
    todo.classList.toggle('completed')
  }
}

const filterTodos = todos => {
  todos.forEach(({ todo, shouldBeVisible }) => {
    todo.classList.add(shouldBeVisible ? 'd-flex' : 'hidden')
    todo.classList.remove(shouldBeVisible ? 'hidden' : 'd-flex')
  })
}

const searchTodo = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children).map((todo) => ({
    todo,
    shouldBeVisible: todo.textContent.toLowerCase().includes(inputValue)
  }))

  filterTodos(todos)
}

const markCompletedOrRemoveTodo = event => {
  const clickedElement = event.target
  completedTodo(clickedElement)
  removeTodo(clickedElement)
}

formAddTodo.addEventListener('submit', addTodo)
inputSearchTodo.addEventListener('input', searchTodo)
todosContainer.addEventListener('click', markCompletedOrRemoveTodo)