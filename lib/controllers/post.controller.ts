import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import PostService from '../modules/services/post.service'
import Joi from 'joi';

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    private postService: PostService;

    constructor() {
        this.initializeRoutes();
        this.postService = new PostService();
    }

    private initializeRoutes = () => {
        this.router.get(`${this.path}s`, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.post(`${this.path}`, this.addData);
        this.router.delete(`${this.path}/:id`, this.removePost);
    }

    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        const allData = await this.postService.query({});
        response.status(200).json(allData);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;

        const schema = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required()
        });

        try {
            const validatedData = await schema.validateAsync({ title, text, image });
            await this.postService.createPost(validatedData);
            response.status(200).json(validatedData);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.postService.query({_id: id});
        response.status(200).json(allData);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.postService.deleteData({_id: id});
        response.sendStatus(200);
    };
}

export default PostController;
