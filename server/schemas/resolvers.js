const { AuthenticationError } = require('apollo-server-express');
const { User, Topic, Post, Response } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
      users: async () => {
        return User.find()
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })          
      },
 
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('posts');
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      posts: async () => {
        return Post.find();
      },

      post: async (parent, { postId }) => {
        return User.findOne({ _id:postId });           
      },

    },
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }  
        const correctPw = await user.isCorrectPassword(password);  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }  
        const token = signToken(user);  
        return { token, user };
      },

      addPost: async (parent, {heading, message, topic}, context) => {
        if (context.user) {
          const post = await Post.create({
            heading, message, topic,
            postAuthor: context.user.username,
          });  
          return post;
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      updatePost: async (parent, {postId, message}, context) => {
        if (context.user){
          const post = Post.findOne({_id:postId});
          if (post && post.postAuthor === context.user.username) {
            const updatedPost = Post. findOneAndUpdate(
            {_id:postId},
            {message},
            {new: true}
            );
            return updatedPost;
          }
        }
        throw new AuthenticationError('You can update only your posts while logged in!');
      },

      deletePost: async (parent, {postId}, context) => {
        if (context.user){
          const post = Post.findOne({_id:postId});
          if (post && post.postAuthor === context.user.username) {
            const deletedPost = await Post. findOneAndDelete({_id:postId});
            return deletedPost;
          }
        }
        throw new AuthenticationError('You can delete only your posts while logged in!');
      },

      addResponse: async (parent, {postId, message}, context) => {
        if (context.user) {
          return Post.findOneAndUpdate(
            { _id: postId },
            {
              $addToSet: {
                Responses: { message, responseAuthor: context.user.username },
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      // updateResponse: async (parent, {heading, message, topic}, context) => {

      // },

      deleteResponse: async (parent, {responseId}, context) => {
        if (context.user){
          const response = Response.findOne({_id:responseId});
          if (response && response.responseAuthor === context.user.username) {
            const deleteedResponse = await Response. findOneAndDelete({_id:responseId});
            return deleteedResponse;            
          }
        }
        throw new AuthenticationError('You can delete only your responses while logged in!');
      },
    },
};


module.exports = resolvers;