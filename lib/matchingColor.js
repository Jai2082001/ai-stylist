export function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

export function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function calculateDistance(color1, color2) {
    var [h1, s1, l1] = color1;
    var [h2, s2, l2] = color2;
    var deltaH = Math.abs(h2 - h1);
    if (deltaH > 0.5) deltaH = 1 - deltaH; // Take the shorter distance around the color wheel
    var deltaS = s2 - s1;
    var deltaL = l2 - l1;
    return Math.sqrt(deltaH ** 2 + deltaS ** 2 + deltaL ** 2);
}

export function findBestComplementingColor(inputColor, availableComplementaryColors) {
    // Convert input color to HSL
    var inputHsl = rgbToHsl(inputColor);

    var bestColor = null;
    var minDistance = Infinity;

    availableComplementaryColors.forEach(complementaryColor => {
        // Convert complementary color to HSL
        var complementaryHsl = rgbToHsl(complementaryColor);
        
        // Calculate distance
        var distance = calculateDistance(inputHsl, complementaryHsl);
        
        if (distance < minDistance) {
            minDistance = distance;
            bestColor = complementaryColor;
        }
    });

    return bestColor;
}

// Available complementary colors for green in RGB
// Convert available complementary colors to HSL
// var availableComplementaryColorsHSL = availableComplementaryColorsRGB.map(color => rgbToHsl(color));

// var bestComplementingColorHSL = findBestComplementingColor(inputColorHSL, availableComplementaryColorsHSL);

// Convert best complementing color back to RGB for display
// var bestComplementingColorRGB = hslToRgb(bestComplementingColorHSL[0], bestComplementingColorHSL[1], bestComplementingColorHSL[2]);

// console.log("Input Color (RGB):", inputColorRGB);
// console.log("Best Complementing Color (RGB):", bestComplementingColorRGB);
