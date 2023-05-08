
const deleteButtonList = document.querySelectorAll('.todo .delete-button');
const allDeleteBtn = document.querySelector('#all-delete-button');
const submitAllDeleteModal = document.querySelector('#modal');
const cancelAllDeleteTodoBtn = document.querySelector('#cancel-alldelete-todo-button')
const submitAllCompletedButton = document.querySelector('#submit-all-completed-button')
const unCompletedTodoList = document.querySelector('#uncompleted-todo-list');

unCompletedTodoList.addEventListener('click', (event) => {
  console.log('deps 0');
  if (event.target.matches('.todo-checkbox')) {
    console.log('click todo-checkbox');
      const checkbox = event.target;
      const todo = event.target.closest('.todo');
      const completeButton = todo.querySelector('.complete-button')
      const deleteButton = todo.querySelector('.delete-button')
    if(event.target.checked) {
      console.log('checkbox if true');
      completeButton.style.display = 'block';
      deleteButton.style.display = 'block';
      checkbox.setAttribute('value', checkbox.checked);
    }
    if(!event.target.checked) {
      console.log('checkbox if false');
      completeButton.style.display = 'none';
      deleteButton.style.display = 'none';
      checkbox.setAttribute('value', checkbox.checked);
    }
  } else if (event.target.matches('.complete-button')) {
    console.log('click completebutton');
    const todo = event.target.closest('.todo');
    const todoTitle = todo.querySelector('.todo-title')
    
    const todoId = event.target.getAttribute('data-id');
    todos[todoId].completed = !todos[todoId].completed;
    // event.target.completed = !event.target.completed;
    
    if(todos[todoId].completed) {
      todoTitle.style.textDecoration = 'line-through';
      todoTitle.style.color = '#ccc';
    }
    if(!todos[todoId].completed) {
      todoTitle.style.textDecoration = 'none'  
      todoTitle.style.color = '#000';
    }
    console.log(todoTitle);
  }
});


allDeleteBtn.addEventListener('click', () => {
  submitAllDeleteModal.style.display = 'flex';
})

cancelAllDeleteTodoBtn.addEventListener('click', () => {
  submitAllDeleteModal.style.display = 'none';
})

