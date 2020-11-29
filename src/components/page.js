import React from 'react'
import Graph from './graph_page.js'
import Select from 'react-select'
import Valueslider from './valueslider'
import '../css/dropdown_menu.css'
import '../css/page.css'
import { options, values, percentiles } from './data'

class Page extends React.Component {
    constructor(props) {
        super(props)

        // Set default selected val
        this.state = {selected: '10th Percentile'}
    }

    dropdownRef = React.createRef();

    handleChange = (value) => {
        // Set state.selected to newly selected value
        this.setState({selected: value.value})
    }

    render () {
        var sectionNum = percentiles.indexOf(this.state.selected)
        var value = values[sectionNum]
        
        return (
            <div>
                <div class='Header'>
                    <div>
                        <h1>
                            The
                        </h1>
                    </div>
                    <div style={{width: '160px', paddingLeft: '7px', paddingRight: '7px'}}>
                        <Select
                            options={options}
                            className="react-select--inline"
                            classNamePrefix="react-select" 
                            isSearchable={false}
                            defaultValue={options[1]}
                            components={{
                                IndicatorsContainer: () => null
                            }}
                            onChange={this.handleChange} />
                    </div>
                    <div>
                        <h1> 
                           percentile of Canadians earned:
                        </h1>
                    </div>
                </div>
                <div class='slider-text' style={{height: '7vh'}}>
                    <Valueslider sections={options.length} sectionNum={sectionNum} value={value}/>
                </div>
                <div>
                    <Graph selectedPercentile={this.state.selected} />
                </div>
            </div>
        )
    }
}

export default Page