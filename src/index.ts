import app from './server';

const PORT = 3500;

app.listen(PORT, () => {
  console.log(`Server operating on port ${PORT}`);
});
