// Fetch the page name from the document
let pageName = document.querySelector(".page-name").innerText;

// Construct the URL for the JSON file based on the page name
let jsonFileUrl = './json_files/' + pageName.toLowerCase() + '.json';

// Fetch the JSON file
fetch(jsonFileUrl)
.then(response => response.json()) // Parse the JSON from the response
.then(data => {
    // Process the data
    let sneakersContainer = document.querySelector('.group');
    let leftArrowGroup = document.querySelector("#leftArrow");
    let rightArrowGroup = document.querySelector("#rightArrow");
    let line = 0, galleryWrap, html;

    // Check if the page name exists in the data
    if (!data)
        return;
    
    // Loop through the array and display the data
    data.forEach((sneaker, index) => {
        if (index % 4 == 0) {
            galleryWrap = document.createElement("div");
            galleryWrap.classList.add("gallery-wrap");
        }

        let card = document.createElement('div');
        let snk = document.createElement("div");
        let imgElement = document.createElement('img');
        let titleElement = document.createElement('h1');
        let sizeList = document.createElement('div');
        let purchase = document.createElement("div");
        let purchaseBtn = document.createElement("button");

        card.classList.add("card");
        snk.classList.add("sneaker");
        imgElement.src = sneaker.imgSrc;
        imgElement.classList.add("scrollable-image");
        titleElement.classList.add("title");
        titleElement.classList.add("card-title");
        titleElement.innerText = sneaker.title;
        sizeList.classList.add("sizes");
        sizeList.id = `sizes-${index + 1}`;
        purchase.classList.add("purchase");
        purchaseBtn.classList.add("purchase-button");
        purchaseBtn.innerText = "Purchase";
        
        sneaker.sizes.forEach(sizeInfo => {
            let sizeItem = document.createElement('button');
            sizeItem.classList.add("size-button");
            sizeItem.dataset.size = sizeInfo.size;
            sizeItem.id = `size-${sizeInfo.size.replace("EU", "")}-${index}`;
            sizeItem.innerHTML = `${sizeInfo.size} <br> ${sizeInfo.cost}`;
            sizeList.appendChild(sizeItem);
        });
        
        snk.appendChild(imgElement);
        card.appendChild(snk);
        card.appendChild(titleElement);
        card.appendChild(sizeList);
        purchase.appendChild(purchaseBtn);
        card.appendChild(purchase);
        galleryWrap.appendChild(card);

        if (index % 4 == 0)
            sneakersContainer.appendChild(galleryWrap);

        if (index % 16 == 0) {
            leftArrowGroup.innerHTML += `<div class="arrow arrow-left" style="margin-top: ${700*line+10}px">&#9664;</div>`;
            rightArrowGroup.innerHTML += `<div class="arrow arrow-right" style="margin-top: ${700*line+10}px">&#9658;</div>`;
            line++;
        }

        purchaseBtn.addEventListener("click", () => {
            document.querySelectorAll("sizes").forEach(size => {
                let sizeBtn = size.querySelectorAll(".size-button");

                sizeBtn.forEach(btn => {
                    if (purchaseBtn.classList[1] == "selected")
                        html = btn.innerHTML;
                });

                if (html) {
                    let line = html.split(" <br> ");

                    addToCart(sneaker.imgSrc, line[0], line[1], sneaker.title);
                }
                else
                    alert("No size selected");
            });
        });
    });

    let allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
        let title = card.querySelector(".title");
        let snk = card.querySelector("img");

        if (window.getComputedStyle(title).getPropertyValue("height").replace("px", "") > 42) {// Card's height goes on by 42
            if (window.getComputedStyle(document.body).getPropertyValue("width").replace("px", "") >= 800)
                snk.style.transform = 'translateY(-45px)';
        }
    });
})
.catch(error => {
    console.error('Error fetching the JSON file:', error);
});