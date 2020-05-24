class CreateGame{
    constructor(id,title,imageUrl,description){
    this.id=id;
    this.title=title;
    this.imageUrl=imageUrl;
    this.description=description;
     //metodele
     this.newGameVersion = function (gameELement) {
        const updatedGameTitle = document.getElementById("newGameTitle").value;
        const updatedGameDescription = document.getElementById("newGameDescription").value;
        const updatedGameImageUrl = document.getElementById("newGameImageUrl").value;
    
        gameELement.querySelector('h1').innerHTML = updatedGameTitle;
        gameELement.querySelector('p').innerHTML = updatedGameDescription;
        gameELement.querySelector('img').innerHTML = updatedGameImageUrl;
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", updatedGameTitle);
        urlencoded.append("description", updatedGameDescription);
        urlencoded.append("imageUrl", updatedGameImageUrl);
    
        console.log(gameELement);
        apiFetch.updateGameRequest(gameELement.getAttribute('id'), urlencoded, createDomElement);
    
    
    
    }
    this.removeDeletedElementFromDOM = function (domElement) {
        domElement.remove();
    }
}


createDomElement(gameObj) {
    const container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.className = "game-box";
    gameELement.setAttribute("id", gameObj._id)


    gameELement.innerHTML = `<h1>${gameObj.this.title}</h1> 
                        <img src="${gameObj.this.imageUrl}" />
                        <p>${gameObj.this.description}</p> 
                        <button class="delete-btn" id="${gameObj.this._id}">Delete Game</button>
                        <button class="update-btn" id="${gameObj.this,_id}">Edit Game</button>`;


    const updatedGameElement = document.createElement('form');
    updatedGameElement.id = "updateForm"
    updatedGameElement.innerHTML = `
                                        <label for="newGameTitle">Title *</label>
                                        <input type="text"  name="newGameTitle" id="newGameTitle" value = "${gameObj.this.title}"/>
                                        <label for="newGameDescription">Description</label>
                                        <textarea name="newGameDescription" id="newGameDescription">"${gameObj.description}"</textarea>
                                        <label for="newGameImageUrl">Image URL *</label>
                                        <input type="text" name="newGameImageUrl" id="newGameImageUrl" value = "${gameObj.this.imageUrl}"/>
                                        <button class="save-btn">Save Changes</button>
                                        <button class="cancel-btn">Cancel</button>
                                    `;



    container1.appendChild(gameELement);
    document.getElementById(`${gameObj._id}`).addEventListener("click", function (event) {
        event.preventDefault();


        if (event.target.classList.contains("delete-btn")) {

            apiFetch.deleteGame(event.target.getAttribute("id")).then(apiResponse => {
                console.log(apiResponse);
                const editForm = event.target.parentElement;
                removeDeletedElementFromDOM(editForm);
            })


        } else if (event.target.classList.contains("update-btn")) {
            const editForm = event.target.parentElement;
            editForm.appendChild(updatedGameElement);
        } else if (event.target.classList.contains('cancel-btn')) {
            const editForm = event.target.parentElement;
            this.removeDeletedElementFromDOM(editForm);
        } else if (event.target.classList.contains("save-btn")) {
            const editForm = event.target.parentElement;
            event.preventDefault();
            this.newGameVersion(editForm.parentElement);
            removeDeletedElementFromDOM(editForm);
        }
    });
}
}