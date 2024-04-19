// // const axios = require('axios');

// // import axios from "axios";

// //  <https://api.github.com/repositories/297244943/commits?per_page=1&page=114>; rel="last"
// // https://api.github.com/repos/mrdoob/glTF-Sample-Assets/commits?per_page=1&page=1

// url_get = 'https://api.github.com/repos/mrdoob/glTF-Sample-Assets/commits?per_page=1&page=1'
// // url = "https://random-data-api.com/api/v2/users"
// // var commit_count;

// // axios.get(url_get)
// //   .then(function (response) {
// //     console.log(response.headers.link);
// //     // handle success
// //     // let response_header_link = response.headers.link;
// //     // let link_arr = response_header_link.split(",");
// //     // let take_query_string = link_arr.pop().split("?");
// //     // let take_page_number_info = take_query_string.pop().split(">")[0];
// //     // let last_page = take_page_number_info.split('&').pop();
// //     // commit_count = parseInt(last_page.split("=").pop());
// //     // console.log(commit_count);
// //   })
// //   .catch(function (error) {
// //     console.log(error);
// //   });

// function getData() {
//   axios.get(url_get)
//     .then(function (response) {

//       // handle success
//       let response_header_link = response.headers.link;
//       let link_arr = response_header_link.split(",");
//       let take_query_string = link_arr.pop().split("?");
//       let take_page_number_info = take_query_string.pop().split(">")[0];s
//       let last_page = take_page_number_info.split('&').pop();
//       let commit_count = parseInt(last_page.split("=").pop());
//       localStorage.setItem("objects", commit_count);
//       // sendDataToB(commit_count);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }



// // Call the function to fetch data from the API when a.js is loaded
// getData();
