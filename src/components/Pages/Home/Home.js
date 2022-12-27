import React from 'react';
import AddPost from './AddPost';
import HomeBanner from './HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <AddPost></AddPost>
        </div>
    );
};

export default Home;