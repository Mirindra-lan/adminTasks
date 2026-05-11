import { verify } from "../src/core/hash";

describe("verify function", () => {
    it("should return true when hash matches", () => {
        const data1 = "123456789";
        const pass = "0b18960f33c0916eef50ac5051c81be3187533da619c529ae11969dac9b9b1cf1db6c3e4b097565b50610eef16fcf5177d12167d29786b9f31a2c6c3ceca7492";
        const res = verify(data1, pass);
        expect(res).toBe(true);
    });
    it("should return false when hash doesn't matches", () => {
        const data1 = "Mirindra";
        const pass = "0b18960f33c0916eef50ac5051c81be3187533da619c529ae11969dac9b9b1cf1db6c3e4b097565b50610eef16fcf5177d12167d29786b9f31a2c6c3ceca7492";
        const res = verify(data1, pass);
        expect(res).toBe(false);
    });
})