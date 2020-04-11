import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import {
  ExperimentsProvider,
  ExperimentSettings,
} from '../src/components/Experiments';

import * as P from './prompts';
import { ThemeControl, ThemeProvider } from './theme';

const DocStyle = createGlobalStyle`
  html,
  body {
    color: #202020;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.25;
    margin: 0;
  }
`;

const Page = styled.div`
  display: grid;
  gap: 1.5em;
  grid-template: auto 1fr auto / 1fr auto;
  grid-template-areas:
    'nav theme'
    'main main'
    'experiments experiments';
  padding: 1.5em;
`;

const Nav = styled.nav`
  grid-area: nav;
`;

const NavList = styled.ul`
  margin: 0;
  padding-inline-start: 1.5em;
`;

const Theme = styled.aside`
  grid-area: theme;
`;

const Main = styled.main`
  grid-area: main;
`;

const Experiments = styled.aside`
  grid-area: experiments;
`;

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ExperimentsProvider>
          <DocStyle />
          <Page>
            <Nav>
              <NavList>
                <li role="presentation">
                  <Link
                    to={location => ({ ...location, pathname: '/confirm' })}
                  >
                    Confirm Prompts
                  </Link>
                </li>
                <li role="presentation">
                  <Link to={location => ({ ...location, pathname: '/list' })}>
                    List Prompts
                  </Link>
                </li>
                <li role="presentation">
                  <Link
                    to={location => ({
                      ...location,
                      pathname: '/multi-option',
                    })}
                  >
                    Multi-Option Prompts
                  </Link>
                </li>
                <li role="presentation">
                  <Link
                    to={location => ({
                      ...location,
                      pathname: '/single-option',
                    })}
                  >
                    Single-Option Prompts
                  </Link>
                </li>
                <li role="presentation">
                  <Link to={location => ({ ...location, pathname: '/text' })}>
                    Text Prompts
                  </Link>
                </li>
              </NavList>
            </Nav>
            <Theme>
              <label>
                Theme <ThemeControl />
              </label>
            </Theme>
            <Main>
              <Switch>
                <Route path="/confirm">
                  <P.ConfirmPrompts />
                </Route>
                <Route path="/list">
                  <P.ListPrompts />
                </Route>
                <Route path="/multi-option">
                  <P.MultiOptionPrompts />
                </Route>
                <Route path="/single-option">
                  <P.SingleOptionPrompts />
                </Route>
                <Route path="/text">
                  <P.TextPrompts />
                </Route>
              </Switch>
            </Main>
            <Experiments>
              <ExperimentSettings />
            </Experiments>
          </Page>
        </ExperimentsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
