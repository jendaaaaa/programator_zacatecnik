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

/**
 * Provides easier use of basic hardware modules available at omgrobotics.com.
 */
//% color=#f5a017 icon="\uf135" block="Začátečník"
//% groups="['Inicializace','Tlačítko', 'LED', 'Potenciometr', 'Motor', 'Optický a UV senzor', 'BME', 'Senzor barvy', 'OLED', 'Neopixel']"
namespace zacatecnik {

    // leds array for toggleLED function
    let leds = [false, false, false, false];

    //////////////////////////////////////////////////////////////////// BUTTON
    /**
     * Zjištění logické hodnoty tlačítka na daném portu.
     * @param port číslo portu
     */
    //% block="$port logická hodnota tlačítka"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Tlačítko"
    export function boolBtn(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    /**
     * Zjištění číselné hodnoty tlačítka na daném portu.
     * @param port číslo portu
     */
    //% block="$port hodnota tlačítka"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Tlačítko"
    export function numberBtn(port: Ports): number {
        return 1 - pins.digitalReadPin(digitalPins[port - 1]);
    }

    //////////////////////////////////////////////////////////////////// LED
    /**
     * Rozsvícení LED na daném portu.
     * @param port číslo portu
     */
    //% block="$port rozsvítit LED"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function plotLED(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 1);
        leds[port - 1] = true;
    }

    /**
     * Zhasnutí LED na daném portu.
     * @param port číslo portu
     */
    //% block="$port zhasnout LED"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    export function unplotLED(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 0);
        leds[port - 1] = false;
    }

    /**
     * Zapsání logické hodnoty do LED na daném portu. (pravda = svítí, lež = nesvítí)
     * @param port číslo portu
     * @param state logická hodnota
     */
    //% block="$port zapsat do LED stav $state"
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

    /**
     * Zapsání číselné hodnoty do LED na daném portu v rozmezí 0-1023.
     * @param port číslo portu
     * @param level číselná hodnota (0-1023)
     */
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

    /**
     * Přepnutí led na daném portu. Pokud je LED zapnuta, po zavolání této funkce se vypne (a naopak).
     * @param port číslo portu
     */
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
    /**
     * Čtení hodnoty potenciometru na daném portu v rozmezí 0-1023.
     * @param port číslo portu
     */
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
    /**
     * Zapnutí motoru na daném portu.
     * @param port číslo portu
     */
    //% block="$port roztočit motor"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function turnOnMotor(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 1);
    }

    /**
     * Vypnutí motoru na daném portu.
     * @param port číslo portu
     */
    //% block="$port zastavit motor"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function turnOffMotor(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 0);
    }

    /**
     * Zapsání číselné hodnoty do motoru na daném portu v rozmezí 0-1023.
     * @param port číslo portu
     * @param level číselná hodnota (0-1023)
     */
    //% block="$port roztočit motor na hodnotu $level"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Motor"
    export function setMotor(port: Ports, level: number) {
        pins.analogWritePin(pseudoanalogPins[port - 1], level);
    }

    //////////////////////////////////////////////////////////////////// PHOTORESISTOR,  IR, UV
    /**
     * Čtení logické hodnoty ze senzorů. Bločky vhodné k použití: Světelný senzor, IR senzor, UV senzor.
     * @param port číslo portu
     */
    //% block="$port hodnota senzoru"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Senzor barvy"
    export function readOpticalSensor(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    //////////////////////////////////////////////////////////////////// OLED
    /**
     * Inicializace (nastavení) OLED bločku pro aktivování I2C komunikace.
     */
    //% block="OLED nastavit"
    //% group="OLED"
    export function initOled() {
        OLED.init(128, 64);
    }

    /**
     * Vykreslení textu (String) na displej. Zbytek řádku vyplní prázdnými znaky.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykreslit text $text"
    //% group="OLED"
    export function writeTextOled(text: string) {
        OLED.writeStringNewLine(fillWithBlanks(text));
    }

    /**
     * Vykreslení číselné hodnoty na displej. Zbytek řádku vyplní prázdnými znaky.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykreslit číslo $value"
    //% group="OLED"
    export function writeNumOled(value: number) {
        OLED.writeStringNewLine(fillWithBlanks(value.toString()));
    }

    /**
     * Vykreslení textu na displej. Další text se vykreslí na místo následujícího znaku.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykreslit text $text (bez ukončení řádku)"
    //% group="OLED"
    export function writeTextNBOled(text: string) {
        OLED.writeString(text);
    }

    /**
     * Vykreslení číselné hodnoty na displej. Další číslo se vykreslí na místo následujícího znaku.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykreslit číslo $value (bez ukončení řádku)"
    //% group="OLED"
    export function writeNumNBOled(value: number) {
        OLED.writeNum(value);
    }
    
    /**
     * Smazání displeje.
     */
    //% block="OLED smazat"
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