/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum NeoColors {
    //% block="červená"
    Red = 0xFF0000,
    //% block="oranžová"
    Orange = 0xFF1E00,
    //% block="žlutá"
    Yellow = 0xFF6E00,
    //% block="zelená"
    Green = 0x00FF00,
    //% block="tyrkysová"
    Teal = 0x00F0FF,
    //% block="modrá"
    Blue = 0x0064FF,
    //% block="fialová"
    Violet = 0x8000FF,
    //% block="růžová"
    Pink = 0xFF0050,
    //% block="bílá"
    White = 0xFFFFFF,
    //% block="černá"
    Black = 0x000000
}

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

enum ColorsRGB {
    //% block="Červená"
    Red = 0,
    //% block="Zelená"
    Green,
    //% block="Modrá"
    Blue
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

    export class Neo {
        buf: Buffer;
        pin: DigitalPin;
        brightness: number;
        start: number;
        _length: number;

        /**
         * Zobrazit změny na Neopixel bločku.
         */
        //% blockId="neo_show" block="%neo|zobrazit"
        //% neo.defl=neo
        //% group="Neopixel"
        //% advanced=true
        show() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        /**
         * Vypnout neopixel.
         * Je třeba použít bloček ``zobrazit``,  aby se změny projevily.
         */
        //% blockId="neo_clear" block="%neo|vypnout"
        //% neo.defl=neo
        //% group="Neopixel"
        //% advanced=true
        clear(): void {
            this.buf.fill(0, this.start * 3, this._length * 3);
        }

        /**
         * Zobrazí zvolenou barvu na všech LED.
         * @param rgb barva v RGB formátu
         */
        //% blockId="neo_show_color" block="%neo|zobrazit barvu %rgb=neo_colors"
        //% neo.defl=neo
        //% group="Neopixel"
        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.show();
        }
        
        /**
         * Displays a vertical bar graph based on the `value` and `high` value.
         * If `high` is 0, the chart gets adjusted automatically.
         * @param value hodnota k zobrazení
         * @param high maximální hodnota, např.: 255
         */
        //% blockId=neo_show_bar_graph block="%neo|zobraz sloupcový graf o hodnotě %value|až po %high"
        //% neo.defl=neo
        //% icon="\uf080"
        //% group="Neopixel"
        showBarGraph(value: number, high: number): void {
            if (high <= 0) {
                this.clear();
                this.setPixelColor(0, NeoColors.White);
                this.show();
                return;
            }

            value = Math.abs(value);
            const n = this._length;
            const n1 = n - 1;
            let v = Math.idiv((value * n), high);
            if (v == 0) {
                this.setPixelColor(0, 0x000066);
                for (let i = 1; i < n; ++i)
                    this.setPixelColor(i, 0);
            } else {
                for (let i = 0; i < n; ++i) {
                    if (i <= v) {
                        const b = Math.idiv(i * 255, n1);
                        this.setPixelColor(i, neopixel.rgb(b, 0, 255 - b));
                    }
                    else this.setPixelColor(i, 0);
                }
            }
            this.show();
        }

        /**
         * Vrátí počet LED Neopixel bločku.
         */
        //% blockId="neo_length" block="%strip|počet LED"
        //% strip.defl=neo
        //% group="Neopixel"
        //% advanced=true
        length() {
            return this._length;
        }

