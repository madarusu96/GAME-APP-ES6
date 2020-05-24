class FetchApi {
    constructor(apiURL) {
        this.apiURL = apiURL;
        console.log("apiURL= " + apiURL)
    }

    getGamesList() {
        return fetch(`${this.apiURL}/games`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => response.json());
    }
    deleteGame(gameID) {
        //return fetch(apiURL + "/games/" + gameID, {
        return fetch(`${this.apiURL}/games/${gameID}`, {
            method: "DELETE",
        }).then(r => r.text());
    }
    createGameRequest(gameObject) {
        // fetch(apiURL + "/games", {
        fetch(`${this.apiURL}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObject
        }).then(response => response.json())
    }
    updateGameRequest (gameID, updatedGameObj) {
        // return fetch(apiURL + "/games/" + gameID, {
        return fetch(`${this.apiURL}/games/${gameID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: updatedGameObj
        }).then(response => response.json())
    }
}