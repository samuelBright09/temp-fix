/**
 * @jest-environment jsdom
 */

const { default: test } = require("node:test");
const { rooms, selectedRoom, handleTemperatureChange } = require("./utils");

describe("Room functionalities", () => {
  test("AC is initially off", () => {
    expect(rooms[0].airConditionerOn).toBeFalsy();
  });

  // check if romm methods were called
  describe("Room methods", () => {
    test("Properly calls the increaseTemp method for room 1", () => {
      const spy = jest.spyOn(rooms[0], "increaseTemp");

      handleTemperatureChange("increase");

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    test("Properly calls the decreaseTemp method for room 1", () => {
      const spy = jest.spyOn(rooms[0], "decreaseTemp");

      handleTemperatureChange("reduce");

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    // set curr room to another to second room

    test("Properly calls the increaseTemp method on room 2", () => {
      const spy = jest.spyOn(rooms[1], "increaseTemp");

      handleTemperatureChange("increase");

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    test("Properly calls the decreaseTemp method for room 2", () => {
      const spy = jest.spyOn(rooms[1], "decreaseTemp");

      handleTemperatureChange("reduce");

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    test("properly updates current temp when cool and warm presets are toggled", ()=>{
        
    })

  });

  
});
