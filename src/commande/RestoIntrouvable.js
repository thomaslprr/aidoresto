import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";


const RestoIntrouvable = ({ match: {params :{id}} }) => {

    return (
        <>
            <Typography variant="h5">
                Cette page restaurant n'est pas attribué.
            </Typography>
        </>
    )
};

export default RestoIntrouvable
