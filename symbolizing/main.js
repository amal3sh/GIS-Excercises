import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Icon} from 'ol/style';
import Point from 'ol/geom/Point';


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
const e = 5000000;
let coordinate = [2 * e * Math.random() - e , 2 * e * Math.random() - e];
 const iconFeature =  new Feature(
   {
     geometry: new Point(coordinate),
   }
 );
 const iconStyle = new Style(
   {
     image: new Icon({
       anchor:[0.5,46],
       anchorXUnits: 'fraction',
       anchorYUnits: 'pixels',
       src: "icon.png",
     })
   }
 )
 iconFeature.setStyle(iconStyle);
  const vectorSource = new VectorSource();
  vectorSource.addFeature(iconFeature);
  const vectorLayer = new VectorLayer(
    {
     source: vectorSource,
    }
  );
  map.addLayer(vectorLayer);
