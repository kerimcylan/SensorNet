
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// GET BACK ALL THE POSTS
router.get('/', async (req,res) => {
    //res.send("We are on posts");
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});


router.get('/specific', (req,res) => {
    res.send("We are on specific post");
});


// SUBMITS A POST 
router.post('/', async (req,res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
    const savedPost = await post.save();
    res.json(savedPost);
    }catch(err){
        res.json({message: err});
    }

    /*
    post.save()
    .then(data => {res.json(data);})

    .catch(err => {
        res.json({message: err});
    });
    */
});


// GET SPECIFIC POST BY ID
router.get('/:postId', async (req,res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post);
    //console.log(req.params.postId);
    }catch(err){
        res.json({message: err});
    }
});


// DELETE POST BY ID
router.delete('/:postId', async (req,res) => {
    try{
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
    
    }catch(err){
        res.json({message: err});
    }
});


// UPDATE A POST 
router.patch('/:postId', async (req,res) => {
    try{
    const updatedPost = await Post.updateOne(
        {_id: req.params.postId}, 
        { $set: {title: req.body.title }}
        
    );
    
    res.json(updatedPost);
    
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;