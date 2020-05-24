
const apiFetch = new FetchApi('https://games-app-siit.herokuapp.com');

const validForm = new ValidateForm();


apiFetch.getGamesList().then(arrayOfGames => {
    for (let i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});



function createDomElement(gameObj) {
    const container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.className = "game-box";
    gameELement.setAttribute("id", gameObj._id)


    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn" id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" id="${gameObj._id}">Edit Game</button>`;


    const updatedGameElement = document.createElement('form');
    updatedGameElement.id = "updateForm"
    updatedGameElement.innerHTML = `
                                        <label for="newGameTitle">Title *</label>
                                        <input type="text"  name="newGameTitle" id="newGameTitle" value = "${gameObj.title}"/>
                                        <label for="newGameDescription">Description</label>
                                        <textarea name="newGameDescription" id="newGameDescription">"${gameObj.description}"</textarea>
                                        <label for="newGameImageUrl">Image URL *</label>
                                        <input type="text" name="newGameImageUrl" id="newGameImageUrl" value = "${gameObj.imageUrl}"/>
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
            removeDeletedElementFromDOM(editForm);
        } else if (event.target.classList.contains("save-btn")) {
            const editForm = event.target.parentElement;
            event.preventDefault();
            newGameVersion(editForm.parentElement);
            removeDeletedElementFromDOM(editForm);
        }
    });
}

function newGameVersion(gameELement) {
    const updatedGameTitle = document.getElementById("newGameTitle").value;
    const updatedGameDescription = document.getElementById("newGameDescription").value;
    const updatedGameImageUrl = document.getElementById("newGameImageUrl").value;

    gameELement.querySelector('h1').innerHTML = updatedGameTitle;
    gameELement.querySelector('p').innerHTML = updatedGameDescription;
    gameELement.querySelector('img').innerHTML = updatedGameImageUrl;


   const  urlencoded = new URLSearchParams();
    urlencoded.append("title", updatedGameTitle);
    urlencoded.append("description", updatedGameDescription);
    urlencoded.append("imageUrl", updatedGameImageUrl);

    console.log(gameELement);
    apiFetch.updateGameRequest(gameELement.getAttribute('id'), urlencoded, createDomElement);



}

function removeDeletedElementFromDOM(domElement) {
    domElement.remove();
}



document.querySelector(".submitBtn").addEventListener("click", function (event) {
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validForm.validateFormElement(gameTitle, "The title is required!");
    validForm.validateFormElement(gameGenre, "The genre is required!");
    validForm.validateFormElement(gameImageUrl, "The image URL is required!");
    validForm.validateFormElement(gameRelease, "The release date is required!");

    validForm.validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if (gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        const urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        apiFetch.createGameRequest(urlencoded, createDomElement);
    }
})




// async function show() {
//     const getRequest = await apiFetch.getGamesList();
//    // const container = document.querySelector('.container')
//     for(let i = getRequest.length-1; i >= 0 ; i--) {
//     const request = getRequest[i];
//     const game = new CreateGame(
//         request._id,
//         request.title,
//         request.imageUrl,
//         request.description
//         )
//     const newGame = game.createDomElement()
//     console.log(' game'+game);
//    // container.appendChild(newGame);
//     }
   
// }
// show();