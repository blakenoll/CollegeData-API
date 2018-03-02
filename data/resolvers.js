import { Author, Post, GetSchools } from './connectors';
import fetch from 'node-fetch'

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors() {
      return Author.findAll();
    },
    allSchools() {
      return GetSchools.getOne();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return Post.findOne({ postId: post.id }).then(view => post.views);
    }
  },
};

export default resolvers;