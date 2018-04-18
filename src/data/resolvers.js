import { GetSchools } from './connectors';
import fetch from 'node-fetch'

const resolvers = {
  Query: {
    allSchools(_, args) {
      return GetSchools.getAll(args);
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
      return(School['2015.admissions.admission_rate.overall'] * 100);
    },
    url(School) {
      return School['school.school_url'];
    }
  }
};

export default resolvers;