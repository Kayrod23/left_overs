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
  // let loading = false;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("here");
  const [recipeSteps, setRecipeSteps] = useState("");
  // takeImageInput takes an image file from your computer and send it to imgbb to be hosted so the image now has a url linked to it.
  // this allows it to be sent to chatgpt and analyzed to create a recipe.
  function takeImageInputAndSendToOpenAI(event) {
    event.preventDefault();
    setLoading(true);
    console.log("running");
    // loading = true;
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
        showChatGPTUserImage(data.data.url);
        // getRecipeFromChatGPT("fresh tomato salsa");
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }

//run showChatGPTUserImage() if imageUrl is updated
      async function showChatGPTUserImage (imageUrl) {
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
                    "url": `${imageUrl}`,
                  },
                },
              ],
            },
          ],
        });
        setMessage(response.choices[0].message.content);
        getRecipeFromChatGPT(response.choices[0].message.content);
        // send this to the back end along with the steps when completed
      }

// sends the recipe generated from chatGPT and send it back to then get a step by step guide on how to make the recipe.
      async function getRecipeFromChatGPT(recipe) {
        const recipeSteps = await openai.chat.completions.create({
          messages: [{"role": "system", "content": "you are a helpful assistant" },
        {"role" : "user", "content" : `can you give me a step by step guide for ${recipe}`}],
        model: "gpt-3.5-turbo",
        // stream: true
        })
      //   for await (const chunk of recipeSteps) {
      //     setRecipeSteps(chunk.choices[0]?.delta?.content || "");
      // }
        setRecipeSteps(recipeSteps.choices[0].message.content);
        setLoading(false);
      }


  console.log("state",message);
  console.log("state", recipeSteps);
  return (
    <div style={styles.container}>
      <NavBar/>
      <div>
         <form style={styles.form} onSubmit={takeImageInputAndSendToOpenAI}>
          {/* <label htmlFor='file'>Image</label> */}
          <input id="file" type="file" accept="image/*" capture="camera" name="image"/>
          <button type="submit">Submit</button>
        </form>
        { loading ? 
        <div>Loading</div>
        :
        <div>
          { message && recipeSteps ? 
            <div>
              <h2 style={styles.recipe}>{message}</h2>
              <p style={styles.recipeSteps}>{recipeSteps}</p>
            </div>
            :
            <div>What do you have left over?</div>
          }
        </div>
        }
      </div>
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