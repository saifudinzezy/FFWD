function main() {
    const baseUrl = "https://web-server-book-dicoding.appspot.com";

    //async -> await
    const getBook = async() => {
        try {
            //fungsi fetch() akan mengembalikan promise resolve jika request berhasil dilakukan.
            const response = await fetch(`${baseUrl}/list`);
            //ambil promise json, ubah nilai response menjadi JSON
            const responseJson = await response.json();
            //cek error
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderAllBooks(responseJson.books);
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };


    const insertBook = async(book) => {
        try {
            const options = {
                method: "POST",
                // properti
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                // ubah string ke json
                body: JSON.stringify(book)
            }

            const response = await fetch(`${baseUrl}/add`, options)
                //ubah response ke json
            const responseJson = await response.json();
            showResponseMessage(responseJson.message);
            getBook();
        } catch (error) {
            showResponseMessage(error)
        }
    };

    const updateBook = async(book) => {
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                body: JSON.stringify(book)
            }

            //update berdasarkan id
            const response = await fetch(`${baseUrl}/edit/${book.id}`, options);
            //get json, ubah ke json
            const responseJson = await response.json();

            showResponseMessage(responseJson.message);
            //reload data baru
            getBook();
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const removeBook = async(bookId) => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    "X-Auth-Token": "12345"
                }
            }

            //update berdasarkan id
            const response = await fetch(`${baseUrl}/delete/${bookId}`, options);
            //get json, ubah ke json
            const responseJson = await response.json();

            showResponseMessage(responseJson.message);
            //reload data baru
            getBook();
        } catch (error) {
            showResponseMessage(error);
        }
    };






    /*
        jangan ubah kode di bawah ini ya!
    */

    // digunakan untuk merender atau menampilkan data books yang didapat ke dalam DOM
    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    //digunakan untuk menampilkan window.alert() dengan pesan yang diambil dari argument fungsinya.
    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    //di sana terdapat kode untuk mengakses elemen <input> dan <button> yang ditampilkan pada halaman agar elemen tersebut dapat berfungsi dengan semestinya
    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function() {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function() {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();
    });
}

export default main;