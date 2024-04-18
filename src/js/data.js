// const axios = require('axios');

// import axios from "axios";

//  <https://api.github.com/repositories/297244943/commits?per_page=1&page=114>; rel="last"
// https://api.github.com/repos/mrdoob/glTF-Sample-Assets/commits?per_page=1&page=1

url_get = 'https://api.github.com/repos/mrdoob/glTF-Sample-Assets/commits?per_page=1&page=1'
var commit_count;

export const result = axios.get(url_get)
  .then(function (response) {
    return response.header.link;
    // handle success
    // let response_header_link = response.headers.link;
    // let link_arr = response_header_link.split(",");
    // let take_query_string = link_arr.pop().split("?");
    // let take_page_number_info = take_query_string.pop().split(">")[0];
    // let last_page = take_page_number_info.split('&').pop();
    // commit_count = parseInt(last_page.split("=").pop());
    // return commit_count;
    // console.log(commit_count);
  })
  .catch(function (error) {
    console.log(error);
  });
