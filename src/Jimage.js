import React, { useEffect, useState } from 'react';
import JIMP from 'jimp';
import { Grid } from '@material-ui/core';



export const Jimage = (props) => {
    const histoGram = {
        red: "",
        green: "",
        blue: ""
    };
    const options = props;

    const { src, alt, width, height, style, className, loadBlur } = options;

    const [image, setImage] = useState(src);
    const [loading, setLoading] = useState(true);
    const [histogramValue, setHistogramValue] = useState(histoGram);

    useEffect(() => {
        async function imgEffect() {
            const loadImage = await JIMP.read(src);

            for (const option in options) {

                if (typeof loadImage[option] !== 'function') continue;
                const IMG_PARAMS = options[option];

                if (typeof IMG_PARAMS === 'boolean') {

                    // Perform if boolean true
                    if (IMG_PARAMS === true) loadImage[option]()

                } else if (IMG_PARAMS.includes('true')) {

                    // Get parameters as boolean
                    const GET_PARAMS = IMG_PARAMS.split(',')
                    const BOOL_PARAMS = GET_PARAMS.map(bool => (bool.includes('true')))
                    loadImage[option](...BOOL_PARAMS)

                } else if (option === 'color') {

                    // Color manipulation
                    loadImage.color(options[option])

                } else {

                    // Take parameters and convert to int
                    const PARAMS_ARR = IMG_PARAMS.split(',');
                    const FLOAT_PARAMS = PARAMS_ARR.map(opt => parseFloat(opt));

                    // Perform method
                    loadImage[option](...FLOAT_PARAMS);
                }
            }

            const mime = await loadImage.getBase64Async(JIMP.MIME_JPEG);
            setLoading(false);
            setImage(mime);
            await JIMP.read(mime, function (err, photo) {
                histogramRGB(photo);
            });
        }
        imgEffect();
        return () => setLoading(true);
    },// eslint-disable-next-line 
        [src, options]);

    function histogramRGB(photo) {
        const colourFrequencies = getColourFrequencies(photo);

        createHistogram(colourFrequencies);
    }

    function getColourFrequencies(photo) {
        const result = {
            red: {
                index: 0,
                colourFrequencies: 0,
                maxFrequency: 0
            },
            green: {
                index: 1,
                colourFrequencies: 0,
                maxFrequency: 0
            },
            blue: {
                index: 2,
                colourFrequencies: 0,
                maxFrequency: 0
            }
        };
        for (const key in result) {

            const startIndex = result[key]["index"];

            let maxFrequency = 0;
            const colourFrequencies = Array(256).fill(0);

            if (Object.hasOwnProperty.call(result, key)) {
                for (let i = startIndex, len = photo.bitmap.data.length; i < len; i += 4) {
                    colourFrequencies[photo.bitmap.data[i]]++;
                    if (colourFrequencies[photo.bitmap.data[i]] > maxFrequency) {
                        maxFrequency++;
                    }
                }

                result[key].colourFrequencies = colourFrequencies;
                result[key].maxFrequency = maxFrequency;

            }
        }
        return result;
    }

    function createHistogram(colourFrequencies) {
        const histWidth = 256;
        const histHeight = 316;
        const columnWidth = histWidth / className; /* Ini jadi bins */

        for (const key in colourFrequencies) {
            let hexColour;
            let x = 0;
            let columnHeight;
            let svgstring = `<svg width='${histWidth}px' height='${histHeight}px' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n`;

            if (Object.hasOwnProperty.call(colourFrequencies, key)) {
                const pixelsPerUnit = histHeight / colourFrequencies[key].maxFrequency;

                for (let i = 0; i < histWidth; i++) {
                    switch (colourFrequencies[key].index) {
                        case 0:
                            hexColour = options.color.length === 3 ?"red" : "grey";
                            break;
                        case 1:
                            hexColour = "green";
                            break;
                        case 2:
                            hexColour = "blue";
                            break;
                        default:
                            break;
                    }
                    columnHeight = colourFrequencies[key].colourFrequencies[i] * pixelsPerUnit;
                    svgstring += `    <rect fill='${hexColour}' stroke='${hexColour}' stroke-width='0.25px' width='${columnWidth}' height='${columnHeight}' y='${histHeight - columnHeight}' x='${x}' />\n`;
                    if (i % columnWidth === 0 && i !== 0) {
                        x += columnWidth;
                    } else if (columnWidth === 1) {
                        x += columnWidth;
                    }
                }
                svgstring += "</svg>";
            }
            if (colourFrequencies[key].index === 0) {
                histoGram.red = svgstring;
            }
            else if (colourFrequencies[key].index === 1) {
                histoGram.green = svgstring;
            }
            else if (colourFrequencies[key].index === 2) {
                histoGram.blue = svgstring;
            }
        }
        setHistogramValue(histoGram);

    }

    return (
        <Grid container>
            <Grid item xs>
                <img
                    className={className && className}
                    alt={alt && alt}
                    src={image} width={width && width}
                    height={height && height}
                    style={loading && loadBlur ? { filter: 'blur(3px)' } : style}
                />
            </Grid>
            {
                options.color.length === 3 ?
                    Object.keys(histogramValue).map((value, index) => (
                        <Grid item xs danger>
                            <div dangerouslySetInnerHTML={{ __html: histogramValue[value] }}></div>
                        </Grid>
                    )) :
                    <Grid item xs danger>
                        <div dangerouslySetInnerHTML={{ __html: histogramValue["red"] }}></div>
                    </Grid>
            }
        </Grid>
    );
}
