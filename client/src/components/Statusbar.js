import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";
    let style = {
        visibility: "visible"
    };
    if (auth.user == null){
        style = {
            visibility: "hidden"
        }
    }
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar"
            style = {style}>
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;