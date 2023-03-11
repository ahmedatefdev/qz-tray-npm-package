import { TPrintersData } from "../types";
declare function init({ signInApiUrl, callback, }: {
    signInApiUrl: string;
    callback: (PrintersData: TPrintersData) => void;
}): Promise<void>;
declare function handleLaunchQzSoftware(callback: () => void): void;
declare function disconnectQZ(): void;
declare function updateSettingsQzSavedSetting(setting: {
    selectedPrinter: any;
    offsetX: any;
    offsetY: any;
    labelOrientation: string;
}, currentPrinter?: any): Promise<void>;
export { init, disconnectQZ, handleLaunchQzSoftware, updateSettingsQzSavedSetting };
