import React from "react"
import styled from 'styled-components'
import { createContainer, query } from "@phenomic/preset-react-app/lib/client"
import katex from "katex/dist/katex"
import Clipboard from "clipboard"

new Clipboard('.equation')

const Equation = ({id, title, latex}) => 
    <div className='equation' data-clipboard-target={'#latex-' + id} key={id}>
        <p>{title || id}</p>
        <div dangerouslySetInnerHTML={{__html: katex.renderToString(latex)}}></div>
        <span id={'latex-' + id}>{latex}</span>
    </div>

const Home = ({ isLoading, posts }) =>
    <Background>
        <h1>Equations</h1>
        {isLoading && "Loading..."}
        {!isLoading && 
            posts &&
            posts.node &&
            posts.node.list &&
            posts.node.list.map(equation => <Equation {...equation}/>
        )}
    </Background>

const Background = styled.div`
    background-color: none;
`

export default createContainer(Home, () => ({
    posts: query({ path: "equations" })
}));