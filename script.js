// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");
   let pilotInput = document.querySelector("input[name=pilotName]");
   let copilotInput = document.querySelector("input[name=copilotName]");
   let fuelInput = document.querySelector("input[name=fuelLevel]");
   let cargoInput = document.querySelector("input[name=cargoMass]");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let launchStatus = document.getElementById("launchStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   form.addEventListener("submit", function() {
      if (pilotInput.value === "" || copilotInput.value === "" ||
         fuelInput.value === "" || cargoInput.value === "") {
         alert('All fields required!');
         preventDefault();
      }

      if (!isNaN(pilotInput.value)) {
         alert('Invalid input. Please enter a pilot name.');
         event.preventDefault();
      }

      if (!isNaN(copilotInput.value)) {
         alert('Invalid input. Please enter a co-pilot name.');
         event.preventDefault();
      }

      if (isNaN(fuelInput.value)) {
         alert('Invalid input. Please enter a number for fuel level.');
         event.preventDefault();
      }

      if (isNaN(cargoInput.value)) {
         alert('Invalid input. Please enter a number for cargo mass.');
         event.preventDefault();
      }

      if (isNaN(pilotInput.value) && isNaN(copilotInput.value) &&
         !isNaN(fuelInput.value) && !isNaN(cargoInput.value)) {
         pilotStatus.innerHTML = `Pilot ${pilotInput.value} is ready for launch.`;
         copilotStatus.innerHTML = `Co-pilot ${copilotInput.value} is ready for launch.`;
         if (fuelInput.value < 10000) {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = `Shuttle Not Ready For Launch`;
            fuelStatus.innerHTML = `Fuel level too low for launch.`;
         } else if (cargoInput.value > 10000) {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "red";
            launchStatus.innerHTML = `Shuttle Not Ready For Launch`;
            cargoStatus.innerHTML = `Cargo mass too large for launch.`;
         } else {
            faultyItems.style.visibility = "visible";
            launchStatus.style.color = "green";
            launchStatus.innerHTML = `Shuttle Is Ready For Launch`;
         }

         fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            response.json().then(function(json) {
               let jsonKeys = Object.keys(json);
               let random = jsonKeys[Math.floor(Math.random() * jsonKeys.length)];
               let div = document.getElementById("missionTarget");
               div.innerHTML = `<h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[random].name}</li>
            <li>Diameter: ${json[random].diameter}</li>
            <li>Star: ${json[random].star}</li>
            <li>Distance from Earth: ${json[random].distance}</li>
            <li>Number of Moons: ${json[random].moons}</li>
         </ol>
         <img src="${json[random].image}">
         `;
            });

         });
         event.preventDefault();
      }

   });
});

