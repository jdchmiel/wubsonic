import { Driver, Box, Plot, Response} from '../../wubTypes';
import { Injectable } from '@angular/core';
import { SettingsService } from '../../services/settings.service';


@Injectable()

export class PortedGrapher {

  constructor( private settings: SettingsService) { }

  calcBox(driver: Driver): Box {
    // Vb = 20*Qts^3.3*Vas
    const
        Vb = 20 * Math.pow(driver.Qts, 3.3) * driver.Vas,
    // Fb = (Vas/Vb)^0.31*Fs
        Fb = Math.pow((driver.Vas / Vb), 0.31) * driver.Fs,
    // F3 = (Vas/Vb)^0.44*Fs
        F3 = Math.pow((driver.Vas / Vb), 0.44) * driver.Fs,
    // dBpeak = 20*LOG(Qts*(Vas/Vb)^0.3/0.4)
        dBpeak = 20 * Math.log10(driver.Qts * Math.pow((driver.Vas / Vb), 0.3) / 0.4);
      return {
        Fb: Fb,
        F3: F3,
        Vb: Vb
      };

  }

  calcResponse(driver: Driver): Plot {

/*

Vb = net box volume (litres)
Fs = driver resonance frequency (Hz)
Qts = driver Q at system resonance
Fb = box tuning frequency (Hz)
Ql = box losses (Ql=7 can be assumed for most cases)
then,
*/
    const box = this.calcBox(driver),
       Responses: Array<Response> = [];
    this.settings.Frequencies.forEach(F => {
      const
// Vd = Sd*Xmax/1000
        Vd = driver.Sd * driver.Xmax / 1000,
// n0 = 9.64*10^(-10)*Fs^3*Vas/Qes
        n0 = 9.64 * Math.pow(10, -10) * Math.pow(driver.Fs, 3) * driver.Vas / driver.Qes,
// SPL = 112 + 10*LOG(n0)
        SPL = 112 + 10 * Math.log10(n0),
// K1 = (4*pi^3*Ro/c)*Fs^4*Vd^2
        K1 = (4 * Math.pow(Math.PI, 3) * this.settings.Ro / this.settings.c) * Math.pow(driver.Fs, 4) * Math.pow(Vd, 2),
// K2 = 112+10*LOG(K1)
        K2 = 112 + 10 * Math.log10(K1),
// Par = 3*F3^4*Vd^2
        Par = 3 * Math.pow(box.F3, 4) * Math.pow(Vd, 2),
// Per = Par/n0
        Per = Par / n0,
// PeakSPL = SPL+10*LOG(PEmax)
        PeakSPL = SPL + 10 * Math.log10(driver.PEmax),
// Fn2 = (F/Fs)^2
        Fn2 = Math.pow(F / driver.Fs , 2),
// Fn4 = Fn2^2
        Fn4 = Math.pow(Fn2, 2),
// A = (Fb/Fs)^2
        A = Math.pow(box.Fb / driver.Fs, 2),
// B = A/Qts+Fb/(Fs*Ql)
        B = (A / driver.Qts) + (box.Fb / (driver.Fs * this.settings.Ql)), // todo make Ql in settings
// C = 1+A+(Vas/Vb)+Fb/(Fs*Qts*Ql)
        C = 1 + A + (driver.Vas / box.Vb) + box.Fb / (driver.Fs * driver.Qts * this.settings.Ql),
// D = 1/Qts+Fb/(Fs*Ql)
        D = 1 / driver.Qts + box.Fb / (driver.Fs * this.settings.Ql),
// E = (97/49)*A
      E = (97 / 49) * A,
// dBmag = 10*LOG(Fn4^2/((Fn4-C*Fn2+A)^2+Fn2*(D*Fn2-B)^2))
      dBmag = 10 * Math.log10( Math.pow(Fn4, 2) / (Math.pow(Fn4 - C * Fn2 + A, 2) + Fn2 * Math.pow(D * Fn2 - B, 2))),
// Pmax = (K1/n0)*((Fn4-C*Fn2+A)^2+Fn2*(D*Fn2-B)^2)
      Pmax = (K1 / n0) * (Math.pow(Fn4 - C * Fn2 + A, 2) + Fn2 * Math.pow(D * Fn2 - B, 2))
//              /(Fn4-E*Fn2+A^2)
      / (Fn4 - E * Fn2 + Math.pow(A, 2)),
// SPLmax = K2+10*LOG(Fn4^2/(Fn4-E*Fn2+A^2))
      SPLmax = K2 + 10 * Math.log10(Math.pow(Fn4, 2) / (Fn4 - E * Fn2 + Math.pow(A, 2))),
// SPLtherm = PeakSPL+dBmag
      SPLtherm = PeakSPL + dBmag;



      Responses.push({
        F: F,
        dBmag: dBmag,
        SPLd: SPLmax,
        Pmax: Pmax,
        SPLt: SPLtherm
      });
  });
  return { Box: box, Responses: Responses };
  }
}
