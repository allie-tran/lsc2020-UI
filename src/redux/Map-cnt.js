import { connect } from 'react-redux'
import {setQueryBound} from './actions/search'
import {selectMarkers} from './actions/select'
import Map from '../components/Map'


function mapStateToProps(state) {
    return {
        dates: state.search.dates,
        selected: state.select.selected,
        gpsResponse: state.search.gpsResponse,
        stateBounds: state.search.bounds
    }
}

const mapDispatchToProps = {
    setQueryBound,
    selectMarkers
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
