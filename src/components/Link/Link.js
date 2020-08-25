import React, { useEffect, useState } from "react";
import { LinkForm } from "./LinkForm";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

export const Link = () => {
  const [links, setLinks] = useState([]);
  const [currentLinkId, setCurrentLinkId] = useState("");

  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = () => {
    //Real time data with onSnapshot
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      //console.log(docs)
      setLinks(docs);
    });
  };

  const addAndEditLink = async (linkOBJ) => {
    //console.log(linkOBJ);

    try {
      if (currentLinkId === "") {
        await db.collection("links").doc().set(linkOBJ);
        //console.log('Link saved successfully!')
        toast("Link saved successfully!", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        db.collection("links").doc(currentLinkId).update(linkOBJ);
        toast("Link updated successfully!", {
          type: "success",
          autoClose: 2000,
        });
        setCurrentLinkId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (id) => {
    console.log(id);
    if (window.confirm("Are you sure?")) {
      await db.collection("links").doc(id).delete();
      //console.log('Link deleted successfully!')
      toast("Link deleted successfully!", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 p-2">
        <LinkForm {...{ addAndEditLink, currentLinkId, links }} />
      </div>

      <div className="col-md-8 p-2">
        {links.map((link) => {
          return (
            <div key={link.id} className="card mb-1">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.name}</h4>
                  <div>
                    <i
                      onClick={() => deleteLink(link.id)}
                      className="material-icons btn btn-danger"
                    >
                      close
                    </i>
                    <i
                      onClick={() => setCurrentLinkId(link.id)}
                      className="material-icons btn btn-warning"
                    >
                      create
                    </i>
                  </div>
                </div>

                <p>{link.description}</p>
                <a href={link.url} target="_black">
                  Go to website
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
