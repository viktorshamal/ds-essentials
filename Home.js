import React from "react"
import styled from 'styled-components'
import { createContainer, query } from "@phenomic/preset-react-app/lib/client"
import katex from "katex/dist/katex"
import Clipboard from "clipboard"
import isNode from 'detect-node'

if(!isNode) {
    new Clipboard('.equation')    
}

const EquationWrapper = styled.div`
    padding: 0 2rem 1rem 2rem;
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

const Equation = ({id, title, latex, description}) => 
    <EquationWrapper className='equation' data-clipboard-target={'#latex-' + id} key={id}>
        <p>Title: <strong>{title || id}</strong></p>
        <p>Description: {description}</p>
        <div dangerouslySetInnerHTML={{__html: katex.renderToString(latex)}}></div>
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

    applyFilter = (filter) => {
        if(!filter) return this.setState({filteredEquations: null})            

        const { isLoading, equations } = this.props

        const safeEquations = retriveListSafe(isLoading, equations)

        const filteredEquations = safeEquations && safeEquations.filter(equation => 
           equation.title.includes(filter) ||
           equation.description.includes(filter)
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