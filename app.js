// Onload function
window.addEventListener("load", main);

// Main function
function main() {
  // Initially create color palettes
  createColorPalates();


  // Color change on button onclick
  const btn = getDomElementsError(".btn");
  

  btn.addEventListener("click", function() {
    updateColors;
    
  });
}

// Decimal number generator
function decimalNumberGenerator() {
  // Generate random RGB values (0 - 255)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert RGB to HSL
  let rNorm = r / 255,
    gNorm = g / 255,
    bNorm = b / 255;

  let max = Math.max(rNorm, gNorm, bNorm),
    min = Math.min(rNorm, gNorm, bNorm);
  let delta = max - min;

  // Calculate Lightness (L)
  let l = (max + min) / 2;
  let h = 0,
    s = 0;

  // Calculate Saturation (S)
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    // Calculate Hue (H)
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }

    h = h * 60;
    if (h < 0) h += 360;
  }

  // Convert values to proper precision (keeping decimals)
  h = parseFloat(h.toFixed(2));
  s = parseFloat((s * 100).toFixed(2));
  l = parseFloat((l * 100).toFixed(2));

  return {
    hex: `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };
}

// DOM element error handdling
function getDomElementsError(id) {
  const element = document.querySelector(id);
  if (!element) {
    console.error(`Error: Element with class '${id}' not found`);
    return;
  }
  return element;
}

// Create color palates
function createColorPalates() {
  const colorPalateParent = document.querySelector(".colors-palates");
  const fragment = document.createDocumentFragment();
  if (!colorPalateParent) {
    console.error(`Error: .colors-palates container not found`);
    return;
  }

  for(let i = 1; i <= 10; i++) {
    const colors = decimalNumberGenerator();
    const colorPalate = document.createElement("div");
    colorPalate.innerHTML = `
    <div class="color-palate">
      <div class="display-color" style="background: ${colors.hex};"></div>
      <div class="colors-code">
          <div class="hex">
              <span class="tooltip">HEX:</span>
              <span class="tooltip">${colors.hex}</span>
          </div>
          <div class="rgb">
              <span class="tooltip">RGB</span>
              <span>${colors.rgb}</span>
          </div>
          <div class="hsl">
              <span>HSL</span>
              <span>${colors.hsl}</span>
          </div>
      </div>
    </div>`;
    fragment.appendChild(colorPalate);
    
  }

  colorPalateParent.appendChild(fragment);
}



// Update the color 
function updateColors() {
    const colorPalates = document.querySelectorAll(".color-palate") 
    
    colorPalates.forEach((palate) => {
        const colors = decimalNumberGenerator();

        palate.querySelector(".display-color").style.background = colors.hex;
        console.log(palate);
        
    })
    
}


