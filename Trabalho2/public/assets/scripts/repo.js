const githubAPIURL = "https://api.github.com/users/bernardovieirarocha";
const selectedIDs = [808326147, 799751562, 786510396, 788197031, 765473152];
let ID = null ;
let myRepo ;


new URLSearchParams(window.location.search).forEach((value, key) => {
    if (selectedIDs.includes(parseInt(value))) {
        ID = value;
    } 
})

if (!ID) { alert("Invalid ID"); window.location.href = "/"; }


function checkIfReposAreStored() {
    if (localStorage.getItem("myRepo")) {
        return true;
    } else {
        return false;
    }
}


function getRepos() {
    $.ajax({
        url: `${githubAPIURL}/repos`,
        method: "GET",
        success: function (data) {
            data.forEach((repo) => {
                if (repo.id == ID) {
                    myRepo = repo;
                }
            });
            localStorage.setItem("myRepo", JSON.stringify(myRepo));
            loadRepositories();
        },
    });
}

function formatDateString(date) {
    return new Date(date).toLocaleDateString("pt-BR");
}


function loadRepositories() {
    if (checkIfReposAreStored()){
        const myRepos = JSON.parse(localStorage.getItem("myRepo"));
        $("#repo_name").text("Repositório: " + myRepos.name);
        $("#repo_desc").text(myRepos.description);
        $("#data_criacao").text(formatDateString(myRepos.created_at))
        if (myRepos.language) {
            $("#lang").text(myRepos.language);
        } else {
            $("#lang").text("N/A");
        }
        $("#repo_star").text(myRepos.stargazers_count);
        $("#repo_followers").text(myRepos.watchers_count);
        $("#owner-img").attr("src", myRepos.owner.avatar_url);
        $("#owner-name").text(myRepos.owner.login);
        $("#repo_url").attr("href", myRepos.html_url).append(myRepos.html_url);
        if (myRepos.license){
            $("#repo_license").text(myRepos.license.name);
        } else {
            $("#repo_license").text("N/A");
        }
        $("#forks").text(myRepos.forks_count);
        console.log(myRepos.topics);
        myRepos.topics.forEach((topic) => {
            $("#big-container").append(`<span class="badge bg-primary ms-1" id="topics">${topic}</span>`)
        })
        localStorage.removeItem("myRepo")
    } else {
        getRepos();
    }
}

loadRepositories();