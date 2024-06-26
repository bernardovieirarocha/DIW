const githubAPIURL = "https://api.github.com/users/bernardovieirarocha";
const jsonServer = "http://localhost:3000/";

const selectedIDs = [808326147, 799751562, 786510396, 788197031, 765473152];

function checkIfSocialIsStored() {
    if (localStorage.getItem("mySocial")) {
        return true;
    } else {
        return false;
    }
}

function checkIfProfileIsStored() {
    if (localStorage.getItem("myProfile")) {
        return true;
    } else {
        return false;
    }
}

function checkIfReposAreStored() {
    if (localStorage.getItem("myRepos")) {
        return true;
    } else {
        return false;
    }
}

function getSocial() {
    return fetch(`${githubAPIURL}/social_accounts`)
        .then((response) => response.json())
        .then((socialINFO) => {
            localStorage.setItem("mySocial", JSON.stringify(socialINFO));
            return socialINFO;
        });
}

function getRepos() {
    $.ajax({
        url: `${githubAPIURL}/repos`,
        method: "GET",
        success: function (data) {
            let myRepos = [];
            data.forEach((repo) => {
                if (selectedIDs.includes(repo.id)) {
                    myRepos.push(repo);
                }
            });
            localStorage.setItem("myRepos", JSON.stringify(myRepos));
            loadRepositories();
        },
    });
}

function createSocialLinks(socialINFO, html_url) {
    const githubContact = `<a
    href="${html_url}"
    class="text-decoration-none text-black"
    target="_blank"
>
    <i
        class="bi bi-github"
        style="font-size: 1.7rem"
    ></i>
</a>`;
    let instagramContact = ``;
    let twitterContact = ``;
    socialINFO.forEach((social) => {
        social.provider === "instagram"
            ? (instagramContact = ` <a
                        href="${social.url}"
                        class="text-decoration-none text-black"
                        target="_blank"
                        ><i
                            class="bi bi-instagram me-4"
                            style="font-size: 1.7rem"
                        ></i
                    ></a>`)
            : "";
        social.provider === "twitter"
            ? (twitterContact = `<a
                        href="${social.url}"
                        class="text-decoration-none text-black"
                        target="_blank"
                    >
                        <i
                            class="bi bi-twitter-x me-4"
                            style="font-size: 1.7rem"
                        ></i>
                    </a>`)
            : " ";
    });
    $("#information").append(instagramContact);
    $("#information").append(twitterContact);
    $("#information").append(githubContact);
}

function getProfileInfo() {
    $.ajax({
        url: githubAPIURL,
        method: "GET",
        success: function (data) {
            localStorage.setItem("myProfile", JSON.stringify(data));
            loadProfileInfo();
        },
    });
}

function loadProfileInfo() {
    if (checkIfProfileIsStored()) {
        let data = JSON.parse(localStorage.getItem("myProfile"));
        $("#fotoPerfil").attr("src", data.avatar_url);
        $("#nomePerfil").text(data.name);
        $("#description").text(data.bio);
        $("#info-location").html("<strong>Location:</strong> " + data.location);
        $("#info-website").html(
            `<strong>Site:</strong> <a href="${data.blog}" target="_blank">${data.blog}</a>`
        );
        $("#followers").append(data.followers);

        if (!checkIfSocialIsStored()) {
            getSocial().then((socialINFO) => {
                createSocialLinks(socialINFO, data.html_url);
            });
        } else {
            let socialINFO = JSON.parse(localStorage.getItem("mySocial"));
            createSocialLinks(socialINFO, data.html_url);
        }
    } else {
        getProfileInfo();
    }
}

