import React from 'react'
import '../css/slider-text.css'

class Valueslider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
            sectionslen: window.innerWidth/this.props.sections
        }
        this.handleResize = this.handleResize.bind(this)
    }

    width = window.innerWidth
    sections = this.props.section
    sectionslen = this.width/this.props.sections

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    handleResize() {
        this.setState({sectionslen: window.innerWidth/this.props.sections})
    }

    render() {
        return <h1 class='slider-text' style={{paddingLeft: this.state.sectionslen * this.props.sectionNum}}>{this.props.value}</h1>
    }
}

export default Valueslider