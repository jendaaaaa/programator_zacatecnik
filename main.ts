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
//% groups="['Tlačítko', 'LED', 'Potenciometr', 'Motor', 'Optický a UV senzor', 'BME', 'Senzor barvy', 'OLED', 'Neopixel']"
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
    export function btnBool(port: Ports): boolean {
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
    export function btnNumber(port: Ports): number {
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
    export function ledPlot(port: Ports) {
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
    export function ledUnplot(port: Ports) {
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
    export function ledWriteBool(port: Ports, state: boolean) {
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
    export function ledWriteNumber(port: Ports, level: number) {
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
    export function ledToggle(port: Ports) {
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
    //% block="$port číselná hodnota potenciometru"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Pot"
    export function potReadValue(port: Ports): number {
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
    export function motorPowerOn(port: Ports) {
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
    export function motorPowerOff(port: Ports) {
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
    export function motorSetLevel(port: Ports, level: number) {
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
    //% group="Optický a UV senzor"
    export function opticalSensorRead(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    //////////////////////////////////////////////////////////////////// OLED
    /**
     * Inicializace (nastavení) OLED bločku pro aktivování I2C komunikace.
     */
    //% block="OLED nastavit"
    //% group="OLED"
    export function oledInit() {
        OLED.init(128, 64);
    }

    /**
     * Vykreslení textu (String) na displej. Zbytek řádku vyplní prázdnými znaky.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykreslit text $text"
    //% group="OLED"
    export function oledWriteText(text: string) {
        OLED.writeStringNewLine(fillWithBlanks(text));
    }

    /**
     * Vykreslení číselné hodnoty na displej. Zbytek řádku vyplní prázdnými znaky.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykreslit číslo $value"
    //% group="OLED"
    export function oledWriteNum(value: number) {
        OLED.writeStringNewLine(fillWithBlanks(value.toString()));
    }

    /**
     * Vykreslení textu na displej. Další text se vykreslí na místo následujícího znaku.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykreslit text $text (bez ukončení řádku)"
    //% group="OLED"
    export function oledWriteTextNB(text: string) {
        OLED.writeString(text);
    }

    /**
     * Vykreslení číselné hodnoty na displej. Další číslo se vykreslí na místo následujícího znaku.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykreslit číslo $value (bez ukončení řádku)"
    //% group="OLED"
    export function oledWriteNumNB(value: number) {
        OLED.writeNum(value);
    }
    
    /**
     * Smazání displeje.
     */
    //% block="OLED smazat"
    //% group="OLED"
    export function oledClear() {
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

    //////////////////////////////////////////////////////////////////// BME280
    /**
     * Inicializace (nastavení) BME bločku pro aktivování I2C komunikace.
     */
    //% block="BME nastavit"
    //% group="BME"
    export function bmeInit() {
        BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76);
    }

    /**
     * Měření vlhkosti okolního vzduchu v procentech (%).
     */
    //% block="BME změřená vlhkost"
    //% group="BME"
    export function bmeHumidity(): number {
        return BME280.humidity()
    }

    /**
     * Měření teploty okolního vzduchu ve stupních Celsia (°C).
     */
    //% block="BME změřená teplota"
    //% group="BME"
    export function bmeTemperature(): number {
        return BME280.temperature(BME280_T.T_C);
    }

    /**
     * Měření tlaku okolního vzduchu v pascalech (Pa).
     */
    //% block="BME změřený tlak (Pa)"
    //% group="BME"
    export function bmeTemperaturePa(): number {
        return BME280.pressure(BME280_P.Pa);
    }
    
    /**
     * Měření tlaku okolního vzduchu v hektopascalech (hPa).
     */
    //% block="BME změřený tlak (hPa)"
    //% group="BME"
    export function bmeTemperatureHPa(): number {
        return BME280.pressure(BME280_P.hPa);
    }
    
    /**
     * Měření rosného bodu okolního vzduchu ve stupních Celsia (°C).
     */
    //% block="BME vypočítaný rosný bod (°C)"
    //% group="BME"
    export function bmeDewpoint(): number {
        return BME280.Dewpoint();
    }

    /**
     * Vypnutí komunikace s modulkem BME.
     */
    //% block="BME vypnout"
    //% group="BME"
    export function bmePowerOff() {
        BME280.PowerOff();
    }

    /**
     * Zapnutí komunikace s modulkem BME.
     */
    //% block="BME zapnout"
    //% group="BME"
    export function bmePowerOn() {
        BME280.PowerOn();
    }

    //////////////////////////////////////////////////////////////////// APDS9960
    /**
     * Inicializace (nastavení) COLOR bločku (senzoru barvy) pro aktivování I2C komunikace.
     */
    //% block="COLOR nastavit"
    //% group="Senzor barvy"
    export function apdsInit() {
        apds9960.Init(11.12);
        apds9960.ColorMode();
    }
    
    /**
     * Získání hodnoty barvy okolí. Výstupem je hodnota Hue z barevného prostoru HSV.
     */
    //% block="COLOR získat barvu"
    //% group="Senzor barvy"
    export function apdsGetColor(): number {
        control.inBackground(function () {
            while (!apds9960.Data_Ready()) {
                //
            }
        })
        return Math.floor(apds9960.ReadColor()*1000)/1000;
    }



}