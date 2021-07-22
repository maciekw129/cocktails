import styled from 'styled-components';

const LoadingAnimation = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 0.5rem;

    @keyframes loading {
        from {
            opacity: 100%;
        }

        to {
            opacity: 0%;
        }
    }

    & div {
        content: '';
        height: 10px;
        width: 10px;
        background-color: black;
        border-radius: 50%;
    }

    & .one {
        animation: 1s infinite alternate loading;
    }

    & .two {
        animation: 1s infinite alternate loading;
        animation-delay: 0.5s;
    }

    & .three {
        animation: 1s infinite alternate loading;
        animation-delay: 1s;
    }

`

export function Loading() {
    return(
        <div>
            <h4>Loading cocktails...</h4>
            <LoadingAnimation>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </LoadingAnimation>
        </div>
    )
}