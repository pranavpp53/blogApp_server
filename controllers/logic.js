const { users, posts } = require("../models/Schema");

exports.signinLogic = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(200).json({ message: 'Incorrect Password' });
        }

        res.status(200).json({ message: 'Sign-in successful', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.newUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await users.findOne({ email });


        if (existingUser) {
            return res.status(400).json({ error: 'user already have an account with this email id' });
        }

        const newUser = new users({ username, email, password });

        await newUser.save();

        res.status(200).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.newPost = async (req, res) => {
    const file = req.file.filename
    const { title, content, authorid } = req.body;
    try {
        const author = await users.findById(authorid);
        if (!author) {
            return res.status(200).json({ error: 'Author not found' });
        }

        const newPost = new posts({ title, content, author: authorid, image: file });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}


exports.userPosts = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await users.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        const userPosts = await posts.find({ author: user._id });

        res.status(200).json(userPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

exports.SinglePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await posts.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}



exports.allPosts = async (req, res) => {
    try {
        const postsWithAuthordetails = await posts.find().populate('author');

        res.status(200).json(postsWithAuthordetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}

exports.editPost = async (req, res) => {
    try {


        const postId = req.params.id;
        const { title, content } = req.body;

        const post = await posts.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({"message":"post edited successfully","data":post});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Logical Error' });
    }
}



exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await posts.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully', post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}