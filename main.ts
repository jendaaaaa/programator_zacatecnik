/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum Ports {
    //% block="1"
    Port1 = 1,
    //% block="2"
    Port2 = 2,
    //% block="3"
    Port3 = 3,
    //% block="4"
    Port4 = 4
}


enum ModuleType {
    //% block="Tlačítko"
    Button,
    //% block="LED"
    LED,
    //% block="Potenciometr"
    Pot,
    //% block="Motor"
    Motor,
    //% block="Světelný senzor"
    Photoresistor,
    //% block="IR senzor"
    IRSensor
}

const digitalPins = [DigitalPin.P14, DigitalPin.P13, DigitalPin.P8, DigitalPin.P15];
const pseudoanalogPins = [AnalogPin.P14, AnalogPin.P13, AnalogPin.P8, AnalogPin.P15];
const analogPins = [AnalogPin.P2, AnalogPin.P1, AnalogPin.P0, AnalogPin.P3];

//% color=#f5a017 icon="\uf135" block="Začátečník"
//% groups="['Inicializace','Tlačítko', 'LED', 'Potenciometr', 'Motor', 'Optický a UV senzor', 'BME', 'Senzor barvy', 'OLED', 'Neopixel']"
namespace zacatecnik {

    let leds = [false, false, false, false];

    //////////////////////////////////////////////////////////////////// TLACITKO
    //% block="$port stav tlačítka"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Tlačítko"
    export function boolBtn(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    //% block="$port hodnota tlačítka"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Tlačítko"
    export function numberBtn(port: Ports): number {
        return 1 - pins.digitalReadPin(digitalPins[port - 1]);
    }

    //////////////////////////////////////////////////////////////////// LED
    //% block="$port rozsvit LED"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function plotLED(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 1);
        leds[port - 1] = true;
    }

    //% block="$port zhasni LED"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function unplotLED(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 0);
        leds[port - 1] = false;
    }

    //% block="$port zapis do LED stav $state"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function writeBoolLED(port: Ports, state: boolean) {
        if (state == true) {
            pins.digitalWritePin(digitalPins[port - 1], 1);
            leds[port - 1] = true;
        } else {
            pins.digitalWritePin(digitalPins[port - 1], 0);
            leds[port - 1] = false;
        }
    }

    //% block="$port zapis LED uroven $level"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% level.max=1023
    //% level.min=0
    //% group="LED"
    export function writeNumberLED(port: Ports, level: number) {
        pins.analogWritePin(pseudoanalogPins[port - 1], level);
    }

    //% block="$port prepni LED"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function toggleLED(port: Ports) {
        if (leds[port - 1]) {
            pins.digitalWritePin(digitalPins[port - 1], 0);
            leds[port - 1] = false;
        } else {
            pins.digitalWritePin(digitalPins[port - 1], 1);
            leds[port - 1] = true;
        }
    }

    //////////////////////////////////////////////////////////////////// POTENTIOMETER
    //% block="$port uroven potenciometru"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Pot"
    export function readValuePot(port: Ports): number {
        if (port != 4) {
            return 1023 - pins.analogReadPin(analogPins[port - 1]);
        }
        return -1;
    }

    //////////////////////////////////////////////////////////////////// MOTOR
    //% block="$port roztocit motor"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function turnOnMotor(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 1);
    }

    //% block="$port zastavit motor"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function turnOffMotor(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 0);
    }

    //% block="$port roztocit motor na hodnotu $level"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function setMotor(port: Ports, level: number) {
        pins.analogWritePin(pseudoanalogPins[port - 1], level);
    }

    //////////////////////////////////////////////////////////////////// PHOTORESISTOR,  IR, UV
    //% block="$port hodnota senzoru"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Senzor barvy"
    export function readOpticalSensor(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    //////////////////////////////////////////////////////////////////// OLED
    //% block="OLED nastavit"
    //% group="OLED"
    export function initOled() {
        OLED.init(128, 64);
    }

    //% block="OLED vykreslit text $text"
    //% group="OLED"
    export function writeTextOled(text: string) {
        OLED.writeStringNewLine(fillWithBlanks(text));
    }

    //% block="OLED vykreslit cislo $value"
    //% group="OLED"
    export function writeNumOled(value: number) {
        OLED.writeStringNewLine(fillWithBlanks(value.toString()));
    }

    //% block="OLED vykreslit text $text bez ukonceni radku"
    //% group="OLED"
    export function writeTextNBOled(text: string) {
        OLED.writeString(text);
    }

    //% block="OLED vykreslit cislo $value bez ukonceni radku"
    //% group="OLED"
    export function writeNumNBOled(value: number) {
        OLED.writeNum(value);
    }

    //% block="OLED vykreslit cislo $value bez ukonceni radku"
    //% group="OLED"
    export function clearOled() {
        OLED.clear();
    }

    // helper function
    function fillWithBlanks(str: string): string {
        let padding = '';
        for (let i = 0; i < 20 - str.length; i++) {
            padding += ' ';
        }
        return str + padding;
    }

}