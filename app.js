// Memilih Elemen DOM
const todosInput = document.querySelector('.todo-input');
const todosButton = document.querySelector('.todo-button');
const todosList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listener
document.addEventListener('DOMContentLoaded', getLocalTodos);
todosButton.addEventListener('click', addTodo);
todosList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Fungsi untuk Menambahkan Tugas
function addTodo(e) {
  e.preventDefault();

  // Membuat div untuk todo
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Membuat elemen list
  const newTodo = document.createElement('li');
  newTodo.innerText = todosInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Menyimpan ke local storage
  saveLocalTodos(todosInput.value);

  // Menambahkan tombol selesai
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // Menambahkan tombol hapus
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // Menambahkan ke daftar
  todosList.appendChild(todoDiv);

  // Mengosongkan nilai input
  todosInput.value = '';
}

// Fungsi untuk Menghapus dan Menandai Tugas
function deleteCheck(e) {
  const item = e.target;

  // Menghapus todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('slide');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // Menandai selesai
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

// Fungsi untuk Menyimpan Tugas ke Local Storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi untuk Mengambil Tugas dari Local Storage
function getLocalTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todosList.appendChild(todoDiv);
  });
}

// Fungsi untuk Menghapus Tugas dari Local Storage
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Fungsi untuk Memfilter Tugas
function filterTodo(e) {
  const todos = todosList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'incomplete':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
