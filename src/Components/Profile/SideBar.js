import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { inboxActions } from "../../store/inbox-slice";

import classes from './SideBar.module.css';

const SideBar = () => {

  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const inboxItem = useSelector(state => state.inbox.inboxItems)
  const dispatch = useDispatch();

  const composeClickHandler = () =>{
    navigate('/profile/compose', {replace: true});
  }

  const inboxClickHandler = async () => {
    navigate('/profile/inbox', {replace: true});
    
    const email = auth.email.replace(/[\.@]/g, "");
    try{
      const resInbox = await fetch(`https://mail-box-91259-default-rtdb.firebaseio.com/${email}/recievedEmails.json`);

      const data = await resInbox.json();
      console.log(Object.values(data));

      if(resInbox.ok){
        dispatch(inboxActions.addItems(Object.values(data)))
      }
    } catch(error) {
      alert(error);
    }
  }



  return (
    <Fragment >
        <div className={classes.mailCon}>
        <table>
          <tbody>
            <tr>
              <td>
              <Button variant="primary" onClick={composeClickHandler}>
                  Compose
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-secondary" onClick={inboxClickHandler}>Inbox</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-success">Sentbox</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-warning">Outbox</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-danger">Spam</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-info">Recyle bin</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button variant="outline-dark">Starred</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>  
    </Fragment>
  );
};

export default SideBar;