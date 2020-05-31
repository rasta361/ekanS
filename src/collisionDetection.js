export function detectCollision(gameObject1, gameObject2) {
    if (gameObject1.position.x === gameObject2.position.x && gameObject1.position.y === gameObject2.position.y)
        return true;
    else
        return false;
}

export function detectTailCollision(snake, gameObject) {
    for(let i = 0; i < snake.tails.length; i++) {
        if (gameObject.position.x === snake.tails[i][0] && gameObject.position.y === snake.tails[i][1])
            return true;
    }
}