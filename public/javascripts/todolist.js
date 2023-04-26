
const todoList = document.querySelectorAll('.todo .todo-title')
const completeCheckboxList = document.querySelectorAll("input[type='checkbox']");
const completeButtonList = document.querySelectorAll('.todo .complete-button');
const deleteButtonList = document.querySelectorAll('.todo .delete-button');
const allDeleteBtn = document.querySelector('#all-delete-button');
const submitAllDeleteModal = document.querySelector('#modal');
const cancelAllDeleteTodoBtn = document.querySelector('#cancel-alldelete-todo-button')

completeCheckboxList.forEach((checkbox,index) => {
  const completeButton = completeButtonList[index];
  const deleteButton = deleteButtonList[index];
  checkbox.addEventListener('change', () => {
    if(checkbox.checked) {
      completeButton.style.display = 'block';
      deleteButton.style.display = 'block';
      checkbox.setAttribute('value', checkbox.checked)
      console.log(checkbox.value); 
    } else {
      completeButton.style.display = 'none';
      deleteButton.style.display = 'none';
      checkbox.setAttribute('value', checkbox.checked)
      console.log(checkbox.value); 
    }
  })
})

completeButtonList.forEach((button,index) => {
  button.addEventListener('click', () => {
    const todoId = button.getAttribute('data-id');
    checkCompleteTodo(todoId);
  })
})


const checkCompleteTodo = (todoId) => {
  console.log(todos);
  console.log('test');
  todos.forEach((todo) => {
      if(todo.id === +todoId){
        
        todo.completed = !todo.completed;
        todoList[todoId].classList.toggle('line-through')
        todoList[todoId].classList.toggle('text-gray-300')
      }
    })
  }
allDeleteBtn.addEventListener('click', () => {
  submitAllDeleteModal.style.display = 'flex';
})
cancelAllDeleteTodoBtn.addEventListener('click', () => {
  submitAllDeleteModal.style.display = 'none';
})