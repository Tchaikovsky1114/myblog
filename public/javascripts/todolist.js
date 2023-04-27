
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
  console.log('isChecked');
  todos.forEach((todo) => {
      if(todo.id === +todoId){
        console.log(todoList[todoId])
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

        // 완료한 투두 그리기
        const completedList = document.querySelector('#completed-todo-list');
        completedList.innerHTML = '';
        completedList.innerHTML =  completedTodos.map((item) => /*html*/`
        <li class="flex flex-row gap-4 px-4 items-baseline justify-center">
        <p class="text-xl">
          <span class="">
            ${item.title}
          </span>
        </p>
        <p class="text-xs">
          <span class="text-gray-400">
            ${item.createdAt}
          </span>
        </p>
      </li>
        `)
        .join('');
        // <h3 class="font-bold">My History</h3>
        const completedListTitle = document.createElement('h3');
        completedListTitle.textContent = 'My History';
        completedListTitle.style.fontWeight = 'bold';
        completedList.insertAdjacentElement('afterbegin',completedListTitle)

        // 기존 투두 그리기
        const unCompletedTodoList = document.querySelector('#uncompleted-todo-list');
        unCompletedTodoList.innerHTML = '';
        unCompletedTodoList.innerHTML = todos.map((todo,index) => /*html*/`
          <li class="todo w-[30%] pl-4 flex justify-start items-center flex-row gap-4 h-12 border-b border-b-teal-400">
          <p class="todo-title flex-[0.5]">${ todo.title}</p>
          <form class="flex-[0.1] min-w-max" action="/todolist/checkcompleted/${ todo.id}" method="post">
            <input name="_method" type="hidden" value="PUT" />
            <input class="todo-check${index}" type="checkbox"/>
          </form>
          <div class="flex-[0.3] flex flex-row gap-2 todos-center justify-around">
          <button data-id="${ todo.id}" class="complete-button text-indigo-400 border border-transparent hover:border-indigo-400 px-3 py-2 text-bold" style="display: none">완료</button>
          <a href="/todolist/deletetodo/${ todo.id}"   class="delete-button text-red-400 border border-transparent hover:border-red-400 px-3 py-2 text-bold" style="display: none">삭제</a>
        </div>
        </li>
        `).join('');
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
