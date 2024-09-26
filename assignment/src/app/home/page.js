"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/page'; // Adjust the path if needed

const Home = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(10);
    const [minScore, setMinScore] = useState(''); // State for minimum score
    const [sortBy, setSortBy] = useState('name'); // State for sorting attribute
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
    const [paginating, setPaginating] = useState(false); // State for pagination delay

    // Fetch games data without pagination
    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const apiUrl = `https://spa.api.logicloop.io/api/games`;
                console.log(`Fetching from: ${apiUrl}`); // Log the API URL

                const response = await axios.get(apiUrl);
                console.log(response.data); // Log the API response for debugging

                if (response.data.data) {
                    setGames(response.data.data); // Assuming the data is in the format { data: [...] }
                } else {
                    setError("No data found.");
                }
            } catch (error) {
                console.error(error); // Log the error for debugging
                setError(error.response?.data?.error?.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Filter the games based on input
    const filteredGames = games.filter(game => {
        const matchesName = game.attributes.name.toLowerCase().includes(filter.toLowerCase());
        const matchesScore = minScore ? game.attributes.rating >= parseFloat(minScore) : true;
        return matchesName && matchesScore;
    });

    // Sort the filtered games based on selected criteria
    const sortedGames = [...filteredGames].sort((a, b) => {
        const aValue = sortBy === 'name' ? a.attributes.name : sortBy === 'score' ? a.attributes.rating : new Date(a.attributes.release);
        const bValue = sortBy === 'name' ? b.attributes.name : sortBy === 'score' ? b.attributes.rating : new Date(b.attributes.release);

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Get current games based on pagination
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

    // Change page with a 2-second delay
    const paginate = (pageNumber) => {
        setPaginating(true); // Start delay indicator
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setPaginating(false); // Remove delay indicator after 2 seconds
        }, 2000);
    };

    // Calculate total pages
    const totalPages = Math.ceil(sortedGames.length / gamesPerPage);

    // Function to format the rating
    const formatRating = (rating) => {
        const roundedRating = Math.floor(rating);
        return roundedRating;
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col lg:flex-row justify-between bg-bodyGradientStart h-full">
                {/* Filter Card (Responsive) */}
                <div className="h-full w-full lg:w-1/5 bg-cardBackground p-4 absolute sticky top pt-32 fixed h-128">
                    <h2
                        className="text-lg font-semibold mb-2"
                        style={{
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500,
                        }}
                    >
                        Filter Results
                    </h2>

                    <input
                        type="text"
                        className="w-full p-2 mb-4 bg-inputBackground text-white"
                        placeholder="Search by name..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <h3 className="text-md font-semibold"
                        style={{
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500,
                        }}
                    >Minimum Score:</h3>
                    <input
                        type="number"
                        className="w-full p-2 mb-4 bg-inputBackground text-white"
                        placeholder="Enter minimum score..."
                        value={minScore}
                        onChange={(e) => setMinScore(e.target.value)}
                    />
                    <h3 className="text-md font-semibold"
                        style={{
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 500,
                        }}
                    >Order By:</h3>
                    <select
                        className="w-full p-2 bg-inputBackground text-white mb-2"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="score">Score</option>
                        <option value="release">Release Date</option>
                    </select>
                    <select
                        className="w-full p-2 bg-inputBackground text-white"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-buttonBlue w-16 h-8"
                            style={{
                                color: '#c1d1e8',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: 600,
                            }}
                            onClick={() => {
                                setFilter('');
                                setMinScore('');
                                setSortBy('name');
                                setSortOrder('asc');
                                window.location.reload();
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Right-hand side Cards */}
                <div className="flex-col w-full lg:w-4/5 p-4 bg-bodyGradientStart pt-32">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {paginating ? (
                        <p className="text-white">Loading next page...</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {currentGames.length > 0 ? (
                                currentGames.map((game) => (
                                    <div key={game.id} className="bg-cardBackground p-4 rounded-md flex h-40 relative">
                                        <div className="w-24 h-full rounded-md bg-gradient-to-t from-[#081221] to-[#03080f] flex-shrink-0">
                                            {game.attributes.image ? (
                                                <img
                                                    src={game.attributes.image}
                                                    alt={game.attributes.name}
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                            ) : null}
                                        </div>
                                        <div className="flex-1 pl-4 flex flex-col justify-between overflow-hidden">
                                            <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-buttonBlue text-white rounded-full">
                                                {Math.floor(game.attributes.rating)}
                                            </div>
                                            <h3 className="text-xl font-bold text-white"
                                            style={{
                                                color: '#ffffff',
                                                fontFamily: 'Montserrat, sans-serif',
                                                fontWeight: 500,
                                            }}>
                                                {game.attributes.name}
                                            </h3>
                                            <p className="text-sm text-gray-300"
                                            style={{
                                                color: '#ffffff',
                                                fontFamily: 'Montserrat, sans-serif',
                                                fontWeight: 500,
                                            }}>
                                                Release Date: {new Date(game.attributes.firstReleaseDate).toLocaleDateString()}
                                            </p>

                                            <p className="text-sm text-gray-300"
                                            style={{
                                                color: '#ffffff',
                                                fontFamily: 'Montserrat, sans-serif',
                                                fontWeight: 500,
                                            }}>
                                                {game.attributes.summary}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">No games found.</p>
                            )}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-buttonBlue text-white' : 'bg-buttonBlue text-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
