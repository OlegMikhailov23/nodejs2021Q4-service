import { PORT } from "../common/config";

export const markUp = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Nodejs service</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0,
                                 maximum-scale=1.0, user-scalable=no">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <style>
            @keyframes glitch {
              0%,
              40%,
              44%,
              58%,
              61%,
              65%,
              69%,
              73%,
              100% {
                transform: skewX(0deg);
              }
              41% {
                transform: skewX(10deg);
              }
              42% {
                transform: skewX(-10deg);
              }
              59% {
                transform: skewX(40deg) skewY(10deg);
              }
              60% {
                transform: skewX(-40deg) skewY(-10deg);
              }
              63% {
                transform: skewX(10deg) skewY(-5deg);
              }
              70% {
                transform: skewX(-50deg) skewY(-20deg);
              }
              71% {
                transform: skewX(10deg) skewY(-10deg);
              }
            }
        </style>
    </head>
    <body style="font-family: 'Open Sans', sans-serif; margin: 0;">
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; width: 100vw; height: 100vh; background: #03befc; padding: 10px">
          <div style="width: 100px; height: 100px">
            <img src="https://cdn-scalioadmin.s3.amazonaws.com/work/lg/circle-nest-svg-1582871892902.svg" alt=Nestjs />
          </div>
          <h1 style="color: #ffffff">Hello, this is awesome Nestjs API</h1>
          <a href=http://localhost:${PORT}/api>Here you find documentation</a>
          <div style="
            position: absolute;
            display: flex; 
            align-items: center;
            bottom: 20px;
            right: 20px;
            border: 1px solid #cccccc;
            padding: 10px; 
            border-radius: 4px; 
            background: #222222;
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            animation: glitch 4s ease-in-out infinite alternate;" href="https://github.com/OlegMikhailov23">
            "
            >
            <img style="width: 50px; height: 50px;margin-right: 10px; border-radius: 50%" src="https://avatars.githubusercontent.com/u/25158316?v=4">
            <a style="font-size: 1rem;
                      color: transparent;
                      text-shadow: 0 0 0.03em #eeeeee, 0.12em 0.06em 0.03em #00dcdc,-0.12em -0.06em 0.03em #ff3232;
                      " href="https://github.com/OlegMikhailov23">
                      Made by Oleg Mikhaylov
            <a>
          </div>
      </div>
    </body>
    </html>
`;
};
