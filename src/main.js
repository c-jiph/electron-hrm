// @flow
// @format

const { app, BrowserWindow } = require("electron");

let mainWindow = null;

app.commandLine.appendSwitch(
  "enable-experimental-web-platform-features",
  "enable-web-bluetooth"
);

app.on("ready", (): void => {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      console.log("Got select-bluetooth-device");
      event.preventDefault();
      const result = deviceList.find((device) => {
        return true;
      });
      if (!result) {
        callback("");
      } else {
        callback(result.deviceId);
      }
    }
  );
  mainWindow.loadFile("src/index.html");
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAlwaysOnTop(true, "screen");
  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });
});

app.on("window-all-closed", (): void => {
  app.quit();
});
