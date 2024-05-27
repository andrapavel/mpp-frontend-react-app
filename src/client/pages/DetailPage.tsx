import React from 'react';
import {useParams} from 'react-router-dom';

const DetailPage: React.FC = () => {
    const {id} = useParams<{id: string}>();

    return (
        <div>
            <h2>Detail Page</h2>
            <p>Entity ID: {id}</p>
        </div>
    );
};

export default DetailPage;
