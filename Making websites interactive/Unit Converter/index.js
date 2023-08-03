/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const METERTOFEET = 3.281
const LITERTOGALLON = 0.264
const KILOTOLBS = 2.204

const numberInput = document.getElementById("number-input")
const convertBtn = document.getElementById("convert-btn")
const lengthParagraph = document.getElementById("length-conversions")
const volumeParagraph = document.getElementById("volume-conversions")
const massParagraph = document.getElementById("mass-conversions")

convertBtn.addEventListener("click", function() {
    const num = numberInput.value
	
	if (isNaN(num)) { return; }
    
    lengthParagraph.textContent = `${num} meters = ${(num * METERTOFEET).toFixed(3)} feet | ${num} feet = ${(num / METERTOFEET).toFixed(3)} meters`
    
    volumeParagraph.textContent = `${num} liters = ${(num * LITERTOGALLON).toFixed(3)} gallons | ${num} gallons = ${(num / LITERTOGALLON).toFixed(3)} liters`
    
    massParagraph.textContent = `${num} kilos = ${(num * KILOTOLBS).toFixed(3)} pounds | ${num} pounds = ${(num / KILOTOLBS).toFixed(3)} kilos`
})