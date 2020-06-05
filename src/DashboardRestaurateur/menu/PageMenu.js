import React from 'react';
import ListeMenu from "./ListeMenus";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import PageAjoutMenu from "./PageAjoutMenu";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PageMenu = ({idResto}) => {

    const [openAjoutMenu, setOpenAjoutMenu] = React.useState(false);

    const handleClickOpenAjoutMenu = () => {
        setOpenAjoutMenu(true);
    };

    const handleCloseAjoutMenu = () => {
        setOpenAjoutMenu(false);
    };

    return(
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpenAjoutMenu}>
                Ajouter un menu
            </Button>

            <br/>

            <ListeMenu idResto={idResto}/>


            <Dialog fullScreen open={openAjoutMenu} onClose={handleCloseAjoutMenu} TransitionComponent={Transition}>

                <PageAjoutMenu handleClose={handleCloseAjoutMenu}/>

            </Dialog>
        </>
    )

};

export default PageMenu;
