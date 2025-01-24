const fs = require("fs");
const inquirer = require("inquirer");


function generateSVG(elements) {
  let shapesSVG = elements
    .map(({ shape, text, textColor, shapeColor }, index) => {
      let shapeSVG = "";
      let xOffset = index * 350;
      if (shape === "circle") {
        shapeSVG = `<circle cx="${150 + xOffset}" cy="100" r="80" stroke="black" fill="${shapeColor}" stroke-width="5"/>`;
      } else if (shape === "triangle") {
        shapeSVG = `<polygon points="${150 + xOffset},20 ${250 + xOffset},200 ${
          50 + xOffset
        },200" stroke="black" fill="${shapeColor}" stroke-width="5"/>`;
      } else if (shape === "square") {
        shapeSVG = `<rect x="${70 + xOffset}" y="20" width="160" height="160" stroke="black" fill="${shapeColor}" stroke-width="5"/>`;
      } else if (shape === "ellipse") {
        shapeSVG = `<ellipse cx="${150 + xOffset}" cy="100" rx="80" ry="40" stroke="black" fill="${shapeColor}" stroke-width="5"/>`;
      }
      return `${shapeSVG}<text x="${150 + xOffset}" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>`;
    })
    .join("");

  return `<svg version="1.1" width="${
    elements.length * 350
  }" height="200" xmlns="http://www.w3.org/2000/svg">${shapesSVG}</svg>`;
}

async function main() {
  const elements = [];
  let addMore = true;

  while (addMore) {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "text",
        message: "Enter up to three characters for the logo text:",
        validate: (input) =>
          input.length <= 3 ? true : "Text must be three characters or less.",
      },
      {
        type: "input",
        name: "textColor",
        message:
          "Enter a color keyword or a hexadecimal number for the text color:",
      },
      {
        type: "list",
        name: "shape",
        message: "Choose a shape for the logo:",
        choices: ["circle", "triangle", "square", "ellipse"],
      },
      {
        type: "input",
        name: "shapeColor",
        message:
          "Enter a color keyword or a hexadecimal number for the shape color:",
      },
    ]);

    elements.push(answers);

    const { confirmAddMore } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmAddMore",
        message: "Would you like to add another shape?",
        default: false,
      },
    ]);

    addMore = confirmAddMore;
  }

  const svgContent = generateSVG(elements);
  fs.writeFileSync("logo.svg", svgContent);
  console.log("Generated logo.svg with multiple shapes!");
}

main();

module.exports = generateSVG;
