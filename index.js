// 1 -> loading screen when searching for a superhero

const token = 101176796041040;
const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const inputField = document.getElementById("inputField");
const results = document.getElementById("results");

$(window).on("load", function () {
    setTimeout(() => {
        $(".loader-wrapper").fadeOut("slow");
    }, 1500);
    setTimeout(() => {
        fetchSuperHeroes();
    }, 1200);
});

const emoticons = {
    "intelligence": "🧠",
    "strength": "💪🏻",
    "speed": "🚀",
    "durability": "🚴🏻‍♂️",
    "power": "✨",
    "combat": "⚔"
};


document.getElementById("container")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            button2.click();
        }
    });


button1.addEventListener("click", () => {
    let num = getRandomId();
    results.innerHTML = "Loading";
    fetchSuperHeroesByRandomId(num);
})

button2.addEventListener("click", () => {
    results.innerHTML = "Loading";
    let value = inputField.value;
    fectchSuperHeroesByName(value);
    inputField.value="";
})

const reply_click = (obj) => {
    // console.log(obj.id);
    localStorage.setItem("superheroId", obj.id);
    location.href = "/SuperHero/superhero.html";
    return;
}

const getRandomId = () => {
    const totalSize = 731;
    return (Math.floor(Math.random() * totalSize + 1));
}

const getStats = (data) => {
    let temp = Object.keys(data);
    temp = temp.map(stat => {
        let value = data[stat];
        let emoti = emoticons[stat];
        stat = stat.charAt(0).toUpperCase() + stat.slice(1);
        return `<p>${emoti} ${stat}: ${value}</p>`;
    })
    return temp.join("");
}

const fetchSuperHeroesByRandomId = (id) => {
    fetch(`https://superheroapi.com/api.php/101176796041040/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.response === "error") {
                console.log("No such superhero found");
            } else {
                let paragraphStats = getStats(data.powerstats);
                let temp = `
            <div class="hero" id="${data.id}" onClick="reply_click(this)">
                <h1 class="heroName">${data.name.toUpperCase()}</h1>
                <img src="${data.image.url}" alt="" class="heroImage">
                <div class="heroStats">
                    ${paragraphStats}
                </div>
            </div>
            `;
                results.innerHTML = temp;
            }
        });
}

const fectchSuperHeroesByName = (name) => {
    fetch(`https://superheroapi.com/api.php/101176796041040/search/${name}`)
        .then(response => response.json())
        .then(data => {
            let temp;
            if (data.response === "error") {
                console.log("No such superhero found");
            } else {
                data = data.results[0];
                let paragraphStats = getStats(data.powerstats);
                temp = `
            <div class="hero" id="${data.id}" onClick="reply_click(this)">
                <h1 class="heroName">${data.name.toUpperCase()}</h1>
                <img src="${data.image.url}" alt="" class="heroImage">
                <div class="heroStats">
                    ${paragraphStats}
                </div>
            </div>
            `;
            }
            results.innerHTML = temp;
        });
}

const fetchSuperHeroes = () => {
    results.innerHTML = "";
    let start = Math.floor(Math.random() * 681 + 1);
    for (let i = start; i <= start + 50; i++) {
        fetch(`https://superheroapi.com/api.php/101176796041040/${i}`)
            .then(response => response.json())
            .then(data => {
                if (data.response === "error") {
                    console.log("No such superhero found");
                } else {
                    let paragraphStats = getStats(data.powerstats);
                    let temp = `
                <div class="hero" id="${data.id}" onClick="reply_click(this)">
                    <h1 class="heroName">${data.name}</h1>
                    <img src="${data.image.url}" alt="" class="heroImage">
                    <div class="heroStats">
                        ${paragraphStats}
                    </div>
                </div>
                `;
                    results.innerHTML += temp;
                }
            });
    }
}
