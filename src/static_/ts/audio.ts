export let selectedOutputs:JSON = JSON.parse('{}');
let devices:MediaDeviceInfo[];

export function initAudio() {
    async function chargeSources() {
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
            let name:string = this.dataset.for;
            selectedOutputs[name] = [devices[this.value].deviceId,devices[this.value].label];            
        });        
    };    
    chargeSources();
    $("#refresh-sources").click(chargeSources);
    $(".audio-source").change(changeOutput);
}
function changeOutput() {
    let name:string = this.dataset.for;
    selectedOutputs[name] = [devices[this.value].deviceId,devices[this.value].label];
}
