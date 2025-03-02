// Login function
function login() {
    const username = document.getElementById("username").value.trim();
    if (username !== "") {
        localStorage.setItem("user", username);
        window.location.href = "game.html";  // Ensure correct filename
    } else {
        alert("Please enter a valid username");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

// Check if user is logged in (for game page)
window.onload = function () {
    if (window.location.pathname.includes("game.html") && !localStorage.getItem("user")) {
        window.location.href = "index.html";
    }
};

// Game logic
if (window.location.pathname.includes("game.html")) {
    const basket = document.getElementById("basket");
    const scoreDisplay = document.getElementById("score");
    let score = 0;

    // Move basket with mouse
    document.addEventListener("mousemove", (e) => {
        let x = e.clientX;
        basket.style.left = `${x}px`;
    });

    // Create falling ball
    function createBall() {
        let ball = document.createElement("div");
        ball.classList.add("ball");
        let randomX = Math.random() * window.innerWidth;
        ball.style.left = `${randomX}px`;
        ball.style.top = "-30px";
        document.body.appendChild(ball);
        moveBall(ball);
    }

    // Move ball down
    function moveBall(ball) {
        let fallInterval = setInterval(() => {
            let ballTop = parseInt(ball.style.top.replace("px", ""));
            ball.style.top = `${ballTop + 5}px`;

            let basketRect = basket.getBoundingClientRect();
            let ballRect = ball.getBoundingClientRect();

            if (
                ballRect.bottom >= basketRect.top &&
                ballRect.left >= basketRect.left &&
                ballRect.right <= basketRect.right
            ) {
                score++;
                scoreDisplay.innerText = score;
                ball.remove();
                clearInterval(fallInterval);
            }

            if (ballTop > window.innerHeight) {
                ball.remove();
                clearInterval(fallInterval);
            }
        }, 30);
    }

    // Generate new balls
    setInterval(createBall, 1000);
}
