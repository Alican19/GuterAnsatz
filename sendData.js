const axios = require('axios');

// Beispiel-Temperaturdaten
const temperatureData = {
  temperature: 28,  // Beispiel: 22.5°C
  humidity: 62        // Beispiel: 60%
};

axios.post('https://raspi-daten-test-gwdme5hshdf5ddb3.canadacentral-01.azurewebsites.net/temperature', temperatureData)
  .then(response => {
    console.log('Daten erfolgreich gesendet:', response.data);
  })
  .catch(error => {
    console.error('Fehler beim Senden der Daten:', error);
  });
