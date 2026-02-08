// Click sound setup
const clickSound = new Audio("click.mp3");

// Helper to play click sound
function playClick() {
    clickSound.currentTime = 0;
    clickSound.play();
}

/* Set desktop background */
function setBackground(imagePath) {
    document.body.style.backgroundImage = `url('${imagePath}')`;
}

/* Example: set your background here */
setBackground("background.webp");

/* Music Controls */
function musicPlay() {
    playClick();
    const audio = document.getElementById("audio");
    audio.play();
    document.getElementById("nowPlaying").style.display = "block";
}

function musicPause() {
    playClick();
    const audio = document.getElementById("audio");
    audio.pause();
    document.getElementById("nowPlaying").style.display = "none";
}

function musicBack() {
    playClick();
    const audio = document.getElementById("audio");
    audio.currentTime = 0;
}

function musicNext() {
    playClick();
    const audio = document.getElementById("audio");
    audio.currentTime = 0;
    audio.play();
}

/* Open App */
function openApp(name) {
    playClick();
    if (name === "app1") {
        openVideoWindow();
    }
}

/* Video Window */
function openVideoWindow() {
    playClick();

    // Remove any existing video or shapes window
    const existing = document.querySelector(".video-window, .shapes-window");
    if (existing) existing.remove();

    const container = document.getElementById("videoWindowContainer");

    const win = document.createElement("div");
    win.className = "video-window";

    win.innerHTML = `
        <div class="top-bar">
            <div class="window-buttons">
                <div class="window-btn red"></div>
                <div class="window-btn yellow"></div>
                <div class="window-btn gray"></div>
            </div>
            <div style="width:36px;"></div>
        </div>

        <div class="video-content">
            <div class="video-player">
                <div class="video-progress"></div>
                <video src="video.webm" autoplay></video>
                <div class="video-controls">
                    <div>
                        <button>⏮</button>
                        <button>▶</button>
                        <button>⏹</button>
                        <button>⏪</button>
                        <button>⏩</button>
                        <button>⏏</button>
                    </div>
                    <div class="volume-container">
                        <button>🔊</button>
                        <div class="volume-bar">
                            <div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(win);

    const videoEl = win.querySelector("video");

    // Red close button: closes window & opens shapes window
    const redBtn = win.querySelector(".window-btn.red");
    redBtn.onclick = () => {
        playClick();
        win.remove();
        openShapesWindow();
    };

    // Play click for all video control buttons
    win.querySelectorAll("button").forEach(btn => btn.onclick = playClick);

    // When video ends, close video window and open shapes window
    videoEl.addEventListener("ended", () => {
        win.remove();
        openShapesWindow();
    });

    videoEl.muted = false;
    videoEl.play();
}

/* Shapes Window */
function openShapesWindow() {
    playClick();

    const existing = document.querySelector(".shapes-window");
    if (existing) existing.remove();

    const container = document.getElementById("videoWindowContainer");

    const win = document.createElement("div");
    win.className = "shapes-window video-window";

    // Random offset for window position
    const offsetX = 100 + Math.random() * 200;
    const offsetY = 80 + Math.random() * 150;
    win.style.left = offsetX + "px";
    win.style.top = offsetY + "px";
    win.style.width = "500px";
    win.style.height = "300px";

    win.innerHTML = `
        <div class="top-bar">
            <div class="window-buttons">
                <div class="window-btn red"></div>
                <div class="window-btn yellow"></div>
                <div class="window-btn gray"></div>
            </div>
            <div style="width:36px;"></div>
        </div>

        <div class="video-content" 
            style="display:flex; flex-direction:column; align-items:center; justify-content:flex-start; gap:24px; height:100%; background:#ffffff; padding-top:20px;">

            <!-- Shapes row -->
            <div style="display:flex; gap:80px; justify-content:center; width:100%; height:80px; align-items:flex-end;">
                <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                    <div class="shape shape-purple" style="width:50px; height:50px; background:#a020f0; cursor:pointer;"></div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                    <div class="shape shape-yellow" style="width:40px; height:70px; background:#ffff00; 
                        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); cursor:pointer;"></div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                    <div class="shape shape-green" style="width:50px; height:50px; background:#00ff00; cursor:pointer;"></div>
                </div>
            </div>

            <!-- Input boxes row -->
            <div style="display:flex; gap:80px; justify-content:center; width:100%; margin-top:8px;">
                <input class="shape-count" type="text" value="" style="width:50px; height:24px; text-align:center; border:2px inset #fff; background:#ffffff;"/>
                <input class="shape-count" type="text" value="" style="width:50px; height:24px; text-align:center; border:2px inset #fff; background:#ffffff;"/>
                <input class="shape-count" type="text" value="" style="width:50px; height:24px; text-align:center; border:2px inset #fff; background:#ffffff;"/>
            </div>

            <!-- OK button -->
            <button class="ok-btn" style="margin-top:40px; width:120px; height:32px; border:2px outset #fff; background:#d4d0c8; cursor:pointer;">OK</button>
        </div>
    `;

    container.appendChild(win);

    // Red close button
    win.querySelector(".window-btn.red").onclick = () => {
        playClick();
        win.remove();
    };

    // Shape click counters
    const shapes = win.querySelectorAll(".shape");
    const inputs = win.querySelectorAll(".shape-count");

    shapes.forEach((shape, i) => {
        const input = inputs[i];
        shape.onclick = () => {
            playClick();
            input.value = input.value === "" ? "1" : (parseInt(input.value) + 1).toString();
        };
    });

    // OK button closes window
    const okBtn = win.querySelector(".ok-btn");
    okBtn.onclick = () => {
        playClick();
        win.remove();
    };
}
