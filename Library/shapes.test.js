const { Triangle, Circle, Square, Ellipse } = require("./shapes");

describe("Shape Area Calculations", () => {
  test.each([
    ["Triangle", Triangle, "red", [100, 100], 5000],
    ["Circle", Circle, "blue", [80], 20106.19],
    ["Square", Square, "green", [160], 25600],
    ["Ellipse", Ellipse, "yellow", [80, 40], 10053.1],
  ])(
    "calculates the area for %s",
    (shapeName, ShapeClass, color, dimensions, expectedArea) => {
      const shape = new ShapeClass(color, ...dimensions);
      expect(shape.area()).toBeCloseTo(expectedArea, 2);
    }
  );
});

describe("Shape Color Checks", () => {
  test.each([
    ["Triangle", Triangle, "red", [100, 100]],
    ["Circle", Circle, "blue", [80]],
    ["Square", Square, "green", [160]],
    ["Ellipse", Ellipse, "yellow", [80, 40]],
  ])(
    "gets the color for %s",
    (shapeName, ShapeClass, color, dimensions) => {
      const shape = new ShapeClass(color, ...dimensions);
      expect(shape.getColor()).toBe(color);
    }
  );
});

describe("Shape Render Method", () => {
  test.each([
    [
      "Triangle",
      Triangle,
      "red",
      [100, 100],
      100,
      `<polygon points="250,20 300,200 200,200" fill="red" stroke="black" stroke-width="3"/>`,
    ],
    [
      "Circle",
      Circle,
      "blue",
      [80],
      100,
      `<circle cx="250" cy="100" r="80" fill="blue" stroke="black" stroke-width="3"/>`,
    ],
    [
      "Square",
      Square,
      "green",
      [160],
      100,
      `<rect x="170" y="20" width="160" height="160" fill="green" stroke="black" stroke-width="3"/>`, // Adjusted expected value
    ],
    [
      "Ellipse",
      Ellipse,
      "yellow",
      [80, 40],
      100,
      `<ellipse cx="250" cy="100" rx="80" ry="40" fill="yellow" stroke="black" stroke-width="3"/>`,
    ],
  ])(
    "renders the SVG for %s with xOffset",
    (shapeName, ShapeClass, color, dimensions, xOffset, expectedSVG) => {
      const shape = new ShapeClass(color, ...dimensions);
      expect(shape.render(xOffset)).toEqual(expectedSVG);
    }
  );
});