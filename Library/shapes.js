class Shape {
  constructor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  render(xOffset = 0) {
    throw new Error("Render method must be implemented in subclass");
  }

  area() {
    throw new Error("Area method must be implemented in subclass");
  }
}

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }

  render(xOffset = 0) {
    const x1 = 150 + xOffset;
    const x2 = x1 + this.base / 2;
    const x3 = x1 - this.base / 2;
    const y2 = 200;
    return `<polygon points="${x1},20 ${x2},${y2} ${x3},${y2}" fill="${this.color}" stroke="black" stroke-width="3"/>`;
  }

  area() {
    return (this.base * this.height) / 2;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  render(xOffset = 0) {
    const cx = 150 + xOffset;
    return `<circle cx="${cx}" cy="100" r="${this.radius}" fill="${this.color}" stroke="black" stroke-width="3"/>`;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  constructor(color, side) {
    super(color);
    this.side = side;
  }

  render(xOffset = 0) {
    const x = 150 + xOffset - this.side / 2;
    const y = 100 - this.side / 2;
    return `<rect x="${x}" y="${y}" width="${this.side}" height="${this.side}" fill="${this.color}" stroke="black" stroke-width="3"/>`;
  }

  area() {
    return this.side * this.side;
  }
}

class Ellipse extends Shape {
  constructor(color, radiusx, radiusy) {
    super(color);
    this.radiusx = radiusx;
    this.radiusy = radiusy;
  }

  render(xOffset = 0) {
    const cx = 150 + xOffset;
    return `<ellipse cx="${cx}" cy="100" rx="${this.radiusx}" ry="${this.radiusy}" fill="${this.color}" stroke="black" stroke-width="3"/>`;
  }

  area() {
    return Math.PI * this.radiusx * this.radiusy;
  }
}

module.exports = { Triangle, Circle, Square, Ellipse };