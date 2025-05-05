/**
 * @jest-environment jsdom
 */

const { rooms, handleTemperatureChange, setPresetTemp } = require("./utils");

describe("Room functionalities", () => {
  test("AC is initially off", () => {
    expect(rooms[0].airConditionerOn).toBeFalsy();
  });

  // check if romm methods were called
  describe("Room methods", () => {

    describe("test for initial room", ()=>{

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

        test("properly updates current temp when cool and warm presets are toggled for room 1", () => {
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
            const warmBtn = document.getElementById("warm");
            defaultSettings.addEventListener("click", setPresetTemp);
      
            //   spy
            const spy = jest.spyOn(rooms[0], "setCurrTemp");
      
            setPresetTemp("click", coolBtn);
      
            //   click coolBtn
            coolBtn.click();
      
            expect(spy).toHaveBeenCalled();
      
            //   if room 1 is selected
            warmBtn.click()
            expect(spy)
          });
    })


    // set curr room to another to second room
    describe("test for a selected room", ()=>{
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


          test("properly updates current temp when cool and warm presets are toggled for room 1", () => {
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
            const spy = jest.spyOn(rooms[1], "setCurrTemp");
      
            setPresetTemp("click", warmBtn, rooms[1]);
      
            //   click coolBtn
            warmBtn.click();
      
            expect(spy).toHaveBeenCalled();
      

          });
    })




  });
});
