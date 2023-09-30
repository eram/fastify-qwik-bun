// https://scribesecurity.atlassian.net/browse/SH-2963

type Part = Number | String;
const _gt = (one: Part, two: Part) => (typeof one === typeof two) ? one > two : String(one) > String(two);
const _eq = (one: Part, two: Part) => (typeof one === typeof two) ? one === two : String(one) === String(two);

export class Version {

  private _parts: Part[];
  private _value: string;

  constructor(value: string | Version) {

    if (value instanceof Version) {
      this._value = value._value;
      this._parts = value._parts;
    } else {
      this._value = value;
      this._parts = this.parse();
    }
  }

  private parse(value: string = this._value): Part[] {
    const val = String(value || "").trim().substring(0, 100);
    let parts = ["", "0", "0", "0", ""];
    const m = val.split(".", 5);
    switch (m.length) {
      case 1:
        {
          // if we have a "-" or "+" the rest of the string is a prerelease
          const split = m[0].indexOf("-") != -1 ? m[0].indexOf("-") : m[0].indexOf("+");
          parts[0] = (split != -1) ? m[0].substring(0, split) : m[0];
          parts[4] = (split != -1) ? m[0].substring(split + 1) : "";
        }
        break;
      case 2:
        {
          const split = m[1].indexOf("-") != -1 ? m[1].indexOf("-") : m[1].indexOf("+");
          parts[0] = m[0];
          parts[1] = (split != -1) ? m[1].substring(0, split) : m[1];
          parts[4] = (split != -1) ? m[1].substring(split + 1) : "";
        }
        break;
      case 3:
        {
          const split = m[2].indexOf("-") != -1 ? m[2].indexOf("-") : m[2].indexOf("+");
          parts[0] = m[0];
          parts[1] = m[1];
          parts[2] = (split != -1) ? m[2].substring(0, split) : m[2];
          parts[4] = (split != -1) ? m[2].substring(split + 1) : (m[4] || "");
          break;
        }
      case 4:
        {
          const split = m[2].indexOf("-") != -1 ? m[2].indexOf("-") : m[2].indexOf("+");
          parts[0] = m[0];
          parts[1] = m[1];
          parts[2] = (split != -1) ? m[2].substring(0, split) : m[2];
          parts[3] = m[3];
          parts[4] = (split != -1) ? m[2].substring(split + 1) : (m[4] || "");
        }
        break;
      default:
        parts = m;
        break;
    };

    // map strings to numbers, except for prerelease
    return parts.map((part, i) => { 
      const n = Number(part); 
      return (i<4 && !isNaN(n)) ? n : part; 
    });
  }

  get major() { return this._parts[0]; }
  get minor() { return this._parts[1]; }
  get patch() { return this._parts[2]; }
  get build() { return this._parts[3]; }
  get preRelease() { return this._parts[4]; }
  get value() { return this._value; }

  public eq(other: string | Version) {

    const o = (other instanceof Version) ? other : new Version(other);

    // return (typeof this.value === typeof o.value) ? this.value === o.value : String(this.value) === String(o.value);
    //return this.major === o.major && this.minor === o.minor && this.patch === o.patch && this.build === o.build && this.preRelease === o.preRelease;
    return this._parts.every((e, i) => _eq(e, o._parts[i]));
  }

  public gt(other: string | Version) {

    const o = (other instanceof Version) ? other : new Version(other);

    return !!((_gt(this.major, o.major))
      || _eq(this.major, o.major) && _gt(this.minor, o.minor)
      || _eq(this.major, o.major) && _eq(this.minor, o.minor) && _gt(this.patch, o.patch)
      || _eq(this.major, o.major) && _eq(this.minor, o.minor) && _eq(this.patch, o.patch) && _gt(this.build, o.build)
      || _eq(this.major, o.major) && _eq(this.minor, o.minor) && _eq(this.patch, o.patch) && _eq(this.build, o.build) 
      && ((this.preRelease && o.preRelease) && _gt(this.preRelease, o.preRelease)
      || (!this.preRelease && o.preRelease)));
  }

  public lt(other: string | Version) {
    const o = (other instanceof Version) ? other : new Version(other);
    return !this.eq(o) && !this.gt(o);
  }
};
