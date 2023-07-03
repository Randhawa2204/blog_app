import {
  ButtonGroup,
  Button,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuItem,
  MenuList,
  styled
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material"
import { useState, useRef } from "react";
import { useLocation , Link} from "react-router-dom";
import {categories} from "../../constants/data"

// const options = [
//   "Create a merge commit",
//   "Squash and merge",
//   "Rebase and merge",
// ];

const StyledLink = styled(Link)`
  text-decoration : none;
  color : inherit;
`

const CategoryButton = ({post , setPost}) => {

  const location = useLocation()
  const linkCategory = location.search?.split("=")[1] || "All"
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(categories.findIndex(obj => obj.name === linkCategory));

  //categories.findIndex(obj => obj.name === post.categories)
  const handleClick = () => {
    //console.info(`You clicked ${categories[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setPost({...post, categories : categories[index].name})
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{categories[selectedIndex].name}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {categories.map((option, index) => (
                    <StyledLink to={`?category=${option.name}`} key={option.key}><MenuItem
                      //disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                     {option.name}
                    </MenuItem></StyledLink>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default CategoryButton;
