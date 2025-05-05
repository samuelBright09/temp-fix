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
const currTempElement = document.querySelector(".current-temp");
const roomSelect = document.getElementById("rooms");
const MainCurrentTemp = document.getElementById("temp");
const buttonsContainer = document.querySelector(".buttons");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("reduce");
const defaultSettings = document.querySelector(".default-settings");
const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");
const newPresetBtn = document.getElementById("new-preset");
const inputsDiv = document.querySelector(".inputs");
const svgPoint = document.querySelector(".point");
const closeBtn = document.getElementById("close");
const coolInput = document.getElementById("cool-input");
const warmInput = document.getElementById("warm-input");
const errorSpan = document.querySelector(".error");
const successSpan = document.querySelector(".success");
const saveBtn = document.getElementById("save");
// const tempControlsEl = document.querySelector(".controls")
const roomsControlContainer = document.querySelector(".rooms-control");
// Selector variables for modal
const addRoomBtn = document.getElementById("add-room-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const closeModalBtn = document.getElementById("close-modal");
const cancelAddRoomBtn = document.getElementById("cancel-add-room");
const confirmAddRoomBtn = document.getElementById("confirm-add-room");
const newRoomNameInput = document.getElementById("new-room-name");
const newRoomTempInput = document.getElementById("new-room-temp");
const newRoomImageInput = document.getElementById("new-room-img");
const allACOnBtn = document.getElementById("allACOn");
const allACOffBtn = document.getElementById("allACOff");
// time selectors
const startTimeInput = document.getElementById("start-time");
const endTimeInput = document.getElementById("end-time");

// Event listeners
buttonsContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id === "increase" || target.name === "add-outline") {
    handleTemperatureChange("increase");
  } else if (target.id === "reduce" || target.name === "remove-outline") {
    handleTemperatureChange("reduce");
  }
});
newPresetBtn.addEventListener("click", togglePresetInput);
roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;
  currRoom = setSelectedRoom(selectedRoom);
});
// Set preset temperatures
defaultSettings.addEventListener("click", setPresetTemp);
saveBtn.addEventListener("click", handlePresetInput);
closeBtn.addEventListener("click", () => inputsDiv.classList.add("hidden"));
roomsControlContainer.addEventListener("click", handleACSwitch);
// modal event listeners
addRoomBtn.addEventListener("click", openAddRoomModal);
closeModalBtn.addEventListener("click", closeAddRoomModal);
cancelAddRoomBtn.addEventListener("click", closeAddRoomModal);
confirmAddRoomBtn.addEventListener("click", addNewRoom);
allACOnBtn.addEventListener("click", turnAllACsOn);
allACOffBtn.addEventListener("click", turnAllACsOff);

// initialize
let selectedRoom = rooms[0].name;
let currRoom = rooms[0];
changeBtnBackgroundColor();
// Set default temperature
currTempElement.innerText = `${rooms[0].currTemp}°`;
MainCurrentTemp.textContent = `${rooms[0].currTemp}°`;
// set modal to none
modalOverlay.style.display = "none";
populateRooms();

// Add new options from rooms array
function populateRooms() {
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
  });
}

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
  const currRoom = rooms.find((room) => room.name === selectedRoomName); //chnaged param to selectedRoomName
  setIndicatorPoint(currRoom.currTemp);
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;
  setOverlay(currRoom);
  roomName.innerText = currRoom.name;
  currTempElement.innerText = `${currRoom.currTemp}°`;
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

