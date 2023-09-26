import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

//Blog- singular of a collections name
const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;
export default Blog;