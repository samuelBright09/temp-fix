// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 32,
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
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
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
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
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

//  selector variables
const coolOverlay = `linear-gradient( to bottom, rgba(141, 158, 247, 0.2),rgba(194, 197, 215, 0.1))`;
const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;
const roomContainer = document.querySelector(".room");
const roomName = document.querySelector(".room-name");
const currTemp = document.querySelector(".current-temp");
const roomSelect = document.getElementById("rooms");
const MainCurrentTemp = document.getElementById("temp");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("reduce");
const defaultSettings = document.querySelector(".default-settings");
const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");
const newPresetBtn = document.getElementById("newPreset");
const inputsDiv = document.querySelector(".inputs");
const svgPoint = document.querySelector(".point");
const closeBtn = document.getElementById("close");
const coolInput = document.getElementById("coolInput");
const warmInput = document.getElementById("warmInput");
const errorSpan = document.querySelector(".error");
const successSpan = document.querySelector(".success");
const saveBtn = document.getElementById("save");
const roomsControlContainer = document.querySelector(".rooms-control");

// Event listeners
newPresetBtn.addEventListener("click", togglePresetInput);
increaseBtn.addEventListener("click", increaseTemperature);
decreaseBtn.addEventListener("click", decreaseTemperature);
roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;
  currRoom  = setSelectedRoom(selectedRoom);
});
// Set preset temperatures
defaultSettings.addEventListener("click", setPresetTemp);
saveBtn.addEventListener("click", handlePresetInput);
closeBtn.addEventListener("click", () => inputsDiv.classList.add("hidden"));
roomsControlContainer.addEventListener("click", handleACSwitch);

// initialize
let selectedRoom = rooms[0].name;
let currRoom = rooms[0]
changeBtnBackgroundColor();
// Set default temperature
currTemp.innerText = `${rooms[0].currTemp}°`;
MainCurrentTemp.textContent = `${rooms[0].currTemp}°`;


// Add new options from rooms array
rooms.forEach((room) => {
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

// set the initial room and Overlay
const setInitialRoomAndOverlay = () => {
  roomContainer.style.backgroundImage = `url('${rooms[0].image}')`;
  roomContainer.style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${rooms[0].image}')`;
  roomName.textContent = `${rooms[0].name}`;
};
setInitialRoomAndOverlay();

const setOverlay = (room) => {
  roomContainer.style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};


// Set current temperature to currently selected room
const setSelectedRoom = (selectedRoomName) => {
  const currRoom = rooms.find(room => room.name === selectedRoomName); //chnaged param to selectedRoomName
  setIndicatorPoint(currRoom.currTemp);
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;
  setOverlay(currRoom);
  roomName.innerText = currRoom.name;
  currTemp.innerText = `${currRoom.currTemp}°`;
  return currRoom;
};

// Set svg accordingly
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};


// Generate rooms
const generateRooms = () => {
  let roomsHTML = "";

  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp < 25 ? "Cooling room to: " : "Warming room to: "}${
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};

// display time progress
const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `;
};



// change button colors
function changeBtnBackgroundColor() {
  if (currRoom.currTemp > 24) {
    warmBtn.style.backgroundImage = warmOverlay;
    coolBtn.style.backgroundImage = "none";
  } else if (currRoom.currTemp < 25) {
    warmBtn.style.backgroundImage = "none";
    coolBtn.style.backgroundImage = coolOverlay;
  }
}

// Increase temperature
function increaseTemperature() {
  if (currRoom.currTemp < 32) {
    currRoom.increaseTemp();
  }
  changeBtnBackgroundColor();

  setIndicatorPoint(currRoom.currTemp);
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;

  generateRooms();

  setOverlay(currRoom);

  currTemp.innerText = `${currRoom.currTemp}°`;
}

// decrease temperature
function decreaseTemperature() {
  if (currRoom.currTemp > 10) {
    currRoom.decreaseTemp();
  }

  setIndicatorPoint(currRoom.currTemp);
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;

  changeBtnBackgroundColor();

  generateRooms();

  setOverlay(currRoom);

  warmBtn.style.backgroundColor = "#d9d9d9";
  coolBtn.style.backgroundColor = "#d9d9d9";
  currTemp.innerText = `${currRoom.currTemp}°`;
}

// Toggle preset inputs
function togglePresetInput() {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
}

// set preset
function setPresetTemp(e) {
// Determine which button was clicked
const isCoolPreset = e.target === coolBtn || e.target.closest("#cool")
// Set temperature based on which button was clicked
const presetTemp = isCoolPreset ? currRoom.coldPreset : currRoom.warmPreset;
currRoom.setCurrTemp(presetTemp);
MainCurrentTemp.textContent = `${currRoom.currTemp}°`;
// change button colors when clicked
if (isCoolPreset) {
  coolBtn.style.backgroundImage = coolOverlay;
  warmBtn.style.backgroundImage = "none";
} else {
  coolBtn.style.backgroundImage = "none";
  warmBtn.style.backgroundImage = warmOverlay;
}
}


function handlePresetInput() {
  const coolValue = Number(coolInput.value);
  const warmValue = Number(warmInput.value);

  if (!coolValue || !warmValue) {
    errorSpan.textContent = "Please enter both values";
    errorSpan.style.display = "block";
    return;
  }

  if (coolValue < 10 || warmValue > 32) {
    errorSpan.textContent = "Enter valid temperatures (10° - 32°)";
    errorSpan.style.display = "block";
    return;
  }

  if (coolValue >= warmValue) {
    errorSpan.textContent = "Cool temp must be less than warm temp";
    errorSpan.style.display = "block";
    return;
  }

  currRoom.setColdPreset(coolValue);
  currRoom.setWarmPreset(warmValue);

  successSpan.textContent = "Preset Updated";
  successSpan.style.display = "block";
  coolInput.value = "";
  warmInput.value = "";

  setTimeout(() => {
    successSpan.style.display = "none";
  }, 2000);
}

// Rooms Control
generateRooms();

// handle AC Switch
function handleACSwitch(e) {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
}
