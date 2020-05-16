import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import marked from 'marked';
import TurndownService from 'turndown';

import 'react-quill/dist/quill.snow.css';

function MyComponent({ file }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get(file.raw_url)
      .then(
        res => {
          if(typeof(res.data) === 'object') {
            // setCodeString(JSON.stringify(res.data))
          }
          else {
            const html = marked(res.data);
            setValue(html);
          }
        }
      )
  }, [])

  function handleChange(e) {
    // console.log(e);
    var turndownService = new TurndownService();
    var markdown = turndownService.turndown(e);
    // console.log(markdown);
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code'],
      ['code-block'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code', 'code-block'
  ]

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
      <br />
    </>
  );
}

export default MyComponent;