// handle temperature updates
function handleTemperatureChange(action) {
  if (action === "increase" && currRoom.currTemp < 32) {
    currRoom.increaseTemp();
  } else if (action === "reduce" && currRoom.currTemp > 10) {
    currRoom.decreaseTemp();
  }
  setOverlay(currRoom);
  setIndicatorPoint(currRoom.currTemp);
  currTempElement.innerText = `${currRoom.currTemp}°`;
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;
  changeBtnBackgroundColor();
  generateRooms();
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
  const isCoolPreset = e.target === coolBtn || e.target.closest("#cool");
  // Set temperature based on which button was clicked
  const presetTemp = isCoolPreset ? currRoom.coldPreset : currRoom.warmPreset;
  currRoom.setCurrTemp(presetTemp);
  MainCurrentTemp.textContent = `${currRoom.currTemp}°`;
  changeBtnBackgroundColor()

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

// Modal functions
function openAddRoomModal() {
  modalOverlay.style.display = "flex";
  // Reset inputs
  newRoomNameInput.value = "";
  newRoomTempInput.value = "22";
  newRoomImageInput.value = "";
}

function closeAddRoomModal() {
  modalOverlay.style.display = "none";
  console.log("close btn is clicked");
}

function addNewRoom() {
  const name = newRoomNameInput.value.trim();
  const temp = parseInt(newRoomTempInput.value);
  const image = newRoomImageInput.value.trim() || "./assets/living-room.jpg";
  const startTime = startTimeInput.value || "16:30";
  const endTime = endTimeInput.value || "20:00";

  if (!name) {
    alert("Please enter a room name");
    return;
  }

  if (isNaN(temp) || temp < 10 || temp > 32) {
    alert("Temperature must be between 10°C and 32°C");
    return;
  }

  // Check if room already exists
  if (rooms.some((room) => room.name.toLowerCase() === name.toLowerCase())) {
    alert("A room with this name already exists");
    return;
  }

  // Create new room object with scheduling capabilities
  const newRoom = {
    name,
    currTemp: temp,
    coldPreset: 20,
    warmPreset: 32,
    image,
    airConditionerOn: false,
    startTime,
    endTime,
    scheduledInterval: null,
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
      this.airConditionerOn = !this.airConditionerOn;
    },
    checkSchedule() {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = `${currentHours}:${currentMinutes}`;

      const [startHours, startMinutes] = this.startTime.split(":").map(Number);
      const [endHours, endMinutes] = this.endTime.split(":").map(Number);

      const shouldBeOn =
        (currentHours > startHours ||
          (currentHours === startHours && currentMinutes >= startMinutes)) &&
        (currentHours < endHours ||
          (currentHours === endHours && currentMinutes < endMinutes));

      if (shouldBeOn && !this.airConditionerOn) {
        this.airConditionerOn = true;
        generateRooms();
      } else if (!shouldBeOn && this.airConditionerOn) {
        this.airConditionerOn = false;
        generateRooms();
      }
    },
  };

  // Add to rooms array
  rooms.push(newRoom);

  // Update dropdown
  const option = document.createElement("option");
  option.value = newRoom.name;
  option.textContent = newRoom.name;
  roomSelect.appendChild(option);
  roomSelect.value = newRoom.name;
  currRoom = setSelectedRoom(newRoom.name);

  // Start scheduling for this room
  startRoomSchedule(newRoom);

  // Regenerate rooms control
  generateRooms();

  // Close modal
  closeAddRoomModal();
}

//function to start scheduling for a room
function startRoomSchedule(room) {
  // Clear any existing interval
  if (room.scheduledInterval) {
    clearInterval(room.scheduledInterval);
  }

  // Check schedule every minute
  room.scheduledInterval = setInterval(() => {
    room.checkSchedule();
  }, 60000); // 60,000ms = 1 minute

  // Initial check
  room.checkSchedule();
}

// Functions
function turnAllACsOn() {
  rooms.forEach((room) => {
    if (!room.airConditionerOn) {
      room.toggleAircon();
    }
  });

  generateRooms();
  showFeedback("All AC units turned on");
}

function turnAllACsOff() {
  rooms.forEach((room) => {
    if (room.airConditionerOn) {
      room.toggleAircon();
    }
  });

  generateRooms();
  showFeedback("All AC units turned off");
}

function showFeedback(message) {
  const successSpan = document.querySelector(".success");
  successSpan.textContent = message;
  successSpan.style.display = "block";

  setTimeout(() => {
    successSpan.style.display = "none";
  }, 2000);
}
