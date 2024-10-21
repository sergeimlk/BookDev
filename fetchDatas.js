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
  // Vérifier sur quelle page on est
  const isIndexPage = document.querySelector(".popular"); // Check si on est sur index.html
  const isMesLivresPage = document.getElementById("book-list"); // Check si on est sur mes-livres.html
  const bookDetailsPage = document.getElementById("book-details"); // Check si on est sur bookDetails.html

  if (isIndexPage) {
    // On est sur index.html, on affiche les livres dans la section "Populaire"
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
  
  else if (isMesLivresPage) {
    // On est sur mes-livres.html, on affiche les livres dans la liste des livres
    const bookListContainer = document.getElementById("book-list");
    bookListContainer.innerHTML = "";

    data.books.forEach((book) => {
      // Créer la div principale pour chaque livre
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      // Div pour l'image du livre
      const bookImageDiv = document.createElement("div");
      bookImageDiv.classList.add("book-image");

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.alt = book.title;
      // Ajouter l'image dans sa div
      bookImageDiv.appendChild(bookImage);

      // Div pour les informations textuelles du livre
      const bookInfosDiv = document.createElement("div");
      bookInfosDiv.classList.add("book-infos-container");

      const bookTitle = document.createElement("div");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("div");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = book.author;

      const bookRating = document.createElement("div");
      bookRating.classList.add("book-rating");
      bookRating.textContent = `${"★".repeat(book.rating)} Note`;

      const bookPrice = document.createElement("div");
      bookPrice.classList.add("book-price");
      bookPrice.textContent = `${book.price}`;

      const bookmark = document.createElement("div");
      bookmark.classList.add("bookmark");
      bookmark.innerHTML = "&#9733;";

      // Ajouter les infos textuelles dans la div des infos
      bookInfosDiv.appendChild(bookTitle);
      bookInfosDiv.appendChild(bookAuthor);
      bookInfosDiv.appendChild(bookRating);
      bookInfosDiv.appendChild(bookPrice);
      bookInfosDiv.appendChild(bookmark);

      // Ajouter l'image et les infos dans la carte principale
      bookDiv.appendChild(bookImageDiv);
      bookDiv.appendChild(bookInfosDiv);

      // Ajouter la carte complète au container
      bookListContainer.appendChild(bookDiv);
    });

  } else if (bookDetailsPage) {
    // On est sur bookDetails.html, on affiche les détails du livre
    const bookId = new URLSearchParams(window.location.search).get("id");
    const book = data.books.find((book) => book.id === bookId);

    const bookDetailsContainer = document.getElementById("book-details");
    bookDetailsContainer.innerHTML = "";

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-details");

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
    bookPrice.textContent = `${book.price}`;

    const bookDescription = document.createElement("div");
    bookDescription.classList.add("book-description");
    bookDescription.textContent = book.description;

    bookDiv.appendChild(bookImage);
    bookDiv.appendChild(bookRating);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPrice);
    bookDiv.appendChild(bookDescription);

    bookDetailsContainer.appendChild(bookDiv);
  } else {
    console.log("erreur");
  }
});

//récup les donnnées de book pour la page bookDetails et les affiche dans le DOM à partir de l'id de l'url TOOOOODOOOOOO !!
