const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    hard = document.querySelector('.hard'),
    vale = document.querySelector('.vale'),
    medium = document.querySelector('.medium'),
    ease = document.querySelector('.ease'),
    gameArea = document.querySelector('.gameArea'),
    ost = document.querySelector('.ost'),
    crash = document.querySelector('.break'),
    car = document.createElement('div')
    car.classList.add('car');


    start.addEventListener('click', startGame);
    hard.addEventListener('click', hardGame),
    medium.addEventListener('click', mediumGame),
    ease.addEventListener('click', easeGame),
    document.addEventListener('keydown', startRun);
    document.addEventListener('keyup', stopRun);

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false
    };

    const setting = {
        start: false,
        score: 0,
        speed: 10,
        traffic: 3
    };
    
    function getQuantityElements(heightElement) {
        return document.documentElement.clientHeight / heightElement + 1;
    }
        console.log(getQuantityElements(150))
    function startGame() {
        crash.stop();
        ost.play();
        vale.style.display = 'none';
        start.classList.add('hide');
        gameArea.innerHTML = '';
        for (let i = 0; i < getQuantityElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i * 100) + "px";
            line.y = i * 100;
            gameArea.appendChild(line);
            }
        
        for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
            const enemy = document.createElement('div');
            const enemyImg = Math.floor(Math.random() * 3) +1;
            enemy.classList.add('enemy');
            enemy.y = -100 * setting.traffic * (i+1);
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`;
            enemy.style.top = enemy.y + 'px';
            gameArea.appendChild(enemy);         
        }
        
        setting.score = 0;
        ost.muted = false;
        setting.start = true;
        gameArea.appendChild(car);
        car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
        car.style.top = 'auto';
        car.style.bottom = '10px';
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;        
        requestAnimationFrame(playGame);
    }

    function playGame() {
        if (setting.start) {
            setting.score += setting.speed;
            score.innerHTML = "SCORE<br>" + setting.score;
            moveRoad()
            moveEnemy()
            if(keys.ArrowLeft && setting.x > 0) {
                setting.x -= setting.speed;
            }
            if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
                setting.x += setting.speed;                
            }
            if (keys.ArrowUp && setting.y > 0) {
                setting.y -= setting.speed;
            }
            if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
                setting.y += setting.speed;
            }
            
            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';            
            requestAnimationFrame(playGame)
        }
    }

    function hardGame() {
        setting.speed = 25;
        setting.traffic = 2;
    }

    function mediumGame() {
        setting.speed = 15;
        setting.traffic = 3;
    }

    function easeGame() {
        setting.speed = 8;
        setting.traffic = 4;
    }

    function startRun(event) {
        event.preventDefault();
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = true;
        }
        
    }

    function stopRun(event) {
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = false;
        }
    }

    function  moveRoad() {
        let lines = document.querySelectorAll('.line');
        lines.forEach(function (line) {
            line.y += setting.speed;
            line.style.top = line.y + 'px';
            
            if(line.y >= document.documentElement.clientHeight) {
                line.y = -100;
            }
        });    
    }

    HTMLAudioElement.prototype.stop = function(){
        this.pause();
        this.currentTime = 0.0;
    };

    function moveEnemy() {
        let enemy = document.querySelectorAll('.enemy');
        
        enemy.forEach(function (item) {
            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();
            
            if (carRect.top <= enemyRect.bottom && 
                carRect.right >= enemyRect.left && 
                carRect.left <= enemyRect.right && 
                carRect.bottom >= enemyRect.top) {
                setting.start = false;
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
                vale.style.marginTop = hard.offsetHeight;
                ost.stop();
                crash.play();
                vale.style.display = 'block';
                                  
            }
            
           item.y += setting.speed / 2;
           item.style.top = item.y + 'px';             
        if (item.y >= document.documentElement.clientHeight) {
               item.y = -100 * setting.traffic;
               item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
           }
        });
        
        
    }
    
    console.dir(ost);

    
    
    function ybo(width,length,height) {
        return width * length * height;
    }
    
    bobo = ybo.bind(null, 10, 20)
    
    var oneBricket = bobo(8);
    var twoBricket = bobo(4);
    var thereBricket = bobo(33);
    
    console.log(oneBricket);
    console.log(twoBricket);
    console.log(thereBricket);
        

    
    var array = [2, 5, 9, 'lol', 'kek'];
    let pop = array.indexOf('lol');
    console.log(pop);
    