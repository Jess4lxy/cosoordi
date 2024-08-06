document.addEventListener('DOMContentLoaded', () => {
    const authorList = document.getElementById('author-list');
    const bookList = document.getElementById('book-list');
  
    function fetchAuthors() {
      fetch('/api/authors')
        .then(response => response.json())
        .then(data => {
          authorList.innerHTML = '';
          data.forEach(author => {
            const li = document.createElement('li');
            li.textContent = `${author.id} ${author.nombre} ${author.apellido}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteAuthor(author.id));
            li.appendChild(deleteButton);
            authorList.appendChild(li);
          });
        });
    }

    function fetchBooks() {
      fetch('/api/books')
        .then(response => response.json())
        .then(data => {
          bookList.innerHTML = '';
          data.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.id} ${book.titulo} - ${book.precio} USD`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteBook(book.id));
            li.appendChild(deleteButton);
            bookList.appendChild(li);
          });
        });
    }
  
    document.getElementById('add-author-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const firstname = document.getElementById('author-firstname').value;
      const lastname = document.getElementById('author-lastname').value;
      const birthdate = document.getElementById('author-birthdate').value;
      fetch('/api/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: firstname, apellido: lastname, fecha_nacimiento: birthdate })
      }).then(() => {
        fetchAuthors();
      });
    });
    document.getElementById('upd-author-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const id = document.getElementById("upd-id").value;
      const firstname = document.getElementById('upd-author-firstname').value;
      const lastname = document.getElementById('upd-author-lastname').value;
      const birthdate = document.getElementById('upd-author-birthdate').value;
      fetch(`/api/authors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idAuth: idAuth, nombre: firstname, apellido: lastname, fecha_nacimiento: birthdate })
      }).then(() => {
        fetchAuthors();
      });
    });
  
    document.getElementById('add-book-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('book-title').value;
      const pubdate = document.getElementById('book-pubdate').value;
      const authorId = document.getElementById('book-author-id').value;
      const price = document.getElementById('book-price').value;
      fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo: title, fecha_publicacion: pubdate, autor_id: authorId, precio: price })
      }).then(() => {
        fetchBooks();
      });
    });
    document.getElementById('upd-book-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const idBook = document.getElementById("upd-book-id").value;
      const title = document.getElementById('upd-book-title').value;
      const pubdate = document.getElementById('upd-book-pubdate').value;
      const authorId = document.getElementById('upd-book-author-id').value;
      const price = document.getElementById('upd-book-price').value;
      id = "upd-book-id"
      fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idBook: idBook, titulo: title, fecha_publicacion: pubdate, autor_id: authorId, precio: price })
      }).then(() => {
        fetchBooks();
      });
    });
  
    function deleteAuthor(id) {
      fetch(`/api/authors/${id}`, { method: 'DELETE' })
        .then(() => fetchAuthors());
    }
  
    function deleteBook(id) {
      fetch(`/api/books/${id}`, { method: 'DELETE' })
        .then(() => fetchBooks());
    }
  
    fetchAuthors();
    fetchBooks();
  });
  