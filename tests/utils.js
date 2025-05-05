// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 20,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: "16:30",
    endTime: "20:00",

    setCurrTemp(temp) {
      this.currTemp = temp;
    },

    setColdPreset(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp() {
      this.currTemp--;
    },

    increaseTemp() {
      this.currTemp++;
    },
    toggleAircon() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
  },
];
const selectedRoom = rooms[1];
const currRoom = rooms[0];

// handle change in temp
function handleTemperatureChange(action) {
  if (action === "increase" && currRoom.currTemp < 32) {
    currRoom.increaseTemp();
  } else if (action === "reduce" && currRoom.currTemp > 10) {
    currRoom.decreaseTemp();
  }
  if (action === "increase" && selectedRoom.currTemp < 32) {
    selectedRoom.increaseTemp();
  } else if (action === "reduce" && selectedRoom.currTemp > 10) {
    selectedRoom.decreaseTemp();
  }
}

// handle switch
// function handleACSwitch(e) {
//   if (e.target.classList.contains("switch")) {
//     const room = rooms.find(
//       (room) => room.name === e.target.parentNode.parentNode.id
//     );
//     room.toggleAircon();
//     generateRooms();
//   }

//   if (e.target.classList.contains("room-name")) {
//     setSelectedRoom(e.target.parentNode.parentNode.id);
//   }
// }

//   set preset temp and updates dom
function setPresetTemp(e, coolBtn, currRoom = rooms[0]) {
  const isCoolPreset = e.target === coolBtn;
  // Set temperature based on which button was clicked
  const presetTemp = isCoolPreset ? currRoom.coldPreset : currRoom.warmPreset;
  currRoom.setCurrTemp(presetTemp);
}

// handles and sets the warm and cool presets
function handlePresetInput(coolInput, warmInput, room = currRoom) {
    const coolValue = Number(coolInput);
    const warmValue = Number(warmInput);

    room.setColdPreset(coolValue);
    room.setWarmPreset(warmValue);
  }

// turns all ACs on
function turnAllACsOn() {
  rooms.forEach((room) => {
    if (!room.airConditionerOn) {
      room.toggleAircon();
    }
  });
}

// turn off all ACs
function turnAllACsOff() {
  rooms.forEach((room) => {
    if (room.airConditionerOn) {
      room.toggleAircon();
    }
  });
}

// // function to populate select element
// function populateRooms(selectEl, optionsEl = null) {
//   rooms.forEach((room) => {
//     optionsEl = document.createElement("option");
//     optionsEl.value = room.name;
//     optionsEl.textContent = room.name;
//     selectEl.appendChild(optionsEl);
//   });
// }

module.exports = {
  rooms,
  selectedRoom,
  currRoom,
  handleTemperatureChange,
  setPresetTemp,
  turnAllACsOff,
  turnAllACsOn,
  handlePresetInput
};
