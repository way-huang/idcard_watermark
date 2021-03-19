class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    height(height) {
        if (height) {
            this.canvas.height = height;
        }
        return this.canvas.height;
    }
    width(width) {
        if (width) {
            this.canvas.width = width;
        }
        return this.canvas.width;
    }
    getContext() {
        return this.context;
    }
    set(height, width) {
        this.height(height);
        this.width(width);
    }
    drawImage(...args) {
        // @ts-ignore
        this.context.drawImage(...args);
        return this;
    }
    save() {
        this.context.save();
        return this;
    }
    restore() {
        this.context.restore();
        return this;
    }
    rotate(angle) {
        this.context.rotate(angle);
        return this;
    }
    translate(x, y) {
        this.context.translate(x, y);
        return this;
    }
    font(fontStyle) {
        this.context.font = fontStyle;
        return this;
    }
    text(text, x, y, useStroke = false) {
        if (useStroke) {
            this.context.strokeText(text, x, y);
        }
        else {
            this.context.fillText(text, x, y);
        }
        return this;
    }
    strokeStyle(style) {
        this.context.strokeStyle = style;
        return this;
    }
    fillStyle(style) {
        this.context.fillStyle = style;
        return this;
    }
    alpha(alpha) {
        this.context.globalAlpha = alpha;
        return this;
    }
    toDataURL(quality = 0.92) {
        return this.canvas.toDataURL('image/jpeg', quality);
    }
    clear() {
        this.context.clearRect(0, 0, this.width(), this.height());
        return this;
    }
}
const $ = (function () {
    const cache = {};
    return function (selector) {
        if (!(selector in cache)) {
            cache[selector] = document.querySelector(selector);
        }
        return cache[selector];
    };
})();
const drawWaterMark = function (c, watermark, imageSource) {
    let fontSize = Math.ceil((15 / 350) * (c.width() > c.height() ? c.height() : c.width()));
    c.clear()
        .save()
        .drawImage(imageSource, 0, 0, c.width(), c.height())
        .rotate(Math.PI / 6)
        .fillStyle('black')
        .alpha(0.2)
        .font(`bold ${fontSize}px arial`)
        .translate(0, -c.width() / 2);
    let times = Math.ceil((c.width() / 2 + Math.sin(Math.PI / 3) * c.height()) / 50);
    let gap = Math.ceil((40 / 15) * fontSize);
    const pos = [-300, -150, 0];
    for (; times > 0; times--) {
        c.translate(pos[times % 3], gap);
        for (let i = 0; i < 3; i++) {
            c.text(watermark, i * watermark.length * (fontSize - 1), 0);
        }
        c.translate(-pos[times % 3], 0);
    }
    c.restore();
};
export { $, Canvas, drawWaterMark };
