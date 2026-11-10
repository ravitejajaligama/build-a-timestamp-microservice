import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.sendFile(import.meta.dirname + '/views/index.html');
});

app.get('/api{/:date}', (req, res) => {
  const dateInput = req.params.date;

  const date = dateInput
    ? /^\d+$/.test(dateInput)
      ? new Date(Number(dateInput))
      : new Date(dateInput)
    : new Date();

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = 8000;

const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
