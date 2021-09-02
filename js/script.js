/********************
 * JavaScript Code
 * *****************/

// Declare common variable
const error = document.getElementById('error');
const searchInput = document.getElementById('search-box');
const resultFound = document.getElementById('result-found');
const bookWrapper = document.getElementById('book-wrapper');

// Fetch data from server
const fetchData = () => {
    error.style.display = 'none';
    const searchText = searchInput.value;

    if(searchText) {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getBooks(data))
    } else {
        error.innerText = `Please type any book name`;
        error.style.display = 'block';
        bookWrapper.innerText = '';
        resultFound.innerText = 'No';
    }
    searchInput.value = '';
}



const getBooks = books => {
    bookWrapper.innerText = '';

    // Loop for book searching.
    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-info" style="min-width: 18rem;">
            <div class="card-header bg-info text-white"><h4>Book Name: ${book.title}</h4></div>
            <img height="250" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body text-secondary">
                <h5 class="card-title">Author: ${book.author_name ? book.author_name : 'No author found'}</h5>
                <h5>Publisher: ${book.publisher ? book.publisher : 'NA'}</h5>
                <p class="card-text">First Published: 
                ${book.first_publish_year ? book.first_publish_year : 'NA'}</p>
            </div>
        </div>            
        `;

        bookWrapper.appendChild(div); 

    });

    resultFound.innerText = books.numFound ? books.numFound : 'No';
    
}