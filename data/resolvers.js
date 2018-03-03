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
    allSchools(_, args) {
      return GetSchools.getOne(args.city, args.name);
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
  School: {
    cost(School) {
      return School['2015.cost.attendance.academic_year'];
    },
    name(School) {
      return School['school.name'];
    },
    city(School) {
      return School['school.city'];
    },
    admissRate(School) {
      return School['2015.admissions.admission_rate.overall'];
    },
    url(School) {
      return School['school.school_url'];
    }
  }
};

export default resolvers;