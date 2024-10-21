async function getData() {
  try {
    const response = await fetch("datas/datas.json");
    const data = await response.json();
    console.log("datas", data);
    return data;
  } catch (error) {
    console.error("Erreur dans ton fetch !!!! : ", error);
  }
}

getData().then((data) => {
  const queryString_url_id = window.location.search;
  console.log("id dans l'url", queryString_url_id);

  const urlParams = new URLSearchParams(queryString_url_id);
  console.log("object url params", urlParams);
  const theId = urlParams.get("id");
  console.log("the id", theId);

  // Vérifier sur quelle page on est
  const isIndexPage = document.querySelector(".popular"); // Check si on est sur index.html
  const isMesLivresPage = document.getElementById("book-list"); // Check si on est sur mes-livres.html
  const isBookDetailsPage = document.getElementById("bookDetails-container"); // Check si on est sur bookDetails.html
  const isAuthorPage = document.getElementById("author-container"); // Check si on est sur author.html

  //PAGE INDEX --- HOME
  if (isIndexPage) {
    const popularContainer = document.querySelector(".popular .carousel");
    popularContainer.innerHTML = "";

    data.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.alt = book.title;

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = book.author;

      const bookPrice = document.createElement("p");
      bookPrice.textContent = book.price;

      const bookRating = document.createElement("div");
      bookRating.classList.add("book-rating");
      bookRating.textContent = book.rating;

      // add les éléments au bookCard
      bookCard.appendChild(bookImage);
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPrice);
      bookCard.appendChild(bookRating);

      // add la bookCard au conteneur "Populaire"
      popularContainer.appendChild(bookCard);
    });
  }
  //PAGE MES LIVRES --TOUS LES LIVRES
  else if (isMesLivresPage) {
    const bookListContainer = document.getElementById("book-list");
    bookListContainer.innerHTML = "";

    data.books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.alt = book.title;

      const bookRating = document.createElement("div");
      bookRating.classList.add("book-rating");
      bookRating.textContent = `${"★".repeat(book.rating)} Note`;

      const bookTitle = document.createElement("div");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("div");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = book.author;

      const bookPrice = document.createElement("div");
      bookPrice.classList.add("book-price");
      bookPrice.textContent = `$${book.price}`;

      const bookmark = document.createElement("div");
      bookmark.classList.add("bookmark");
      bookmark.innerHTML = "&#9733;";

      const bookLink = document.createElement("a");
      bookLink.href = `bookDetails.html?id=${book.id}`;

      bookLink.appendChild(bookImage);
      bookLink.appendChild(bookRating);
      bookLink.appendChild(bookTitle);
      bookLink.appendChild(bookAuthor);
      bookLink.appendChild(bookPrice);
      bookLink.appendChild(bookmark);

      bookDiv.appendChild(bookLink);
      bookListContainer.appendChild(bookDiv);
    });
  }
  //PAGE DETAILS DU LIVRE -- BOOK DETAILS
  if (isBookDetailsPage) {
    const bookDetailsContainer = document.getElementById("book-details");
    console.log("hello from book details page");
    console.log("datas de book details", data);

    // Convertir theId en nombre pour la comparaison
    const numericId = Number(theId);

    const selectedBook = data.books.find((book) => book.id === numericId);
    console.log("hello");
    console.log("selected book", selectedBook);

    if (selectedBook) {
      if (selectedBook) {
        bookDetailsContainer.innerHTML = `
          <h3 class="details-title">${selectedBook.title}</h3>
          <span class="book-info">
            <p class="book-author"> ${selectedBook.author}</p>
            <p class="book-date">Date de publication : ${
              selectedBook.publicationDate
            }</p>
          </span>
          <span class="solid-stars" aria-label="Évaluation du livre : ${"★".repeat(
            selectedBook.rating
          )} étoiles">
            ${"★".repeat(selectedBook.rating)}
          </span>
        `;

        const bookCoverImage = document.createElement("img");
        bookCoverImage.src = selectedBook.image;
        bookCoverImage.alt = selectedBook.title;

        const bookDetailsContainerMain = document.getElementById(
          "bookDetails-container"
        );
        bookDetailsContainerMain.prepend(bookCoverImage);

        const aboutContainer = document.querySelector(
          ".about-container .about"
        );
        aboutContainer.innerHTML = `
          <h2>À propos de cet e-book</h2>
          <br />
          <p>${selectedBook.description}</p>
        `;
      }
      console.log("Livre non trouvé");
    }
  } else {
    console.log("erreur !!");
  }
});
