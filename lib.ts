class Canvas {
  private readonly context: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
  }

  height(height?: number): number {
    if (height) {
      this.canvas.height = height;
    }
    return this.canvas.height;
  }

  width(width?: number): number {
    if (width) {
      this.canvas.width = width;
    }
    return this.canvas.width;
  }

  getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  set(height: number, width: number): void {
    this.height(height);
    this.width(width);
  }

  drawImage(...args: any): this {
    // @ts-ignore
    this.context.drawImage(...args);
    return this;
  }

  save(): this {
    this.context.save();
    return this;
  }

  restore(): this {
    this.context.restore();
    return this;
  }

  rotate(angle: number): this {
    this.context.rotate(angle);
    return this;
  }

  translate(x: number, y: number): this {
    this.context.translate(x, y);
    return this;
  }

  font(fontStyle: string): this {
    this.context.font = fontStyle;
    return this;
  }

  text(text: string, x: number, y: number, useStroke: boolean = false): this {
    if (useStroke) {
      this.context.strokeText(text, x, y);
    } else {
      this.context.fillText(text, x, y);
    }
    return this;
  }

  strokeStyle(style: string): this {
    this.context.strokeStyle = style;
    return this;
  }

  fillStyle(style: string): this {
    this.context.fillStyle = style;
    return this;
  }

  alpha(alpha: number): this {
    this.context.globalAlpha = alpha;
    return this;
  }

  toDataURL(quality: number = 0.92): string {
    return this.canvas.toDataURL('image/jpeg', quality);
  }

  clear(): this {
    this.context.clearRect(0, 0, this.width(), this.height());
    return this;
  }
}

const $ = (function () {
  const cache: { [key: string]: HTMLElement } = {};
  return function (selector: string): HTMLElement {
    if (!(selector in cache)) {
      cache[selector] = document.querySelector(selector);
    }
    return cache[selector];
  };
})();

const drawWaterMark = function (
  c: Canvas,
  watermark: string,
  imageSource: HTMLImageElement
) {
  let fontSize = Math.ceil(
    (15 / 350) * (c.width() > c.height() ? c.height() : c.width())
  );

  c.clear()
    .save()
    .drawImage(imageSource, 0, 0, c.width(), c.height())
    .rotate(Math.PI / 6)
    .fillStyle('black')
    .alpha(0.2)
    .font(`bold ${fontSize}px arial`)
    .translate(0, -c.width() / 2);

  let times = Math.ceil(
    (c.width() / 2 + Math.sin(Math.PI / 3) * c.height()) / 50
  );
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
