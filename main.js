let innerPercent = 50;
let innerRadius = 270;
let barPercent = 50;
let maxLength = 500 / 2 - innerRadius;
let barWidth = 75;
let startHue = 0;
let endHue = 180;
let saturation = 50;
let lightness = 50;
let compensation = 100;
let glow = 10;
let innerMovement = 25;

let showStars = true;
let starColor = "#FFFFFF";
let starOpacity = 100;
let starGlow = 15;

let xPercent = 50;
let yPercent = 50;
let movementSpeed = 50;
let movementRadius = 15;
let roundedBars = false;

let shadowX = 8;
let shadowY = 8;
let shadowBlur = 10;
let shadowOpacity = 70;

let bgShakeX = 10;  // Maximum horizontal shake value
let bgShakeY = 10;  // Maximum vertical shake value
let bgTilt = 5;     // Maximum tilt in degrees
let bgSmoothing = 1; //  Beat smoothing (0 to 1, where 0 is no smoothing)
let bgScale = 1.2;  // Initial background image scale
let frequencyThreshold = 1; // Threshold for detecting bass (0 to 1, where 0 is less bass)

let bgBlur = 10; // Set the initial blur
let blurIntensityFactor = 10; // Intensity factor to control the increase in blur
let blurDuration = 1; // Duration of blur effect for smoothing (0 to 1)

const debug = document.getElementById("debug");
const middle = document.getElementById("middle");
const canvas = document.getElementById("canvas");
const visualizer = document.getElementById("visualizer");
const starfield = document.getElementById("starfield");
const background = document.getElementById("background");

// Fullscreen canvas
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let axis = 0;

const ctx = canvas.getContext("2d");


// Rectangular canvas
let lineWidthBase = 1; // Base line width 
let lineWidthMultiplier = 40; // Multiplier to adjust line width with the beat
const rectangularCanvas = document.getElementById("rectangular-visualizer");
rectangularCanvas.width = document.body.clientWidth;
rectangularCanvas.height = document.body.clientHeight;
const rectCtx = rectangularCanvas.getContext("2d");

// Set default values for opacity and multiplication factor
const opacityBase = 0; // Initial Opacity (100% transparent)
const opacityMultiplier = 10; // Multiplier factor for opacity 


function resizeRectangularCanvas() {
  rectangularCanvas.width = window.innerWidth - 4; // Subtract 4px for the margin
  rectangularCanvas.height = window.innerHeight - 4; // Subtract 4px for the margin
}

window.addEventListener('resize', resizeRectangularCanvas);
resizeRectangularCanvas(); // Initialize the correct size

function updateRectangularVisualizer(average) {
  rectCtx.clearRect(0, 0, rectangularCanvas.width, rectangularCanvas.height);

  // Adjusts line thickness based on beat intensity
  let lineWidth = lineWidthBase + average * lineWidthMultiplier;

  // Adjusts opacity based on beat intensity
  let opacity = opacityBase + average * opacityMultiplier;
  opacity = Math.min(Math.max(opacity, 0), 1); // Ensures opacity is between 0 and 1

  // Setting the margin
  let margin = 3;
  let width = rectangularCanvas.width - 2 * margin;
  let height = rectangularCanvas.height - 2 * margin;

  // Sets the color with adjusted opacity
  rectCtx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // White color with variable opacity 
  rectCtx.lineWidth = lineWidth;
  rectCtx.lineCap = "round";

  // Draws the line around the edges of the canvas with margin
  rectCtx.beginPath();
  rectCtx.moveTo(margin, margin);
  rectCtx.lineTo(width + margin, margin);
  rectCtx.stroke();

  rectCtx.beginPath();
  rectCtx.moveTo(width + margin, margin);
  rectCtx.lineTo(width + margin, height + margin);
  rectCtx.stroke();

  rectCtx.beginPath();
  rectCtx.moveTo(width + margin, height + margin);
  rectCtx.lineTo(margin, height + margin);
  rectCtx.stroke();

  rectCtx.beginPath();
  rectCtx.moveTo(margin, height + margin);
  rectCtx.lineTo(margin, margin);
  rectCtx.stroke();
}




