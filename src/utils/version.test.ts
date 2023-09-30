import { describe, test, expect } from "bun:test";
import { Version } from "./version";
import exp from "constants";

describe("Version testing", () => {

  type Res = "lt" | "eq" | "gt";
  type Case = [string, string, Res];

  const cases: Case[] = [

    ["", "", "eq"],
    ["1", "", "gt"],

    [null as unknown as string, "1", "lt"],
    [1 as unknown as string, "1", "eq"],
    [1.2 as unknown as string, "1.2", "eq"],
    ["&^%", "0", "lt"],
    ["&^%", "1", "lt"],
    ["&-%", "1", "lt"],

    ["1", "1", "eq"],
    ["1", " 2", "lt"],
    ["1", "2 ", "lt"],

    ["1", "3", "lt"],
    ["10", "3", "gt"],

    ["1.2", "1.2", "eq"],
    ["1.2", "1.3", "lt"],
    ["1.2", "1.1", "gt"],
    ["1.2", "1.10", "lt"],
    ["11.2", "2.10", "gt"],

    ["1.2.3", "1.2.3", "eq"],
    ["1.2.3", "2.2.3", "lt"],
    ["2.2.3", "10.2.3", "lt"],
    ["1.2.3", "1.3.3", "lt"],
    ["1.2.3", "1.10.3", "lt"],
    ["1.2.3", "1.2.20", "lt"],

    ["1.2.0", "1.2", "eq"],
    ["1.2.3", "1.2", "gt"],
    ["1.2.3", "1.3", "lt"],

    ["10.7.8.1", "10.7.8.2", "lt"],
    ["10.7.8.10.1", "10.7.8.10.2", "lt"],
    ["10.7.8.11.1", "10.7.8.10.2", "gt"],

    ["unspecified", "apply-by-entity", "gt"],
    ["master-rc-daily", "apply-by-entity", "gt"],
    ["master-rc-daily", "master-rc-weekly", "lt"],
    ["Einstein.RELEASE", "Einstein.RC1", "gt"],
    ["COMMIT-aaaaccd", "COMMIT-aaaaccdd", "lt"],
    ["alfa", "beta", "lt"],
    ["*.*.*", "1.0", "lt"],
    ["test-SMAPSHOT", "test-SMAPSHOT2", "lt"],

    ["1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "eq"],
    ["1.0.0-dev.1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "1.0.1-dev-1e6fb2eb001cea38d49407180d13e11c4ed1c25c", "lt"],
    ["1.10.23-c653fe620d9fc2655255bfdb05801f00b899e8fe.0", "1.10.23-c653fe620d9fc2655255bfdb05801f00b899e8fe.3", "lt"],
    ["1.20.1-release-1-20-0-1887096147-5313-1645617661.0", "1.20.1", "lt"],
    ["0.0.2.Final", "0.0.2-ALPHA", "gt"],
    ["0.1-047805c", "0.1-103715f", "lt"],
    ["1.9.7.Final", "10.6.0-rc02", "lt"],

    ["0.0.0-NIGHTLY25112020", "0.0.0-NIGHTLY26112020", "lt"],
    ["0.0.1-alpha.210810.05", "0.0.1-beta.210810.05", "lt"],
    ["0.16.2+akka24Circe011", "0.16.2+akka25Circe011", "lt"],
    ["1.5.0.20220916_075622", "1.5.1.20220916_075622", "lt"],
    //["11.9.0-pre.342-compat", "11.9.0.342-compat", "lt"],
    ["2.0.0-M2+100-66bf7c43", "2.0.0-M1+200-66bf7c43", "gt"],
    ["0.8.0-dev-588-0.11.0.9", "0.8.1.11.0.9", "lt"],
    ["0.8.0-dev-588-0.11.0.9", "0.8.0.11.0.9", "lt"],
    ["0.95.LIFERAY-PATCHED-1", "0.100.0", "lt"],
    ["2.1.0-M7-34-gf519b50a3", "2.1.0-M8-34-gf519b50a3", "lt"],
    ["1711.1713.vc400cfb_5597a", "1711.1712.vc400cfb_5597a", "gt"],
    ["2023.05.26.210655-2ee8422", "2023.05.26.210655-2ee8522", "lt"],
    ["2023.05.26.210655-2ee8422", "2021.05.26.210655-2ee8522", "gt"],
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

  test("base 5", () => {
    const v = new Version("1.2.3.4-pre.5");
    expect(v.major).toBe(1);
    expect(v.minor).toBe(2);
    expect(v.patch).toBe(3);
    expect(v.build).toBe(4);
    expect(v.preRelease).toBe("pre");
  });

  test("compare list", () => {
    cases.forEach((c, _i, _a) => {
      console.log(_i, c);
      const v0 = new Version(c[0]);
      expect(v0[c[2]](c[1])).toBeTrue();
    });
  });

});