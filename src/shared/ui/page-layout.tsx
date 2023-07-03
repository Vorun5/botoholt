import styled from 'styled-components'

export const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--bh-background-color);
    padding: 20px 10px;

    @media (min-width: 360px) {
        padding: 30px 15px;
    }

    @media (min-width: 1200px) {
        padding: 30px 40px;
    }

    @media (min-width: 1700px) {
        padding: 35px 80px 40px;
    }
`
export const PageHeader = styled.header`
    flex-shrink: 0;
`

export const PageContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 0;

    @media (min-width: 1200px) {
        padding: 3rem 0;
    }
`
export const PageContentExpanded = styled.div`
    margin: auto;
`

export const PageFooter = styled.footer`
    flex-shrink: 0;
`
