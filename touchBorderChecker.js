function checkIfSnakeTouchTopBorder(head) { 
    return head['y'] + head['height'] <= 0 ? true : false;
}

function checkIfSnakeTouchLeftBorder(head) { 
    return head['x'] + head['width'] <= 0 ? true : false;
}

function checkIfSnakeTouchBottomBorder(head, canvas) { 
    return head['y'] + head['height'] >= canvas.height ? true : false;
}

function checkIfSnakeTouchRightBorder(head, canvas) { 
    return head['x'] - head['width'] >= canvas.width ? true : false;
}

export {
    checkIfSnakeTouchBottomBorder,
    checkIfSnakeTouchLeftBorder,
    checkIfSnakeTouchRightBorder,
    checkIfSnakeTouchTopBorder
};