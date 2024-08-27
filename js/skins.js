document.addEventListener("DOMContentLoaded", function() {
    const skin = document.querySelectorAll(".skin");
    const sol = document.getElementById("sol-image");

    let sautEnCours = false;
    let sautStep = 60;

    function positionnerSkins() {
        const solTop = sol.getBoundingClientRect().top + window.scrollY;
        
        for(let i = 0; i < skin.length; i++) {
            let height = skin[i].offsetHeight;

            let top = solTop - height;

            skin[i].style.top = top + "px";
        }
    }

    positionnerSkins();

    function moveSkins(event) {
        if(event.code === "Space" || event.key === "ArrowUp") {
            if(sautEnCours === false) {
                sautEnCours = true;

                sautUp();
            }
        }
    }

    function sautUp() {
        sautStep = 60;
    
        stepUpIntervalId = setInterval(function () {
            if(sautStep === 0) {
                clearInterval(stepUpIntervalId);
    
                sautDown();
            }

            for(let i = 0; i < skin.length; i++) {
                skin[i].style.top = (parseInt(window.getComputedStyle(skin[i]).getPropertyValue("top")) - 3) + "px";
            }
    
            sautStep--;
        }, 1);
    }

    function sautDown() {
        sautStep = 60;
    
        stepDownIntervalId = setInterval(function () {
            if(sautStep === -1) {
                clearInterval(stepDownIntervalId);

                sautEnCours = false;
            }
    
            for(let i = 0; i < skin.length; i++) {
                skin[i].style.top = (parseInt(window.getComputedStyle(skin[i]).getPropertyValue("top")) + 3) + "px";
            }
    
            sautStep--;
        }, 1);
    }

    document.addEventListener("keydown", moveSkins);

    window.addEventListener("resize", positionnerSkins);
});

function setSkin(skinName) {

    document.getElementById("lapin-image").style.display = "none";
    document.getElementById("poule-image").style.display = "none";
    document.getElementById("escargot-image").style.display = "none";

    if(skinName === "lapin") {
        document.getElementById("lapin-image").style.display = "block";
    } else if(skinName === "poule") {
        document.getElementById("poule-image").style.display = "block";
    } else if(skinName === "escargot") {
        document.getElementById("escargot-image").style.display = "block";
    }

    positionnerNewSkin();
}

function positionnerNewSkin() {
    const solTop = document.getElementById("sol-image").getBoundingClientRect().top + window.scrollY;

    const skin = document.querySelectorAll(".skin");
    
    for(let i = 0; i < skin.length; i++) {
        let height = skin[i].offsetHeight;

        let top = solTop - height;

        skin[i].style.top = top + "px";
    }
}
