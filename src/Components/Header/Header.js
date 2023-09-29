import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import classes from './Header.module.css'

function Header() {
  return (
    <Navbar className={classes["bg-body-tertiary"]}>
      <Container>
        <Navbar.Brand href="#home" className={classes.brand}>Metro Mail</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
  );
}

export default Header;