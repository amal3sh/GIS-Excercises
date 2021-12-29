import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/geom/Circle';
import {Style,Fill,Stroke} from 'ol/style';
import FeatureFormat from 'ol/format/Feature';
import GeometryCollection from 'ol/geom/GeometryCollection';
import RenderFeature from 'ol/render/Feature';
import { loadFeaturesXhr } from 'ol/featureloader';
import Point from 'ol/geom/Point';
import _default from 'ol/geom/GeometryLayout';



const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
/*var innerCircleStyle = new Style({
  fill:new Fill({
    color:"red"
  })
});

var outerCircleStyle = new Style({
  stroke: new Stroke({
    color:"green"
  })
})*/
const e = 5000000
let coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];

let customFeature=(coordinates)=>{



let circleStyle = [
  new Style({
    fill:new Fill({
      color:"red"
    })
  }),
  new Style({
    stroke: new Stroke({
      color:"green"
    })
  })
  
]




const innercircle = new Feature({
  geometry:new Circle(coordinates,120000),
  
});
const outercircle = new Feature({
  geometry:new Circle(coordinates,190000),
});
outercircle.setStyle(circleStyle[1]);
innercircle.setStyle(circleStyle[0]);



return [outercircle,innercircle];

}

const vSource = new VectorSource();
vSource.addFeatures(customFeature(coordinates));
const vLayer = new VectorLayer({
  source:vSource,

})
map.addLayer(vLayer);
