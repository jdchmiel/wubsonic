interface Response {
  F: number;      // frequency (Hz)
  dBmag: number;  // SPL 1W/1M at frequency F
  SPLd: number;   // displacement-limited SPL at F (dB)
  Pmax: number;   // power required to produce SPLd at F (W)
  SPLt: number;   // thermally-limited SPL at F (dB)
}

interface Box {
  Qtc: number;    // Final Q of the system at resonance
  Fb: number;     // resonance frequency of the system
  F3: number;     // -3dB frequency (Hz)
  Vb: number;     // net box volume (litres)
}

interface Driver {
  Name: string;   // identifier of the speaker driver
  Vas: number;    // equivalent air compliance (litres)
  Qes: number;    // electrical Q of driver at resonance
  Qms: number;    // mechanical Q of the driver
  Qts: number;    // total Q of the driver at Fs
  Fs: number;     // resonance frequency of driver (Hz)
  PEmax: number;  // maximum input power for driver (W)
 // Fb: number;     // resonance frequency of the system (Hz)
  Sd: number;     // effective surface area (cone + 1/3 surround) (cm^3)
  Xmax: number;   // peak linear displacement of cone (mm)
}

interface Plot {
  Box: Box;
  Responses: Array<Response>;
}

const Qlist = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.6, 2],
    Frequencies = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 400],
    c = 345,        // speed of sound in air (345 m/s)
    Ro = 1.18;      // density of air (1.18 kg/m^3)

export class SealedGrapher {

  constructor() { }


  /**
   * Generate the box parametrs for possible Qtc values
   *
   * @param Driver all the params for a speaker driver
   * @returns Box box resonant frequency (Hz)
   */
  calcBoxes(driver: Driver): Array<Box> {
    const Boxes: Array<Box> = [];
    Qlist.forEach(Qtc => {
      if (Qtc > driver.Qts) {
        const Qr = Qtc / driver.Qts,  // rFb: number = 0;
          Vr = Qr * Qr - 1.0,
          Vb = driver.Vas / Vr,
          Fb = Qr * driver.Fs,
          QtcSquared = Math.pow(Qtc, 2),
          F3 = Fb * Math.pow(Math.pow(1 / QtcSquared - 2 + (Math.pow(1 / QtcSquared - 2, 2) + 4), 0.5) / 2, 0.5),
          dBpeak = (Qtc > .707
            ? 20 * Math.log10( Math.pow(Qtc, 2) / Math.pow( Math.pow(Qtc, 2) - 0.25, 0.5))
            : 0 ); // 20*log(Qtc^2/(Qtc^2-0.25)^0.5)
        Boxes.push({
          Qtc: Qtc,
          Fb: Fb,
          F3: F3,
          Vb: Vb
        });
      }
    });
    return Boxes;
  }

  calcResponses(driver: Driver): Array<Plot> {

    const Plots: Array<Plot> = [],
    boxes = this.calcBoxes(driver);
    boxes.forEach(box => {
      const
        Vd = driver.Sd * driver.Xmax / 1000,
        n0 = 9.64 * Math.pow(10, -10) * Math.pow(driver.Fs, 3) * driver.Vas / driver.Qes,
        SPL = 112 + 10 * Math.log10(n0),
        K1 = (4 * Math.pow(Math.PI, 3) * Ro / c) * Math.pow(box.Fb, 4) * Math.pow(Vd, 2),
        K2 = 112 + 10 * Math.log10(K1),
        Amax =  (box.Qtc > .707
          ? Math.pow(box.Qtc, 2) / Math.pow(( Math.pow(box.Qtc, 2) - 0.25), 0.5)
          : 1),
        Par = K1 / Math.pow(Amax, 2),
        Per = Par / n0,
        PeakSPL = SPL + 10 * Math.log10(driver.PEmax);
      const Responses: Array<Response> = [];
      Frequencies.forEach(F => {
        const Fr = Math.pow(F / box.Fb, 2),
          dBmag = 10 * Math.log10(Math.pow(Fr, 2) / (Math.pow(Fr - 1, 2) + Fr / Math.pow(box.Qtc, 2))),
          // = 10*LOG(Fr^2/((Fr-1)^2+Fr/Qtc^2))
          SPLd = K2 + 40 * Math.log10( F / box.Fb),
         Pmax = K1 * (  Math.pow(Fr - 1, 2) + Fr / Math.pow(box.Qtc, 2)) / n0,
          SPLt = dBmag + PeakSPL;

        Responses.push({
          F: F,
          dBmag: dBmag,
          SPLd: SPLd,
          Pmax: Pmax,
          SPLt: SPLt
        });
      });
      Plots.push( {Box: box, Responses: Responses});
    });
    return Plots;
  }
}

