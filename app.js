// Onload function
window.addEventListener("load", main);

// Main function
function main() {
  // Initially create color palettes
  createColorPalates();

  // Color change on button onclick
  const btn = getDomElementsError(".btn");
  btn.addEventListener("click", updateColors);

  // Event listener for dropdown change
    const selectOptions = getDomElementsError(".select-options")

  selectOptions.addEventListener("change", function () {
    const selectedCount = parseInt(this.value, 10);
    createColorPalates(selectedCount);
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
function createColorPalates(count = 10) {
  const colorPalateParent = getDomElementsError(".colors-palates");
  colorPalateParent.innerHTML = "";
  const totalCount = getDomElementsError(".total-color-palate");
  const fragment = document.createDocumentFragment();
  if (!colorPalateParent) {
    console.error(`Error: .colors-palates container not found`);
    return;
  }

  for(let i = 1; i <= count; i++) {
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
  totalCount.textContent = count;

  colorPalateParent.appendChild(fragment);
}

// // Update existing colors
function updateColors() {
    const colorPalates = document.querySelectorAll(".color-palate") 
    
    colorPalates.forEach((palate) => {
        const colors = decimalNumberGenerator();

        // Update the background color
        palate.querySelector(".display-color").style.background = colors.hex;

        // Update HEX, RGB, and HSL text values
        palate.querySelector(".hex span:last-child").textContent = colors.hex;
        palate.querySelector(".rgb span:last-child").textContent = colors.rgb;
        palate.querySelector(".hsl span:last-child").textContent = colors.hsl;
        
    })
}

// Function to create and show a toast notification
function showToast(color) {
    // Clone the existing toast
    const existingToast = document.querySelector(".toast");
    if (!existingToast) return console.error("Toast element not found!");

    // Create a new toast instance
    const newToast = existingToast.cloneNode(true);
    newToast.classList.add("active"); // Make it visible
    newToast.querySelector(".copied-color").textContent = color; // Update color text

    // Append to body (this will stack them)
    document.body.appendChild(newToast);

    // Remove after 3 seconds
    setTimeout(() => {
        newToast.classList.remove("active");
        setTimeout(() => newToast.remove(), 300); // Ensure smooth removal
    }, 3000);
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(text); // Show toast when copied
    });
}

// Event listener to handle clicks on color codes
document.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.closest(".hex span:last-child") ||
        clickedElement.closest(".rgb span:last-child") ||
        clickedElement.closest(".hsl span:last-child")) {
        copyToClipboard(clickedElement.textContent.trim());
    }
});



