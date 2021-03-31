var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export let selectedOutputs = JSON.parse('{}');
let devices;
export function initAudio() {
    function chargeSources() {
        return __awaiter(this, void 0, void 0, function* () {
            yield navigator.mediaDevices.getUserMedia({ audio: true });
            devices = yield navigator.mediaDevices.enumerateDevices();
            devices = devices.filter((device) => device.kind === "audiooutput" &&
                device.deviceId != "default" &&
                device.deviceId != "communications");
            $(".audio-source").each(function (sourceIndex, element) {
                element.innerHTML = "";
                devices.forEach(function (item, deviceIndex) {
                    var option = document.createElement("option");
                    option.textContent = item.label;
                    option.value = String(deviceIndex);
                    element.add(option);
                });
                let name = this.dataset.for;
                selectedOutputs[name] = [devices[this.value].deviceId, devices[this.value].label];
            });
        });
    }
    ;
    chargeSources();
    $("#refresh-sources").click(chargeSources);
    $(".audio-source").change(changeOutput);
}
function changeOutput() {
    let name = this.dataset.for;
    selectedOutputs[name] = [devices[this.value].deviceId, devices[this.value].label];
}
