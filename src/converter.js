
export function rgbToCmyk(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1-Math.max(r, g, b);
    const c = parseInt((1-r-k)/(1-k));
    const m = parseInt((1-g-k)/(1-k));
    const y = parseInt((1-b-k)/(1-k));

    return ({c: c*100, m: m*100, y: y*100, k: parseInt(k*100)});
}

export function cmykToRgb(c, m, y, k){

    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = parseInt(255 * (1-c) * (1-k));
    const g = parseInt(255 * (1-m) * (1-k));
    const b = parseInt(255 * (1-y) * (1-k));

    return ({r: r, g: g, b: b});
}


// Function to convert
export function rgbToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta === 0)
        h = 0;
    // Red is max
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    console.log(`h: ${h}, s: ${s}, l: ${l}`);

    return { hue: h, saturate: s, lightness: l };
}

export function hslToRgb(h, s, l) {
    var r, g, b;

    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
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

