import React from 'react';
import AddPost from './AddPost';
import DisplayPost from './DisplayPost';
import HomeBanner from './HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <AddPost></AddPost>
            <DisplayPost></DisplayPost>
        </div>
    );
};

export default Home;