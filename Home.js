import React from "react"
import styled from 'styled-components'
import { createContainer, query, BodyRenderer } from "@phenomic/preset-react-app/lib/client"
import katex from "katex/dist/katex"
import Clipboard from "clipboard"
import isNode from 'detect-node'
import GithubLogo from './GithubLogo'

if(!isNode) {
    new Clipboard('.equation')    
}

const EquationWrapper = styled.div`
    padding: 0 1rem;
    border: 1px solid;
    margin: 1rem 0 1rem 0;

    .hidden {
        opacity: 0;
    }

    &:hover {
        background-color: grey;
        cursor: pointer;
    }
`

const Equation = ({id, title, latex, body}) => 
    <EquationWrapper className='equation' data-clipboard-target={'#latex-' + id} key={id}>
        <p><strong>{title || id}</strong></p>
        <div dangerouslySetInnerHTML={{__html: katex.renderToString(latex)}}></div>
        <BodyRenderer>{body}</BodyRenderer>
        <span className='hidden' id={'latex-' + id}>{latex}</span>
    </EquationWrapper>


const Background = styled.div`
    background-color: none;
`

const retriveListSafe = (isLoading, data) => {
    return !isLoading && 
        data &&
        data.node &&
        data.node.list
}

class EquationList extends React.Component {
    constructor(props){
        super(props)
        const { isLoading, equations } = this.props

        this.state = {
            filteredEquations: null
        }

        const list = retriveListSafe(isLoading, equations)

        this.applyFilter.bind(this)
    }

    applyFilter = (searchTerm) => {
        if(!searchTerm) return this.setState({filteredEquations: null})            

        const { isLoading, equations } = this.props

        const safeEquations = retriveListSafe(isLoading, equations)

        const filteredEquations = safeEquations && safeEquations.filter(equation => 
           equation.title.includes(searchTerm) ||
           equation.latex.includes(searchTerm)
        )
        this.setState({filteredEquations})
    }

    handleInputChange = (event) => {
        this.applyFilter(event.target.value)
    }

    render() {
        const { isLoading, equations } = this.props
        const { filteredEquations } = this.state

        const list = filteredEquations || retriveListSafe(isLoading, equations)

        return (
            <Background>
                <GithubLogo/> 
                <h1>Equations</h1>
                <input type="text" onChange={this.handleInputChange}/>
                {isLoading && "Loading..."}
                {list && list.map(equation => <Equation {...equation}/>) }
            </Background>
        )
    }
}

export default createContainer(EquationList, () => ({
    equations: query({ path: "equations" })
}));