import './styles/index.scss';
import './assets/fonts/Roboto-Regular.ttf';
import './components/App.jsx';

const app = document.getElementById('app');

const greeting = 'Hello World';

app.innerHTML = `
    <strong class="main-title">
        ${greeting}. Webpack is working!
    </strong>
`;