import axios from "axios";

// url_get = 'https://api.github.com/repos/mrdoob/glTF-Sample-Assets/commits?per_page=1&page=1'
// url_get = "https://api.github.com/repos/shafayet98/collab/commits?per_page=1&page=1"
url_get = "https://api.github.com/repos/tensorflow/swift/commits?per_page=1&page=1";



function getData() {
  axios.get(url_get)
    .then(function (response) {

      // handle success
      let response_header_link = response.headers.link;
      let link_arr = response_header_link.split(",");
      let take_query_string = link_arr.pop().split("?");
      let take_page_number_info = take_query_string.pop().split(">")[0];
      let last_page = take_page_number_info.split('&').pop();
      let commit_count = parseInt(last_page.split("=").pop());
      localStorage.setItem("objects", commit_count);
      // createURLs(commit_count);
      // sendDataToB(commit_count);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getData();
