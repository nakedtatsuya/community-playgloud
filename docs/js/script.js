// Canvas の設定
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grass = document.getElementById('grass'); // 芝生画像をロード
const doorImage = new Image(); // プレイヤー画像も事前にロード
doorImage.src = './images/door.png';
const tileSize = 32; // マスの大きさ
// ゲームの状態
const game = {
    player: { x: tileSize*2, y: tileSize*2, width: tileSize, height: tileSize, direction: 'left' },
    objects: [{ x: tileSize*6, y: tileSize*4, width: tileSize, height: tileSize }]
};

// フィールドの描画
function drawField() {
    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = 0; y < canvas.height; y += tileSize) {
            ctx.drawImage(grass, x, y, tileSize, tileSize);
        }
    }
}

// キャラクターとオブジェクトの描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    drawField(); // フィールドを先に描画
    var playerImage = document.getElementById("player");
    const playerRight = document.getElementById("player-right");
    if(game.player.direction = "left"){
        ctx.drawImage(playerImage, game.player.x, game.player.y, game.player.width, game.player.height);
    }else if(game.player.direction = "right") {
        ctx.drawImage(playerRight, game.player.x, game.player.y, game.player.width, game.player.height);
    }
    // ctx.drawImage(playerImage, game.player.x, game.player.y, game.player.width, game.player.height);

    // ctx.fillStyle = 'red';
    // ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height); // プレイヤーを描画

    game.objects.forEach(obj => {
        ctx.drawImage(doorImage,obj.x, obj.y, obj.width, obj.height); // オブジェクトを描画
    });
}

// キーボード入力によるプレイヤーの移動
function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (game.player.y - tileSize >= 0) {
            game.player.y -= tileSize;
            }
            break;
        case 'ArrowDown':
            if (game.player.y + tileSize < canvas.height) {
            game.player.y += tileSize;
            }
            break;
        case 'ArrowLeft':
            if (game.player.x - tileSize >= 0) {
            game.player.x -= tileSize;
            }
            break;
        case 'ArrowRight':
            if (game.player.x + tileSize < canvas.width) {
            game.player.x += tileSize;
            }
            game.player.direction = 'right';
            break;
        }
        
        if (checkCollisions()) {
          const modal = document.getElementById('modal');
          modal.style.display = "block";
        }
    };

function isColliding(player, obj) {
    return player.x < obj.x + obj.width &&
           player.x + player.width > obj.x &&
           player.y < obj.y + obj.height &&
           player.y + player.height > obj.y;
}

function checkCollisions() {
    return game.objects.some(obj => isColliding(game.player, obj));
}

// イベントリスナーの設定
window.addEventListener('keydown', movePlayer);

// ゲームループ
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// ゲームの初期化とループの開始
gameLoop();

// 衝突したらモーダルを表示 by yotu

// 赤をキャラにして十字キー押した向きになるようにする by haru　32x32ピクセル


// フィールドっぽい芝生を生やす by fukui　32x32ピクセル


