// @flow
// @format

const $ = require("jquery");
const Color = require("color");

const HR_GREEN = 100;
const HR_RED = 120;

function setText(text: string, color: Color): void {
  $("#content").html(
    '<span id="hrtext" class="hrtext_class">' + text + "</span>"
  );
  $("#hrtext").css({ color: color.hsl().string() });
}

function renderHeartRate(hr: number): void {
  let ratio = (hr - HR_GREEN) / (HR_RED - HR_GREEN);
  if (ratio > 1) {
    ratio = 1;
  }
  if (ratio < 0) {
    ratio = 0;
  }
  const color = Color("palegreen").mix(Color("#FF4500"), ratio);
  setText("" + hr, color);
}

async function startup(): Promise<void> {
  async function onClick(event) {
    setText("...", Color("#708090"));
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ["heart_rate"] }],
    });

    async function connect(): Promise<void> {
      setText("--", Color("#708090"));
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("heart_rate");
      const char = await service.getCharacteristic("heart_rate_measurement");
      char.addEventListener("characteristicvaluechanged", (event): void => {
        // This offset is magical and can change if a different Bluetooth stack
        // is in use. For example with with npm node-web-bluetooth module the
        // offset is 13 for me.
        const hr = event.target.value.getUint8(1);
        renderHeartRate(hr);
      });
      await char.startNotifications();
    }

    device.addEventListener("gattserverdisconnected", connect);
    connect();
  }

  $("#init_button").click((event) => onClick(event));
}

startup();
