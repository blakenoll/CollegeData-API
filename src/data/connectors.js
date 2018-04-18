import _ from 'lodash';
import fetch from 'node-fetch';
import NodeGeocoder from 'node-geocoder';

// REST API integration for Department of Education
const baseURL = 'https://api.data.gov/ed/collegescorecard/v1/schools?';
const apiKey = '&api_key=dM8fcIUTRoq9ieuaPORfcjGilVhjzsOoXTB2p0SB';

const options = {
  provider: 'google',
  apiKey: 'AIzaSyDOLHdOrsHQam6jC2bh1nWUYwiqMZBr35s'
}

const geocoder = NodeGeocoder(options);

// function to retrieve schools from scorecard
const GetSchools = {
  getAll(args) {
    const schoolCity =  (args.city) ? encodeURIComponent(args.city) : "";
    const schoolName = (args.name) ? encodeURIComponent(args.name) : "";
    let latitude, longitude;

   return geocoder.geocode(args.city).then(res => { console.log(res, res[0].latitude, res[0].longitude)
      let { latitude, longitude } = res[0]
      console.log(latitude);
      return(latitude, longitude);
    }).then( (latitude, longitude) => {
      console.log(latitude);
      return fetch(`${baseURL}school.city=${schoolCity}&school.name=${schoolName}&school.degrees_awarded.predominant=3,4&2015.cost.attendance.academic_year__not=0&fields=id,school.name,school.city,2015.cost.attendance.academic_year,2015.admissions.admission_rate.overall,school.school_url&per_page=100&sort=school.name${apiKey}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res.results);
        return res.results;
      });
    })
  },
};

export { GetSchools };
