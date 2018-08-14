export enum modal {
  none = 'none',
  boxes = 'boxes',
  drivers = 'drivers',
  plots = 'plots',
  settings = 'settings',
}

export interface Response {
  F: number;      // frequency (Hz)
  dBmag: number;  // SPL 1W/1M at frequency F
  SPLd: number;   // displacement-limited SPL at F (dB)
  Pmax: number;   // power required to produce SPLd at F (W)
  SPLt: number;   // thermally-limited SPL at F (dB)
}

export interface Box {
  Qtc?: number;    // Final Q of the system at resonance
  Fb: number;     // resonance frequency of the system
  F3: number;     // -3dB frequency (Hz)
  Vb: number;     // net box volume (litres)
}

export interface Driver {
  Name: string;   // identifier of the speaker driver
  Vas: number;    // equivalent air compliance (litres)
  Qes: number;    // electrical Q of driver at resonance
  Qms: number;    // mechanical Q of the driver
  Qts: number;    // total Q of the driver at Fs
  Fs: number;     // resonance frequency of driver (Hz)
  PEmax: number;  // maximum input power for driver (W)
  Sd: number;     // effective surface area (cone + 1/3 surround) (cm^3)
  Xmax: number;   // peak linear displacement of cone (mm)
}

export interface Plot {
  Box: Box;
  Responses: Array<Response>;
}
