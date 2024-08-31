import React, { useEffect, useState, useCallback } from 'react';

import NftCard from './NftCard';
import NftThumbnail from './NftThumbnail';
import {
    Backdrop,
    Container,
    EmptyMessage,
    Paragraph,
    PageSelectContainer,
    PageButton,
} from './NftComponents.styles';

const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost';

const NftCardContainer = React.memo(
    ({
        nfts,
        setDashboardView,
        dashboardView,
        loadCitizens,
        // currentPage,
        // setCurrentPage,
    }) => {
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(20);
        const itemsPerPage = 20;

        // useEffect(() => {
        //     const calculatedTotalPages = Math.ceil(nfts.length / itemsPerPage);
        //     setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
        // }, [nfts])

        // const handlePrevious = () => {
        //     if (currentPage > 1) {
        //         let prevHex = generateHex(currentPage - 1, 20);
        //         setCurrentPage(currentPage - 1);
        //         if (isDevelopment || isLocalhost) {
        //             console.log(
        //                 `Previous hex: ${prevHex},
        //                 currentPage: ${currentPage}`
        //             );
        //         }
        //         loadCitizens(false, prevHex);
        //     }
        // };

        // const handleNext = () => {
        //     if (currentPage < totalPages) {
        //         if (isDevelopment || isLocalhost) {
        //             console.log(`Current page: ${currentPage}`);
        //             console.log(`Next page: ${currentPage + 1}`);
        //         }
        //         setCurrentPage(currentPage + 1);
        //         console.log({ currentPage });
        //         loadCitizens(false);
        //     }
        // };

        const generateHex = useCallback((page) => {
            if (page === 1) return '';
            return ((page - 1) * itemsPerPage).toString(16);
        }, []);

        const handlePageChange = useCallback(
            (newPage) => {
                setCurrentPage(newPage);
                const newHex = generateHex(newPage);
                if (isDevelopment || isLocalhost) {
                    console.log(`Page changed to: ${newPage}, Hex: ${newHex}`);
                }
                loadCitizens(false, newHex);
            },
            [generateHex, loadCitizens]
        );

        const handlePrevious = useCallback(() => {
            if (currentPage > 1) {
                handlePageChange(currentPage - 1);
            }
        }, [currentPage, handlePageChange]);

        const handleNext = useCallback(() => {
            if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
            }
        }, [currentPage, totalPages, handlePageChange]);

        const getPageNumbers = useCallback(() => {
            const pageNumbers = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(
                1,
                currentPage - Math.floor(maxVisiblePages / 2)
            );
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            return pageNumbers;
        }, [currentPage, totalPages]);

        // const handlePageSelect = (page) => {
        //     setCurrentPage(page);
        //     loadCitizens(false);
        // };

        // const generateHex = (page, limit) => {
        //     let hex = 1;
        //     if (page === 1) {
        //         return hex;
        //     } else {
        //         hex = (page - 1) * limit;
        //     }
        //     return hex.toString(16);
        // };

        return (
            <Backdrop>
                <Container dashboardView={dashboardView}>
                    {nfts?.length > 0 ? (
                        nfts.map((nft, index) =>
                            dashboardView ? (
                                <NftThumbnail
                                    key={nft.tokenId || index}
                                    nft={nft}
                                />
                            ) : (
                                <NftCard key={nft.tokenId || index} nft={nft} />
                            )
                        )
                    ) : (
                        <EmptyMessage>
                            <Paragraph>
                                Smells like meatbag in here ...
                            </Paragraph>
                            <Paragraph>
                                No citizen found. Try searching for a different
                                wallet address or token ID.
                            </Paragraph>
                        </EmptyMessage>
                    )}
                </Container>
                {dashboardView && (
                    <PageSelectContainer>
                        <PageButton
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PageButton>
                        {/* {Array.from({ length: 6 }, (_, index) => index + 1).map( */}
                        {getPageNumbers().map((page) => (
                            <PageButton
                                key={page}
                                onClick={() => handlePageChange(page)}
                                isActive={page === currentPage}
                            >
                                {page}
                            </PageButton>
                        ))}
                        <PageButton
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </PageButton>
                    </PageSelectContainer>
                )}
            </Backdrop>
        );
    }
);

export default NftCardContainer;
