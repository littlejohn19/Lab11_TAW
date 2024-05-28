import { Schema, model } from 'mongoose';
import { IPost } from "../models/post.model";

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true }
});

export default model<IPost>('Post', PostSchema);
