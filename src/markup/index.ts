import { PORT } from '../common/config';

export const markUp = () => {
  return `
    <div style="display: flex; justify-content: center; flex-direction: column; align-items: center; width: 100%; height: 100%; background: #03befc">
        <h1 style="color: #ffffff">Hello, this is awesome Nestjs API</h1>
        <a href=http://localhost:${PORT}/api>Here you find documentation</a>
    </div>
`;
};
