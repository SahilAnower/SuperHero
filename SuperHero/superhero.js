const superHeroId=localStorage.getItem("superheroId");
const container=document.getElementById("container");

console.log(superHeroId);

$(window).on("load", function () {
    setTimeout(() => {
        $(".loader-wrapper").fadeOut("slow");
    }, 1500);
    setTimeout(() => {
        populate();
    }, 1500);
});

const getStats=(data)=>{
    let temp=Object.keys(data);
    temp=temp.map(stat => {
        let value=data[stat];
        // console.log(typeof(value));
        if(typeof(value)!=="string")
            return "";
        stat=stat.charAt(0).toUpperCase()+stat.slice(1);
        return `<p>${stat}: ${value}</p>`;
    })
    return temp.join("");
}

const populate=()=>{
    fetch(`https://superheroapi.com/api.php/101176796041040/${superHeroId}`)
    .then(response => response.json())
    .then(data => {
        if(data.response==="error"){
            console.log("No such superhero found");
        }else{
            let paragraphStats=getStats(data.powerstats);
            let biography=getStats(data.biography);
            let appearance=getStats(data.appearance);
            document.title=data.name;
            let temp=`
            <div class="heroElement">
            <img src="${data.image.url}" alt="" class="heroImage">
            <div class="contents">
                <h1 style="color: #EAE509">${data.name.toUpperCase()}</h1>
                <div class="details">
                    <div class="heroStats">
                        ${paragraphStats}
                    </div>
                    <div class="biography">
                        ${biography}
                    </div>
                    <div class="appearance">
                        ${appearance}
                    </div>
                </div>
            </div>
        </div>
            `;
            container.innerHTML=temp;
            // localStorage.clear();
        }
    });
}
