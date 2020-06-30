const score = document.querySelector(".score");
			const startScreen = document.querySelector(".startScreen");
			const gameArea = document.querySelector(".gameArea");

			startScreen.addEventListener("click", start);

			const player = { speed: 5, score: 0, level: 1 };

			let keys = {
				w: false,
				s: false,
				a: false,
				d: false,
				ArrowUp: false,
				ArrowDown: false,
				ArrowLeft: false,
				ArrowRight: false,
			};

			document.addEventListener("keydown", keyDown);
			document.addEventListener("keyup", keyUp);

			function keyDown(e) {
				e.preventDefault();
				keys[e.key] = true;
				// console.log(e.key)
			}

			function keyUp(e) {
				e.preventDefault();
				keys[e.key] = false;
				// console.log(e.key);
			}

			function isCollide(a, b) {
				aReact = a.getBoundingClientRect();
				bReact = b.getBoundingClientRect();
				return !(
					aReact.top > bReact.bottom ||
					aReact.bottom < bReact.top ||
					aReact.left > bReact.right ||
					aReact.right < bReact.left
				);
			}

			function moveLines() {
				let lines = document.querySelectorAll(".lines");
				lines.forEach(function(item) {
					if (item.y >= 700) {
						item.y -= 800;
					}
					item.y += player.speed;
					item.style.top = item.y + "px";
				});
			}

			function endgame() {
				player.start = false;
				startScreen.classList.remove("hide");
				score.classList.add("hide");

				player.speed = 5;

				startScreen.innerHTML =
					"Game Overe<br> Your Last Score is <h3>" +
					player.score +
					"</h3><br>Level: <h3>" +
					player.level +
					"</h3><br>Click here to restart.";
				player.level = 1;
			}

			function moveFuckingCar(car) {
				let fukingCar = document.querySelectorAll(".fukingCar");
				fukingCar.forEach(function(item) {
					if (isCollide(car, item)) {
						endgame();
					}
					if (item.y >= 750) {
						item.y = -300;
						item.style.left = Math.floor(Math.random() * 350) + "px";
					}
					if (player.score == 1000) {
						player.speed = 7;
						player.level = 2;
					}
					if (player.score == 2400) {
						player.speed = 9;
						player.level = 3;
					}
					if (player.score == 3200) {
						player.speed = 11;
						player.level = 4;
					}
					if (player.score == 4300) {
						player.speed = 13;
						player.level = 5;
					}
					if (player.score == 5400) {
						player.speed = 14;
						player.level = 6;
					}
					if (player.score == 6600) {
						player.speed = 16;
						player.level = 7;
					}
					if (player.score == 7700) {
						player.speed = 17;
						player.level = 8;
					}
					if (player.score == 8900) {
						player.speed = 18;
						player.level = 9;
					}
					if (player.score == 9800) {
						player.speed = 19;
						player.level = 10;
					}
					item.y += player.speed;
					item.style.top = item.y + "px";
				});
			}

			function gamePlay() {
				let car = document.querySelector(".car");
				let road = gameArea.getBoundingClientRect();

				if (player.start) {
					moveLines();
					moveFuckingCar(car);
					// Playing with ArrowKeys
					if (keys.ArrowUp && player.y > road.top + 20) {
						player.y -= player.speed;
					}
					if (keys.ArrowDown && player.y < road.height - 120) {
						player.y += player.speed;
					}
					if (keys.ArrowLeft && player.x > 0) {
						player.x -= player.speed;
					}
					if (keys.ArrowRight && player.x < road.width - 60) {
						player.x += player.speed;
					}
					// Playing with W, S, A, D
					if (keys.w && player.y > road.top + 20) {
						player.y -= player.speed;
					}
					if (keys.s && player.y < road.height - 120) {
						player.y += player.speed;
					}
					if (keys.a && player.x > 0) {
						player.x -= player.speed;
					}
					if (keys.d && player.x < road.width - 60) {
						player.x += player.speed;
					}

					car.style.top = player.y + "px";
					car.style.left = player.x + "px";

					window.requestAnimationFrame(gamePlay);

					player.score++;
					let sco = player.score - 1;
					score.innerHTML =
						"Score: " + sco + "<br>Level: " + player.level;
				}
			}

			function start() {
				startScreen.classList.add("hide");
				score.classList.remove("hide");
				gameArea.innerHTML = "";

				player.start = true;
				player.score = 0;
				window.requestAnimationFrame(gamePlay);

				for (let i = 0; i < 6; i++) {
					let roadLine = document.createElement("div");
					roadLine.setAttribute("class", "lines");
					roadLine.y = i * 134;
					roadLine.style.top = roadLine.y + "px";
					gameArea.appendChild(roadLine);
				}

				let car = document.createElement("div");
				car.setAttribute("class", "car");
				gameArea.appendChild(car);

				player.x = car.offsetLeft;
				player.y = car.offsetTop;

				for (let i = 0; i < 3; i++) {
					let fukingCar = document.createElement("div");
					fukingCar.setAttribute("class", "fukingCar");
					fukingCar.y = (i + 1) * 350 * -1;
					fukingCar.style.top = fukingCar.y + "px";
					fukingCar.style.left =
						Math.floor(Math.random() * 324) + "px";
					fukingCar.style.backgroundColor = randomColor();
					gameArea.appendChild(fukingCar);
				}
			}

			function randomColor() {
				function ff() {
					let hex = Math.floor(Math.random() * 254).toString(16);
					return ("1" + String(hex)).substr(-2);
				}
				return "#" + ff() + ff();
			}