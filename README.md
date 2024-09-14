# About the background effects:
## **I've made some changes to the audio-visualizer.**

I wanted to add some reactivity to the background, so I needed to change the HTML file, add some lines of code to the main.js file, and some custom settings to the livelyproperties file.

**Overall additions and changes:**
- Background
- Shake, Tilt, Pulse, Blur reaction to the background
- Added these settings to lively so we can change them
- Stars react to the sound as well (velocity and opacity)
- Added a simple border to increment
- I don't have enough experience in development yet, so the code may not be perfect. But it is heavily commented, mostly in the changes I've made.
- LivelyProperties.json file uses my custom settings for the visualizer!

I would love it if it were implemented in the visualizer officially, but there may be some issues that need to be addressed and fixed. If so, feel free to upgrade what is needed.

_Thanks for providing the code for the project._

Original project by @elias123tre 
Background effects by @OBLVIION

_Song name: For This You Were Born - UNSECRET_

https://github.com/user-attachments/assets/683b7d40-3b9f-4941-920a-8eae648b3fd4

## How to use this version of the visualizer
Download the original file, follow its instructions to install (https://github.com/elias123tre/lively-audio-visualizer)
If you have the original visualizer:
- Download this fork zip file
Download Link:(https://github.com/OBLVIION/lively-audio-visualizer-background-reaction_custom-settings/archive/refs/heads/main.zip)
- Open your Lively Library and right-click on the visualizer window, (open in the file explorer), extract the downloaded files and replace what is needed.
- Thats it, play around with the settings on lively!

Good day!
Hope you're all doing great, and enjoy your life!
----------------------------------------------------------------

## Original README (@elias123tre)
# Lively Audio Visualizer

Audio Visualizer for [lively wallpaper](https://rocksdanister.github.io/lively/)

![Preview gif](preview.gif)

[![Github all releases](https://img.shields.io/github/downloads/elias123tre/lively-audio-visualizer/total.svg?style=flat-square)](https://github.com/elias123tre/lively-audio-visualizer/releases/latest)

## How to setup

1. Go to the [latest release](https://github.com/elias123tre/Lively-Audio-Visualizer/releases/latest)
2. Click file named `Circle-Audio-Visualizer.zip` to download it
3. Drag and drop the downloaded file into lively

## Demonstration

https://user-images.githubusercontent.com/18127101/117224561-86d8d880-ae10-11eb-8c7e-fd1d79a0c89d.mp4

## Use custom background image

1. After installing the wallpaper, right click on it
2. Select `Open File Location`
3. Move your image to the `images` folder (or `logos` to add a logo)
4. Select it when customizing the wallpaper

## Features

- [x] Customizable background image
- [x] Customizable bar color
- [x] Customizable bar amplitude
- [x] Glowing bars
- [x] Customizable center logo image
- [x] Background effects (snow/stars/debris with glow, similar to Trap Nation)
- [x] Moving inner ring (similar to NCS)
- [x] Background image blur option
- [x] Change visualizer position
- [x] Camera shake/wobble for visualizer
- [x] Multi monitor background span
- [ ] Different types of visualizers (eg. lines from bottom or sparkline)
- [ ] Smoother bar visualizer bars

## Troubleshooting

If the visualizer is not reacting to sound, try [this solution](https://help.wallpaperengine.io/en/audio/intermittent.html):

> USB / wireless headsets are prone to sound driver issues. For many devices, changing the audio sample rate in the Windows device settings to 44100 Hz permanently fixes the issue:  
> Right-click on the audio icon in the tray area in the lower right corner of Windows, select "Open Sound Settings". Click on "Device Properties" in the "Output" section of the window that opens up. Afterwards, click on "Additional device properties", then navigate to the "Advanced" tab. You can change the sampling rate in the menu shown there. The exact location is different on different versions of Windows. if you cannot find this option, search the web for guides on how to change the sampling rate of sound devices for your version of Windows.  
> Set the sampling rate to "24 bit, 44100 Hz"