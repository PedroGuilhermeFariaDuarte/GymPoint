import dotenv from 'dotenv';

dotenv.config();

import app from './App';

app.listen(7864, () => {
  console.log('API Gympoint is online! :)');
});
