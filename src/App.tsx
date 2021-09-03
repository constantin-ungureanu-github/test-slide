import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Container, CssBaseline, Fab, Slide, Toolbar, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@mui/material/styles';
import MenuToolbar from './components/MenuToolbar/MenuToolbar';
import Content from './components/Content/Content';
import theme from './config/theme';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 64,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger} 
    // timeout={
    //   // 3000
    //   {
    //     enter: 3000,
    //     exit: 3000
    //   }
    // }
    >
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 16,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor',);

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar>
              <MenuToolbar />
            </AppBar>
          </Box>
        </HideOnScroll>
        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth={false} disableGutters={true}>
          <Box sx={{ m: 2 }}>
            <Content />
          </Box>
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" sx={{ opacity: 0.75 }} aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
