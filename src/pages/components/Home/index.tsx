import { useState } from "react";
import {getURLMappingIfExists, createNewURLMapping} from "../../../utils/supabaseQueries"

export default function Home() {
  const [url, setUrl] = useState("");
  const [mappedUrl, setMappedUrl] = useState("");

  async function generateUrlMapping() {

    // check if mapping exists
    let short_link = await getURLMappingIfExists(url);

    if(short_link === undefined){
      // create a new mapping
      await createNewURLMapping(url);
    }
  }

  return (
    <div>
      <div className="text-center">
        <div className="text-3xl font-bold underline">Link Shortener</div>
        <div className="flex justify-center p-10">
          <div className="mb-3 xl:w-96">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Input URL
            </label>
            <input
              type="text"
              className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="actualUrlInput"
              placeholder="https://..."
              onChange={event => setUrl(event.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-blue"
          id="generate-url"
          onClick={generateUrlMapping}
        >
          Button
        </button>
        <div className="select-all" id="linkField">
          {mappedUrl}
        </div>
      </div>
    </div>
  );
}
