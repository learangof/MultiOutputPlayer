export function initAudio() {
    let devices:MediaDeviceInfo[];
    async function chargeSources() {
        console.log("lala");
        
        await navigator.mediaDevices.getUserMedia({ audio: true });
        devices = await navigator.mediaDevices.enumerateDevices();
        devices = devices.filter(
        (device) =>
            device.kind === "audiooutput" &&
            device.deviceId != "default" &&
            device.deviceId != "communications"
        );
        
        $(".audio-source").each(function (sourceIndex:Number, element:HTMLSelectElement) {
            element.innerHTML = "";
            devices.forEach(function (item:MediaDeviceInfo, deviceIndex:Number) {
                var option = document.createElement("option");
                option.textContent = item.label;
                option.value = String(deviceIndex);
                element.add(option);
            });
        });
    };    
    chargeSources();
    $("#refresh-sources").click(chargeSources);
}
