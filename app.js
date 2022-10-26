// Listeners
document.addEventListener('DOMContentLoaded', handleInitialLoad, false);

// Event Handlers
async function handleInitialLoad(e) {
  let users = await fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  
  users.forEach(user => {
    addUser(user)
  })
}

async function handleLoadPosts(id) {
  let ul = document.getElementById('posts')
  removeAllChildNodes(ul)
  let posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  .then(response => response.json())

  posts.forEach(post => {
    addPost(post)
  })
}

// Helpers
function addUser(user) {
  let ul = document.getElementById('users')
  let li = document.createElement('li')
  li.innerHTML = `
    <span class="list-item">${user.name}</span>
  `
  li.classList.add('user')
  li.addEventListener('click', function() { handleLoadPosts(user.id) });
  ul.appendChild(li)
}

function addPost(post) {
  let ul = document.getElementById('posts')
  let li = document.createElement('li')
  li.innerHTML = `
    <h4>${post.title}</h4>
    <span class="list-item">${post.body}</span>
  `
  li.classList.add('post')
  ul.appendChild(li)
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}