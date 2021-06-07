# Electron Heart Rate Monitor

Simple Bluetooth heart-rate monitor display based on Electron. Heart-rate (beats per minute) is displayed in a window which is always on-top and has no decorations. The intent is to help me keep my HR in the "fat burning zone" while I use an [under-desk cycle](https://www.flexispot.com/health-fitness/fitness/under-desk-bikes-v9u) and try to get other light work done at the same time.

Personally I use this with:

- Desktop running Linux (Fedora 34).
- Samsung Galaxy 3 watch with [this app](https://galaxystore.samsung.com/geardetail/org.bipr.hrspeedtransmitter) to transmit HR data over Bluetooth.

In theory, any combination of computer that that can run Electron and a device with standard Bluetooth heart-rate monitoring capabilities should work.

Build/install with:

```
yarn install
```

or

```
npm install
```

Then pair a Bluetooth heart-rate monitoring device device using the system Bluetooth settings.

Start with:

```
yarn start
```

or

```
npm start
```

Click the 'Click Me' button to begin connecting (this is needed as standard Bluetooth features in Electron can only be activated via a "user gesture"). The button is focused so you can just typically just press `Enter`.

Quit with the usual buttons to close a window/quit a program (`ctrl/cmd-q`, or `ctrl/cmd-w`).

## Problems With Connecting

A connection should establish quickly (~1 second) and start displaying heart-rate data. If the connection fails (display is stuck with three "dots"), try quitting, and removing + re-adding the device via system Bluetooth settings. I've found this happens often enough that I needed to automate this process. There isn't a way to do this from stock Electron so my current solution is the `run.exp` [Expect](https://core.tcl-lang.org/expect/index) script wrapping the Linux/BlueZ `bluetoothctl` CLI tool. The script includes the Bluetooth MAC address of my watch which would need to be altered for use with another device.
