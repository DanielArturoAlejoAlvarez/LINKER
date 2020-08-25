# LINKER

## Description

This repository is a Software of Application with React and Firebase.

## Installation

Using React,Firebase,Toastify,Materialize-Icons,Bootswatch,etc preferably.

## DataBase

Create a database in the Firebase Google firestore cloud NoSQL.

## Apps

Using Firestore Cloud.

## Usage

```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/LINKER.git
[NAME APP]

$ yarn install or npm install

$ yarn start
```

Follow the following steps and you're good to go! Important:

![alt text](https://firebase.google.com/docs/hosting/images/hosting-deploy-stackblitz.gif?hl=es)

## Coding

### Config

```javascript
...
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
// Initialize Firebase

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
...
```

### Components

```javascript
...
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

export const LinkForm = (props) => {
  const initialState = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialState);

  useEffect(() => {
    console.log(props.currentLinkId);
    if (props.currentLinkId === "") {
      setValues({ ...initialState });
    } else {
      //console.log(props.currentLinkId)
      getLinkById(props.currentLinkId);
    }
  }, [props.currentLinkId]);

  //Validation URL
  const validURL = (url_str) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      url_str
    );
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(validURL(values.url));
    if (!validURL(values.url)) {
      return toast("URL invalid!", {
        type: "warning",
        autoClose: 2000,
      });
    }

    props.addAndEditLink(values);

    //clear form
    setValues({
      ...initialState,
    });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    console.log(doc.data());
    setValues({
      ...doc.data(),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="card card-body">
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">insert_link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="http://someurl.com"
            name="url"
            value={values.url}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Website Name"
            name="name"
            value={values.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group input-group">
          <textarea
            name="description"
            rows="3"
            className="form-control"
            placeholder="Write a description"
            value={values.description}
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-lg btn-primary btn-block">
            {props.currentLinkId === "" ? "CREATE" : "UPDATE"}
          </button>
        </div>
      </form>
    </div>
  );
};

...
```



## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/LINKER. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
````
