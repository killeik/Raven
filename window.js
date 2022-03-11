class Window {
    static SetCanvas() {
        if ((windowWidth / windowHeight) <= (16 / 9)) {
            return { width: windowWidth, height: windowWidth * 9 / 16 }
        } else {
            return { width: windowHeight * 16 / 9, height: windowHeight }
        }
    }
    static SetScale(canvas) {
        return (canvas.height / 16 / 50);
    }
}