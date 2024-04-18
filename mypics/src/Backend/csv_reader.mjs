import { createApi } from "unsplash-js";
import { createRequire } from "module";
import axios from "axios";

const require = createRequire(import.meta.url);
const fs = require("fs");
const { parse } = require("csv-parse");

const unsplash = createApi({
  accessKey: "kfRGYPEKkLK45KHpG9duIlAd1HudtBlNV6cxaP1mE0k",
});

async function createUser(values) {
  await axios
    .post("http://localhost:8000/user", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createPost(values) {
  await axios
    .post("http://localhost:8000/fake_post", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createFollow(values) {
  await axios
    .post("http://localhost:8000/follows", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createLike(values) {
  await axios
    .post("http://localhost:8000/likes", values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function parseUsersCSV() {
  const data = [];
  fs.createReadStream("./csv/user.csv")
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", function (row) {
      // 👇 push the object row into the array
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      // 👇 log the result array
      console.log("parsed csv data:");
      for (var i = 52; i < 90; i++) {
        unsplash.photos.get({ photoId: data[i].photo_id }).then(function (res) {
          try {
            createUser({
              username: res.response.user.username,
              password: res.response.user.username + "1234",
              email: res.response.user.username + "@gmail.com",
              profile_pic: res.response.user.profile_image.large,
            });
          } catch (error) {
            console.log("valentano");
            console.error(error);
          }
        });
      }
    });
}

async function parsePost() {
  const data = [];
  fs.createReadStream("./csv/photoJoin.csv")
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", function (row) {
      // 👇 push the object row into the array
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      for (var i = 642; i < 690; i++) {
        unsplash.photos.get({ photoId: data[i].photo_id }).then(function (res) {
          try {
            createPost({
              user_id: res.response.user.username,
              title: res.response.description,
              description: res.response.alt_description,
              fb_img_url: res.response.urls.regular,
            });
          } catch (error) {
            console.log("valentano");
            console.error(error);
          }
        });
      }
    });
}

//parsePost();

/*function randomFollow() {
  var names = [
    "Sean",
    "Kyle",
    "Emily",
    "Nick",
    "Cotter",
    "Brian",
    "Jeremy",
    "Kimmy",
    "Pat",
    "Johnny",
  ];
  


  /*if (names.length % 2 != 0) {
    alert(
      "You must have an even number of names. You currently have " +
        names.length +
        " names."
    );
  } else {
    var arr1 = names.slice(), // copy array
      arr2 = names.slice(); // copy array again

    arr1.sort(function () {
      return 0.5 - Math.random();
    }); // shuffle arrays
    arr2.sort(function () {
      return 0.5 - Math.random();
    });

    while (arr1.length) {
      var name1 = arr1.pop(), // get the last value of arr1
        name2 = arr2[0] == name1 ? arr2.pop() : arr2.shift();
      //        ^^ if the first value is the same as name1,
      //           get the last value, otherwise get the first

      console.log(name1 + " gets " + name2);
    }
  }
  names.sort(function () {
    return 0.5 - Math.random();
  });
  console.log(names);
}*/

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

async function randomizeFollow() {
  var arr = [];
  await axios
    .get("http://localhost:8000/get_all_users")
    .then(function (response) {
      response.data.forEach(function (user) {
        arr.push(user.user_id);
      });
      console.log(arr);
      /*for (var i = 0; i < arr.length; i++) {
        let x = Math.floor(Math.random() * 18 + 3);
        var temp = arr.slice();
        delete temp[i];
        var to_follow = getMultipleRandom(temp, x);
        to_follow.forEach(function (follow) {
          createFollow({ user_id1: arr[i], user_id2: follow });
        });
        //console.log(getMultipleRandom(temp, x));
      }*/
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function randomizeLike() {
  var arrUsers = [];
  var arrPosts = [];
  await axios
    .get("http://localhost:8000/get_all_users")
    .then(function (response) {
      response.data.forEach(function (user) {
        arrUsers.push(user.user_id);
      });
      console.log(arrUsers)
    })
    .catch(function (error) {
      console.log(error);
    });
  /*await axios
    .get("http://localhost:8000/get_all_posts")
    .then(function (response) {
      response.data.forEach(function (post) {
        arrPosts.push(post.post_id);
      });
      for (var i = 0; i < arrPosts.length; i++) {
        let x = Math.floor(Math.random() * 18 + 3);
         var to_like = getMultipleRandom(arrUsers, x);
         to_like.forEach(function (user) {
           createLike({ user_id: user, post_id: arrPosts[i] });
         });
      }
    })
    .catch(function (error) {
      console.log(error);
    });*/
}

//parsePost();

randomizeFollow()
