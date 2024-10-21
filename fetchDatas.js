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
  // recup l id dans l'url pour afficher les datas
  const queryString_url_id = window.location.search;
  console.log("id dans l'url", queryString_url_id);

  const urlParams = new URLSearchParams(queryString_url_id);
  console.log("object url params", urlParams);
  const theId = urlParams.get("id");
  console.log("the id", theId);
  // Convertir theId en nombre pour la comparaison
  const numericId = Number(theId);

  // Vérifier sur quelle page on est
  const isIndexPage = document.querySelector(".popular"); // Check si on est sur index.html
  const isMesLivresPage = document.getElementById("book-details"); // Check si on est sur mes-livres.html
  const isBookDetailsPage = document.getElementById(
    "bookDetailsMain-container"
  ); // Check si on est sur bookDetails.html
  const isAuthorPage = document.getElementById("author-main-container"); // Check si on est sur author.html

  //PAGE INDEX --- HOME
  if (isIndexPage) {
    // ciblage du conteneur Popular et carousel
    const popularContainer = document.querySelector(".popular .carousel");
    //et vider le contenu déjà présnt (normalemnt il n'y a rien j'ai déjà vidé le contenu en html)
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

      const bookLink = document.createElement("a");
      bookLink.href = `bookDetails.html?id=${book.id}`;

      //add les elts au bookLink
      bookLink.appendChild(bookImage);
      bookLink.appendChild(bookTitle);
      bookLink.appendChild(bookAuthor);
      bookLink.appendChild(bookPrice);
      bookLink.appendChild(bookRating);
      //add bookCard au bookLink
      bookCard.appendChild(bookLink);
      //add bookCard au conteneur "Populaire"
      popularContainer.appendChild(bookCard);
    });
  }
  //PAGE MES LIVRES --TOUS LES LIVRES
  else if (isMesLivresPage) {
    // ciblage du conteneur book-list
    const bookListContainer = document.getElementById("book-list");
    // vidage du contenu déjà présent (normalement il n'y a rien j'ai déjà vidé le contenu en html)
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
    // ciblage du conteneur bookDetails-container
    const bookDetailsContainer = document.getElementById(
      "bookDetails-container"
    );
    // vidage du contenu déjà présent (normalement il n'y a rien j'ai déjà vidé le contenu en html)
    bookDetailsContainer.innerHTML = "";
    console.log("hello from book details page");
    console.log("datas de book details", data);

    const selectedBook = data.books.find((book) => book.id === numericId);
    console.log("hello");
    console.log("selected book", selectedBook);

    if (selectedBook) {
      if (selectedBook) {
        bookDetailsContainer.innerHTML = `
          <img src="${selectedBook.image}" alt="${selectedBook.title}" />
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

        const linkAuthor = document.getElementById("link-author");
        linkAuthor.href = `authorDetails.html?id=${selectedBook.id}`;

        // const bookDetailsContainerMain = document.getElementById(
        //   "bookDetails-container"
        // );
        // bookDetailsContainerMain.prepend(bookCoverImage);

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
  }
  //PAGE AUTEUR -- AUTHOR
  if (isAuthorPage) {
    const authorContainer = document.getElementById("author-details");
    const aboutContainer = document.querySelector(".about-container");
    console.log("hello from author page");
    console.log("datas de author", data);
    // Convertir theId en nombre pour la comparaison
    // const numericId = Number(theId);

    const selectedAuthor = data.books.find((book) => book.id === numericId);
    console.log("hello");

    const authorName = selectedAuthor.author;
    console.log("Nom de l'auteur : ", authorName);

    if (selectedAuthor) {
      authorContainer.innerHTML = `
        <h3 class="details-title">${selectedAuthor.author}</h3>
        <span class="author-info">
          <p class="book-author"> <i class="fa-solid fa-book-open" aria-hidden="true"></i> ${selectedAuthor.numberOfBooks} books </p>

      `;
      aboutContainer.innerHTML = `
      <br />
        <h2>À propos de cet auteur</h2>
        <br />
        <p>${selectedAuthor.aboutAuthor}</p>
      `;
    }
  } else {
    console.log("erreur !!");
  }
});
