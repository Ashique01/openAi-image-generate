import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setIsLoading(true);

    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setResponse(res.data.data[0].url);
    setIsLoading(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-12">
          <h3 className="text-center mb-4">
            Generate an Image with openAI API
          </h3>
          <div className="form-group">
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="form-control"
              placeholder="Write text of your imagination"
            />
          </div>
          <button onClick={generateImage} className="btn btn-primary mt-2">
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              >
                Loading..
              </span>
            ) : (
              "Generate an image"
            )}
          </button>

          {response.length > 0 ? (
            <div className="text-center mt-4">
              <img className="img-fluid" src={response} alt="response" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
