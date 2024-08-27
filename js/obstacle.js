document.addEventListener("DOMContentLoaded", function() {
    var starting = false;

    const start_text = document.getElementById("start-text");
    const score = document.getElementById("score-number");
    const distributeur = document.getElementById("distributeur-image");
    const buisson = document.getElementById("buisson-image");
    const sol = document.getElementById("sol-image");
    const skin = document.querySelectorAll('.skin');
    const game_over = document.getElementById("game_over-image");

    var intervalIdObstacleMove;
    var intervalIdObstacleTouch;
    var intervalIdScore;

    var obstacleTimeMove = 4.5;

    function placeObstacle() {
        const solTop = sol.getBoundingClientRect().top + window.scrollY;

        const buissonHeight = buisson.offsetHeight;
        const buissonTop = solTop - buissonHeight;
    
        buisson.style.top = buissonTop + "px";

        const distribHeight = distributeur.offsetHeight;
        const distribTop = solTop - distribHeight;

        distributeur.style.top = distribTop + "px";

        buisson.style.right = (window.innerWidth + buisson.offsetWidth) / 3 + "px";

        buisson.style.removeProperty("left");

        distributeur.style.right = (window.innerWidth + distributeur.offsetWidth) / 3.8 + "px";
    }

    placeObstacle();

    function obstacleMove() {
        if(buisson.getBoundingClientRect().left < 0 || buisson.getBoundingClientRect().right > window.innerWidth) {
            buisson.style.right = (window.innerWidth + buisson.offsetWidth) / 3 + "px";

            buisson.style.removeProperty("left");
        } else {
            buisson.style.left = (parseInt(window.getComputedStyle(buisson).getPropertyValue("left")) - 3) + "px";
        }
    }

    function obstacleTouch() {
        for(let i = 0; i < skin.length; i++) {
            if(skin[i].getBoundingClientRect().left < buisson.getBoundingClientRect().right && skin[i].getBoundingClientRect().right > buisson.getBoundingClientRect().left && skin[i].getBoundingClientRect().top < buisson.getBoundingClientRect().bottom && skin[i].getBoundingClientRect().bottom > buisson.getBoundingClientRect().top) {
                clearInterval(intervalIdScore);
                
                clearInterval(intervalIdObstacleMove);
    
                starting = false;
    
                game_over.style.display = "block";
    
                start_text.style.display = "block";
    
                placeObstacle();
    
                clearInterval(intervalIdObstacleTouch);
            }
        }
    }

    function newScore() {
        var newscore = parseInt(score.innerText);

        newscore++;

        if(newscore === "200" || newscore === "400" || newscore === "600" || newscore === "800" || newscore === "1000" || newscore === "1200" || newscore === "1400" || newscore === "1800" || newscore === "2000") {
            obstacleTimeMove = obstacleTimeMove - 0.5;
        }

        score.innerText = newscore;
    }

    function start(event) {
        if(starting == false) {
            if(event.code === "Space" || event.key === "ArrowUp") {
                starting = true;

                game_over.style.display = "none";

                start_text.style.display = "none";

                score.innerText = 0;

                intervalIdObstacleMove = setInterval(obstacleMove, obstacleTimeMove);

                intervalIdScore = setInterval(newScore, 150);

                intervalIdObstacleTouch = setInterval(obstacleTouch, 1);
            }
        }
    }
    
    document.addEventListener("keydown", start);

    window.addEventListener("resize", placeObstacle);
});