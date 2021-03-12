export function initAudio() {
    let devices;
    let audioSources = {};
    (async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        devices = await navigator.mediaDevices.enumerateDevices();
        devices = devices.filter(
        (device) =>
            device.kind === "audiooutput" &&
            device.deviceId != "default" &&
            device.deviceId != "communications"
        );
        
        $(".audio-source").each(function (sourceIndex:Number, element:HTMLSelectElement) {
            console.log(sourceIndex);
            console.log(element);
            devices.forEach(function (item:MediaDeviceInfo, deviceIndex:Number) {
                console.log(deviceIndex);
                console.log(item);
                var option = document.createElement("option");
                option.textContent = item.label;
                option.value = String(deviceIndex);
                element.add(option);
            });
        });
    })();

}