function livelyAudioListener(audioArray) {
  // Filters out bass frequencies
  let filteredAudio = audioArray.map((val, idx, arr) => idx < arr.length / 3 ? val : 0);

  // Calculates the average of the bass frequencies
  let average = filteredAudio.reduce((acc, val) => acc + val) / filteredAudio.length;

  // Adjusts the intensity of the stars
  star_speed = average * 32;
  starOpacity = Math.min(average * 64, 100); // Garantir que a opacidade não exceda 100
  starGlow = average * 12;

  // Calculates the background image scale
  let bgImageScale = bgScale - average * (bgScale - 1);
  bgImageScale = bgImageScale * (1 - bgSmoothing) + (bgScale - average * (bgScale - 1)) * bgSmoothing;

  // Updates the background image transformation
  background.style.backgroundSize = `${bgImageScale * 100}% ${bgImageScale * 100}%`;

  // Calculates the new blur value
  let targetBlur = average * blurIntensityFactor;
  // Smooths the blur transition
  bgBlur = bgBlur * (1 - blurDuration) + targetBlur * blurDuration;
  
  // Applies the blur to the background
  background.style.filter = `blur(${Math.round(bgBlur)}px)`;

  // Checks for a beat peak to apply the shake effect
  let isPeak = average > frequencyThreshold;
  let shakeX = isPeak ? (Math.random() - 0.5) * bgShakeX : 0;
  let shakeY = isPeak ? (Math.random() - 0.5) * bgShakeY : 0;
  let tilt = bgTilt * average;

  // Atualiza a transformação da imagem de fundo
  background.style.transform = `translate(${shakeX}px, ${shakeY}px) rotate(${tilt}deg)`;

  // Removes duplicate frequencies
  let audio = filteredAudio.filter((elem, idx, arr) => arr[idx - 1] !== elem);

  // Compensates for exaggerated bass
  audio = audio.map((elem, idx, arr) => {
    return elem * (idx / arr.length + (100 - compensation + 50) / 100);
  });

  // Mirrors on the vertical axis
  audio = audio.slice().reverse().concat(audio);

  let innerRadius = (ctx.canvas.height / 2) * (innerPercent / 100);
  let maxLength = (ctx.canvas.height / 2 - innerRadius) * (barPercent / 100);
  // Bar length, val = 100 -> reach border of screen
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = ((barWidth / 100) * (2 * innerRadius * Math.PI)) / audio.length;
  ctx.lineCap = roundedBars ? "round" : "butt";
  ctx.shadowBlur = glow;
  // Visualizer location
  let xPos = ctx.canvas.width * (xPercent / 100);
  xPos += (noise(axis) - 0.5) * ((innerRadius * movementRadius) / 100);
  let yPos = ctx.canvas.height * (yPercent / 100);
  yPos += (noise(0, axis) - 0.5) * ((innerRadius * movementRadius) / 100);
  axis += average * (movementSpeed / 100);
  // Logo center image location
  if (middle.style.display != "none") {
    middle.style.left = `${xPos}px`;
    middle.style.top = `${yPos}px`;
  }

  // Visualizer drop shadow

  visualizer.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${
    shadowOpacity / 100
  }))`;

  // Updates the rectangular visualizer
  updateRectangularVisualizer(average);

  if (audio.length > 2) {
    // Draw each bar

    audio.map((val, index, arr) => {
      let ratio = (index + 0.5) / arr.length;
      let halfRatio = Math.abs(((index / (arr.length / 2)) % (arr.length / 2)) - 1);
      ctx.beginPath();
      ctx.translate(xPos, yPos);
      // Rotate each bar
      ctx.rotate(2 * Math.PI * ratio);
      // Color from given hue, saturation, lightness
      let color = `hsl(${
        ((endHue - startHue) * halfRatio + startHue) % 360
      }, ${saturation}%, ${lightness}%)`;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;

      let innerOffset = average * maxLength * (innerMovement / 100);
      // Move to approparite height
      ctx.moveTo(0, innerRadius + innerOffset);
      // Draw line outwards from origin
      ctx.lineTo(0, val * maxLength + innerRadius + innerOffset);
      // Apply stroke
      ctx.stroke();
      // Reset current transformation matrix to the identity matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
  }
}

function livelyPropertyListener(name, val) {
  // debug.textContent += `Name: ${name} Val: ${val}`
  switch (name) {
    case "innerRadius":
      innerPercent = val;
      // Logo image width & height
      let rad = (ctx.canvas.height / 2) * (val / 100);
      middle.style.width = `${rad * 2}px`;
      middle.style.height = `${rad * 2}px`;
      break;
    case "middleImageScale":
      middle.style.transform = `translate(-50%, -50%) scale(${val / 100})`;
      break;
    case "maxLength":
      barPercent = val;
      break;
    case "bgImage":
      document.body.style.backgroundImage = `url(/${val.replace(/\\/g, "/")})`;
      background.style.backgroundImage = `url(/${val.replace(/\\/g, "/")})`;
      break;
    case "bgBlur":
      document.body.style.backdropFilter = `blur(${Math.round(val)}px)`;
      bgBlur = val; //  Adds the bgBlur value to the script
      break;
    case "useMiddleImage":
      middle.style.display = val ? "block" : "none";
      break;
    case "middleImage":
      middle.src = `/${val.replace(/\\/g, "/")}`;
      break;
    case "barWidth":
      barWidth = val;
      break;
    case "startHue":
      startHue = val;
      break;
    case "endHue":
      endHue = val;
      break;
    case "saturation":
      saturation = val;
      break;
    case "lightness":
      lightness = val;
      break;
    case "barCompensation":
      compensation = val;
      break;
    case "barGlow":
      glow = val;
      break;
    case "innerMovement":
      innerMovement = val;
      break;
    case "showStars":
      showStars = val;
      break;
    case "starColor":
      starColor = val;
      break;
    case "starOpacity":
      starOpacity = val;
      break;
    case "starGlow":
      starGlow = val;
      break;
    case "starBlur":
      starfield.style.filter = `blur(${val / 2}px)`;
      break;
    case "xPercent":
      xPercent = val;
      break;
    case "yPercent":
      yPercent = val;
      break;
    case "shakeSpeed":
      movementSpeed = val;
      break;
    case "shakeRadius":
      movementRadius = val;
      break;
    case "roundedBars":
      roundedBars = val;
      break;
    case "shadowX":
      shadowX = val;
      break;
    case "shadowY":
      shadowY = val;
      break;
    case "shadowBlur":
      shadowBlur = val;
      break;
    case "shadowOpacity":
      shadowOpacity = val;
      break;
    case "bgShakeX":
      bgShakeX = val;
      break;
    case "bgShakeY":
      bgShakeY = val;
      break;
    case "bgTilt":
      bgTilt = val;
      break;
    case "bgSmoothing":
      bgSmoothing = val / 100;
      break;
    case "frequencyThreshold":
      frequencyThreshold = val / 100;
      break;
    case "bgScale":
      bgScale = val;
      break;
    default:
      // console.error(`Unknown customization option: ${name}`)
      break;
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  livelyAudioListener([0]);
});
