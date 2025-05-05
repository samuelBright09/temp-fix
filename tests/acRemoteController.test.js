/**
 * @jest-environment jsdom
 */

const {
  rooms,
  selectedRoom,
  currRoom,
  handleTemperatureChange,
  setPresetTemp,
  turnAllACsOff,
  turnAllACsOn,
  handlePresetInput,
} = require("./utils");

describe("Room functionalities", () => {
  test("AC is initially off", () => {
    expect(currRoom.airConditionerOn).toBeFalsy();
  });

  // check if romm methods were called
  describe("Room methods", () => {
    describe("test for initial room", () => {
      test("Properly calls the increaseTemp method for initial room", () => {
        const spy = jest.spyOn(currRoom, "increaseTemp");

        handleTemperatureChange("increase");

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });

      test("Properly calls the decreaseTemp method for initial room", () => {
        const spy = jest.spyOn(currRoom, "decreaseTemp");

        handleTemperatureChange("reduce");

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });

      test("properly updates current temp when cool and warm presets are toggled for initial room", () => {
        document.body.innerHTML = `<div class="default-settings">
                  <button id="cool">
                    <ion-icon size="large" name="snow-outline"></ion-icon>
                    Cool
                  </button>
                  <button id="warm">
                    <ion-icon size="large" name="leaf"></ion-icon>
                    warm
                  </button>
                </div>`;

        const defaultSettings = document.querySelector(".default-settings");
        const coolBtn = document.getElementById("cool");
        defaultSettings.addEventListener("click", setPresetTemp);

        //   spy
        const spy = jest.spyOn(currRoom, "setCurrTemp");

        setPresetTemp("click", coolBtn);

        //   click coolBtn
        coolBtn.click();

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    // set curr room to another to second room
    describe("test for a selected room", () => {
      test("Properly calls the increaseTemp method on selected room", () => {
        const spy = jest.spyOn(selectedRoom, "increaseTemp");

        handleTemperatureChange("increase");

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });

      test("Properly calls the decreaseTemp method for selected room", () => {
        const spy = jest.spyOn(selectedRoom, "decreaseTemp");

        handleTemperatureChange("reduce");

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });

      test("properly updates current temp when warm preset is toggled for initial room", () => {
        document.body.innerHTML = `<div class="default-settings">
                  <button id="cool">
                    <ion-icon size="large" name="snow-outline"></ion-icon>
                    Cool
                  </button>
                  <button id="warm">
                    <ion-icon size="large" name="leaf"></ion-icon>
                    warm
                  </button>
                </div>`;

        const defaultSettings = document.querySelector(".default-settings");
        const warmBtn = document.getElementById("warm");
        defaultSettings.addEventListener("click", setPresetTemp);

        //   spy
        const spy = jest.spyOn(selectedRoom, "setCurrTemp");

        setPresetTemp("click", warmBtn, selectedRoom);

        //   click coolBtn
        warmBtn.click();

        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });

    describe("Global AC turn on and off", () => {
      document.body.innerHTML = ` <div class="global-ac-control">
        <button id="allACOn" class="global-ac-button">
          <ion-icon name="power"></ion-icon> Ac main on
        </button>
        <button id="allACOff" class="global-ac-button off">
          <ion-icon name="power"></ion-icon> AC main off
        </button>
      </div>`;

      const spy = jest.spyOn(selectedRoom, "toggleAircon");
      const spy2 = jest.spyOn(currRoom, "toggleAircon");
      const allACOnBtn = document.getElementById("allACOn");
      const allACOffBtn = document.getElementById("allACOff");
      allACOnBtn.addEventListener("click", turnAllACsOn);
      allACOffBtn.addEventListener("click", turnAllACsOff);

      test("properly toggles all rooms Ac turn on", () => {
        allACOnBtn.click();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });

      test("properly toggles all rooms Ac turn on", () => {
        allACOffBtn.click();
        expect(spy2).toHaveBeenCalled();
        spy2.mockRestore();
      });
    });

    describe("Preset inputs", () => {
      document.body.innerHTML = `  <div class="inputs hidden">

            <button id="save">Save</button>
            <span class="error"></span>
          </div>`;
      const spy = jest.spyOn(currRoom, "setColdPreset");
      const spy2 = jest.spyOn(currRoom, "setWarmPreset");

      const saveBtn = document.getElementById("save");
      const errorSpan = document.querySelector(".error");
      saveBtn.addEventListener("click", handlePresetInput);
      let coolInput = "12";
      let warmInput = "27";
      handlePresetInput(coolInput, warmInput);
      saveBtn.click();

      describe("Calls preset methods", () => {
        it("calls setColdPreset and warmPreset methods on curr room", () => {
          expect(spy).toHaveBeenCalled();
          expect(spy2).toHaveBeenCalled();
          expect(spy).toHaveBeenCalledWith(12);
          expect(spy2).toHaveBeenCalledWith(27);
        });

        it("calls setColdPreset and warmPreset methods on selected room", () => {
          const spy = jest.spyOn(selectedRoom, "setColdPreset");
          const spy2 = jest.spyOn(selectedRoom, "setWarmPreset");
          coolInput = "20";
          warmInput = "30";
          handlePresetInput(coolInput, warmInput, selectedRoom);
          expect(spy).toHaveBeenCalled();
          expect(spy2).toHaveBeenCalled();
        });
      });

      describe("DOM Updates", () => {
        it("dispalys error span with messsage", () => {
            handlePresetInput(3, 77)
          expect(errorSpan.textContent).toContain("Enter valid temperatures");
        });
      });
    });
  });
});
