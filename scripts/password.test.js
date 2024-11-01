const fs = require("fs");
const { changePassword } = require("./password");

jest.mock("fs");

describe("Change password", () => {
  let userData;

  beforeEach(() => {
    userData = [
      { username: "existingUser", password: "Password1!" },
      { username: "existingUser2", password: "Password2!" }
    ];
    fs.readFileSync.mockReturnValue(JSON.stringify(userData));
    fs.writeFileSync.mockClear();
  });

  it("should return error message if the user is not found", () => {
    const result = changePassword("newUser", "Password1!", "Password2!");
    expect(result).toBe("User not found");
  });

  it("should return error message if the user is not found", () => {
    const result = changePassword("anotherNewUser", "anotherPassword1!", "anotherPassword2!");
    expect(result).toBe("User not found");
  });

  it ("should return error message if the old password is incorrect", () => {
    const result = changePassword("existingUser", "notRightPassword1!", "Password112!");
    expect(result).toBe("Passwords not matching");
  });

  it ("should return error message if the old password is incorrect", () => {
    const result = changePassword("existingUser2", "notRightPassword1!", "Password112!");
    expect(result).toBe("Passwords not matching");
  });

  it("should return error message if the old password is the same as the new password", () => {
    const result = changePassword("existingUser", "Password1!", "Password1!");
    expect(result).toBe("New password cannot be the same as old password");
  });

  it("should return error message if the old password is the same as the new password", () => {
    const result = changePassword("existingUser2", "Password2!", "Password2!");
    expect(result).toBe("New password cannot be the same as old password");
  });

  it("should return error message if the password is invalid", () => {
    const result = changePassword("existingUser", "Password1!", "invalidPassword");
    expect(result).toBe("invalid password");
  });

  it("should return error message if the password is invalid", () => {
    const result = changePassword("existingUser2", "Password2!", "invalidPassword");
    expect(result).toBe("invalid password");
  });

  it("should return true if the password is successfully changed", () => {
    const result = changePassword("existingUser", "Password1!", "NewPassWord2!");
    expect(result).toBe(true);
  });

  it("should return true if the password is successfully changed", () => {
    const result = changePassword("existingUser2", "Password2!", "NewPassword2!");
    expect(result).toBe(true);
  });
});
