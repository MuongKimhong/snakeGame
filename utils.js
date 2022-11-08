function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function mouseIsOverRestartButton(canvas, event, btnPosition, btnWidth, btnHeight) {
    let mouse = getMousePosition(canvas, event);

    if (
        (mouse.x >= btnPosition.x && mouse.x <= (btnPosition.x + btnWidth)) &&
        (mouse.y >= btnPosition.y && mouse.y <= (btnPosition.y + btnHeight))
    ) {
        return true;
    }

    return false;
}

export {
    getMousePosition,
    mouseIsOverRestartButton
};