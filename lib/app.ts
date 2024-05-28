import Index from './index';
import IndexController from "./controllers/index.controller";
import PostController from "./controllers/post.controller";
import UserController from "./controllers/user.controller";

const app: Index = new Index([
    new UserController(),
    new PostController(),
    new IndexController()
]);

app.listen();
