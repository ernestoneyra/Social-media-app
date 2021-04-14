import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/User';
import { getPhotos, getUserByUserId } from '../services/firebase';

//get photos from collection of photos from a user. 


export default function usePhotos() {
    const [photos, setPhotos] = useState(null);
    const { 
      //uid comes from firebase
      user: { uid: userId = ""} //used to be called uid, is now called userId
    } = useContext(UserContext)

    useEffect(() => {
      async function getTimelinePhotos() {
        const [{following}] = await getUserByUserId(userId)   ///who I am following. byt their user id ( 2,4,1)
        let followedUserPhotos = [] //array of the urls

     

        // does the user actually follow people?
        if (following.length > 0) {
          followedUserPhotos = await getPhotos(userId, following)
        }
        // re-arrange array to be newest photos first by dateCreated
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);

      }

      
      getTimelinePhotos()
    }, [userId])
  
    
  
    return { photos };
  }
