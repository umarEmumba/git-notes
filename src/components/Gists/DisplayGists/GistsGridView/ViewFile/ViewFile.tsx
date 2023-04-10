import React, { FC, useEffect, useState } from 'react';
import Loader from '../../../../common/Loader/Loader';
import "./ViewFile.scss";


interface ViewFileProps {
  url : string
}

const ViewFile: FC<ViewFileProps> = ({url}) => {
  const [content, setContent] = useState("");
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const resp = await response.text();
        setContent(resp.replace(/^(.*)$/gm, `<span class="numbering">$1</span>`));
        setLoader(false);
      } catch (err) {
        console.log("API error:", err);
      }
    })();
  }, [url]);
    return (
      <>
      {loader && <Loader />}
      {!loader && (
        <pre className="overflow-scroll min-h-[inherit]" >
          <code dangerouslySetInnerHTML={{ __html: content }} />
        </pre>
      )}
    </>
    );
  }

export default ViewFile;
