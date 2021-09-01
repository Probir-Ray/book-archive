// Fetch data from server

const error = document.getElementById('error');

const fetchData = () => {
    let searchText = document.getElementById('search-box').value;
    error.style.display = 'none';

    if(searchText) {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getBooks(data))
    } else {
        error.innerText = `Please type any book name`;
        error.style.display = 'block';
        document.getElementById('book-wrapper').innerText = '';
        document.getElementById('result-found').innerText = 'No';
    }
    searchText = '';
}

fetchData();



const getBooks = books => {
    const bookWrapper = document.getElementById('book-wrapper');
    bookWrapper.innerText = '';
    document.getElementById('result-found').innerText
    console.log(books);
    books.docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-info" style="min-width: 18rem;">
            <div class="card-header bg-info text-white"><h4>Book Name: ${book.text[3]}</h4></div>
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

    document.getElementById('result-found').innerText = books.num_found ? books.num_found : 'No';
}