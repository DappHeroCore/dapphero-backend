import App from './App';
import * as dotenv from "dotenv"
import ProjectController from './controllers/ProjectController';
import AccountController from './controllers/AccountController';
import UserController from './controllers/UserController';

dotenv.config()
const controllers = [new ProjectController(), new AccountController(), new UserController()]
// TODO: Modify PORT to be an Env Variable 
const app = new App(controllers, 5001);

app.listen();

export default app;