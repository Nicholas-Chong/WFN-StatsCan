import React from 'react'
import '../css/slider-text.css'
import AnimatedNumber from 'react-animated-number'

class Valueslider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionslen: window.innerWidth/this.props.sections,
            value: props.value
        }

        // Bind handleResize to this (tf does this mean???)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
        // Sections len will be recalulated on window resize
        window.addEventListener('resize', this.handleResize)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({value: this.props.value})
        }
    }

    handleResize() {
        // Recalculate and setState
        this.setState({sectionslen: window.innerWidth/this.props.sections})
    }

    render() {
        console.log(this.state)
        return (
            <AnimatedNumber 
                id='animated-num' 
                value={this.state.value} 
                Component='h1'
                style={{
                    position: 'absolute',
                    left: this.state.sectionslen * this.props.sectionNum,
                    fontWeight: 'bold',
                    transition: '0.8s ease-out',
                    transitionProperty:
                        'background-color, color, opacity'
                }}
                duration={500}
                stepPrecision={0}
                formatValue={n => '$' + n.toString()} />
        )
    }
}

export default Valueslider