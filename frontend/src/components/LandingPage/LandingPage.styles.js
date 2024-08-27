import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/img/neo-tokyo-background.jpeg');
    background-size: cover;
`;

export const ConnectButton = styled.button`
    padding: 1em 2em;
    font-size: 1.75em;
    color: #ffffff;
    background-color: transparent;
    border: none;
    border-radius: 0.3em;
    cursor: pointer;
    position: relative;
    font-weight: bold;
    transition: all 1s ease;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    z-index: 2;

    &:before,
    &:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 100%;
        top: 0;
        background-color: #8a2be2;
        transition: all 1s ease;
        border-top: none;
        border-bottom: none;
    }

    &:before {
        left: 0;
        border-top-left-radius: 0.3em;
        border-bottom-left-radius: 0.3em;
    }

    &:after {
        right: 0;
        border-top-right-radius: 0.3em;
        border-bottom-right-radius: 0.3em;
    }

    &:hover:before,
    &:hover:after {
        border-top: none;
        border-bottom: none;
        width: 100%;
        border-radius: 0.3em;
        z-index: -1;
    }

    &:hover {
        border-top: none;
        border-bottom: none;
        animation: neonGlow 4s infinite, pulseStart 1.5s ease-out;
        animation-delay: 0.75s;
    }

    @keyframes neonGlow {
        0%,
        100% {
            box-shadow: 0 0 5px #8a2be2, 0 0 10px #ff0099, 0 0 15px #00ffa3,
                0 0 20px #00ffff, 0 0 5px #ff8c00, 0 0 10px #ffd700,
                0 0 15px #00ff7f, 0 0 20px #7b68ee;
        }
        50% {
            box-shadow: 0 0 7px #8a2be2, 0 0 12px #ff0099, 0 0 17px #00ffa3,
                0 0 22px #00ffff, 0 0 7px #ff8c00, 0 0 12px #ffd700,
                0 0 17px #00ff7f, 0 0 22px #7b68ee;
        }
    }

    @keyframes pulseStart {
        0% {
            box-shadow: none;
        }
        100% {
            box-shadow: 0 0 5px #8a2be2, 0 0 10px #ff0099, 0 0 15px #00ffa3,
                0 0 20px #00ffff, 0 0 5px #ff8c00, 0 0 10px #ffd700,
                0 0 15px #00ff7f, 0 0 20px #7b68ee;
        }
    }

    @media (max-width: 480px) {
        font-size: 1.25em;
    }
`;
