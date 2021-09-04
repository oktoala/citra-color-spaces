
export function rgbToHex(r, g, b){

    const redHex   = (r).toString(16).length === 1 ? "0"+ (r).toString(16) : (r).toString(16);    
    const greenHex = (g).toString(16).length === 1 ? "0"+ (g).toString(16) : (g).toString(16);
    const blueHex  = (b).toString(16).length === 1 ? "0"+ (b).toString(16) : (b).toString(16);

    // console.log(`#${redHex}-${greenHex}-${blueHex}`);
    return `#${redHex}${greenHex}${blueHex}`;
}

export function rgbToCmyk(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;

    const k = (1-Math.max(r, g, b));
    
    const oneMinusK = k === 1 ? 1 : 1-k;

    const c = parseInt(100*((1-r-k)/(oneMinusK)));
    const m = parseInt(100*((1-g-k)/(oneMinusK)));
    const y = parseInt(100*((1-b-k)/(oneMinusK)));



    return ({c: c, m: m, y: y, k: parseInt(k*100)});
}

export function cmykToRgb(c, m, y, k){

    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = parseInt(255 * (1-c) * (1-k));
    const g = parseInt(255 * (1-m) * (1-k));
    const b = parseInt(255 * (1-y) * (1-k));

    return ({red: r, green: g, blue: b});
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

    // console.log(`h: ${h}, s: ${s}, l: ${l}`);

    return { hue: h, saturate: parseInt(s), lightness: parseInt(l) };
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

    return {red: Math.round(r * 255), green: Math.round(g * 255), blue: Math.round(b * 255)};
}

export function hslToCmyk(h, s, l){
    const rgb = hslToRgb(h, s, l);

    const cmyk = rgbToCmyk(rgb.red, rgb.green, rgb.blue);

    return {
        c: cmyk.c,
        m: cmyk.m,
        y: cmyk.y,
        k: cmyk.k,
    };
}

export function cmykToHsl(c, m, y, k){
    const rgb = cmykToRgb(c, m, y, k);

    const hsl = rgbToHSL(rgb.red, rgb.green, rgb.blue);

    return {
        hue: hsl.hue,
        saturate: hsl.saturate,
        lightness: hsl.lightness
    };
}