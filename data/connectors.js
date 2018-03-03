import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import fetch from 'node-fetch';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// creat mock data with a seed
casual.seed(123);

db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({ 
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

// REST API integration for Department of Education
const baseURL = 'https://api.data.gov/ed/collegescorecard/v1/schools?';
const apiKey = '&api_key=dM8fcIUTRoq9ieuaPORfcjGilVhjzsOoXTB2p0SB';

const GetSchools = {
  getOne(city, name) {
    const schoolCity = encodeURIComponent(city);
    const schoolName = encodeURIComponent(name);
    console.log(schoolCity);
    return fetch(`${baseURL}school.city=${schoolCity}&school.name=${schoolName}&fields=id,school.name,school.city,2015.cost.attendance.academic_year,2015.admissions.admission_rate.overall,school.school_url&per_page=100&sort=school.name${apiKey}`)
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        return res.results;
      });
  },
};

export { Author, Post, GetSchools };
