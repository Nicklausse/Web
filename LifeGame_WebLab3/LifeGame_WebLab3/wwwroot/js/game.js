var fieldHeight = 1000;
var fieldWidth = 1000;
var field = createArray(fieldWidth);
var mirrorField = createArray(fieldWidth);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.scale(10, 10);
ctx.fillStyle = "#FF0066";

fillRandom(); //создание исходного вида поля путем случайного заполнения ячеек

tick(); //вызов главного цикла

//функции
function tick() {
    //главный цикл
    requestId = undefined;
    drawField();
    updateField();
    start();
    //requestAnimationFrame(tick);
}

function start() {
    //запуск игры после паузы
    if (!requestId) {
        requestId = window.requestAnimationFrame(tick);
    }
}

function stop() {
    //пауза
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}

function createArray(rows) {
    //создание двумерного массива необходимой длины
    var array = [];
    for (var i = 0; i < rows; i++) {
        array[i] = [];
    }
    return array;
}

function fillRandom() {
    //заполнение поля случайным образом
    for (var j = 1; j < fieldHeight-1; j++) {
        //итерации по строкам
        for (var k = 1; k < fieldWidth-1; k++) {
            //итерации по столбцам
            field[j][k] = Math.round(Math.random());
        }
    }
}

function drawField() {
    //вывод поля в Canvas
    ctx.clearRect(0, 0, fieldHeight, fieldWidth); //очистка холста перед каждой перерисовкой
    for (var j = 1; j < fieldHeight; j++) { //итерации по строкам
        for (var k = 1; k < fieldWidth; k++) { //итерации по столбцам
            if (field[j][k] === 1) {
                ctx.fillRect(j, k, 1, 1);
            }
        }
    }
}

function updateField() {
    //обновление состояния поля (одна итерация)
    for (var j = 1; j < fieldHeight - 1; j++) {
        //итерации по строкам
        for (var k = 1; k < fieldWidth - 1; k++) {
            //итерации по столбцам
            var totalCells = 0;
            //сложение значений соседних клеток
            totalCells += field[j - 1][k - 1]; //верхняя левая
            totalCells += field[j - 1][k]; //верхняя центральная
            totalCells += field[j - 1][k + 1]; //верхняя правая

            totalCells += field[j][k - 1]; //срединная левая
            totalCells += field[j][k + 1]; //срединная правая

            totalCells += field[j + 1][k - 1]; //нижняя левая
            totalCells += field[j + 1][k]; //нижняя центральная
            totalCells += field[j + 1][k + 1]; //нижняя правая

            //применение правил игры к каждой ячейке
            switch (totalCells) {
                case 2:
                    mirrorField[j][k] = field[j][k];
                    break;
                case 3:
                    mirrorField[j][k] = 1;
                    break;

                default:
                    mirrorField[j][k] = 0;
            }
        }
    }
    //зеркальные края для создания эффекта wraparound (обертывание)
    for (var l = 1; l < fieldHeight - 1; l++) {
        //итерации по строкам
        //сверху и снизу
        mirrorField[l][0] = mirrorField[l][fieldHeight - 3];
        mirrorField[l][fieldHeight - 2] = mirrorField[l][1];
        //справа и слева
        mirrorField[0][l] = mirrorField[fieldHeight - 3][l];
        mirrorField[fieldHeight - 2][l] = mirrorField[1][l];
    }

    //замена полей местами
    var temp = field;
    field = mirrorField;
    mirrorField = temp;
}

function newGame() {
    //начало новой игры
    fillRandom();
    tick();
}

//обработка нажатия кнопок
document.getElementById('start').onclick = tick;
document.getElementById('stop').onclick = stop;
document.getElementById('newGame').onclick = newGame;