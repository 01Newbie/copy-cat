// like button
function addLikeButton(element) {
  if (!element.querySelector(".btn-like")) {
    let likeButton = document.createElement("button");
    likeButton.className = "btn btn-primary btn-like";
    likeButton.textContent = "Like";
    likeButton.onclick = function () {
      likeItem(this);
    };

    let likeCountSpan = document.createElement("span");
    likeCountSpan.className = "like-count";
    likeCountSpan.textContent = "0 Likes";

    element.appendChild(likeButton);
    element.appendChild(likeCountSpan);
  }
}

// like buttons
function addLikeButtonsToSpecificElements() {
  let articles = document.querySelectorAll("article");
  let images = document.querySelectorAll("img");
  let comments = document.querySelectorAll(".comment");

  articles.forEach((article) => {
    addLikeButton(article);
  });

  images.forEach((image) => {
    let parentElement = image.parentElement;
    if (parentElement && !parentElement.querySelector(".btn-like")) {
      addLikeButton(parentElement);
    }
  });

  comments.forEach((comment) => {
    addLikeButton(comment);
  });
}

// initialize saved items
function initializeSavedItems() {
  const savedItemsJSON = localStorage.getItem("savedItems");
  const savedItems = JSON.parse(savedItemsJSON);
  const container = document.getElementById("savedItemsContainer");

  if (!container) {
    console.error('Container element "savedItemsContainer" not found.');
    return;
  }

  if (savedItems && savedItems.length > 0) {
    const itemList = document.createElement("ul");
    savedItems.forEach((item) => {
      const listItem = document.createElement("li");

      const imageElement = document.createElement("img");
      imageElement.src = item;
      imageElement.alt = "Saved Image";
      imageElement.style.width = "100px";

      const urlText = document.createElement("p");
      urlText.textContent = item;

      listItem.appendChild(imageElement);
      listItem.appendChild(urlText);
      itemList.appendChild(listItem);
    });
    container.appendChild(itemList);
  } else {
    container.textContent = "No items saved for later.";
  }
}

// save an item for later
function saveForLater(button) {
  let imageElement = button.parentElement.querySelector("img");

  if (imageElement) {
    let imageURL = imageElement.src;

    try {
      let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
      savedItems.push(imageURL);
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
      alert(
        `Image saved for later. You now have ${savedItems.length} item(s) in your "Save for later" folder.`
      );
      console.log("Image URL:", imageURL);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  } else {
    console.error("Image not found.");
  }
}

// liking an item
function likeItem(button) {
  let item = button.parentElement;
  let likeCountElement = item.querySelector(".like-count");
  let currentLikes = parseInt(likeCountElement.textContent);
  currentLikes++;
  likeCountElement.textContent = `${currentLikes} Likes`;
}

// Combine window onload functions
window.onload = function () {
  addLikeButtonsToSpecificElements();
  initializeSavedItems();
};

//  comment form submission
const commentForm = document.getElementById("commentForm");
if (commentForm) {
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let comment = document.getElementById("commentInput").value;
    document.getElementById("commentInput").value = "";
    let commentElement = document.createElement("div");
    commentElement.textContent = comment;
    document.getElementById("commentSection").appendChild(commentElement);
  });
} else {
  console.error('Comment form element "commentForm" not found.');
}

// hiding/showing paragraphs
const hideButton = document.getElementById("hide");
const showButton = document.getElementById("show");

if (hideButton) {
  hideButton.addEventListener("click", function () {
    document.querySelectorAll("p").forEach((p) => {
      p.style.display = "none";
    });
  });
} else {
  console.error('Hide button element "hide" not found.');
}

if (showButton) {
  showButton.addEventListener("click", function () {
    document.querySelectorAll("p").forEach((p) => {
      p.style.display = "block";
    });
  });
} else {
  console.error('Show button element "show" not found.');
}

// chained effect
const chainedEffectButton = document.getElementById("chainedeffect");
if (chainedEffectButton) {
  chainedEffectButton.addEventListener("click", function () {
    let p1 = document.getElementById("p1");
    if (p1) {
      p1.style.color = "red";

      $(p1).slideUp(2000).slideDown(2000);
    } else {
      console.error('Paragraph element "p1" not found.');
    }
  });
} else {
  console.error('Chained effect button element "chainedeffect" not found.');
}

// Dropdown menu
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