submitAllCompletedButton.addEventListener('click', () => {
    const completeTodos = todos.filter((todo) => todo.completed);
    if(completeTodos.length === 0) {
      alert('한개 이상 완료해주세요');
      return;
    }    
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
        console.log('success',data);
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
        const completedListTitle = document.createElement('h3');
        completedListTitle.textContent = 'My History';
        completedListTitle.style.fontWeight = 'bold';
        completedList.insertAdjacentElement('afterbegin',completedListTitle)

        // 기존 투두 그리기
        // 이벤트 위임에 문제가 됐던 이유
        // 1.innerHTML 사용으로 기존에 부착한 이밴트리스너가 삭제됨.
        // unCompletedTodoList.innerHTML = '';
        // 이벤트 위임에 문제가 됐던 이유
        // 2. 템플릿 내부 input에 todo-checkbox 클래스를 넣지 않아서 제대로 target을 찾지 못하였음.

        // innerHTML을 사용하지 않으므로 자식요소를 추가하는 형식 변경
        // Before.
        // unCompletedTodoList.innerHTML = todos.map((todo) => /*html*/`
        //   <li class="todo w-[30%] pl-4 flex justify-start items-center flex-row gap-4 h-12 border-b border-b-teal-400">
        //   <p class="todo-title flex-[0.5]">${todo.title}</p>
        //   <div class="flex-[0.1] min-w-max">
        //     <input class="todo-check${todo.id}" type="checkbox"/>
        //   </div>
        //   <div class="flex-[0.3] flex flex-row gap-2 items-center justify-around">
        //   <button data-id="${todo.id}" class="complete-button text-indigo-400 border border-transparent hover:border-indigo-400 px-3 py-2 text-bold" style="display: none">완료</button>
        //   <a href="/todolist/deletetodo/${todo.id}" class="delete-button text-red-400 border border-transparent hover:border-red-400 px-3 py-2 text-bold" style="display: none">삭제</a>
        // </div>
        // </li>
        // `).join('');
        

        // After
        while(unCompletedTodoList.firstChild){
          unCompletedTodoList.removeChild(unCompletedTodoList.firstChild);
        }
        
        for(let i = 0; i < todos.length; i++) {
          const newUnCompletedTodo = document.createElement('li');
          newUnCompletedTodo.classList.add('todo', 'w-[30%]', 'pl-4', 'flex', 'justify-start', 'items-center', 'flex-row', 'gap-4', 'h-12', 'border-b', 'border-b-teal-400');
          newUnCompletedTodo.innerHTML = /*html*/`
          <p class="todo-title flex-[0.5]">${todos[i].title}</p>
          <div class="flex-[0.1] min-w-max">
          <input class="todo-checkbox todo-check${todos[i].id}" type="checkbox"/>
        </div>
        <div class="flex-[0.3] flex flex-row gap-2 items-center justify-around">
        <button data-id="${todos[i].id}" class="complete-button text-indigo-400 border border-transparent hover:border-indigo-400 px-3 py-2 text-bold" style="display: none">완료</button>
        <a href="/todolist/deletetodo/${todos[i].id}" class="delete-button text-red-400 border border-transparent hover:border-red-400 px-3 py-2 text-bold" style="display: none">삭제</a>
      </div>
          `
          unCompletedTodoList.appendChild(newUnCompletedTodo);
        }
      })
      .catch((error) => console.error(error));
}




      //   const unCompletedTodos = todos.map((todo) => /*html*/`
      //   <li class="todo w-[30%] pl-4 flex justify-start items-center flex-row gap-4 h-12 border-b border-b-teal-400">
      //   <p class="todo-title flex-[0.5]">${todo.title}</p>
      //   <div class="flex-[0.1] min-w-max">
      //   <div class="flex-[0.1] min-w-max">
      //     <input class="todo-check${todo.id}" type="checkbox"/>
      //   </div>
      //   <div class="flex-[0.3] flex flex-row gap-2 items-center justify-around">
      //   <button data-id="${todo.id}" class="complete-button text-indigo-400 border border-transparent hover:border-indigo-400 px-3 py-2 text-bold" style="display: none">완료</button>
      //   <a href="/todolist/deletetodo/${todo.id}" class="delete-button text-red-400 border border-transparent hover:border-red-400 px-3 py-2 text-bold" style="display: none">삭제</a>
      // </div>
      // </li>
      // `).join('');
      // unCompletedTodoList.append(unCompletedTodos);
        // const completeCheckboxList = document.querySelectorAll("input[type='checkbox']");
        // const completeButtonList = document.querySelectorAll('.todo .complete-button');
        // const deleteButtonList = document.querySelectorAll('.todo .delete-button');
        // completeCheckboxList.forEach((checkbox,index) => {
        //   const completeButton = completeButtonList[index];
        //   const deleteButton = deleteButtonList[index];
        //   checkbox.addEventListener('change', () => {
        //     if(checkbox.checked) {
        //       completeButton.style.display = 'block';
        //       deleteButton.style.display = 'block';
        //       checkbox.setAttribute('value', checkbox.checked)
        //     } else {
        //       completeButton.style.display = 'none';
        //       deleteButton.style.display = 'none';
        //       checkbox.setAttribute('value', checkbox.checked)
        //     }
        //   })
        // })
        // 이 이벤트는 다시 부착할 필요가 없음
        // 왜냐면, 사라지지 않았으니까..?
        // 근데 위에서 다시 그렸는데.. 요소가 똑같다면.. 그리지 않는다는 것인가..?
        // completeButtonList.forEach((button) => {
        //   button.addEventListener('click', () => {
        //     const todoId = button.getAttribute('data-id');
        //     todos[todoId].completed = !todos[todoId].completed;
        //     todoTitle[todoId].classList.toggle('line-through')
        //     todoTitle[todoId].classList.toggle('text-gray-300')
        //     console.log(todos[todoId]);
        //   })
        // })