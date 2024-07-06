// Fetch the JSON file
fetch('articles.json')
.then(response => response.json()) // Parse the JSON from the response
.then(data => {
    // Process the data
    let sneakersContainer = document.querySelector('.group');
    let pageName = document.querySelector(".page-name").innerText;
    let sneakersArray = data[pageName]; // Accessing the sneakers array based on the page name

    // Check if the page name exists in the data
    if (!sneakersArray)
        return;
    
    let galleryWrap, html;
    // Loop through the array and display the data
    sneakersArray.forEach((sneaker, index) => {
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
                    saveCartToJsonFile();
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

        if (window.getComputedStyle(title).getPropertyValue("height").replace("px", "") > 42) // Card's height goes on by 42
            snk.style.transform = 'translateY(-45px)';
    });
})
.catch(error => {
    console.error('Error fetching the JSON file:', error);
});