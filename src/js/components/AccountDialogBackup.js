import React from "react";
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {red} from "@material-ui/core/colors";

const styles = theme => ({
    red: {
        color: red[500]
    }
});


class AccountDialogBackup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            account: props.account,
            open: props.open,
            _shown: false
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
    }

    _show = () => {

        this.setState({_shown: true});
    };

    _on_close = (event, account) => {

        this._on_cancel(event);
        this.props.onClose(event, account);
    };

    _on_cancel = () => {

        setTimeout(() => {
            this.setState({
                _shown: false
            });
        }, 500);
    };

    render() {

        const { classes, account, open, _shown } = this.state;

        return (
            <Dialog
                open={open}
                onClose={(event) => {this._on_close(event, account)}}
                aria-labelledby="Backup account dialog title"
                aria-describedby="Backup account dialog description"
            >
                {Boolean(account) ?
                    <div>
                        <DialogTitle id="Backup account dialog title">Seed of {account.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="Backup account dialog description">
                                <p className={classes.red}>STORE IT ON PAPER, NEVER SHARE THIS SEED TO ANYONE!!!</p>
                                {
                                    _shown ?
                                        <p>{account.seed}</p>:
                                        <Button variant="contained"  color="primary" fullWidth onClick={this._show}>
                                            Show
                                        </Button>
                                }
                            </DialogContentText>
                        </DialogContent>
                    </div>: null
                }
                <DialogActions>
                    <Button onClick={(event) => {this._on_close(event, account)}} variant="contained"  color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(AccountDialogBackup);