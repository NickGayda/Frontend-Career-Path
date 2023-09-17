// Grabbing elements that will be used more than once
const colorResults = document.getElementById('color-results')
const hexResults = document.getElementById('hex-results')

// Set default values
let color = 'F55A5A'
let scheme = 'monochrome'
let count = 5

// Copy color clicked to keyboard
document.getElementById('results=container').addEventListener('click', (e) => {
    let hex = ''

    if (e.target.classList.contains('color-block')) {
        hex = rgbToHex(e.target.style.backgroundColor)
        navigator.clipboard.writeText(hex)
        alert(`${hex} copied to clipboard`)
    }
    else if (e.target.classList.contains('hex-block')) {
        hex = e.target.textContent
        navigator.clipboard.writeText(e.target.textContent);
        alert(`${hex} copied to clipboard`)
    }
})

// Set new values for color scheme and call render
document.getElementById('selection-button').addEventListener('click', () => {
    color = document.getElementById('selection-color').value.slice(1);
    scheme = document.getElementById('selection-scheme').value;
    count = document.getElementById('selection-count').value;
    
    renderColorScheme()
})

// Render the colors returned from the thecolorapi.com
function renderColorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=${count}`)
    .then(res => res.json())
    .then(data => {
        
        // Empty containers
        colorResults.innerHTML = ''
        hexResults.innerHTML = ''

        // Loop through each returned color
        data.colors.forEach((color) => {

            // Create a block div that shows the color
            const colorDiv = document.createElement('div')
            colorDiv.classList.add('color-block')
            colorDiv.classList.add('flex-block')
            colorDiv.style.backgroundColor = color.hex.value
            colorResults.appendChild(colorDiv)

            // Create a span that shows the hex value
            const hexSpan = document.createElement('span')
            hexSpan.classList.add('hex-block')
            hexSpan.classList.add('flex-block')
            hexSpan.textContent = color.hex.value
            hexResults.appendChild(hexSpan)
        })
    })
}

// Function to convert RGB to Hex
function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16).toUpperCase();
        var g=parseInt(col[1], 10).toString(16).toUpperCase();
        var b=parseInt(col[2], 10).toString(16).toUpperCase();
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}

// Initial render of the webpage
renderColorScheme()