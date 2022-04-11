const canvas = document.querySelector('canvas');
const btnUndo = document.querySelector('.btnUndo');
const btnClear = document.querySelector('.btnClear');


const c = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 600;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height)

let draw_color = 'black';
let draw_width = '2';
let is_drawing = false;

let restore_array = [];
let index = -1;

canvas.addEventListener('touchstart', start, false)
canvas.addEventListener('touchmove', draw, false)
canvas.addEventListener('mousedown', start, false)
canvas.addEventListener('mousemove', draw, false)

canvas.addEventListener('touchend', stop, false)
canvas.addEventListener('mouseup', stop, false)
canvas.addEventListener('mouseout', stop, false)

function start(event) {
    is_drawing = true;
    
    c.beginPath();
    c.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        c.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        c.strokeStyle = draw_color
        c.lineWidth = draw_width;
        c.lineCap = 'round';
        c.lineJoin = 'round'
        c.stroke();
    }
    event.preventDefault()
}

function stop(event){
    if(is_drawing){
        c.stroke();
        c.closePath();

        is_drawing  = false
    }

    if(event.type != 'mouseout'){
        restore_array.push(c.getImageData(0, 0, canvas.width, canvas.height));
        index += 1
        console.log(restore_array)
    }
    event.preventDefault();

    
}

function change_color(object) {
    draw_color = object.style.backgroundColor
}

function clear_canvas(){
    c.fillRect(0, 0, canvas.width, canvas.height)
    restore_array = [];
    index = -1;
}

function undo_canvas(){
    if( index <= 0){
        clear_canvas()
    } else {
        index -= 1
        restore_array.pop();
        c.putImageData(restore_array[index], 0, 0);
    }
}


const box = document.querySelector('.tools');
const btnPaint = document.querySelector('.menu-paint')

btnPaint.addEventListener('click', () => {
    box.classList.toggle('active');


})




