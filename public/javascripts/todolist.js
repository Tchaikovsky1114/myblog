
const todoList = document.querySelectorAll('.todo .todo-title')
const completeCheckboxList = document.querySelectorAll("input[type='checkbox']");
const completeButtonList = document.querySelectorAll('.todo .complete-button');
const deleteButtonList = document.querySelectorAll('.todo .delete-button');
const allDeleteBtn = document.querySelector('#all-delete-button');
const submitAllDeleteModal = document.querySelector('#modal');
const cancelAllDeleteTodoBtn = document.querySelector('#cancel-alldelete-todo-button')
const submitAllCompletedButton = document.querySelector('#submit-all-completed-button')
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

submitAllCompletedButton.addEventListener('click', () => {
    const completeTodos = todos.filter((todo) => todo.completed);
  fetch('/todolist/completetodo',
      {  
        headers: {
          'Content-Type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
          oldTodos: todos,
          completeTodos,
        })
      })
      .then((response) => {
        return response.json()
        
      })
      .then((data) => {
        console.log(data);
        getCompleteTodo();
      })
      .catch((error) => console.error(error));
    
})

const getCompleteTodo = () => {
  fetch('/todolist/completetodo',
      {  
        headers: {
          'Content-Type': 'application/json'
        },
        method:'GET',
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        todos = data.todos
        completedTodos = data.completedTodos

      })
      .catch((error) => console.error(error));
}



// 템플릿을 수동으로 지워줘야함 - list.innerHTML = ''; 처럼.. 한번 지우고 then메서드 내에서 재작성
// const addBtn = document.getElementById('add-btn');
// addBtn.addEventListener('click', () => {
//   // 새로운 요소를 추가하는 API 호출
//   fetch('/add/newitem')
//     .then(res => res.json())
//     .then(data => {
//       // 서버에서 받은 새로운 배열 데이터로 HTML을 업데이트
//       const list = document.querySelector('ul');
//       list.innerHTML = '';
//       data.myArray.forEach(item => {
//         const li = document.createElement('li');
//         li.textContent = item;
//         list.appendChild(li);
//       });
//     })
//     .catch(err => console.log(err));
// });