function loadRepositories() {
    if (checkIfReposAreStored()) {
        myRepos = JSON.parse(localStorage.getItem("myRepos"));
        myRepos.forEach((repo) => {
            const URL = window.location.href.replace("index.html", "").split("#")[0] + "repo.html?repo=" + repo.id;
            let repoCard = `<div class="col">
                                <a href="${URL}">
                                    <div class="card w-100 h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                ${repo.name}
                                            </h5>
                                            <p class="card-text">
                                                ${repo.description}
                                            </p>
                                            <div class="row">
                                                <div class="col">
                                                    <p
                                                        class="d-inline float-end mb-0 mt-0"
                                                        id="stars_repo"
                                                    >
                                                        <i
                                                            class="bi bi-star-fill"
                                                            style="
                                                                font-size: 1.3rem;
                                                            "
                                                        ></i>
                                                        ${repo.stargazers_count}
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p
                                                        class="d-inline mb-0 mt-0 d-flex-inline"
                                                        id="followers_repo"
                                                    >
                                                        <i
                                                            class="bi bi-people-fill"
                                                            style="
                                                                font-size: 1.3rem;
                                                                color: blue;
                                                            "
                                                        >
                                                        </i
                                                        >${repo.watchers_count}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div></a
                                >
                            </div>`;
            $("#repoContainer").append(repoCard);
        });
    } else {
        getRepos();
    }
}

function InitPage() {
    loadProfileInfo();
    loadRepositories();
    loadCarousel();
    loadColegas();
    fetchFooterData();
}


function checkServerStatus() {
    return $.ajax({
        url: `${jsonServer}`,
        method: "GET",
        timeout: 3000,
        success: function() {
            $('#loadingModal').modal('hide');
            InitPage();
        },
        error: function() {
            $('#loadingModal').modal('show');
            $("#refreshPage").click(function() {
                location.reload();
            })
        }
    });
}

$(document).ready(function() {
    checkServerStatus();
});


function getCarouselResources() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${jsonServer}conteudos`,
        }).done(function (data) {
            resolve(data);
        });
    });
}

function loadCarousel() {
    getCarouselResources().then((data) => {
        data.forEach((content) => {
            let carouselItem = `  <div class="carousel-item c-item">
                                <img
                                    src="${content.url_imagem}"
                                    class="d-block w-100 c-img"
                                    alt="imagem-prog-c"
                                /><div class="carousel-caption c-caption">
                                    <h1 class="display1">${content.titulo}</h1>
                                    <p>
                                       ${content.descricao}
                                    </p>
                                    <a
                                        class="btn btn-sm btn-primary"
                                        target="_blank"
                                        href="${content.url_conteudo}"
                                        >Veja o vídeo
                                        <i class="bi bi-play-fill"></i
                                    ></a>
                                </div></div>`;
            $("#carousel-content").append(carouselItem);
        });
        $(".c-item").first().addClass("active");
    });
}

function loadColegas() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${jsonServer}colegas`,
        }).done(function (data) {
            data.forEach((colega) => {
                let colegaHTML = `<div class="col-sm text-center">
                <img
                    src="${colega.url_foto}"
                    class="img-fluid img-thumbnail rounded-top"
                    alt="Colega ${colega.id} "
                    width="150"
                    height="150"
                />
                <p class="text-primary">${colega.nome}</p>
            </div>`;
                $("#colegas-content").append(colegaHTML);
            });
        });
    });
}

function createSocialLink(link) {
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.className = `btn btn-outline-dark btn-floating m-1`;
    anchor.role = "button";
    const icon = document.createElement("i");
    icon.className = link.icon_class;
    anchor.appendChild(icon);
    return anchor;
}

async function fetchFooterData() {
    try {
        const response = await fetch(`${jsonServer}footer`);
        const data = await response.json();
        const footerContainer = document.getElementById("footer");
        footerContainer.innerHTML = ""; // Clear existing footer content

        const footer = document.createElement("footer");
        footer.className = "bg-light text-center text-dark border-top";

        const container = document.createElement("div");
        container.className = "container p-4 pb-0";
        const section = document.createElement("section");
        section.className = "mb-4";

        data.social_links.forEach((link) => {
            section.appendChild(createSocialLink(link));
        });
        container.appendChild(section);
        footer.appendChild(container);

        const copyright = document.createElement("div");
        copyright.className = "text-center p-3";
        const copyrightLink = document.createElement("a");
        copyrightLink.href = data.copyright.url;
        copyrightLink.className = "text-dark text-decoration-none";
        copyrightLink.textContent = data.copyright.text;
        copyright.appendChild(copyrightLink);

        footer.appendChild(copyright);
        footerContainer.appendChild(footer);
    } catch (error) {
        console.error("Failed to load footer data:", error);
    }
}

