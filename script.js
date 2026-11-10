
function getProfile() {

    let username = document.getElementById("username").value;

    fetch("https://api.github.com/users/" + username)

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            document.getElementById("profile").innerHTML =
                "<img src='" + data.avatar_url + "'>" +
                "<h2>" + (data.name || "No name") + "</h2>" +
                "<p>Username: " + data.login + "</p>" +
                "<p>Followers: " + data.followers + "</p>" +
                "<p>Following: " + data.following + "</p>" +
                "<p>Repositories: " + data.public_repos + "</p>" +
                "<a href='" + data.html_url +
                "' target='_blank'>View GitHub Profile</a>";

            getRepositories(username);
        });
}


function getRepositories(username) {

    fetch("https://api.github.com/users/" + username + "/repos")

        .then(function(response) {
            return response.json();
        })

        .then(function(repositories) {

            let output = "";

            for (let repo of repositories) {

                output =
                    output +
                    "<div class='repository'>" +
                    "<h3>" + repo.name + "</h3>" +
                    "<p>" + (repo.description || "No description") + "</p>" +
                    "<p>Stars: " + repo.stargazers_count + "</p>" +
                    "<p>Language: " + (repo.language || "Unknown") + "</p>" +
                    "<a href='" + repo.html_url +
                    "' target='_blank'>View Repository</a>" +
                    "</div>";
            }

            document.getElementById("repositories").innerHTML = output;
        });
}