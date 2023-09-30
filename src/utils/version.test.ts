import { describe, test, expect } from "bun:test";
import { Version } from "./version";
import exp from "constants";

describe("Version testing", () => {

  type Res = -1 | 0 | 1;
  type Case = [string, string, Res];

  const cases: Case[] = [

    ["", "", 0],
    ["1", "", -1],

    [null as unknown as string, "1", 1],
    [1 as unknown as string, "1", 0],
    [1.2 as unknown as string, "1.2", 0],
    ["&^%", "0", 1],
    ["&^%", "1", 1],
    ["&-%", "1", 1],

    ["1", "1", 0],
    ["1", " 2", 1],
    ["1", "2 ", 1],

    ["1", "3", 1],
    ["10", "3", -1],

    ["1.2", "1.2", 0],
    ["1.2", "1.3", 1],
    ["1.2", "1.1", -1],
    ["1.2", "1.10", 1],
    ["11.2", "2.10", -1],

    ["1.2.3", "1.2.3", 0],
    ["1.2.3", "2.2.3", 1],
    ["2.2.3", "10.2.3", 1],
    ["1.2.3", "1.3.3", 1],
    ["1.2.3", "1.10.3", 1],
    ["1.2.3", "1.2.20", 1],

    ["1.2.0", "1.2", 0],
    ["1.2.3", "1.2", -1],
    ["1.2.3", "1.3", 1],

    ["10.7.8.1", "10.7.8.2", 1],
    ["10.7.8.10.1", "10.7.8.10.2", 1],
    ["10.7.8.11.1", "10.7.8.10.2", -1],

    ["unspecified", "apply-by-entity", -1],
    ["master-rc-daily", "apply-by-entity", -1],
    ["master-rc-daily", "master-rc-weekly", 1],
    ["Einstein.RELEASE", "Einstein.RC1", -1],
    ["COMMIT-aaaaccd", "COMMIT-aaaaccdd", 1],
    ["alfa", "beta", 1],
    ["*.*.*", "1.0", 1],
    ["test-SMAPSHOT", "test-SMAPSHOT2", 1],

    ["1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", 0],
    ["1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "1.0.1-dev-1e6fb2eb001cea38d49407180d13e11c4ed1c25c", 1],
    ["1.10.23-c653fe620d9fc2655255bfdb05801f00b899e8fe.0", "1.10.23-c653fe620d9fc2655255bfdb05801f00b899e8fe.3", 1],
    ["1.20.1-release-1-20-0-1887096147-5313-1645617661.0", "1.20.1", 1],
    ["0.0.2.Final", "0.0.2-ALPHA", -1],
    ["0.1-047805c", "0.1-103715f", 1],
    ["1.9.7.Final", "10.6.0-rc02", 1],

    ["0.0.0-NIGHTLY25112020", "0.0.0-NIGHTLY26112020", 1],
    ["0.0.1-alpha.210810.05", "0.0.1-beta.210810.05", 1],
    ["0.16.2+akka24Circe011", "0.16.2+akka25Circe011", 1],
    ["1.5.0.20220916_075622", "1.5.1.20220916_075622", 1],
    ["11.9.0-pre.342-compat", "11.9.0.342-compat", 1],
    ["2.0.0-M2+100-66bf7c43", "2.0.0-M1+200-66bf7c43", -1],
    ["0.8.0-dev-588-0.11.0.9", "0.8.1.11.0.9", 1],
    ["0.95.LIFERAY-PATCHED-1", "0.100.0", 1],
    ["2.1.0-M7-34-gf519b50a3", "2.1.0-M8-34-gf519b50a3", 1],
    ["1711.1713.vc400cfb_5597a", "1711.1712.vc400cfb_5597a", -1],
    ["2023.05.26.210655-2ee8422", "2023.05.26.210655-2ee8522", 1],
    ["2023.05.26.210655-2ee8422", "2021.05.26.210655-2ee8522", -1],
  ];

  test("base 1", () => {
    const v0 = new Version("1");
    expect(v0.eq("1")).toBeTrue();
    expect(v0.eq(new Version("1"))).toBeTrue();
    expect(v0.gt("1")).toBeFalse();
    expect(v0.gt("2")).toBeFalse();
    expect(v0.lt("2")).toBeTrue();
    expect(v0.lt(null as unknown as string)).toBeFalse();

    expect(v0.major).toBe(1);
    expect(v0.minor).toBe(0);
    expect(v0.patch).toBe(0);
    expect(v0.preRelease).toBe("");
  });

  test("base 2", () => {
    const v0 = new Version("1.2-pre");
    expect(v0.major).toBe(1);
    expect(v0.minor).toBe(2);
    expect(v0.patch).toBe(0);
    expect(v0.build).toBe(0);
    expect(v0.preRelease).toBe("pre");
  });

  test("base 3", () => {
    const v1 = new Version("1.2.3");
    expect(v1.major).toBe(1);
    expect(v1.minor).toBe(2);
    expect(v1.patch).toBe(3);
    expect(v1.preRelease).toBe("");

    const v2 = new Version("1.2.3-pre");
    expect(v2.major).toBe(1);
    expect(v2.minor).toBe(2);
    expect(v2.patch).toBe(3);
    expect(v2.preRelease).toBe("pre");
  });

  test("base 4", () => {
    const v1 = new Version("1.2.3.4");
    expect(v1.major).toBe(1);
    expect(v1.minor).toBe(2);
    expect(v1.patch).toBe(3);
    expect(v1.build).toBe(4);
    expect(v1.preRelease).toBe("");

    const v2 = new Version("1.2.3.4-pre");
    expect(v2.major).toBe(1);
    expect(v2.minor).toBe(2);
    expect(v2.patch).toBe(3);
    expect(v2.build).toBe(4);
    expect(v2.preRelease).toBe("pre");
  });

  test("compare list", () => {

    cases.forEach((c, _i, _a) => {
      console.log(_i, c);
      const v0 = new Version(c[0]);
      const v1 = new Version(c[1]);
      switch (c[2]) {
        case 0:
          expect(v0.eq(v1)).toBeTrue();
          break;
        case -1:
          expect(v0.gt(v1)).toBeTrue();
          break;
        case 1:
          expect(v0.lt(v1)).toBeTrue();
          break;
        default:
          throw( new Error("invalid value"));
      };
      
    });
  });

});