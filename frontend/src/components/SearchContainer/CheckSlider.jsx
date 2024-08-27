import styled from 'styled-components';

const CheckSlider = ({ checked, onChange }) => {
    return (
        <CheckboxWrapper>
            <Label active={!checked}>S1</Label>
            <Input type="checkbox" checked={checked} onChange={onChange} />
            <Slider checked={checked} />
            <Label active={checked}>S2</Label>
        </CheckboxWrapper>
    );
};

export default CheckSlider;

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    margin-left: 10px;
    position: relative;
    cursor: pointer;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
    display: none;

    &:checked + div {
        background-color: #8a2be2;
    }

    &:checked + div:before {
        transform: translateX(1.5rem);
    }
`;

const Slider = styled.div`
    width: 2.5rem;
    height: 1.5rem;
    background-color: ${({ checked }) => (checked ? '#8a2be2' : '#8a2be2')};
    border-radius: 1.25rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    border: 4px solid transparent;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.25) inset;
    cursor: pointer;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        background-color: #fff;
        border-radius: 10px;
        transition: transform 0.3s ease;
        transform: ${({ checked }) =>
            checked ? 'translateX(2.5rem)' : 'translateX(0)'};
        box-shadow: 0 0 10px 3px rgb(0, 0, 0, 0.25);
    }
`;

const Label = styled.p`
    font-size: 1em;
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    color: ${({ active }) => (active ? '#ffffff' : '#aaaaaa')};
    margin: 0 10px;
    transition: color 0.3s ease, font-weight 0.3s ease;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;
