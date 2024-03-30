const openForm = () => (document.getElementById("form").style.width = "100%");
const closeForm = () => (document.getElementById("form").style.width = "0%");

const openPopUp = () => (document.getElementById("popup").style.width = "100%");
const closePopUp = () => (document.getElementById("popup").style.width = "0%");

const openEdit = () =>
  (document.getElementById("edit-form-div").style.width = "100%");
const closeEdit = () =>
  (document.getElementById("edit-form-div").style.width = "0%");

const closeBtn = document.querySelector(".close-btn");
const closeEditBtn = document.querySelector(".close-edit-btn");

const upload = document.getElementById("upload");
const formReset = document.getElementById("form-reset");
const form = document.getElementById("item-form");
const main = document.getElementById("main");
const errorText = document.querySelector(".error");
const sureDelBtn = document.querySelector(".make-sure-del");
const cancel = document.querySelector(".cancel");
const editForm = document.getElementById("edit-form");

closeEditBtn.addEventListener("click", () => closeEdit());

closeBtn.addEventListener("click", () => {
  closeForm();
  form.reset();
});

formReset.addEventListener("click", () => form.reset());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Retrieve input values
  let itemName = document.getElementById("name-input").value;
  let description = document.getElementById("description-input").value;
  let inputImg = document.getElementById("img-input").value;
  let price = document.getElementById("price-input").value;
  let condition = document.getElementById("condition-input").value;

  const validPrice = /^\d{1,8}(?:\.\d{1,4})?$/;

  if (!validPrice.test(price)) {
    errorText.style.display = "block";
    errorText.innerText = `Please enter a valid price like 10.99 or 1.44`;
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
  priceCondContainer.innerHTML = `<span class="uploaded-condition">${condition}</span> - $<span class="uploaded-price">${price}</span> `;
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

  // Event listener for the delete button
  delBtn.addEventListener("click", () => {
    openPopUp();

    sureDelBtn.addEventListener("click", () => {
      main.removeChild(result);
      closePopUp();
    });

    cancel.addEventListener("click", () => closePopUp());
  });

  // Event listener for the edit button
  editBtn.addEventListener("click", (e) => {
    openEdit();
    let curr = e.target.parentNode.parentNode.parentNode;
    let editCurr = document.getElementById("edit-form");
    console.log(e.target.parentNode.parentNode.parentNode);

    const capItemTitle = curr.querySelector(".uploaded-title").innerText;
    const capImg = curr.querySelector(".uploaded-image").src;
    const capDescription = curr.querySelector(
      ".uploaded-description"
    ).innerText;
    const capPrice = curr.querySelector(".uploaded-price").innerText;
    const capCondition = curr.querySelector(".uploaded-condition").innerText;

    // Capture the values for this specific item
    const currentItem = {
      capItemTitle,
      capImg,
      capDescription,
      capPrice,
      capCondition,
    };

    console.log(currentItem);
    console.log(editCurr);

    editCurr.querySelector("#edit-title-input").value =
      currentItem.capItemTitle;
    editCurr.querySelector("#edit-description-input").value =
      currentItem.capDescription;
    editCurr.querySelector("#edit-img-input").value = currentItem.capImg;
    editCurr.querySelector("#edit-price-input").value = currentItem.capPrice;
    editCurr.querySelector("#edit-condition-input").value =
      currentItem.capCondition;

    // Event listener for the edit form submit
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const editTitle = document.getElementById("edit-title-input").value;
      const editDescription = document.getElementById(
        "edit-description-input"
      ).value;
      const editImg = document.getElementById("edit-img-input").value;
      const editPrice = document.getElementById("edit-price-input").value;
      const editCondition = document.getElementById(
        "edit-condition-input"
      ).value;

      if (!validPrice.test(editPrice)) {
        errorText.style.display = "block";
        errorText.innerText = `Please enter a valid price like 10.99 or 1.44`;
        return;
      }

      errorText.style.display = "none";

      curr.querySelector(".uploaded-title").innerText = editTitle;
      curr.querySelector(".uploaded-description").innerText = editDescription;
      curr.querySelector(".uploaded-image").src = editImg;
      curr.alt = `image of ${editImg}`;
      curr.querySelector(".uploaded-price").innerText = editPrice;
      curr.querySelector(".uploaded-condition").innerText = editCondition;

      closeEdit();
      curr = null;
    });
  });

  // Reset form and close it
  form.reset();
  closeForm();
});
