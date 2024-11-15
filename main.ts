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

    // class Strip {
    //     buf: Buffer;
    //     pin: DigitalPin;
    //     // TODO: encode as bytes instead of 32bit
    //     brightness: number;
    //     start: number; // start offset in LED strip
    //     _length: number; // number of LEDs
    //     _mode: NeoPixelMode;
    //     _matrixWidth: number; // number of leds in a matrix - if any

    //     showColor(rgb: number) {
    //         rgb = rgb >> 0;
    //         this.setAllRGB(rgb);
    //         this.show();
    //     }

    //     showRainbow(startHue: number = 1, endHue: number = 360) {
    //         if (this._length <= 0) return;

    //         startHue = startHue >> 0;
    //         endHue = endHue >> 0;
    //         const saturation = 100;
    //         const luminance = 50;
    //         const steps = this._length;
    //         const direction = HueInterpolationDirection.Clockwise;

    //         //hue
    //         const h1 = startHue;
    //         const h2 = endHue;
    //         const hDistCW = ((h2 + 360) - h1) % 360;
    //         const hStepCW = Math.idiv((hDistCW * 100), steps);
    //         const hDistCCW = ((h1 + 360) - h2) % 360;
    //         const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
    //         let hStep: number;
    //         if (direction === HueInterpolationDirection.Clockwise) {
    //             hStep = hStepCW;
    //         } else if (direction === HueInterpolationDirection.CounterClockwise) {
    //             hStep = hStepCCW;
    //         } else {
    //             hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
    //         }
    //         const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

    //         //sat
    //         const s1 = saturation;
    //         const s2 = saturation;
    //         const sDist = s2 - s1;
    //         const sStep = Math.idiv(sDist, steps);
    //         const s1_100 = s1 * 100;

    //         //lum
    //         const l1 = luminance;
    //         const l2 = luminance;
    //         const lDist = l2 - l1;
    //         const lStep = Math.idiv(lDist, steps);
    //         const l1_100 = l1 * 100

    //         //interpolate
    //         if (steps === 1) {
    //             this.setPixelColor(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
    //         } else {
    //             this.setPixelColor(0, hsl(startHue, saturation, luminance));
    //             for (let i = 1; i < steps - 1; i++) {
    //                 const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
    //                 const s = Math.idiv((s1_100 + i * sStep), 100);
    //                 const l = Math.idiv((l1_100 + i * lStep), 100);
    //                 this.setPixelColor(i, hsl(h, s, l));
    //             }
    //             this.setPixelColor(steps - 1, hsl(endHue, saturation, luminance));
    //         }
    //         this.show();
    //     }

    //     showBarGraph(value: number, high: number): void {
    //         if (high <= 0) {
    //             this.clear();
    //             this.setPixelColor(0, NeoPixelColors.Yellow);
    //             this.show();
    //             return;
    //         }

    //         value = Math.abs(value);
    //         const n = this._length;
    //         const n1 = n - 1;
    //         let v = Math.idiv((value * n), high);
    //         if (v == 0) {
    //             this.setPixelColor(0, 0x666600);
    //             for (let i = 1; i < n; ++i)
    //                 this.setPixelColor(i, 0);
    //         } else {
    //             for (let i = 0; i < n; ++i) {
    //                 if (i <= v) {
    //                     const b = Math.idiv(i * 255, n1);
    //                     this.setPixelColor(i, neopixel.rgb(b, 0, 255 - b));
    //                 }
    //                 else this.setPixelColor(i, 0);
    //             }
    //         }
    //         this.show();
    //     }

    //     setPixelColor(pixeloffset: number, rgb: number): void {
    //         this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
    //     }

    //     setMatrixWidth(width: number) {
    //         this._matrixWidth = Math.min(this._length, width >> 0);
    //     }

    //     setMatrixColor(x: number, y: number, rgb: number) {
    //         if (this._matrixWidth <= 0) return; // not a matrix, ignore
    //         x = x >> 0;
    //         y = y >> 0;
    //         rgb = rgb >> 0;
    //         const cols = Math.idiv(this._length, this._matrixWidth);
    //         if (x < 0 || x >= this._matrixWidth || y < 0 || y >= cols) return;
    //         let i = x + y * this._matrixWidth;
    //         this.setPixelColor(i, rgb);
    //     }

    //     setPixelWhiteLED(pixeloffset: number, white: number): void {
    //         if (this._mode === NeoPixelMode.RGBW) {
    //             this.setPixelW(pixeloffset >> 0, white >> 0);
    //         }
    //     }

    //     show() {
    //         // only supported in beta
    //         // ws2812b.setBufferMode(this.pin, this._mode);
    //         ws2812b.sendBuffer(this.buf, this.pin);
    //     }

    //     clear(): void {
    //         const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         this.buf.fill(0, this.start * stride, this._length * stride);
    //     }

    //     length() {
    //         return this._length;
    //     }

    //     setBrightness(brightness: number): void {
    //         this.brightness = brightness & 0xff;
    //     }

    //     easeBrightness(): void {
    //         const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         const br = this.brightness;
    //         const buf = this.buf;
    //         const end = this.start + this._length;
    //         const mid = Math.idiv(this._length, 2);
    //         for (let i = this.start; i < end; ++i) {
    //             const k = i - this.start;
    //             const ledoffset = i * stride;
    //             const br = k > mid
    //                 ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
    //                 : Math.idiv(255 * k * k, (mid * mid));
    //             const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
    //             const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
    //             const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
    //             if (stride == 4) {
    //                 const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
    //             }
    //         }
    //     }

    //     range(start: number, length: number): Strip {
    //         start = start >> 0;
    //         length = length >> 0;
    //         let strip = new Strip();
    //         strip.buf = this.buf;
    //         strip.pin = this.pin;
    //         strip.brightness = this.brightness;
    //         strip.start = this.start + Math.clamp(0, this._length - 1, start);
    //         strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
    //         strip._matrixWidth = 0;
    //         strip._mode = this._mode;
    //         return strip;
    //     }

    //     shift(offset: number = 1): void {
    //         offset = offset >> 0;
    //         const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
    //     }

    //     rotate(offset: number = 1): void {
    //         offset = offset >> 0;
    //         const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
    //     }

    //     setPin(pin: DigitalPin): void {
    //         this.pin = pin;
    //         pins.digitalWritePin(this.pin, 0);
    //         // don't yield to avoid races on initialization
    //     }

    //     private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
    //         if (this._mode === NeoPixelMode.RGB_RGB) {
    //             this.buf[offset + 0] = red;
    //             this.buf[offset + 1] = green;
    //         } else {
    //             this.buf[offset + 0] = green;
    //             this.buf[offset + 1] = red;
    //         }
    //         this.buf[offset + 2] = blue;
    //     }

    //     private setAllRGB(rgb: number) {
    //         let red = unpackR(rgb);
    //         let green = unpackG(rgb);
    //         let blue = unpackB(rgb);

    //         const br = this.brightness;
    //         if (br < 255) {
    //             red = (red * br) >> 8;
    //             green = (green * br) >> 8;
    //             blue = (blue * br) >> 8;
    //         }
    //         const end = this.start + this._length;
    //         const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         for (let i = this.start; i < end; ++i) {
    //             this.setBufferRGB(i * stride, red, green, blue)
    //         }
    //     }
    //     private setAllW(white: number) {
    //         if (this._mode !== NeoPixelMode.RGBW)
    //             return;

    //         let br = this.brightness;
    //         if (br < 255) {
    //             white = (white * br) >> 8;
    //         }
    //         let buf = this.buf;
    //         let end = this.start + this._length;
    //         for (let i = this.start; i < end; ++i) {
    //             let ledoffset = i * 4;
    //             buf[ledoffset + 3] = white;
    //         }
    //     }
    //     private setPixelRGB(pixeloffset: number, rgb: number): void {
    //         if (pixeloffset < 0
    //             || pixeloffset >= this._length)
    //             return;

    //         let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
    //         pixeloffset = (pixeloffset + this.start) * stride;

    //         let red = unpackR(rgb);
    //         let green = unpackG(rgb);
    //         let blue = unpackB(rgb);

    //         let br = this.brightness;
    //         if (br < 255) {
    //             red = (red * br) >> 8;
    //             green = (green * br) >> 8;
    //             blue = (blue * br) >> 8;
    //         }
    //         this.setBufferRGB(pixeloffset, red, green, blue)
    //     }
    //     private setPixelW(pixeloffset: number, white: number): void {
    //         if (this._mode !== NeoPixelMode.RGBW)
    //             return;

    //         if (pixeloffset < 0
    //             || pixeloffset >= this._length)
    //             return;

    //         pixeloffset = (pixeloffset + this.start) * 4;

    //         let br = this.brightness;
    //         if (br < 255) {
    //             white = (white * br) >> 8;
    //         }
    //         let buf = this.buf;
    //         buf[pixeloffset + 3] = white;
    //     }
    // }


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

    //////////////////////////////////////////////////////////////////// NEOPIXEL
    /**
     * Vytvoření objektu strip pro Neopixel.
     * @param port číslo portu
     */
    //% block="NEOPIXEL $port"
    //% port.fieldEditor="gridpicker"
    //% port.fieldOptions.width=220
    //% port.fieldOptions.columns=4
    //% parts="neopixel"
    //% blockSetVariable=strip
    //% group="Neopixel"
    export function neoCreate(port: Ports): neopixel.Strip {
        return neopixel.create(digitalPins[port-1],8,NeoPixelMode.RGB);
    }

    // function create(pin: DigitalPin, numleds: number, mode: NeoPixelMode): Strip {
    //     let strip = new Strip();
    //     let stride = mode === NeoPixelMode.RGBW ? 4 : 3;
    //     strip.buf = pins.createBuffer(numleds * stride);
    //     strip.start = 0;
    //     strip._length = numleds;
    //     strip._mode = mode || NeoPixelMode.RGB;
    //     strip._matrixWidth = 0;
    //     strip.setBrightness(128)
    //     strip.setPin(pin)
    //     return strip;
    // }

    // // functions
    // function rgb(red: number, green: number, blue: number): number {
    //     return packRGB(red, green, blue);
    // }

    // function colors(color: NeoPixelColors): number {
    //     return color;
    // }

    // // utils
    // function packRGB(a: number, b: number, c: number): number {
    //     return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    // }
    // function unpackR(rgb: number): number {
    //     let r = (rgb >> 16) & 0xFF;
    //     return r;
    // }
    // function unpackG(rgb: number): number {
    //     let g = (rgb >> 8) & 0xFF;
    //     return g;
    // }
    // function unpackB(rgb: number): number {
    //     let b = (rgb) & 0xFF;
    //     return b;
    // }

    // function hsl(h: number, s: number, l: number): number {
    //     h = Math.round(h);
    //     s = Math.round(s);
    //     l = Math.round(l);

    //     h = h % 360;
    //     s = Math.clamp(0, 99, s);
    //     l = Math.clamp(0, 99, l);
    //     let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
    //     let h1 = Math.idiv(h, 60);//[0,6]
    //     let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
    //     let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
    //     let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
    //     let r$: number;
    //     let g$: number;
    //     let b$: number;
    //     if (h1 == 0) {
    //         r$ = c; g$ = x; b$ = 0;
    //     } else if (h1 == 1) {
    //         r$ = x; g$ = c; b$ = 0;
    //     } else if (h1 == 2) {
    //         r$ = 0; g$ = c; b$ = x;
    //     } else if (h1 == 3) {
    //         r$ = 0; g$ = x; b$ = c;
    //     } else if (h1 == 4) {
    //         r$ = x; g$ = 0; b$ = c;
    //     } else if (h1 == 5) {
    //         r$ = c; g$ = 0; b$ = x;
    //     }
    //     let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
    //     let r = r$ + m;
    //     let g = g$ + m;
    //     let b = b$ + m;
    //     return packRGB(r, g, b);
    // }

    // export enum HueInterpolationDirection {
    //     Clockwise,
    //     CounterClockwise,
    //     Shortest
    // }

}