        /**
         * Nastaví jas Neopixel bločku.
         * @param brightness jas LED v rozmezí 0-255. např.: 255
         */
        //% blockId="neo_brightness" block="%strip|nastavit jas %brightness"
        //% strip.defl=neo
        //% group="Neopixel"
        //% advanced=true
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }
        
        /**
         * Posune rozsvícené LED dál o$offset.
         * You need to call ``show`` to make the changes visible.
         * @param offset number of pixels to shift forward, eg: 1
         */
        //% blockId="neo_shift" block="%strip|posunout pixely o %offset"
        //% strip.defl=neo
        //% group="Neopixel"
        //% advanced=true
        shift(offset: number = 1): void {
            offset = offset >> 0;
            this.buf.shift(-offset * 3, this.start * 3, this._length * 3);
            this.show();
        }

        /**
         * Rotuje LED.
         * You need to call ``show`` to make the changes visible.
         * @param offset number of pixels to rotate forward, eg: 1
         */
        //% blockId="neo_rotate" block="%strip|otočit pixely o %offset"
        //% strip.defl=neo
        //% group="Neopixel"
        //% advanced=true
        rotate(offset: number = 1): void {
            offset = offset >> 0;
            this.buf.rotate(-offset * 3, this.start * 3, this._length * 3);
            this.show();
        }

        /**
         * Set the pin where the neopixel is connected, defaults to P0.
         */
        //% group="Neopixel"
        //% advanced=true
        setPin(port: Ports): void {
            this.pin = digitalPins[port-1];
            pins.digitalWritePin(this.pin, 0);
        }

        private setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
        }

        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            this.buf[offset + 0] = green;
            this.buf[offset + 1] = red;
            this.buf[offset + 2] = blue;
        }
    }

    //////////////////////////////////////////////////////////////////// NEOPIXEL

    /**
     * Vytvoří objekt Neopixel a uloží jej do proměnné spolu s informací o použitém portu.
     * @param port číslo portu
     */
    //% blockId="neo_create" block="NEOPIXEL %port"
    //% blockSetVariable=neo
    //% group="Neopixel"
    export function neoCreate(port: Ports): Neo {
        let neo = new Neo();
        let stride = 3;
        let numleds = 8;
        neo.buf = pins.createBuffer(numleds * stride);
        neo.start = 0;
        neo._length = numleds;
        neo.setBrightness(128);
        neo.setPin(port);
        return neo;
    }

    /**
     * Vrátí zakódovanou hodnotu RGB ze tří složek R, G a B.
     * @param red hodnota červené od 0 do 255. např.: 255
     * @param green hodnota zelené od 0 do 255. např.: 255
     * @param blue hodnota modré od 0 do 255. např.: 255
     */
    //% blockId="neo_rgb" block="červená %red|zelená %green|modrá %blue"
    //% group="Neopixel"
    //% advanced=true
    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Vrátí RGB formát zvolené barvy.
    */
    //% blockId="neo_colors" block="%barva"
    //% group="Neopixel"
    //% advanced=true
    export function colors(color: NeoColors): number {
        return color;
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }

    // leds array for toggleLED function
    let leds = [false, false, false, false];

    //////////////////////////////////////////////////////////////////// BUTTON
    /**
     * Zjištění logické hodnoty tlačítka na daném portu.
     * @param port číslo portu
     */
    //% block="tlačítko $port zmáčknuto"
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
    //% block="číselná hodnota tlačítka $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Tlačítko"
    //% advanced=true
    export function btnNumber(port: Ports): number {
        return 1 - pins.digitalReadPin(digitalPins[port - 1]);
    }

    //////////////////////////////////////////////////////////////////// LED
    /**
     * Rozsvícení LED na daném portu.
     * @param port číslo portu
     */
    //% block="rozsviť LED $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% weight=100
    //% group="LED"
    export function ledPlot(port: Ports) {
        pins.digitalWritePin(digitalPins[port - 1], 1);
        leds[port - 1] = true;
    }

    /**
     * Zhasnutí LED na daném portu.
     * @param port číslo portu
     */
    //% block="zhasni LED $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% weight=90
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
    //% block="rozsviť LED $port? $state"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    //% weight=10
    //% advanced=true
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
    //% block="zapiš do LED $port číslo $level"
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
    //% block="přepni LED $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="LED"
    //% advanced=true
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
    //% block="číslo z potenciometru $port"
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
    //% block="zapni motor $port"
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
    //% block="vypni motor $port"
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
    //% block="roztoč motor $port na hodnotu $level"
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
    //% block="hodnota senzoru $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Optický a UV senzor"
    export function opticalSensorRead(port: Ports): boolean {
        return pins.digitalReadPin(digitalPins[port - 1]) == 0 ? true : false;
    }

    //////////////////////////////////////////////////////////////////// OLED
    /**
     * Zapnutí (inicializace) OLED bločku a aktivování I2C komunikace.
     */
    //% block="OLED start"
    //% group="OLED"
    export function oledInit() {
        OLED.init(128, 64);
    }

    /**
     * Vykreslení textu na displej. Zbytek řádku je vyplněn prázdnými znaky.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykresli text $text"
    //% group="OLED"
    export function oledWriteText(text: string) {
        OLED.writeStringNewLine(fillWithBlanks(text));
    }

    /**
     * Vykreslení číselné hodnoty na displej. Zbytek řádku je vyplněn prázdnými znaky.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykresli číslo $value"
    //% group="OLED"
    export function oledWriteNum(value: number) {
        OLED.writeStringNewLine(fillWithBlanks(value.toString()));
    }

    /**
     * Vykreslení textu na displej. Další text se vykreslí na místo následujícího znaku.
     * @param text text k vykreslení na displej
     */
    //% block="OLED vykresli text $text (bez ukončení řádku)"
    //% group="OLED"
    //% advanced=true
    export function oledWriteTextNB(text: string) {
        OLED.writeString(text);
    }

    /**
     * Vykreslení číselné hodnoty na displej. Další číslo se vykreslí na místo následujícího znaku.
     * @param value číslo k vykreslení na displej
     */
    //% block="OLED vykresli číslo $value (bez ukončení řádku)"
    //% group="OLED"
    //% advanced=true
    export function oledWriteNumNB(value: number) {
        OLED.writeNum(value);
    }
    
    /**
     * Smazání displeje.
     */
    //% block="OLED smaž"
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
     * Zapnutí (inicializace) BME bločku a aktivování I2C komunikace.
     */
    //% block="BME start"
    //% group="BME"
    export function bmeInit() {
        BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76);
    }

    /**
     * Měření vlhkosti okolního vzduchu v procentech (%).
     */
    //% block="BME vlhkost (%)"
    //% group="BME"
    export function bmeHumidity(): number {
        return BME280.humidity()
    }

    /**
     * Měření teploty okolního vzduchu ve stupních Celsia (°C).
     */
    //% block="BME teplota (°C)"
    //% group="BME"
    export function bmeTemperature(): number {
        return BME280.temperature(BME280_T.T_C);
    }

    /**
     * Měření tlaku okolního vzduchu v pascalech (Pa).
     */
    //% block="BME tlak (Pa)"
    //% group="BME"
    export function bmeTemperaturePa(): number {
        return BME280.pressure(BME280_P.Pa);
    }
    
    /**
     * Měření tlaku okolního vzduchu v hektopascalech (hPa).
     */
    //% block="BME tlak (hPa)"
    //% group="BME"
    export function bmeTemperatureHPa(): number {
        return BME280.pressure(BME280_P.hPa);
    }
    
    /**
     * Měření rosného bodu okolního vzduchu ve stupních Celsia (°C).
     */
    //% block="BME rosný bod (°C)"
    //% group="BME"
    export function bmeDewpoint(): number {
        return BME280.Dewpoint();
    }

    /**
     * Vypnutí komunikace s modulkem BME.
     */
    //% block="BME vypni"
    //% group="BME"
    //% advanced=true
    export function bmePowerOff() {
        BME280.PowerOff();
    }

    /**
     * Zapnutí komunikace s modulkem BME.
     */
    //% block="BME zapni"
    //% group="BME"
    //% advanced=true
    export function bmePowerOn() {
        BME280.PowerOn();
    }

    //////////////////////////////////////////////////////////////////// APDS9960
    /**
     * Zapnutí (inicializace) COLOR bločku (senzoru barvy) a aktivování I2C komunikace.
     */
    //% block="COLOR start"
    //% group="Senzor barvy"
    export function apdsInit() {
        apds9960.Init(11.12);
        apds9960.ColorMode();
    }
    
    /**
     * Získání hodnoty barvy okolí. Výstupem je hodnota Hue z barevného prostoru HSV.
     */
    //% block="COLOR barva"
    //% group="Senzor barvy"
    //% advanced=true
    export function apdsGetColor(): number {
        control.inBackground(function () {
            while (!apds9960.Data_Ready()) {
                //
            }
        })
        return Math.floor(apds9960.ReadColor()*1000)/1000;
    }
    
    /**
     * Získání úrovně osvícení okolí. Výstupem je hodnota v rozmezí 0-255.
     */
    //% block="COLOR úroveň osvícení"
    //% group="Senzor barvy"
    export function apdsGetAmbient(): number {
        return Math.floor(apds9960.Read_Ambient()*1000)/1000;
    }
    
    /**
     * Měření dané barvy v okolním světle. Výstupem je hodnota v rozmezí 0-255.
     */
    //% block="COLOR hodnota barvy|$color"
    //% group="Senzor barvy"
    export function apdsGetSpecificColor(color: ColorsRGB): number {
        let value = 0;
        switch (color) {
            case ColorsRGB.Red:
                value = apds9960.Read_Red();
                break;
            case ColorsRGB.Green:
                value = apds9960.Read_Green();
                break;
            case ColorsRGB.Blue:
                value = apds9960.Read_Blue();
                break;
        };
        return Math.floor(value*1000)/1000;
    }

    /**
     * Získání úrovně osvícení okolí. Výstupem je hodnota v rozmezí 0-255.
     * @param port číslo portu
     */
    //% block="COLOR rozsviť přídavnou LED $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Senzor barvy"
    //% advanced=true
    export function apdsLedPowerOn(port: Ports) {
        pins.digitalWritePin(digitalPins[port-1], 1);
    }
    
    /**
     * Získání úrovně osvícení okolí. Výstupem je hodnota v rozmezí 0-255.
     * @param port číslo portu
     */
    //% block="COLOR zhasni přídavnou LED $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% group="Senzor barvy"
    //% advanced=true
    export function apdsLedPowerOff(port: Ports) {
        pins.digitalWritePin(digitalPins[port-1], 0);
    }

}