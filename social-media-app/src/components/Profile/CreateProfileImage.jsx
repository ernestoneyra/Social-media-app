import React, { useState } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import Skeleton from "react-loading-skeleton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Col, Row, Form, Container, Button, Image } from "react-bootstrap";

import { storage, db } from "../../lib/Firebase";
import firebase from "firebase";


export default function CreateProfileImage() {
  const [caption, setCaption] = useState("");
  
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const {
    user: { username, userId },
  } = useUser();

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var src1 = URL.createObjectURL(e.target.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
      //let imageName = makeId(10)
      const uploadTask = storage.ref(`avatars/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // get download urls and upload complete function/ post info
          storage
          .ref(`avatars`)
            .child(`${image.name}`)
            .getDownloadURL()
            .then((imageUrl) => {
            
              db.collection(`avatars`).add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
               
                imageSrc: imageUrl,
                photoUrl: imageUrl,
                userId: userId,
           
          
                username: username.toLowerCase(),
                /*  profileUrl: username.photoURL, */
                /* userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4", */
              });
            });

          setProgress(0);
          setCaption("");
          setImage(null);
          var preview1 = document.getElementById("image-1-preview");
          preview1.style.display = "none";
        }
      );
    }
  };

  
  /*   console.log("Fullname", fullName);
  console.log("username", username);
  console.log("userId", userId);
  console.log("following", following);
  console.log("docId", docId); */

  return (
    <>
      <Container className=" bg-light mt-3">
        <Form>
          {username ? (
            <Col className="p-0">
              
              <Col className="imagePreview">
                <Image
                  //onClick={() => removeImage()}
                  id="image-1-preview"
                  className="col-3 m-0 p-0 "
                  roundedCircle
                />
                {/* {progress === 0 ? (
                  <></>
                ) : (
                  <CircularProgress
                    className="circularProgress"
                    variant="determinate"
                    value={progress}
                  />
                )} */}
              </Col>
              <Row className=" d-flex justify-content-between mr-0 ml-0">
                <div className="">
                  <label htmlFor="fileInput">
                    <div type="button" className="">
                      <AddAPhotoIcon />
                    </div>
                  </label>
                  <input
                    type="file"
                    className="d-none"
                    onChange={handleChange}
                    accept="image/*"
                    id="fileInput"
                  />
                </div>
                <Button className="btn-sm" onClick={handleUpload}>
                  {`Upload ${progress !== 0 ? progress : ""}`}
                </Button>
              </Row>
            </Col>
          ) : (
            <div>
              <p className="font-weight-medium mr-4">
                <Skeleton count={1} height={150} />
              </p>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}


CreateProfileImage.propTypes = {
  caption: PropTypes.string,
  username: PropTypes.string,
  comments: PropTypes.array,
};
