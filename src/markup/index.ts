import { PORT } from '../common/config';

export const markUp = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Nodejs service</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'Open Sans', sans-serif ">
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; width: 100vw; height: 100vh; background: #03befc">
          <h1 style="color: #ffffff">Hello, this is awesome Nestjs API</h1>
          <a href=http://localhost:${PORT}/api>Here you find documentation</a>
          <div style="position: absolute;  bottom: 10px; right: 10px"><a style="color: #ffffff" href="https://github.com/OlegMikhailov23">Made by Oleg Mikhaylov<a></div>
      </div>
    </body>
    </html>
`;
};
