import { Driver, Box, Plot, Response} from '../../wubTypes';
import { Injectable } from '@angular/core';
import { SettingsService } from '../../services/settings.service';



const Qlist = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.4, 1.6, 2],
    c = 345,        // speed of sound in air (345 m/s)
    Ro = 1.18;      // density of air (1.18 kg/m^3)

@Injectable()

export class SealedGrapher {

  constructor( private settings: SettingsService) { }


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
        // 9.64*10^(-10)*Fs^3*Vas/Qes
        n0 = 9.64 * Math.pow(10, -10) * Math.pow(driver.Fs, 3) * driver.Vas / driver.Qes,
        SPL = 112 + 10 * Math.log10(n0),
        // (4*pi^3*Ro/c)*Fb^4*Vd^2
        K1 = (4 * Math.pow(Math.PI, 3) * Ro / c) * Math.pow(box.Fb, 4) * Math.pow(Vd, 2),
        K2 = 112 + 10 * Math.log10(K1),
        Amax =  (box.Qtc > .707
          ? Math.pow(box.Qtc, 2) / Math.pow(( Math.pow(box.Qtc, 2) - 0.25), 0.5)
          : 1),
        Par = K1 / Math.pow(Amax, 2),
        Per = Par / n0,
        PeakSPL = SPL + 10 * Math.log10(driver.PEmax);
      const Responses: Array<Response> = [];
      this.settings.Frequencies.forEach(F => {
        const Fr = Math.pow(F / box.Fb, 2),
          dBmag = 10 * Math.log10(Math.pow(Fr, 2) / (Math.pow(Fr - 1, 2) + Fr / Math.pow(box.Qtc, 2))),
          // = 10*LOG(Fr^2/((Fr-1)^2+Fr/Qtc^2))
          SPLd = K2 + 40 * Math.log10( F / box.Fb),
          // K1*((Fr-1)^2+Fr/Qtc^2)/n0
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
