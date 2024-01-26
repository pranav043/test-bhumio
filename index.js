const Tesseract = require("tesseract.js");

async function OCR(file) {
  try {
    const result = await Tesseract.recognize(file, "eng");

    return result.data.text ? result.data.text.trim() : null;
  } catch (error) {
    console.error("Error! ", error.message);
    return null;
  }
}

async function getImageData() {
  const images = ["image1", "image2", "image3"];
  const locations = images.map((name) => `./images/${name}.jpg`);

  for (const file of locations) {
    console.log(`Image: ${file}`);

    const ocrResult = await OCR(file);

    if (ocrResult !== null) {
      const lines = ocrResult.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = Number(line.split(".")[0]);
        if (isNaN(lineNumber) || !line.toLowerCase().includes("unkn")) continue;

        const ansLetters = line.split("Yes")[1];
        let lineResult = "Yes";
        if (ansLetters.toLowerCase().split("unkn")[0].includes("no")) lineResult = "No";

        console.log(lineNumber, "=>", lineResult, "\n");
      }
    }
  }
}

getImageData();
