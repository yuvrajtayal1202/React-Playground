import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const TextForms = (props) => {
  useEffect(() => {
    document.title = "TextUtils - Home || Yuvraj Tayal";
  }, []);

  const [Text, setText] = useState(localStorage.getItem("data") || "");
  const [pdfFileName, setPdfFileName] = useState("TextUtils-Export");
  const [isMakingPDF, setIsMakingPDF] = useState(false); // Tracks if user is making a PDF

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleup = () => {
    let neText = Text.toUpperCase();
    setText(neText);
    props.showAlert("Text converted to UPPERCASE", "success");
  };

  const handlelo = () => {
    let neText = Text.toLowerCase();
    setText(neText);
    props.showAlert("Text converted to lowercase", "success");
  };

  const handleclear = () => {
    setText("");
    props.showAlert("Text Cleared", "success");
  };

  const handleSen = () => {
    props.showAlert("Text converted to Sentence case", "success");
    let newText = Text.toLowerCase().replace(/(^\s*\w|[.!?\n]\s*\w)/g, (match) =>
      match.toUpperCase()
    );
    setText(newText);
  };

  const handleti = () => {
    let newText = Text.toLowerCase().split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    setText(newText);
    props.showAlert("Text converted to Title case", "success");
  };

  const handlecopy = () => {
    let vext = document.getElementById("exampleFormControlTextarea1");
    vext.select();
    navigator.clipboard.writeText(vext.value);
    props.showAlert("Text Copied to your clipboard", "success");
  };

  const handlepaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setText(text);
      props.showAlert("Text pasted from your clipboard", "success");
    } catch (err) {
      console.error("Failed to paste: ", err);
      props.showAlert("Failed to paste from clipboard", "danger");
    }
  };

  const handlesave = () => {
    localStorage.setItem("data", Text);
    props.showAlert("Text Saved", "success");
  };

  const showTask = () => {
    setText(localStorage.getItem("data"));
  };

  const handleMakePDF = () => {
    if (!Text.trim()) {
      props.showAlert("No text to export", "warning");
      return;
    }
    setIsMakingPDF(true); // Show the input field when making PDF
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(Text, 180);
    doc.text(lines, 10, 10);

    const name = pdfFileName.trim() === "" ? "TextUtils-Export" : pdfFileName.trim();
    doc.save(`${name}.pdf`);
    props.showAlert("PDF downloaded successfully", "success");

    setIsMakingPDF(false); // Hide the input field again after PDF is generated
  };

  return (
    <>
      <div className="container my-4">
        <h2>Enter Text Below To Analyze</h2>
        <div className="mb-3 my-4">
          <textarea
            className="form-control"
            name="textarea"
            onChange={handleOnChange}
            id="exampleFormControlTextarea1"
            rows="8"
            value={Text}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#133a62",
              color: props.mode === "light" ? "black" : "white"
            }}
          ></textarea>

          {/* Conditionally show the PDF filename input only when the user clicks "Make PDF" */}
          {isMakingPDF && (
            <div className="my-2">
              <label htmlFor="pdfName" className="form-label">Custom PDF Name:</label>
              <input
                type="text"
                className="form-control"
                id="pdfName"
                value={pdfFileName}
                onChange={(e) => setPdfFileName(e.target.value)}
                placeholder="Enter PDF file name"
              />
              <button
                type="button"
                onClick={generatePDF}
                className="btn btn-success mx-1 my-1"
              >
                Generate PDF
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleclear}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handlepaste}
            className="btn btn-success mx-1 my-1"
          >
            Paste Text
          </button>

          <button
            type="button"
            onClick={handlecopy}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Copy Text
          </button>

          <button
            type="button"
            onClick={handlesave}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleMakePDF}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Generate PDF
          </button>
          <button
            type="button"
            onClick={handleup}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Convert To UPPERCASE
          </button>

          <button
            type="button"
            onClick={handlelo}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Convert To lowercase
          </button>

          <button
            type="button"
            onClick={handleSen}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Convert to Sentence
          </button>

          <button
            type="button"
            onClick={handleti}
            className="btn btn-success mx-1 my-1"
            disabled={Text.length === 0}
          >
            Convert to Title
          </button>


        </div>

        <h2><b>Text Summary</b></h2>
        <p>
          {Text.trim().split(/\s+/).filter((word) => word !== "").length} Words, {Text.length} Characters
        </p>

        <h2>Preview</h2>
        <p>{Text.length > 0 ? Text : "Enter text in the above box to preview it here."}</p>
      </div>
    </>
  );
};

export default TextForms;
