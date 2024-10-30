const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());  // Middleware für JSON-Daten

// Simulierte Sensor-Daten (wird durch POST-Anfragen überschrieben)
let sensorData = { temperature: 22.5, humidity: 50 };  // Initialwerte für Temperatur und Luftfeuchtigkeit

// POST-Route zum Empfangen der Temperatur- und Luftfeuchtigkeitsdaten vom Raspberry Pi
app.post('/temperature', (req, res) => {
  // Überprüfen, ob sowohl Temperatur als auch Luftfeuchtigkeit gesendet wurden
  if (req.body.temperature === undefined || req.body.humidity === undefined) {
    return res.status(400).send('Temperature or humidity data is missing');
  }

  // Neue Temperatur- und Luftfeuchtigkeitsdaten speichern
  sensorData = req.body;

  // Debug-Log: Empfangene Daten
  console.log(`Neue Sensordaten empfangen: ${JSON.stringify(sensorData)}`);

  // Bestätigung an den Client zurücksenden
  res.status(200).send('Sensor data received successfully');
});

// GET-Route zum Abrufen der aktuellen Sensordaten (Temperatur und Luftfeuchtigkeit)
app.get('/temperature', (req, res) => {
  // Debug-Log: Rückgabe der gespeicherten Daten
  console.log('Aktuelle Sensordaten:', sensorData);

  // Die aktuellen Sensordaten als JSON zurückgeben
  res.json(sensorData);
});

// Route für die Hauptseite (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server auf dem angegebenen Port starten
const port = process.env.PORT || 2000;  // Fallback auf Port 2000, falls kein Port gesetzt ist
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
