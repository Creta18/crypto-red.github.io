import React from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "react-router-dom";
import { HISTORY } from "./utils/constants";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en"
import fr from "javascript-time-ago/locale/fr"
import pt from "javascript-time-ago/locale/pt"
import id from "javascript-time-ago/locale/id"
import it from "javascript-time-ago/locale/it"
import de from "javascript-time-ago/locale/de"
import ja from "javascript-time-ago/locale/ja"
import zh from "javascript-time-ago/locale/zh"
import ko from "javascript-time-ago/locale/ko"
import ru from "javascript-time-ago/locale/ru"
import hi from "javascript-time-ago/locale/hi"

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(fr);
TimeAgo.addLocale(pt);
TimeAgo.addLocale(id);
TimeAgo.addLocale(it);
TimeAgo.addLocale(de);
TimeAgo.addLocale(ja);
TimeAgo.addLocale(zh);
TimeAgo.addLocale(ko);
TimeAgo.addLocale(ru);
TimeAgo.addLocale(hi);

// Pages
import Index from "./pages/Index";

// Theme
import { ThemeProvider } from "@material-ui/core"
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import { lightTheme } from "./theme/index";

const app = document.getElementById('app');

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <CssBaseline>
            <Router history={HISTORY}>
                <Route component={Index}/>
            </Router>
        </CssBaseline>
    </ThemeProvider>,
app);
