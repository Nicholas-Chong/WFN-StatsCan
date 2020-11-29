import React from 'react'
import '../css/slider-text.css'

class Valueslider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionslen: window.innerWidth/this.props.sections
        }

        // Bind handleResize to this (tf does this mean???)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        // Sections len will be recalulated on window resize
        window.addEventListener('resize', this.handleResize)
    }

    handleResize() {
        // Recalculate and setState
        this.setState({sectionslen: window.innerWidth/this.props.sections})
    }

    render() {
        return <h1 class='slider-text' style={{paddingLeft: this.state.sectionslen * this.props.sectionNum}}>{this.props.value}</h1>
    }
}

export default Valueslider