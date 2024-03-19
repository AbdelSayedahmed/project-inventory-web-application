const openNav = () => (document.getElementById("form").style.width = "100%");
const closeNav = () => (document.getElementById("form").style.width = "0%");

const openPopUp = () => (document.getElementById("popup").style.width = "100%");
const closePopUp = () => (document.getElementById("popup").style.width = "0%");

const upload = document.getElementById("upload");
const formReset = document.getElementById("form-reset");
const form = document.getElementById("item-form");
const main = document.getElementById("main");
const errorText = document.getElementById("errorText");
const sureDelBtn = document.querySelector(".make-sure-del");
const cancel = document.querySelector(".cancel");

formReset.addEventListener("click", () => {
  form.reset();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);

  const itemName = document.getElementById("name-input").value;
  const description = document.getElementById("description-input").value;
  const inputImg = document.getElementById("img-input").value;
  const price = document.getElementById("price-input").value;
  const condition = document.getElementById("condition").value;

  const validPrice = /^\d{1,8}(?:\.\d{1,4})?$/;

  if (!validPrice.test(price)) {
    errorText.style.display = "block";
    errorText.innerText = `Please enter valid price like 10.99 or 1.44`;
    return;
  }

  errorText.style.display = "none";
  // Create item profile container
  const result = document.createElement("div");
  result.className = "uploaded-item";

  const displayImg = document.createElement("img");
  displayImg.className = "uploaded-image";
  displayImg.setAttribute("src", inputImg);
  displayImg.setAttribute("alt", `image of ${itemName}`);
  result.append(displayImg);

  const displayCard = document.createElement("div");
  displayCard.className = "uploaded-card";

  const displayTitle = document.createElement("h3");
  displayTitle.className = "uploaded-title";
  displayTitle.innerText = itemName;
  displayCard.append(displayTitle);

  const displayDescription = document.createElement("p");
  displayDescription.className = "uploaded-description";
  displayDescription.innerText = description;
  displayCard.append(displayDescription);

  const priceCondContainer = document.createElement("div");
  priceCondContainer.classList.add("price-condition", "container");
  priceCondContainer.innerText = `${condition} - $${price}`;
  displayCard.append(priceCondContainer);

  const editDelBtnNav = document.createElement("nav");
  editDelBtnNav.className = "edit-del-btn";

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit", "btn");
  editBtn.innerText = "Edit";
  editDelBtnNav.append(editBtn);

  const delBtn = document.createElement("button");
  delBtn.classList.add("del", "btn");
  delBtn.innerText = "Remove";
  editDelBtnNav.append(delBtn);

  displayCard.append(editDelBtnNav);

  result.append(displayCard);
  main.append(result);

  delBtn.addEventListener("click", () => {
    openPopUp();
  });

  sureDelBtn.addEventListener("click", () => {
    main.removeChild(result);
    closePopUp();
  });

  cancel.addEventListener("click", () => {
    closePopUp();
  })

  form.reset();
  closeNav();
});

