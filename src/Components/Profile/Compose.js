import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Compose.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputGroup from "react-bootstrap/InputGroup";
import { EditorState } from "draft-js";

import { useSelector } from "react-redux";
import { convertToHTML } from "draft-convert";

const Compose = () => {
  const sendToEmailInputRef = useRef();
  const subInputRef = useRef();
  const formRef = useRef();
  const auth = useSelector((state) => state.auth);

  const [editorState, updateEditorState] = useState(EditorState.createEmpty());

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    // console.log(sendToEmailInputRef.current.value, subInputRef.current.value);
    // console.log(convertToRaw(editorState.getCurrentContent()).blocks);
    const emailObj = {
      to: sendToEmailInputRef.current.value,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date()
    };

    // console.log(emailObj)

    try {
      const senderEmail = auth.email.replace(/[\.@]/g, "");
      const res = fetch(
        `https://mail-box-91259-default-rtdb.firebaseio.com/${senderEmail}/sentEmails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log(auth.email)
    const emailObj2 = {
      from: auth.email,
      emailSub: subInputRef.current.value,
      emailContent: convertToHTML(editorState.getCurrentContent()),
      date: new Date()
    };
    try {
      const recieverEmail = sendToEmailInputRef.current.value.replace(/[\.@]/g, "");
      const res = fetch(
        `https://mail-box-91259-default-rtdb.firebaseio.com/${recieverEmail}/recievedEmails.json`,
        {
          method: "POST",
          body: JSON.stringify({
            ...emailObj2,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    formRef.current.reset();
    updateEditorState('');
  };

  return (
    <section className={classes.form}>
      <Form onSubmit={sendEmailHandler} ref={formRef}>
        <InputGroup className={classes.mail}>
          <InputGroup.Text id="btnGroupAddon">To</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter recipient email"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={sendToEmailInputRef}
          />
          <div style={{margin: '3px'}}>
          <Button variant="primary" type="submit">
            Send Email
          </Button>
          </div>
         
        </InputGroup>
        <InputGroup className={classes.subject}>
          <InputGroup.Text id="btnGroupAddon">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter email subject"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            ref={subInputRef}
          />
        </InputGroup>
        <Form.Group controlId="composeEmailMessage" className={classes.editor}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={updateEditorState}
            // ref={contentInputRef}
          />
        </Form.Group>
      </Form>
    </section>
  );
};

export default Compose;