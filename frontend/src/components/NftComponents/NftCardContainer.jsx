import React, { useState } from 'react';

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

const NftCardContainer = React.memo(
    ({ nfts, setDashboardView, dashboardView, loadCitizens }) => {
        const [currentPage, setCurrentPage] = useState(1);
        const totalPages = 20;

        const handlePrevious = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                loadCitizens(false);
            }
        };

        const handleNext = () => {
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                loadCitizens(false);
            }
        };

        const handlePageSelect = (page) => {
            setCurrentPage(page);
            loadCitizens(false);
        };

        const generateHex = (page, limit) => {
            let hex = '';
            if (page === 1) {
                return hex;
            } else {
                hex = (page - 1) * limit;
            }
            return hex.toString(16);
        };

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
                        <PageButton onClick={handlePrevious}>
                            Previous
                        </PageButton>
                        {Array.from({ length: 6 }, (_, index) => index + 1).map(
                            (page) => (
                                <PageButton
                                    key={page}
                                    onClick={() => handlePageSelect(page)}
                                    isActive={page === currentPage}
                                >
                                    {page}
                                </PageButton>
                            )
                        )}
                        <PageButton onClick={handleNext}>Next</PageButton>
                    </PageSelectContainer>
                )}
            </Backdrop>
        );
    }
);

export default NftCardContainer;

// const NftCardContainer = ({
//     nfts,
//     setDashboardView,
//     dashboardView,
//     loadCitizens,
// }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const totalPages = 20;

//     const handlePrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//             loadCitizens(false);
//         }
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//             loadCitizens(false);
//         }
//     };

//     const handlePageSelect = (page) => {
//         setCurrentPage(page);
//         loadCitizens(false);
//     };

//     const generateHex = (page, limit) => {
//         let hex = '';
//         if (page === 1) {
//             return hex;
//         } else {
//             hex = (page - 1) * limit;
//         }
//         return hex.toString(16);
//     };

//     return (
//         <Backdrop>
//             <Container dashboardView={dashboardView}>
//                 {nfts?.length > 0 ? (
//                     nfts.map((nft, index) =>
//                         dashboardView ? (
//                             <NftThumbnail
//                                 key={nft.tokenId || index}
//                                 nft={nft}
//                             />
//                         ) : (
//                             <NftCard key={nft.tokenId || index} nft={nft} />
//                         )
//                     )
//                 ) : (
//                     <EmptyMessage>
//                         <Paragraph>Smells like meatbag in here ...</Paragraph>
//                         <Paragraph>
//                             No citizen found. Try searching for a different
//                             wallet address or token ID.
//                         </Paragraph>
//                     </EmptyMessage>
//                 )}
//             </Container>
//             {dashboardView && (
//                 <PageSelectContainer>
//                     <PageButton onClick={handlePrevious}>Previous</PageButton>
//                     {Array.from({ length: 6 }, (_, index) => index + 1).map(
//                         (page) => (
//                             <PageButton
//                                 key={page}
//                                 onClick={() => handlePageSelect(page)}
//                                 isActive={page === currentPage}
//                             >
//                                 {page}
//                             </PageButton>
//                         )
//                     )}
//                     <PageButton onClick={handleNext}>Next</PageButton>
//                 </PageSelectContainer>
//             )}
//         </Backdrop>
//     );
// };

// export default NftCardContainer;
