import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Draw';
import Draw from 'ol/interaction/Draw';

const source = new VectorSource();
const layer = new VectorLayer(
  {
    source : source,
  }
);
const raster = new TileLayer({
  source: new OSM(),
});
const map = new Map({
  target: 'map',
  layers: [raster, layer ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
let draw;
const typeSelect = document.getElementById('type');
function addInteraction()
{
  const value = typeSelect.value;
  draw = new Draw(
    {
      source: source,
      type: typeSelect.value,
    }
  );
  map.addInteraction(draw);
}
typeSelect.onchange = function()
{
  map.removeInteraction(draw);
  addInteraction();
}

addInteraction();