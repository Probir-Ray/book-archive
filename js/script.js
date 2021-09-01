// Fetch data from server

const error = document.getElementById('error');

const fetchData = () => {
    const searchText = document.getElementById('search-box').value;
    error.style.display = 'none';

    if(searchText) {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getBooks(data))
    } else {
        error.innerText = `Please type any book name`;
        error.style.display = 'block';
    }
}

fetchData();



const getBooks = books => {
    const bookWrapper = document.getElementById('book-wrapper');
    books.docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-info my-4" style="min-width: 18rem;">
            <div class="card-header bg-info text-white"><h3>Book Name: </h3></div>
            <div class="card-body text-secondary">
                <h5 class="card-title">Author: ${book.author_name[0]}</h5>
                <h5>Publisher: ${book.publisher}</h5>
                <p class="card-text">First Published: ${book.first_publish_year}</p>
                <a href="getBookPicture('${book.cover_i}')" class="btn btn-info">Cover Picture</a>
            </div>
        </div>            
        `;
        document.getElementById('result-found').innerText = book.num_found;
        bookWrapper.appendChild(div);

    })
}