import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar.jsx'
import {StyleSheet} from 'react-native';
import OpenAI from "openai";
import {OPENAI_API_KEY} from "@env";
import {IMGBB_API} from "@env";
import {BACKEND} from "@env"

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
// console.log(openai);

function Home () {
  // const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [recipeSteps, setRecipeSteps] = useState("");

  // takeImageInput takes an image file from your computer and send it to imgbb to be hosted so the image now has a url linked to it.
  // this allows it to be sent to chatgpt and analyzed to create a recipe.
  function takeImageInputAndSendToOpenAI(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API}`, {
      method: 'POST',
      body: form,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        async function imageTest (imageUrl) {
          console.log(2)
          const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "Generate a recipe, list recipe name only" },
                  {
                    type: "image_url",
                    image_url: {
                      "url": `${data.data.url}`,
                    },
                  },
                ],
              },
            ],
          });
          console.log(response.choices[0].message.content);
          setMessage(response.choices[0].message.content);
          // send this to the back end along with the steps when completed
        }
        imageTest();
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });

      //run showChatGPTUserImage() if imageUrl is updated
      console.log("here", imageUrl)
      // if (imageUrl) {
      //   // useEffect(() => {
      //     console.log(1)
      //     async function imageTest (imageUrl) {
      //       console.log(2)
      //       const response = await openai.chat.completions.create({
      //         model: "gpt-4-vision-preview",
      //         messages: [
      //           {
      //             role: "user",
      //             content: [
      //               { type: "text", text: "Generate a recipe, list recipe name only" },
      //               {
      //                 type: "image_url",
      //                 image_url: {
      //                   "url": `${imageUrl}`,
      //                 },
      //               },
      //             ],
      //           },
      //         ],
      //       });
      //       console.log(response.choices[0].message.content);
      //       setMessage(response.choices[0].message.content);
      //       // send this to the back end along with the steps when completed
      //     }
      //     imageTest();
      //   // }, [])
      //}
  }

  // console.log(imageUrl);
  console.log(message);
  return (
    <div style={styles.container}>
      <NavBar/>
      { message ? 
      <div>
        <h2 style={styles.recipe}>{message ? message : "Recipe Name"}</h2>
        <p style={styles.recipeSteps}>{recipeSteps ? recipeSteps : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}</p>
      </div>
      : 
        <form style={styles.form} onSubmit={takeImageInputAndSendToOpenAI}>
          {/* <label htmlFor='file'>Image</label> */}
          <input id="file" type="file" accept="image/*" capture="camera" name="image"/>
          <button type="submit">Submit</button>
        </form>
      }
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  recipe: {
    marginTop: "10%",
  },
  recipeSteps: {
    fontSize: 20
  },
  form: {
    margin: "100px"
  }
});

export default Home